import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type CartItem = {
  id_dishlist: number;
  quantity: number;
  price: number;
  title: string;
  image: string;
  note: string;
};

/* 
Khi ứng dụng khởi động: gọi loadCart() để khôi phục dữ liệu từ localStorage vào Redux.
Khi giỏ hàng thay đổi: gọi saveCart() để cập nhật dữ liệu trong localStorage.
*/
const loadCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

const saveCart = (cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
}


const initialState: CartItem[] = loadCart();

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
      saveCart(state)
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const update = state.filter(item => item.id_dishlist !== action.payload);
      saveCart(update);
      return update;
    },
    clearCart() {
      saveCart([]);
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;