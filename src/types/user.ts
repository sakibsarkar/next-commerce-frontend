export type TRole = "ADMIN" | "CUSTOMER" | "VENDOR";

export type TUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: TRole;
  isDeleted: boolean;
  isSuspended: boolean;
  createdAt: string;
  image?: string;
  auth?: {
    role: TRole;
    _id: string;
  };
};
