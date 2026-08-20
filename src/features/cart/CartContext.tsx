"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useSyncExternalStore } from "react";
import type { CartItem, Product } from "@/types";
import {
  addToCartStore,
  cartItemKey,
  clearCartStore,
  getCartServerSnapshot,
  getCartSnapshot,
  removeFromCartStore,
  subscribeCart,
  updateCartQuantityStore,
} from "./cart-store";

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: { product: Product; size: number; quantity?: number }) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribeCart, getCartSnapshot, getCartServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (item) => {
        addToCartStore(item);
        setIsOpen(true);
      },
      removeItem: (key) => removeFromCartStore(key),
      updateQuantity: (key, quantity) => updateCartQuantityStore(key, quantity),
      clearCart: () => clearCartStore(),
    }),
    [items, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

export { cartItemKey };
