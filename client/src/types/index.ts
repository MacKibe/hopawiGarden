export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
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

export interface CartDrawerProps {
    toggleCart: () => void;
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
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