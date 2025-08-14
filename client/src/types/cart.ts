export interface CartItem {
    id: string;
    itemName: string;
    itemImages: string[];
    itemPrice: number;
    description: string;
    quantity: number;
  }
  
  export interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void; 
    totalItems: () => number;
    totalPrice: () => number;
    // Optional useful methods:
    getItem: (id: string) => CartItem | undefined;
  }