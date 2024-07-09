import { useEffect, useState } from "react";

export function useLocalStorage(key, passedValue) {
  const [value, setValue] = useState(() => {
    const initialValue = JSON.parse(localStorage.getItem(key));
    return initialValue || passedValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return { value, setValue };
}
