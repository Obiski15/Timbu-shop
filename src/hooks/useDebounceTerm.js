import { useEffect, useState } from "react";

export function useDebouncedTerm(searchTerm, delay = 500) {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  //  Only update the debounced term after the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  return debouncedTerm;
}
