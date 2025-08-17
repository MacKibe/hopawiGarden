import { Link } from "react-router";
import CartItem from "./CartItem";

const CartItemList = ({ cartItems, removeFromCart, toggleCart }) => {
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Your cart is empty</p>
        <Link 
          to="/shop" 
          className="inline-block mt-4 text-[var(--accent)] hover:underline" 
          onClick={toggleCart}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {cartItems.map(item => (
        <CartItem key={item.id} item={item} removeFromCart={removeFromCart}/>
      ))}
    </ul>
  );
};

export default CartItemList;
