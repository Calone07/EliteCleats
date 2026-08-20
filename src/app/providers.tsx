"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/features/cart";
import { WishlistProvider } from "@/features/wishlist";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </SessionProvider>
  );
}
