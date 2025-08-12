import { useState } from 'react';
import { Link } from "react-router";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from '../../store/useAuthStore';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuthStore(); 

    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([
        // Sample cart items - in a real app these would come from state management
        { id: 1, name: 'Monstera Deliciosa', price: 3500, quantity: 1, image: '/plant1.jpg' },
        { id: 2, name: 'Snake Plant', price: 2500, quantity: 2, image: '/plant2.jpg' }
    ]);

    const toggleCart = () => setCartOpen(!cartOpen);
    const removeFromCart = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
                {/* Cart Section */}
                <div className="relative flex gap-2 align-middle items-center">
                    {isAuthenticated ? (
                        <>
                        {/* Safe user avatar with fallback */}
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
                        <motion.button className="p-2 rounded-full hover:bg-[var(--secondary)] hover:text-[var(--background)] transition relative"
                                onClick={toggleCart} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <span className="sr-only">Cart</span>
                                <FaShoppingCart size={20}/>
                                {totalItems > 0 && (
                                    <motion.span className="absolute -top-1 -right-1 bg-[var(--accent)] text-[var(--text)] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold" initial={{ scale: 0 }} animate={{ scale: 1 }} key={totalItems}>
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
                    <motion.div className="fixed inset-0 z-50 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}>
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-opacity-50" onClick={toggleCart}/>
                        {/* Cart Content */}
                        <motion.div className="absolute right-0 bottom-0 h-[90dvh] w-full max-w-md bg-[var(--background)] shadow-xl"
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30 }}>
                            <div className="flex flex-col h-full">
                                {/* Cart Header */}
                                <div className="flex items-center justify-between p-4 border-b border-[var(--primary)]">
                                    <h2 className="text-xl font-bold">Your Cart ({totalItems})</h2>
                                    <button onClick={toggleCart} className="p-2 rounded-full hover:bg-[var(--secondary)]">
                                        <FaTimes size={20}/>
                                    </button>
                                </div>
                                {/* Cart Items */}
                                <div className="flex-1 overflow-y-auto p-4">
                                    {cartItems.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p>Your cart is empty</p>
                                            <Link to="/shop" className="inline-block mt-4 text-[var(--accent)] hover:underline" onClick={toggleCart}>
                                                Continue Shopping
                                            </Link>
                                        </div>
                                    ) : (
                                        <ul className="space-y-4">
                                            {cartItems.map(item => (
                                                <motion.li key={item.id} className="flex gap-4 p-2 border-b border-[var(--secondary)]"
                                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                                    layout>
                                                    <div className="w-20 h-20 bg-cover bg-center rounded" style={{ backgroundImage: `url(${item.image})` }} />
                                                    <div className="flex-1">
                                                        <h3 className="font-medium">{item.name}</h3>
                                                        <p className="text-sm">Kshs {item.price.toLocaleString()} × {item.quantity}</p>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <p className="font-bold">Kshs {(item.price * item.quantity).toLocaleString()}</p>
                                                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:underline mt-2">
                                                            Remove
                                                        </button>
                                                    </div>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                {/* Cart Footer */}
                                {cartItems.length > 0 && (
                                    <div className="p-4 border-t border-[var(--primary)]">
                                        <div className="flex justify-between mb-4">
                                            <span>Subtotal:</span>
                                            <span className="font-bold">Kshs {totalPrice.toLocaleString()}</span>
                                        </div>
                                        <Link to="/checkout" className="block w-full bg-[var(--primary)] text-[var(--background)] text-center py-3 rounded-lg hover:bg-opacity-90 transition" onClick={toggleCart}>
                                            Proceed to Checkout
                                        </Link>
                                        <Link to="/shop" className="block text-center mt-2 text-[var(--accent)] hover:underline" onClick={toggleCart}>
                                            Continue Shopping
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header;