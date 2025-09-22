import { FaRegEnvelope } from 'react-icons/fa6';
import { FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router';
import { loginUserSchema, type LoginUser } from '../../schema/auth.schema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import api from '../../config/axios';
import type { AuthResponse } from '../../types';
import useAuthStore from '../../store/useAuthStore';
import type { AxiosError } from 'axios';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit: SubmitHandler<LoginUser> = async (data) => {
    const toastId = toast.loading('Logging in...');
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email: data.email,
        password: data.password,
      });
      const { token, user } = response.data;
      setAuth(token, user);
      toast.success(`Welcome back, ${user.name}!`, { id: toastId });
      navigate('/');
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error('Login error:', axiosError.response?.data || axiosError.message);
      const message = axiosError.response?.status === 401
        ? 'Invalid email or password'
        : axiosError.response?.status === 400
        ? 'Invalid input. Check your details.'
        : 'Login failed. Try again later.';
      toast.error(message, { id: toastId });
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

        <div>
          <label htmlFor="email" className="block font-medium">
            Email address
          </label>
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
          <span className="input-wrapper">
            <FaRegEnvelope size={20} />
            <input
              {...register('email')}
              placeholder="Enter your email"
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
              {...register('password')}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full focus:outline-none"
            />
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" id="rememberMe" />
            Remember Me
          </label>
          <a href="#" className="text-[var(--background)] hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isSubmitting} // Fixed: Disable button
          className="btn-primary py-2 rounded-md w-full"
        >
          {isSubmitting ? 'Logging In...' : 'Sign In'}
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{' '}
          <Link to="/register" className="text-[var(--background)] hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;