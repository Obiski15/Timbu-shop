import { useEffect, useRef } from "react";

export function useOutsideClick(enabled, handler, capture) {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, capture || false);

    return () =>
      document.removeEventListener("click", handleClick, capture || false);
  }, [handler, capture, enabled]);

  return ref;
}
