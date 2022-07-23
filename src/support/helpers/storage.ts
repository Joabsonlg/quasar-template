export const saveToLocalStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getFromLocalStorage = (key: string) =>
  JSON.parse(localStorage.getItem(key) || "{}");

export const removeFromLocalStorage = (key: string) =>
  localStorage.removeItem(key);
