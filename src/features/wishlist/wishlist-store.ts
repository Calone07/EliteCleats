const STORAGE_KEY = "elite-cleats:wishlist";

let cache: string[] | null = null;
const listeners = new Set<() => void>();

function read(): string[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: string[]): void {
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

export function subscribeWishlist(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getWishlistSnapshot(): string[] {
  return read();
}

const EMPTY_WISHLIST: string[] = [];

export function getWishlistServerSnapshot(): string[] {
  return EMPTY_WISHLIST;
}

export function toggleWishlistStore(productId: string): void {
  const ids = read();
  write(ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId]);
}
