import { motion } from 'framer-motion';
import { FaTruck, FaStore } from 'react-icons/fa';
import type { DeliveryMethod } from '../../types';

interface DeliveryMethodSelectorProps {
  selectedMethod: DeliveryMethod;
  onMethodChange: (method: DeliveryMethod) => void;
}

const DeliveryMethodSelector = ({ 
  selectedMethod, 
  onMethodChange 
}: DeliveryMethodSelectorProps) => {
  const methods = [
    {
      id: 'delivery' as DeliveryMethod,
      title: 'Deliver to my address',
      description: 'Get your plants delivered to your doorstep.',
      icon: FaTruck,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      activeColor: 'bg-blue-100 border-blue-500',
      iconColor: 'text-blue-600'
    },
    {
      id: 'pickup' as DeliveryMethod,
      title: 'Pick up from garden',
      description: 'Collect your order from our garden.',
      icon: FaStore,
      color: 'bg-green-50 border-green-200 text-green-700',
      activeColor: 'bg-green-100 border-green-500',
      iconColor: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Delivery Method</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          
          return (
            <motion.button
              key={method.id}
              type="button"
              onClick={() => onMethodChange(method.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                isSelected 
                  ? `${method.activeColor} border-[var(--background)] shadow-md` 
                  : `${method.color} border-gray-200 hover:border-gray-300`
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${isSelected ? 'bg-[var(--background)]' : 'bg-white'}`}>
                  <Icon 
                    size={20} 
                    className={isSelected ? 'text-white' : method.iconColor} 
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-semibold ${isSelected ? 'text-[var(--background)]' : ''}`}>
                    {method.title}
                  </h4>
                  <p className="text-sm mt-1 opacity-75">
                    {method.description}
                  </p>
                </div>
                
                {/* Radio indicator */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected 
                    ? 'border-[var(--background)] bg-[var(--background)]' 
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryMethodSelector;