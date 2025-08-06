import { FaRegEnvelope } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router";
const LoginPage = () => {
    return(
        <div className="py-6 w-[30vw] mx-auto text-center">
            <h3 className="py-3">Welcome back</h3>
            <p>Sign in to your account</p>
            <form action="post" className="mt-4 p-6 border-1 rounded-md space-y-4 text-left">
                <header>
                    <h3>Sign In</h3>
                    <p className="mt-2">Enter your email and password to access your account</p>
                </header>
                <div>
                    <label htmlFor="email">Email address</label>
                    <span className="flex gap-2 items-center border-1 rounded-md p-2 mt-2">
                        <FaRegEnvelope size={20}/>
                        <input type="text" name="email" id="email" placeholder="Enter your email" className="w-full"/>
                    </span>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <span className="flex gap-2 items-center border-1 rounded-md p-2 mt-2">
                        <FiLock  size={20}/>
                        <input type="password" name="password" id="password" placeholder="Enter your password" className="w-full"/>
                    </span>
                </div>
                <div className="flex flex-col w-full space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <input type="checkbox" name="rememberMe" id="rememberMe" />
                            <label htmlFor="rememberMe">Remember Me</label>
                        </span>
                        <a href="http://" className="text-[var(--background)]">Forgot your password</a>
                    </div>
                    <button type="submit" className="btn-primary py-2 rounded-md">Sign In</button>
                    <span className="text-center">
                        Don't have an account? <Link to="/register" className="text-[var(--background)]">Sign up</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default LoginPage