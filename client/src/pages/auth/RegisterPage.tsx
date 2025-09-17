import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaRegEnvelope } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router";
import { registerUserSchema, type RegisteredUser } from "../../schema/auth.schema";
import axios from "axios";
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../config/api';
import type { AuthResponse } from "../../types";

const RegisterPage = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisteredUser>({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit: SubmitHandler<RegisteredUser> = async (data) => {
    const toastId = toast.loading('Creating account...');
    try {
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/register`, {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;
      
      console.log('Register success:', { token, user }); 
      
      toast.success(`Welcome, ${user.firstName}!`, { id: toastId });
      
      navigate('/login'); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Register error:', error.response?.data || error.message);

        const message = error.response?.status === 409
          ? 'Email already registered'
          : error.response?.status === 400
          ? 'Invalid input. Check your details.'
          : 'Registration failed. Try again later.';

        toast.error(message, { id: toastId });
      } else {
        console.error('Register error:', error);
        toast.error('Registration failed. Try again later.', { id: toastId });
      }
    }
  };

  return (
    <div className="py-8 px-4 max-w-xl w-full mx-auto text-center">
      <h3 className="text-2xl font-bold mb-2">Create your account</h3>
      <p className="text-gray-700 mb-6">Join our gardening community today</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 border rounded-md bg-[var(--secondary)] shadow space-y-6 text-left"
      >
        <header>
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm mt-1 text-gray-600">
            Create your account to start your gardening journey
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full">
            <label htmlFor="firstName" className="block font-medium">
              First Name
            </label>
            <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
            <span className="input-wrapper">
              <RxPerson size={20} />
              <input
                {...register("firstName")}
                placeholder="Michael"
                className="w-full focus:outline-none"
              />
            </span>
          </div>

          <div className="w-full">
            <label htmlFor="lastName" className="block font-medium">
              Last Name
            </label>
            <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
            <span className="input-wrapper">
              <RxPerson size={20} />
              <input
                {...register("lastName")}
                placeholder="Maina"
                className="w-full focus:outline-none"
              />
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block font-medium">
            Email address
          </label>
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
          <span className="input-wrapper">
            <FaRegEnvelope size={20} />
            <input
              {...register("email")}
              placeholder="michael@example.com"
              className="w-full focus:outline-none"
            />
          </span>
        </div>

        <div>
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
          <span className="input-wrapper">
            <FiLock size={20} />
            <input
              {...register("password")}
              type="password"
              placeholder="Create a password"
              className="w-full focus:outline-none"
            />
          </span>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block font-medium">
            Confirm Password
          </label>
          <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
          <span className="input-wrapper">
            <FiLock size={20} />
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm your password"
              className="w-full focus:outline-none"
            />
          </span>
        </div>

        <button type="submit" className="btn-primary py-2 rounded-md w-full">
          Create Account
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--background)] hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
