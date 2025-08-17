import { motion } from "framer-motion";

const CartItem = ({ item, removeFromCart }) => {
  return (
    <motion.li 
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
  );
};

export default CartItem;
