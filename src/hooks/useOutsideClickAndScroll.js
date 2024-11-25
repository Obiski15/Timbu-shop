import { useEffect, useRef } from "react";

export function useOutsideClickAndScroll(enabled, handler, capture) {
  const ref = useRef();

  useEffect(() => {
    if (!enabled) return;

    function handleAndScrollClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    const events = ["click", "scroll"];

    events.forEach((e) =>
      window.addEventListener(e, handleAndScrollClick, capture || false)
    );

    return () =>
      events.forEach((e) =>
        window.addEventListener(e, handleAndScrollClick, capture || false)
      );
  }, [handler, capture, enabled]);

  return ref;
}
