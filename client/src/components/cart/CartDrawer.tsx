import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router"; 

const CartDrawer = ({ toggleCart, cartItems, setCartItems }) => {
    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <motion.div 
            className="fixed inset-0 z-50 overflow-hidden" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
        >            
            {/* Cart Content */}
            <motion.div 
                className="absolute right-0 bottom-0 h-[90dvh] w-full max-w-md bg-[var(--secondary)] opacity-80 shadow-xl"
                initial={{ x: '100%' }} 
                animate={{ x: 0 }} 
                exit={{ x: '100%' }} 
                transition={{ type: 'spring', damping: 30 }}
            >
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
                                    <motion.li 
                                        key={item.id} 
                                        className="flex gap-4 p-2 border-b border-[var(--secondary)]"
                                        initial={{ opacity: 0, x: 20 }} 
                                        animate={{ opacity: 1, x: 0 }} 
                                        exit={{ opacity: 0, x: 20 }}
                                        layout
                                    >
                                        <div 
                                            className="w-20 h-20 bg-cover bg-center rounded" 
                                            style={{ backgroundImage: `url(${item.image})` }} 
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm">Kshs {item.price.toLocaleString()} × {item.quantity}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="font-bold">Kshs {(item.price * item.quantity).toLocaleString()}</p>
                                            <button 
                                                onClick={() => removeFromCart(item.id)} 
                                                className="text-xs text-red-500 hover:underline mt-2"
                                            >
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
                            <Link 
                                to="/checkout" 
                                className="block w-full bg-[var(--primary)] text-[var(--background)] text-center py-3 rounded-lg hover:bg-opacity-90 transition" 
                                onClick={toggleCart}
                            >
                                Proceed to Checkout
                            </Link>
                            <Link 
                                to="/shop" 
                                className="block text-center mt-2 text-[var(--accent)] hover:underline" 
                                onClick={toggleCart}
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default CartDrawer;
