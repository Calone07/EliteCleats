import type { CartItem } from "@/types";

const STORAGE_KEY = "elite-cleats:cart";

let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: CartItem[]): void {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable — keep in-memory state
  }
  listeners.forEach((listener) => listener());
}

function emit(): void {
  listeners.forEach((listener) => listener());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      cache = null;
      emit();
    }
  });
}

export function cartItemKey(item: { product: { id: string }; size: number }): string {
  return `${item.product.id}:${item.size}`;
}

export function subscribeCart(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getCartSnapshot(): CartItem[] {
  return read();
}

const EMPTY_CART: CartItem[] = [];

export function getCartServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

export function addToCartStore(
  item: { product: CartItem["product"]; size: number; quantity?: number },
): void {
  const items = read();
  const key = cartItemKey(item);
  const existing = items.find((i) => cartItemKey(i) === key);

  if (existing) {
    write(
      items.map((i) =>
        cartItemKey(i) === key ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i,
      ),
    );
  } else {
    write([...items, { product: item.product, size: item.size, quantity: item.quantity ?? 1 }]);
  }
}

export function removeFromCartStore(key: string): void {
  write(read().filter((i) => cartItemKey(i) !== key));
}

export function updateCartQuantityStore(key: string, quantity: number): void {
  write(
    read().map((item) =>
      cartItemKey(item) === key ? { ...item, quantity: Math.max(1, quantity) } : item,
    ),
  );
}

export function clearCartStore(): void {
  write([]);
}
