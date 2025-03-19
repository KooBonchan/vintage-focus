import { create } from "zustand";

const sampleCartItems = [
  {
    id: 1,
    image: "https://placehold.co/100x100",
    name: "빈티지 카메라",
    price: 120000,
    quantity: 1,
  },
  {
    id: 2,
    image: "https://placehold.co/100x100",
    name: "필름 카메라",
    price: 150000,
    quantity: 1,
  },
  {
    id: 3,
    image: "https://placehold.co/100x100",
    name: "DSLR 카메라",
    price: 1200000,
    quantity: 1,
  },
];

interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}
interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cartItems: [
    
  ],
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
      }
    });
  },
  removeFromCart: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
  },
  updateQuantity: (id, quantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      ),
    }));
  },
  clearCart: () => {
    set({ cartItems: [] });
  },
}));


export default useCartStore;
