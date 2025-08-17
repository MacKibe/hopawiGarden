import { Link } from "react-router";

const CartSummary = ({ toggleCart, totalPrice }) => {
  return (
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
  );
};

export default CartSummary;
