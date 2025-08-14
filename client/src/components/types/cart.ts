export interface CartItem {
    id : string;
    itemName:  string;
    itemImages: string;
    itemPrice: number;
    description: number;
    quantity: number;
}

export interface cartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (item: CartItem) => void;
    updateQuantity: (id : string, quantity: number)=> number;
    clearCart: () => void;
    totalItem: () => void;
    totalPrice: () => void;
}
