import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedVal = localStorage.getItem(key);

    return storedVal === null ? defaultValue : JSON.parse(storedVal);
  });

  useEffect(() => {
    const listener = (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (currentVal) => {
    setValue(currentVal);
    localStorage.setItem(key, JSON.stringify(currentVal));

    return currentVal;
  };

  return [value, setValueInLocalStorage];
}
