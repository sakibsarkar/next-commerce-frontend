import { Card, CardContent } from "@/components/ui/card";
import { IShippingAddress } from "@/types/ShippingAdress";
import { MapPin, Phone } from "lucide-react";

interface ShippingAddressCardProps {
  address: IShippingAddress;
  className?: string;
}

const ShippingAddressCard: React.FC<ShippingAddressCardProps> = ({
  address,
  className,
}) => {
  return (
    <Card key={address.id} className={`overflow-hidden ${className}`}>
      <CardContent className="p-3 flex items-center space-x-4">
        <div className="bg-primary/10 rounded-full p-2">
          <MapPin className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{address.city}</p>
          <p className="text-xs text-muted-foreground truncate">
            {address.detailed_address}
          </p>
          <div className="flex items-center mt-1">
            <Phone className="h-3 w-3 text-muted-foreground mr-1" />
            <span className="text-xs text-muted-foreground">
              {address.phone}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingAddressCard;
