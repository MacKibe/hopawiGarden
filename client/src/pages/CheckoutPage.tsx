import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '../context/CartContext';
import useAuthStore from '../store/useAuthStore';
import { toast } from 'react-hot-toast';
import type { CartItem } from '../types';

const checkoutSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^\+?[\d\s-]+$/, 'Invalid phone number'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(3, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  deliveryInstructions: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
  const { user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: 'Kenya',
    },
  });

  const totalPrice = cartItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
  const shippingCost = 300;
  const totalAmount = totalPrice + shippingCost;

  const onSubmit = async (data: CheckoutFormData) => {
    if (!user) {
      toast.error('Please log in to complete your order');
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        userId: user.id,
        userEmail: user.email,
        items: cartItems,
        customerInfo: {
          ...data,
          email: user.email, // Use logged-in user's email
        },
        total: totalAmount,
        shippingCost,
        status: 'pending', // Not paid yet - will be paid via M-Pesa on delivery
        paid: false,
        createdAt: new Date().toISOString(),
      };

      // Store order in localStorage (for now - will be replaced with API call)
      const existingOrders: typeof order[] = JSON.parse(localStorage.getItem('userOrders') || '[]');
      const userOrders = existingOrders.filter((orderObj) => orderObj.userEmail === user.email);
      
      userOrders.push(order);
      localStorage.setItem('userOrders', JSON.stringify(userOrders));

      // Clear cart
      setCartItems([]);
      
      // Show success message
      toast.success('Order placed successfully! You will pay via M-Pesa upon delivery.');
      navigate('/shop');
      
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-[var(--background)] text-[var(--primary)] px-6 py-2 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[70%] mx-auto my-8">
      <h2 className="text-3xl font-bold mb-8">Checkout.</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="bg-white p-6 col-span-2 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* User Information */}
            <section>
              <h3 className="text-xl font-semibold mb-4">Your Information</h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm">
                  <strong>Logged in as:</strong> {user?.name} ({user?.email})
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <input
                    {...register('firstName')}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background)]"
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <input
                    {...register('lastName')}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background)]"
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background)]"
                  placeholder="0712 345 678"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Address *</label>
                <input
                  {...register('address')}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background)]"
                  placeholder="123 Main Street, Apartment 4B"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    {...register('city')}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background)]"
                    placeholder="Nairobi"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Postal Code *</label>
                  <input
                    {...register('postalCode')}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background)]"
                    placeholder="00100"
                  />
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Country *</label>
                <input
                  {...register('country')}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background)]"
                  placeholder="Kenya"
                />
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Delivery Instructions (Optional)</label>
                <textarea
                  {...register('deliveryInstructions')}
                  rows={3}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background)]"
                  placeholder="e.g., Leave at gate, Call before delivery, etc."
                />
              </div>
            </section>

            {/* Payment Information */}
            <section>
              <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📱</div>
                  <div>
                    <h4 className="font-semibold">M-Pesa Payment on Delivery</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      You will pay via M-Pesa when your order is delivered. 
                      Our delivery agent will provide you with the payment details.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[var(--background)] text-[var(--primary)] py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
            >
              {isProcessing ? 'Placing Order...' : `Place Order - Kshs ${totalAmount.toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-[var(--secondary)] p-6 rounded-lg sticky top-25 h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          
          <div className="space-y-4 mb-6">
            {cartItems.map((item: CartItem) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-12 h-12 bg-cover bg-center rounded"
                    style={{ backgroundImage: `url(${item.path})` }}
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">Kshs {(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Kshs {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Kshs {shippingCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span>Kshs {totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Delivery Notice */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>M-Pesa on Delivery:</strong> Pay when you receive your plants
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;




//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   user_id UUID REFERENCES users(id) ON DELETE SET NULL,
//   user_email VARCHAR(255) NOT NULL,
//   items JSONB NOT NULL,
//   customer_info JSONB NOT NULL,
//   total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
//   shipping_cost DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (shipping_cost >= 0),
//   status VARCHAR(50) NOT NULL DEFAULT 'pending' 
//     CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
//   paid BOOLEAN NOT NULL DEFAULT FALSE,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   updated_at TIMESTAMPTZ DEFAULT NOW()