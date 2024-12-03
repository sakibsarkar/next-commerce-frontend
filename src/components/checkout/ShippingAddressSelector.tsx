import { useGetUserShippingAddressesQuery } from "@/redux/features/address/address.api";
import React from "react";
import ShippingAddressCard from "../card/ShippingAddressCard";
import AddShippingAddress from "../ShippingAddress/AddShippingAddress";
import ShippingAddressCardSkeleton from "../skeleton/ShippingAddressCardSkeleton ";

interface IProps {
  onChange: (id: string) => void;
}

const ShippingAddressSelector: React.FC<IProps> = ({ onChange }) => {
  const { data, isLoading } = useGetUserShippingAddressesQuery(undefined);
  const [selectedAddress, setSelectedAddress] = React.useState<string | null>(
    null
  );

  return (
    <div className="flex flex-col gap-[10px] w-full">
      <h4 className="text-[20px] font-[700] text-mainTxt">Shipping Address</h4>

      <div className="w-full flex flex-col gap-[15px]">
        {isLoading ? (
          <>
            <ShippingAddressCardSkeleton />
            <ShippingAddressCardSkeleton />
          </>
        ) : data?.data && data?.data?.length > 0 ? (
          <div className="flex flex-col items-end gap-[5px]">
            {data?.data.map((address) => (
              <div
                key={address.id}
                onClick={() => {
                  setSelectedAddress(address.id);
                  onChange(address.id);
                }}
                className={`w-full border-[1px] rounded-[10px] cursor-pointer ${
                  selectedAddress === address.id
                    ? "border-main"
                    : "border-transparent"
                }`}
              >
                <ShippingAddressCard address={address} className="w-full" />
              </div>
            ))}
            <AddShippingAddress>
              <button className="underline text-[14px] text-main font-[700]">
                Add New Address
              </button>
            </AddShippingAddress>
          </div>
        ) : (
          <AddShippingAddress />
        )}
      </div>
    </div>
  );
};

export default ShippingAddressSelector;
