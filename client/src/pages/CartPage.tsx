import { Link, useNavigate } from 'react-router';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
  const shippingCost = 300; // Fixed shipping cost
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start adding some beautiful plants to your cart!</p>
          <Link 
            to="/shop"
            className="bg-[var(--background)] text-[var(--primary)] px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[70%] mx-auto my-8">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - Left Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold">
                Your Items ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </h3>
            </div>
            
            <div className="divide-y">
              {cartItems.map((item: CartItem) => (
                <motion.div 
                  key={item.id}
                  className="p-6 flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* Product Image */}
                  <div 
                    className="w-20 h-20 bg-cover bg-center rounded-lg flex-shrink-0"
                    style={{ backgroundImage: `url(${item.path})` }}
                  />
                  
                  {/* Product Details */}
                  <div className="flex-grow">
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <p className="text-gray-600">Kshs {item.price.toLocaleString()}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                      >
                        <FaMinus size={12} />
                      </button>
                      
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Price and Remove */}
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      Kshs {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 mt-2 flex items-center space-x-1 text-sm"
                    >
                      <FaTrash size={14} />
                      <span>Remove</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Continue Shopping */}
          <div className="mt-6">
            <Link 
              to="/shop"
              className="text-[var(--background)] hover:underline flex items-center space-x-2"
            >
              <span>← Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary - Right Section */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--secondary)] p-6 rounded-lg sticky">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            
            {/* Order Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>Kshs {subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Kshs {shippingCost.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery via M-Pesa upon delivery</span>
                <span></span>
              </div>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>Kshs {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-[var(--background)] text-[var(--primary)] py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Proceed to Checkout
            </button>

            {/* Security Notice */}
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>🔒 Secure checkout with M-Pesa payment upon delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;