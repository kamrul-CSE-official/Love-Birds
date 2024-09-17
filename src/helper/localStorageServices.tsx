const setItemWithExpiry = (
  key: string,
  value: object | string | number,
  ttl: number
): void => {
  const expiryTime = Date.now() + ttl;
  const item = {
    value,
    expiry: expiryTime,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getItemWithExpiry = (key: string): object | null => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (error) {
    console.error("Failed to parse item from localStorage", error);
    return null;
  }
};

const localStorageServices = {
  setItemWithExpiry,
  getItemWithExpiry,
};

export default localStorageServices;
