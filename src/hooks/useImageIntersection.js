import { useEffect, useRef, useState } from "react";

export function useImageIntersection() {
  const [isImageIntersecting, setIsImageIntersecting] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const current = ref?.current;

    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsImageIntersecting(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [ref]);

  return { ref, isImageIntersecting };
}
