import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '../context/CartContext';
import useAuthStore from '../store/useAuthStore';
import { toast } from 'react-hot-toast';
import type { CartItem, DeliveryMethod } from '../types';
import DeliveryMethodSelector from '../components/checkout/DeliveryMethodSelector';

// Updated schema with delivery method
const checkoutSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^\+?[\d\s-]+$/, 'Invalid phone number'),
  deliveryMethod: z.enum(['delivery', 'pickup']),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  deliveryInstructions: z.string().optional(),
}).refine((data) => {
  // If delivery method is 'delivery', address fields are required
  if (data.deliveryMethod === 'delivery') {
    return !!data.address && !!data.city && !!data.postalCode && !!data.country;
  }
  return true;
}, {
  message: "Address, city, postal code, and country are required for delivery",
  path: ["address"] // Path to show the error
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
  const { user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryMethod: 'delivery',
      country: 'Kenya',
    },
  });

  // Watch delivery method to conditionally render address fields
  const currentDeliveryMethod = watch('deliveryMethod');

  const totalPrice = cartItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
  const shippingCost = currentDeliveryMethod === 'pickup' ? 0 : 300;
  const totalAmount = totalPrice + shippingCost;

  const handleDeliveryMethodChange = (method: DeliveryMethod) => {
    setDeliveryMethod(method);
    setValue('deliveryMethod', method);
    
    // Reset address fields when switching to pickup
    if (method === 'pickup') {
      setValue('address', '');
      setValue('city', '');
      setValue('postalCode', '');
      setValue('deliveryInstructions', '');
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    if (!user) {
      toast.error('Please log in to complete your order');
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    
    try {
      const order = {
        id: `ORD-${Date.now()}`,
        userId: user.id,
        userEmail: user.email,
        items: cartItems,
        customerInfo: {
          ...data,
          email: user.email,
        },
        deliveryMethod: data.deliveryMethod,
        deliveryAddress: data.deliveryMethod === 'delivery' ? {
          address: data.address!,
          city: data.city!,
          postalCode: data.postalCode!,
          country: data.country!,
          deliveryInstructions: data.deliveryInstructions,
        } : undefined,
        total: totalAmount,
        shippingCost,
        status: 'pending',
        paid: false,
        createdAt: new Date().toISOString(),
      };

      const existingOrders: any[] = JSON.parse(localStorage.getItem('userOrders') || '[]');
      const userOrders = existingOrders.filter((orderObj) => orderObj.userEmail === user.email);
      
      userOrders.push(order);
      localStorage.setItem('userOrders', JSON.stringify(userOrders));

      setCartItems([]);
      
      const successMessage = data.deliveryMethod === 'delivery' 
        ? 'Order placed successfully! You will pay via M-Pesa upon delivery.' 
        : 'Order placed successfully! We will call you when your order is ready for pickup.';
      
      toast.success(successMessage);
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
      <div className="container-responsive py-responsive text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button 
          onClick={() => navigate('/shop')}
          className="btn-base btn-primary touch-target"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container-responsive py-responsive">
      <h2 className="text-3xl font-bold mb-8">Checkout.</h2>
      <div className="sidebar-layout">
        {/* Checkout Form */}
        <div className="sidebar-main">
          <div className="card-base p-4 md:p-6">
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

              {/* Delivery Method Selector */}
              <section>
                <DeliveryMethodSelector
                  selectedMethod={currentDeliveryMethod}
                  onMethodChange={handleDeliveryMethodChange}
                />
                <input type="hidden" {...register('deliveryMethod')} />
              </section>

              {/* Shipping Address - Conditionally Rendered */}
              {currentDeliveryMethod === 'delivery' && (
                <section>
                  <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
                  
                  {errors.address && typeof errors.address.message === 'string' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <p className="text-red-700 text-sm">
                        {errors.address.message}
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Address *</label>
                    <input
                      {...register('address')}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background)]"
                      placeholder="123 Main Street, Apartment 4B"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
              )}

              {/* Payment Information */}
              <section>
                <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📱</div>
                    <div>
                      <h4 className="font-semibold">M-Pesa Payment {currentDeliveryMethod === 'delivery' ? 'on Delivery' : 'at Pickup'}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {currentDeliveryMethod === 'delivery' 
                          ? 'You will pay via M-Pesa when your order is delivered. Our delivery agent will provide you with the payment details.'
                          : 'You will pay via M-Pesa when you collect your order from our store.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <button
                type="submit"
                disabled={isProcessing}
                className="btn-base btn-primary touch-target w-full"
              >
                {isProcessing ? 'Placing Order...' : `Place Order - Kshs ${totalAmount.toLocaleString()}`}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="sidebar-aside">
          <div className="bg-[var(--secondary)] p-4 md:p-6 rounded-lg sticky top-24">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item: CartItem) => (
                <div key={item.product_id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div 
                      className="w-12 h-12 bg-cover bg-center rounded flex-shrink-0"
                      style={{ backgroundImage: `url(${item.path})` }}
                    />
                    <div className="min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold flex-shrink-0 ml-2">Kshs {(item.price * item.quantity).toLocaleString()}</p>
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
                <span>
                  {currentDeliveryMethod === 'pickup' 
                    ? 'FREE' 
                    : `Kshs ${shippingCost.toLocaleString()}`
                  }
                </span>
              </div>
              
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>Kshs {totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Delivery Notice */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>
                  {currentDeliveryMethod === 'delivery' 
                    ? 'M-Pesa on Delivery' 
                    : 'M-Pesa at Pickup'
                  }:
                </strong> 
                {currentDeliveryMethod === 'delivery'
                  ? ' Pay when you receive your plants'
                  : ' Pay when you collect your order'
                }
              </p>
            </div>

            {/* Delivery Method Summary */}
            <div className="mt-3 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Delivery:</strong> {currentDeliveryMethod === 'delivery' ? 'Home Delivery' : 'Store Pickup'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;