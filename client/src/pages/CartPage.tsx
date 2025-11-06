import { Link, useNavigate } from 'react-router';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/useCartStore'; // Change this import
import type { CartItem } from '../types';

const CartPage = () => {
  const navigate = useNavigate();
  const { items: cartItems, updateQuantity, removeItem } = useCartStore(); // Use Zustand

  const totalItems = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
  const shippingCost = 300;
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="container-responsive py-responsive text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start adding some beautiful plants to your cart!</p>
          <Link 
            to="/shop"
            className="btn-base btn-primary touch-target"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive py-responsive">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
      
      <div className="sidebar-layout">
        {/* Cart Items - Left Section */}
        <div className="sidebar-main">
          <div className="card-base">
            <div className="p-4 md:p-6 border-b">
              <h3 className="text-xl font-semibold">
                Your Items ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </h3>
            </div>
            
            <div className="divide-y">
              {cartItems.map((item: CartItem) => (
                <motion.div 
                  key={item.product_id}
                  className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* Product Image */}
                  <div 
                    className="w-80 h-64 mx-auto sm:w-20 sm:h-20 bg-cover bg-center rounded-lg flex-shrink-0"
                    style={{ backgroundImage: `url(${item.path})` }}
                  />
                  
                  {/* Product Details */}
                  <div className="flex flex-grow min-w-0">
                    <div>
                      <h4 className="font-semibold text-lg truncate">{item.name}</h4>
                      <p className="text-gray-600">Kshs {item.price.toLocaleString()}</p> 
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="touch-target w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                      >
                        <FaMinus size={12} />
                      </button>
                      
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="touch-target w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Price and Remove */}
                  <div className="text-right self-stretch sm:self-auto flex sm:block justify-between items-center w-full sm:w-auto">
                    <p className="font-semibold text-lg">
                      Kshs {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="text-red-500 hover:text-red-700 mt-2 flex items-center space-x-1 text-sm touch-target"
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
              className="text-[var(--background)] hover:underline flex items-center space-x-2 touch-target"
            >
              <span>← Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary - Right Section */}
        <div className="sidebar-aside">
          <div className="bg-[var(--secondary)] p-4 md:p-6 rounded-lg sticky top-24">
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
              className="btn-base btn-primary touch-target w-full"
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