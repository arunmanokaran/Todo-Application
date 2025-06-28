import {useState, useEffect} from 'react';
import type { UserDetailsType } from './User';

export const useFetchUser = (userID: string) => {

    const [currentUser, setCurrentUser] = useState<UserDetailsType>();

    useEffect(() => {
    const storedUserDetails = localStorage.getItem("userLoginDetails");
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      const findUser = userDetails.find(
        (user: { userId: string }) => user.userId === userID
      );
      setCurrentUser(findUser);
    }
  }, []);

  return currentUser;

}