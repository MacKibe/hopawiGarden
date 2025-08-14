// src/components/cart/CartItem.tsx
import type { CartItem } from '../../types/cart';

interface Props {
  item: CartItem;
}

const CartItem = ({ item }: Props) => {
    return console.log(`item : ${item}`);
    
};