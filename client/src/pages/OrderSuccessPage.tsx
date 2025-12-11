// client/src/pages/OrderSuccessPage.tsx

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { 
  FiCheckCircle, 
  FiPackage, 
  FiTruck, 
  FiPhone, 
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId || "HOP" + Date.now().toString().slice(-6);

  useEffect(() => {
    // Prevent duplicate order success page views
    const hasSeen = sessionStorage.getItem('order-success-seen');
    if (hasSeen) {
      toast.error("You've already completed this purchase.");
      navigate('/shop', { replace: true });
      return;
    }
    sessionStorage.setItem('order-success-seen', 'true');

    // Clear flag after 15 minutes
    const timer = setTimeout(() => {
      sessionStorage.removeItem('order-success-seen');
    }, 15 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container-responsive py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center">

        {/* Big Success Icon */}
        <div className="mb-8">
          <FiCheckCircle className="w-28 h-28 text-green-600 mx-auto animate-bounce" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          Payment Successful!
        </h1>

        <p className="text-xl text-gray-700 mb-8">
          Thank you! Your order has been confirmed and payment received.
        </p>

        {/* Order Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-8 mb-10 shadow-xl">
          <p className="text-3xl font-bold text-green-800 mb-6">
            Order #{orderId.toUpperCase()}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="flex items-start space-x-4">
              <FiPackage className="w-10 h-10 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">Order Confirmed</p>
                <p className="text-gray-600">We're packing your plants with love</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FiTruck className="w-10 h-10 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">Ready Soon</p>
                <p className="text-gray-600">Pickup or delivery in 2–4 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FiPhone className="w-10 h-10 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">We'll Call You</p>
                <p className="text-gray-600">When your order is ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Box */}
        <div className="bg-blue-50 rounded-2xl p-8 shadow-md">
          <h3 className="text-2xl font-bold text-blue-900 mb-6">Need Help?</h3>
          <div className="space-y-4 text-lg">
            <p className="flex items-center justify-center gap-3">
              <FiPhone className="text-blue-600" />
              <span>+254 720 804523</span> (Call/WhatsApp)
            </p>
            <p className="text-gray-600">
              Mon–Sat: 9:00 AM – 4:00 PM
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 space-y-4">
          <button
            onClick={() => navigate('/shop')}
            className="btn-base btn-primary touch-target text-xl px-10 py-5 font-semibold"
          >
            Continue Shopping
          </button>

          <p className="text-gray-600">
            or{' '}
            <a 
              href="https://wa.me/254720804523" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 font-bold hover:underline"
            >
              Chat with us on WhatsApp
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccessPage;