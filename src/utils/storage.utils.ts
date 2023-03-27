export const getLocalStorageItem = (key: string) => localStorage.getItem(key);
export const setLocalStorageItem = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));
export const removeLocalStorageItem = (key: string) => localStorage.removeItem(key);
