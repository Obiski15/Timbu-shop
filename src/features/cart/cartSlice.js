import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { CART_KEY } from "../../utils/constants";

const initialState = {
  cart: JSON.parse(localStorage.getItem(CART_KEY)) || [],
};

function modifyCartStorage(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { price, discount, ...rest } = action.payload;
      const item = { ...rest, totalPrice: price - discount };
      state.cart.push(item);
      modifyCartStorage(state.cart);
      toast.success("Item Added to Cart");
    },

    removeFromCart: (state, action) => {
      const newCart = state.cart.filter((data) => data.id !== action.payload);
      state.cart = newCart;
      modifyCartStorage(state.cart);
      toast.error("Item Removed From Cart");
    },

    inc: (state, action) => {
      const item = state.cart.find((data) => data.id === action.payload);
      item.quantity++;
      item.totalPrice = (item.price - item.discount) * item.quantity;
      modifyCartStorage(state.cart);
    },

    dec: (state, action) => {
      const item = state.cart.find((data) => data.id === action.payload);
      item.quantity--;
      item.totalPrice = (item.price - item.discount) * item.quantity;
      modifyCartStorage(state.cart);
    },

    emptyCart: (state) => {
      const confirm = window.confirm("Are you sure you want to empty you cart");
      if (confirm) {
        state.cart = [];
        modifyCartStorage(state.cart);
        return;
      }
      return;
    },
  },
});

export const { dec, inc, addToCart, removeFromCart, emptyCart } =
  cartSlice.actions;

export function getTotalCartItems(cart) {
  return cart.length;
}

export function getTotalCartPrice(cart) {
  return cart.reduce((acc, item) => acc + item.totalPrice, 0);
}

export function getItemQuantity(cart, id) {
  const item = cart.find((item) => item.id === id);
  return item.quantity;
}

export function getTotalItemQuantity(cart) {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
}

export function getTotalDiscount(cart) {
  return cart
    .map((item) => item.discount * item.quantity)
    .reduce((acc, value) => acc + value, 0);
}

export default cartSlice.reducer;
