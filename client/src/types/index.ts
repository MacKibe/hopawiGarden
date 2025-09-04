// src/types/index.ts
import { Variants } from 'framer-motion';
import { ReactNode } from 'react';

// Cart Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description?: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalItems: () => number;
  totalPrice: () => number;
  getItem: (id: string) => CartItem | undefined;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category?: string;
  inStock?: boolean;
}

// Team Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  img: string;
  Tiktok?: string;
  Facebook?: string;
  Instagram?: string;
  Youtube?: string;
  LinkedIn?: string;
}

// Contact Types
export interface ContactInfo {
  icon: ReactNode;
  title: string;
  content: {
    heading: string;
    subHeading: string;
    link: string;
    linkText: string;
  };
}

// Motion Variants Types
export interface MotionVariants {
  fadeInUp: Variants;
  staggerContainer: Variants;
  cardVariants: Variants;
}

// Component Props Types
export interface CartDrawerProps {
  toggleCart: () => void;
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

export interface FeaturedProductProps {
  products?: Product[];
}