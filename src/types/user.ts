export type TRole = "ADMIN" | "CUSTOMER" | "VENDOR";

export type TUser = {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: TRole;
  createdAt: string;
  image?: string;
  auth?: {
    role: TRole;
    _id: string;
  };
};
