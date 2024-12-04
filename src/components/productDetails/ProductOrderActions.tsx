"use client";
import { addToCart } from "@/redux/features/cart/cart.slice";
import { addItemsToCheckout } from "@/redux/features/checkout/checkout.slice";
import { useAppSelector } from "@/redux/hook";
import { ICart } from "@/types/cart";
import { IColor, IProduct, ISize } from "@/types/product";
import { MinusIcon, PlusIcon, ShoppingBag, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import CarConflictVendorWarning from "../shared/CarConflictVendorWarning";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ProductOrderActions = ({ product }: { product: IProduct }) => {
  const [isConflict, setIsConflict] = useState(false);
  const { items } = useAppSelector((state) => state.cart);

  const [selectedColor, setSelectedColor] = useState<IColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ISize>(
    product.colors[0]?.sizes[0]
  );

  const router = useRouter();

  const dispatch = useDispatch();

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const handleQuantityChange = (value: number) => {
    setSelectedQuantity(
      Math.max(1, Math.min(value, selectedSize?.quantity || 0))
    );
  };

  const handleColorChange = (color: IColor) => {
    setSelectedColor(color);

    // check is selected quatity is greater than available quatity
    if (selectedQuantity > color.sizes[0].quantity) {
      // to automaticaly select the first size with available quatity
      for (const size of color.sizes) {
        if (size.quantity) {
          //   change the selected size only when the previous quantity was > 1
          selectedQuantity > 0 && selectedQuantity < size.quantity
            ? ""
            : setSelectedQuantity(size.quantity);
          setSelectedSize(size);
          break;
        }
      }
    } else {
      setSelectedSize(color.sizes[0]);
    }
  };

  const handleChangeSize = (size: ISize) => {
    setSelectedSize(size);

    // check is selected quatity is greater than available quatity
    if (selectedQuantity > size.quantity) {
      setSelectedQuantity(size.quantity);
    }
  };

  const handleAddToCart = (replace?: boolean) => {
    const isSameShop = items.find((item) => item.shopId === product.shopId);
    if (!isSameShop && !replace && items.length > 0) {
      setIsConflict(true);
      return;
    }

    const item: Omit<ICart, "cartId"> = {
      productId: product.id,
      price: product.price,
      quantity: selectedQuantity,
      colorId: selectedColor.id,
      sizeId: selectedSize.id,
      colorName: selectedColor.color,
      isOutOfStock: false,
      shopId: product.shopId,
      shopName: product.shopInfo.name,
      sizeName: selectedSize.size,
      discount: product.discount,
      image: product.images[0],
      name: product.name,
    };

    if (selectedQuantity > selectedSize.quantity) {
      return toast.message("Please wait, the stock will recover soon 😄", {
        description: "You can explore more products",
      });
    }

    toast.success("Product added to cart successfully 👍");

    dispatch(addToCart({ payload: item, replace: Boolean(replace) }));
  };

  const handleProccedToCheckout = () => {
    const item = {
      productId: product.id,
      price: product.price,
      quantity: selectedQuantity,
      colorId: selectedColor.id,
      sizeId: selectedSize.id,
      colorName: selectedColor.color,
      isOutOfStock: false,
      shopId: product.shopId,
      shopName: product.shopInfo.name,
      sizeName: selectedSize.size,
      discount: product.discount,
      image: product.images[0],
      name: product.name,
    };

    dispatch(addItemsToCheckout([item]));

    router.push("/checkout");
  };

  return (
    <>
      <div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Color</h3>
          <div className="flex items-center justify-start gap-[20px]">
            {product.colors?.map((color) => (
              <div
                key={color.color}
                className={`cursor-pointer center flex-col p-[8px] rounded-[3px] border-[1px] ${
                  selectedColor?.color === color.color
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => handleColorChange(color)}
              >
                <button
                  className={`w-8 h-8 rounded-full`}
                  style={{ backgroundColor: color.color.toLowerCase() }}
                />

                <p className="uppercase">{color.color}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Available Sizes</h3>
          {selectedColor?.sizes.map((size) => {
            const isStockout = size.quantity === 0;
            return (
              <button
                key={size.size}
                disabled={isStockout}
                onClick={() => handleChangeSize(size)}
                className={`${
                  selectedSize?.size === size.size
                    ? "bg-main/90 text-white border-transparent"
                    : "bg-transparent text-main border-main"
                }  p-2 rounded-md mr-2 mb-2 disabled:bg-red-500 disabled:opacity-[0.5] border-[1px]`}
              >
                Size: {size.size}
                {isStockout && <span className="ml-2">stock out</span>}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-start gap-[10px]">
          <h3 className="font-semibold">Avaiable in stock</h3>
          <p>{selectedSize?.quantity}</p>
        </div>
        <div className="flex flex-col mt-2">
          <h3 className="font-semibold mb-2">Quantity</h3>

          <div className="flex items-center justify-start">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(selectedQuantity - 1)}
              aria-label="Decrease quantity"
              className="bg-main text-white"
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={selectedQuantity}
              defaultValue={1}
              onChange={(e) =>
                handleQuantityChange(parseInt(e.target.value, 10))
              }
              className="w-16 mx-2 text-center"
              aria-label="Quantity"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(selectedQuantity + 1)}
              aria-label="Increase quantity"
              className="bg-main text-white"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="center gap-[20px]">
          <Button
            className="w-full mt-8 mb-4 disabled:opacity-[0.3] disabled:cursor-not-allowed center gap-[10px] bg-main"
            onClick={handleProccedToCheckout}
            disabled={
              !selectedSize ||
              selectedSize?.quantity === 0 ||
              selectedQuantity === 0
            }
          >
            <ShoppingBag width={20} /> Buy Now
          </Button>
          <Button
            onClick={() => handleAddToCart()}
            variant={"outline"}
            className="w-full mt-8 mb-4 disabled:opacity-[0.3] disabled:cursor-not-allowed center gap-[10px]"
            disabled={
              !selectedSize ||
              selectedSize?.quantity === 0 ||
              selectedQuantity === 0
            }
          >
            <ShoppingCart width={20} /> Add to Cart
          </Button>
        </div>
      </div>

      <CarConflictVendorWarning
        isOpen={isConflict}
        setIsOpen={setIsConflict}
        onReplace={() => handleAddToCart(true)}
        newVendor={product.shopInfo?.name}
        currentVendor={items[0]?.shopName || ""}
      />
    </>
  );
};

export default ProductOrderActions;
