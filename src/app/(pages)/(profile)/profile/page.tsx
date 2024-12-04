"use client";
import { useAppSelector } from "@/redux/hook";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaPen } from "react-icons/fa";

const Profile = () => {
  const { isLoading, user } = useAppSelector((state) => state.auth);

  return (
    <div className="w-full rounded-[10px] px-[25px] py-[20px]">
      <div className="flex items-start justify-start gap-[20px]">
        <Link
          href={"/profile/settings"}
          className="w-[120px] h-[120px] rounded-full overflow-hidden bg-red-100 relative group/profile"
        >
          <Image
            src={user?.image || "/images/avatar.jpg"}
            width={120}
            height={120}
            alt="avatar"
            className=" w-full h-full object-cover"
          />

          <span className="absolute top-0 left-0 bg-[#2727272f] w-full h-full scale-0 group-hover/profile:scale-[1] duration-75 rounded-full cursor-pointer center text-white">
            <FaPen />
          </span>
        </Link>

        <div>
          <h2 className="text-[30px] font-[700]">Hello,</h2>
          <h3 className="text-[20px] font-[600]">
            {user?.first_name} {user?.last_name}
          </h3>
        </div>
      </div>
      <p className="text-primaryTxt mt-[20px]">
        <span className="font-[600]">Email: </span> {user?.email}
      </p>
      <p className="text-primaryTxt mt-[8px]">
        <span className="font-[600]">user since: </span>{" "}
        {format(new Date(user?.createdAt || "12-30-2024"), "MMM dd, yyy")}
      </p>
    </div>
  );
};

export default Profile;
