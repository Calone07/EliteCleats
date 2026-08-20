export function isInViewport(
  element: HTMLElement,
  offset = 100
): boolean {
  if (typeof window === "undefined") return false;
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight - offset && rect.bottom > 0;
}

export function observeElements(
  elements: HTMLElement[],
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = { threshold: 0.1 }
): () => void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, options);

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}
