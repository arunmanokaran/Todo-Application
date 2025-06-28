import { useForm, type SubmitHandler } from "react-hook-form";
import { type UserDetailsType } from "../Utilis/User.ts";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../Utilis/AuthProvider.ts";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserDetailsType>();

  const [adminDetails, setAdminDetails] = useState<UserDetailsType>();
  const [userLoginDetails, setUserLoginDetails] = useState<UserDetailsType[]>(
    []
  );

  useEffect(() => {
    const storedAdminDetails = localStorage.getItem("adminDetails");
    if (storedAdminDetails) {
      setAdminDetails(JSON.parse(storedAdminDetails));
    }
    const storedUserDetails = localStorage.getItem("userLoginDetails");
    if (storedUserDetails) {
      setUserLoginDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  const validateAdminDetails = (data: UserDetailsType) => {
    return (
      data.userId === adminDetails!.userId &&
      data.password === adminDetails!.password
    );
  };
  const validateUserDetails = (data: UserDetailsType) => {
    return userLoginDetails!.filter(
      (user: UserDetailsType) =>
        user.userId === data.userId && user.password === data.password
    );
  };

  const onSubmit: SubmitHandler<UserDetailsType> = (data) => {
    const isAdmin = validateAdminDetails(data);
    const isUser = validateUserDetails(data);

    if (isAdmin) {
      login();
      navigate("/adminpage", { replace: true });
    } else if (isUser) {
      login();
      navigate(`/todo/${data.userId}`, {
        state: { userId: data.userId },
      });
    } else {
      alert("Invalid User ID or Password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black-900">
      <form
        className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6">
          <label htmlFor="userID" className="block mb-2 font-semibold">
            User ID
          </label>
          <input
            className="border-2 rounded-xl w-full p-3"
            {...register("userId", {
              required: "UserID required",
            })}
            type="text"
            id="userID"
            placeholder="Enter your user ID"
          />
          <div className="text-red-700">
            {errors.userId ? errors.userId.message : true}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-semibold">
            Password
          </label>
          <input
            className="border-2 rounded-xl w-full p-3"
            {...register("password", {
              required: "Password required",
            })}
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          <div className="text-red-700">
            {errors.password ? errors.password.message : true}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <p>
            Didn't have an account?
            <Link to="/signup" className="text-blue-600 hover:underline ml-1">
              Sign Up
            </Link>
          </p>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
