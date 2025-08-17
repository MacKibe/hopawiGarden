import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import CartSummary from "./CartSummary";
import CartItemList from "./CartItemList";

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
        className="absolute right-0 bottom-0 h-[90dvh] w-full max-w-md bg-[var(--background)] shadow-xl"
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
            <CartItemList 
              cartItems={cartItems} 
              removeFromCart={removeFromCart} 
              toggleCart={toggleCart} 
            />
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <CartSummary toggleCart={toggleCart} totalPrice={totalPrice}/>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CartDrawer;
