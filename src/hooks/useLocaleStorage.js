import { useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedVal = localStorage.getItem(key);

    return storedVal === null ? defaultValue : JSON.parse(storedVal);
  });

  const setValueInLocalStorage = (currentVal) => {
    setValue(currentVal);
    localStorage.setItem(key, JSON.stringify(currentVal));

    return currentVal;
  };

  return [value, setValueInLocalStorage];
}
