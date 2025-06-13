export type UserDetailsType = {
  firstName: string;
  lastName: string;
  userId: string;
  email: string;
  password: string;
}


const userLoginDetails: UserDetailsType[] = [];

export function saveUserDetails () {
  localStorage.setItem("userLoginDetails", JSON.stringify(userLoginDetails))
}

export const hashPassword = (password: string) => password.replace(/./g, "*");

export default  userLoginDetails ;
