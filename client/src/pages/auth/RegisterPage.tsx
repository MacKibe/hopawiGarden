import { FaRegEnvelope } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { RxPerson } from "react-icons/rx";
import { Link } from "react-router";
const RegisterPage = () => {
    return(
        <div className="py-6 w-[30vw] mx-auto text-center">
            <h3 className="py-3">Create your account</h3>
            <p>Join our gardening community today</p>
            <form action="post" className="mt-4 p-6 border-1 rounded-md space-y-4 text-left">
                <header>
                    <h3>Sign Up</h3>
                    <p className="mt-2">Create your account to start your gardening journey</p>
                </header>
                <div className="flex gap-5">
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <span className="flex gap-2 items-center border-1 rounded-md p-2 mt-2">
                            <RxPerson size={20}/>
                            <input type="text" name="firstName" id="firstName" placeholder="Michael" className="w-full"/>
                        </span>
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <span className="flex gap-2 items-center border-1 rounded-md p-2 mt-2">
                            <input type="text" name="lastName" id="lastName" placeholder="Maina" className="w-full"/>
                        </span>
                    </div>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <span className="flex gap-2 items-center border-1 rounded-md p-2 mt-2">
                        <FaRegEnvelope size={20}/>
                        <input type="text" name="email" id="email" placeholder="michael@example.com" className="w-full"/>
                    </span>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <span className="flex gap-2 items-center border-1 rounded-md p-2 mt-2">
                        <FiLock  size={20}/>
                        <input type="password" name="password" id="password" placeholder="Create a password" className="w-full"/>
                    </span>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <span className="flex gap-2 items-center border-1 rounded-md p-2 mt-2">
                        <FiLock  size={20}/>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" className="w-full"/>
                    </span>
                </div>
                <div className="flex flex-col w-full space-y-4">
                    <span className="flex items-center gap-2">
                        <input type="checkbox" name="termAndPolicy" id="termAndPolicy" />
                        <label htmlFor="termAndPolicy">I agree to the Terms of Service and Privacy Policy</label>
                    </span>
                    <button type="submit" className="btn-primary py-2 rounded-md">Create Account</button>
                    <span className="text-center">
                        Already have an account? <Link to="/login" className="text-[var(--background)]">Sign In</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage