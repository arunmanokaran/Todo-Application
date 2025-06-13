import { type UserDetailsType } from "./User.ts";

const adminDetails: Readonly<UserDetailsType> = {
  firstName: "Arun",
  lastName: "Mano",
  userId: "arunmano",
  email: "admin@gmail.com",
  password: "123456789"
};

const SaveAdminDetails = () => {
  localStorage.setItem("adminDetails", JSON.stringify(adminDetails));
};

export default { adminDetails, SaveAdminDetails };
