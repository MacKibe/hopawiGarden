import { Link } from "react-router"
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
    return(
        <header className="sticky top-0 z-50 flex items-center justify-around p-4 bg-[var(--background)] text-[var(--primary)] shadow-md">
            <div className="">
                <p className="text-2xl font-bold">HOPAWI GARDENS</p>
            </div>
            <nav>
                <ul className="flex gap-6">
                    <li>
                        <Link to="/" className="hover:text-[var(--accent)] transition">Home</Link>
                    </li>
                    <li>
                        <Link to='/about' className="hover:text-[var(--accent)] transition">About Us</Link>
                    </li>
                    <li>
                        <Link to='/contact' className="hover:text-[var(--accent)] transition">Contact</Link>
                    </li>
                    <li>
                        <Link to='/shop' className="hover:text-[var(--accent)] transition">Shop</Link>
                    </li>
                </ul>
            </nav>
            <div className="relative">
                <button className="p-2 rounded-full hover:bg-[var(--secondary)] hover:text-[var(--background)] transition">
                    <span className="sr-only">Cart</span>
                    <FaShoppingCart size={20}/>
                    <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-[var(--text)] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">0</span>
                </button>
            </div>
        </header>
    )
}

export default Header