import { Mail, Phone } from "lucide-react";
import Link from "next/link";

const HeaderTop = () => {
  return (
    <div className="border-b-[1px] border-input hidden md:block">
      <div className="w-full layout_container  py-[12px] flex items-center justify-between gap-[15px] flex-wrap">
        <div className="flex items-center justify-start gap-[12px]">
          <Link
            href={"tel:+8801706044051"}
            className="w-fit center gap-[5px] font-[500] text-[13px] hover:underline"
          >
            <Phone width={15} />
            +8801706044051
          </Link>
          <Link
            href={"mailto:feroxshopbd@gmail.com"}
            className="w-fit center gap-[5px] font-[500] text-[13px] hover:underline"
          >
            <Mail width={15} />
            feroxshopbd@gmail.com
          </Link>
        </div>
        {/* <SocialBox /> */}
      </div>
    </div>
  );
};

export default HeaderTop;
