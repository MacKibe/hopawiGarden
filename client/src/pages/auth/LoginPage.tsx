import { FaRegEnvelope } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { loginUserSchema, type LoginUser } from "../../schema/auth.schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "../../store/useAuthStore";
import { mockUserData } from "../../data/mockUserData";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit: SubmitHandler<LoginUser> = (data) => {
    const foundUser = mockUserData.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (foundUser) {
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(foundUser));

      // Update global auth state
      login(foundUser);

      // Redirect to homepage or dashboard
      navigate("/");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="py-8 px-4 max-w-md w-full mx-auto text-center">
      <h3 className="text-2xl font-bold mb-2">Welcome back</h3>
      <p className="text-gray-700 mb-6">Sign in to your account</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 border rounded-md bg-[var(--secondary)] shadow space-y-6 text-left"
      >
        <header>
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm mt-1 text-gray-600">
            Enter your email and password to access your account
          </p>
        </header>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block font-medium">
            Email address
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <span className="input-wrapper">
            <FaRegEnvelope size={20} />
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="w-full focus:outline-none"
            />
          </span>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <span className="input-wrapper">
            <FiLock size={20} />
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full focus:outline-none"
            />
          </span>
        </div>

        {/* Remember Me + Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" id="rememberMe" />
            Remember Me
          </label>
          <a href="#" className="text-[var(--background)] hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-primary py-2 rounded-md w-full">
          Sign In
        </button>

        {/* Link to Register */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[var(--background)] hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
