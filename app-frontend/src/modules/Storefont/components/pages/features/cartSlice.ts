import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type CartItem = {
  id_dishlist: number;
  quantity: number;
  price: number;
  title: string;
  image: string;
  note: string;
};

const initialState: CartItem[] = [];


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.find(item => item.id_dishlist === action.payload.id_dishlist);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const update = state.filter(item => item.id_dishlist !== action.payload);
      return update;
    },
    clearCart() {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;