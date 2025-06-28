import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { UserDetailsType } from "../Utilis/User.ts";
import { useAuth } from "../Utilis/AuthProvider.ts";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "../Utilis/User.ts";

const UserPage = () => {
  const {state} = useLocation();
  console.log(state);
  const [currentUser, setCurrentUser] = useState<UserDetailsType>();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userLoginDetails");
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      const findUser = userDetails.find(
        (user: { userId: string }) => user.userId === state.state?.userId
      );
      setCurrentUser(findUser);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              handleBack();
            }}
          >
            Back
          </button>
          <button
            className="bg-blue-600 text-white mx-2 px-4 py-2 rounded"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <p className="text-md mt-2">
        Here you can view your profile and manage your account.
      </p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <table className="min-w-full mt-4">
          <tbody>
            <tr>
              <td className="px-4 py-2">UserID</td>
              <td className="px-4 py-2">{currentUser?.userId}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">First Name</td>
              <td className="px-4 py-2">{currentUser?.firstName}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Last Name</td>
              <td className="px-4 py-2">{currentUser?.lastName}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Email</td>
              <td className="px-4 py-2">{currentUser?.email}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Password</td>
              <td className="px-4 py-2">
                {hashPassword(currentUser?.password ?? "")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserPage;
