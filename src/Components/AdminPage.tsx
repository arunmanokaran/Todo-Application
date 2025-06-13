import { useEffect, useState } from "react";
import { type UserDetailsType } from "../Utilis/User.ts";
import { useAuth } from "../Utilis/AuthProvider.ts";
import { useNavigate } from "react-router-dom";
import { saveUserDetails, hashPassword } from "../Utilis/User.ts";

const AdminPage = () => {
  const [fetchedUser, setFetchedUser] = useState<UserDetailsType[]>();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userLoginDetails");
    if (storedUserDetails) {
      setFetchedUser(JSON.parse(storedUserDetails));
    }
  }, []);

  const handleDelete = (user: UserDetailsType) => {
    const updatedUserList =
      fetchedUser && fetchedUser.filter((u) => u.userId !== user.userId);

    setFetchedUser(updatedUserList);
    saveUserDetails();
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">User Details</h2>
        <table className="min-w-full bg-white border border-none">
          <thead>
            <tr>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Password</th>
            </tr>
          </thead>
          <tbody>
            {fetchedUser?.map((user, index) => (
              <tr className="text-center" key={index}>
                <td className="px-4 py-2">{user.firstName}</td>
                <td className="px-4 py-2">{user.lastName}</td>
                <td className="px-4 py-2">{user.userId}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{hashPassword(user.password)}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminPage;
