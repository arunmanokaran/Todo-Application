import { useForm, type SubmitHandler } from "react-hook-form";
import { type UserDetailsType } from "../Utilis/User.ts";
import userLoginDetails from "../Utilis/User.ts";
import { Link } from "react-router-dom";
import Admin from "../Utilis/Admin.ts";
import { useNavigate } from "react-router-dom";
import { saveUserDetails } from "../Utilis/User.ts";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserDetailsType>();

  const onSubmit: SubmitHandler<UserDetailsType> = (data) => {
    // Check if the user already exists
    const userExists = userLoginDetails.some(
      (user) =>
        user.userId === data.userId ||
        user.email === data.email ||
        data.userId === Admin.adminDetails.userId ||
        data.email === Admin.adminDetails.email
    );

    if (userExists) {
      alert("User ID or Email already exists. Please choose another.");
      return;
    }

    // Add the new user to the userLoginDetails array
    userLoginDetails.push(data);
    saveUserDetails();


    alert("Sign Up Successful!");
    navigate("/", { replace: true });
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
              required: "User ID is required",
            })}
            type="text"
            id="userID"
            placeholder="User ID"
          />
          <div className="text-red-700">
            {errors.userId ? errors.userId.message : true}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="firstName" className="block mb-2 font-semibold">
            First Name
          </label>
          <input
            className="border-2 rounded-xl w-full p-3"
            {...register("firstName", {
              required: "First Name is required",
            })}
            type="text"
            id="firstName"
            placeholder="First Name"
          />
          <div className="text-red-700">
            {errors.firstName ? errors.firstName.message : true}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="lastName" className="block mb-2 font-semibold">
            Last Name
          </label>
          <input
            className="border-2 rounded-xl w-full p-3"
            {...register("lastName", {
              required: "Last Name is required",
            })}
            type="text"
            id="lastName"
            placeholder="Last Name"
          />
          <div className="text-red-700">
            {errors.lastName ? errors.lastName.message : true}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            className="border-2 rounded-xl w-full p-3"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            type="email"
            id="email"
            placeholder="Email"
          />
          <div className="text-red-700">
            {errors.email ? errors.email.message : true}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-semibold">
            Password
          </label>
          <input
            className="border-2 rounded-xl w-full p-3"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              maxLength: {
                value: 20,
                message: "Password must not exceed 20 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, and one number",
              },
            })}
            type="password"
            id="password"
            placeholder="Password"
          />
          <div className="text-red-700">
            {errors.password ? errors.password.message : true}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <p>
            Already having an account?
            <Link to="/" className="text-blue-600 hover:underline ml-1">
              Login
            </Link>
          </p>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
