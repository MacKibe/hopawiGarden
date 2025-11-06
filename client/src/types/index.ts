export interface Product {
  product_id: string;
  name: string;
  description: string;
  price: number;
  path: string;
  active?: boolean;
  category?: string;
}

export interface ProductListProps{
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  getItem: (id: string) => CartItem | undefined;
}

export interface CartDrawerProps {
  toggleCart: () => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

// Delivery method type
export type DeliveryMethod = 'delivery' | 'pickup';

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: CartItem[];
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    deliveryInstructions?: string;
  };
  // Delivery method and related fields
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    deliveryInstructions?: string;
  };
  total: number;
  shippingCost: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paid: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  phone: string;
  // Delivery method field
  deliveryMethod: DeliveryMethod;
  // Address fields become optional based on delivery method
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  deliveryInstructions?: string;
}

export interface ContactInfo {
  icon: React.ReactNode;
  iconSize: number;
  title: string;
  content: {
    heading: string;
    subHeading: string;
    link: string;
    linkText: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  initialize: () => Promise<void>;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface CreateOrderRequest {
  customerEmail: string;
  customerName: string;
  deliveryMethod: 'delivery' | 'pickup';
  shippingAddress?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingZip?: string;
  pickupLocation?: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  message: string;
}