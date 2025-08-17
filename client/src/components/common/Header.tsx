import { useState } from 'react';
import { Link } from "react-router"; 
import { FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from '../../store/useAuthStore';
import CartDrawer from '../cart/CartDrawer';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuthStore(); 

    const [cartOpen, setCartOpen] = useState(false);

    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Monstera Deliciosa', price: 3500, quantity: 1, image: '/plant1.jpg' },
        { id: 2, name: 'Snake Plant', price: 2500, quantity: 2, image: '/plant2.jpg' }
    ]);

    const toggleCart = () => setCartOpen(!cartOpen);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <header className="sticky top-0 z-50 flex items-center justify-center gap-70 p-4 bg-[var(--background)] text-[var(--primary)] shadow-md">
                {/* Logo Section */}
                <div>
                    <Link to="/" className="text-2xl font-bold hover:text-[var(--accent)] transition">HOPAWI GARDENS</Link>
                </div>
                
                {/* Navigation Bar */}
                <nav>
                    <ul className="flex gap-6">
                        {[
                            { path: "/", label: "Home" },
                            { path: "/about", label: "About Us" },
                            { path: "/contact", label: "Contact" },
                            { path: "/shop", label: "Shop" }
                        ].map((item, index) => (
                            <motion.li key={index} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                                <Link to={item.path} className="hover:text-[var(--accent)] transition">
                                    {item.label}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </nav>

                {/* User + Cart Section */}
                <div className="relative flex gap-4 items-center">
                    {isAuthenticated ? (
                        <>
                            {/* User Avatar */}
                            <Link to="/profile" className="h-10 w-10 flex items-center justify-center bg-[var(--primary)] text-[var(--background)] rounded-full">
                                {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
                            </Link>
                            
                            {/* Logout button */}
                            <button 
                                onClick={logout}
                                className="text-sm hover:text-[var(--accent)] transition"
                            >
                                Logout
                            </button>

                            {/* Cart Button */}
                            <motion.button 
                                className="p-2 rounded-full hover:bg-[var(--secondary)] hover:text-[var(--background)] transition relative"
                                onClick={toggleCart} 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.9 }}
                            >
                                <span className="sr-only">Cart</span>
                                <FaShoppingCart size={20}/>
                                {totalItems > 0 && (
                                    <motion.span 
                                        className="absolute -top-1 -right-1 bg-[var(--accent)] text-[var(--text)] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold" 
                                        initial={{ scale: 0 }} 
                                        animate={{ scale: 1 }} 
                                        key={totalItems}
                                    >
                                        {totalItems}
                                    </motion.span>
                                )}
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className='btn'>Log In</Link>
                            <Link to="/register" className='btn btn-accent'>Register</Link>
                        </>
                    )}
                </div>
            </header>

            {/* Cart Drawer */}
            <AnimatePresence>
                {cartOpen && (
                    <CartDrawer 
                        toggleCart={toggleCart} 
                        cartItems={cartItems} 
                        setCartItems={setCartItems} 
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default Header;
