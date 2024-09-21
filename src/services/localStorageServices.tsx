"use client";

import toast from "react-hot-toast";

const isBrowser = typeof window !== "undefined";

const setItemWithExpiry = (
  key: string,
  value: object | string | number,
  ttl: number
): void => {
  if (!isBrowser) return; // Ensure code runs only in the browser
  const expiryTime = Date.now() + ttl;
  const item = {
    value,
    expiry: expiryTime,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getItemWithExpiry = (key: string): string | null => {
  if (!isBrowser) return null; // Ensure code runs only in the browser
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  return itemStr;
};

export function setLocalStorage({
  key,
  value,
}: {
  key: string;
  value: string;
}) {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting localStorage item ${key}:`, error);
  }
}

function getLocalStorage({ key }: { key: string }): string | null {
  if (!isBrowser) return null;
  try {
    const dataString = localStorage.getItem(key);
    return dataString !== null ? dataString : null;
  } catch (error) {
    console.error(`Error getting localStorage item ${key}:`, error);
    return null;
  }
}

function getUserData() {
  if (!isBrowser) return null;
  try {
    const userDataStringify = localStorage.getItem("userData");
    if (userDataStringify) {
      const normalize = JSON.parse(userDataStringify);
      return normalize;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
}

function logOutService() {
  if (!isBrowser) return;
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    toast.success("Logout successfully!");
    window.location.href = "/";
  } catch (error) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    console.error("Error during logout:", error);
    toast.success("Logout successfully!");
    window.location.href = "/";
  }
}

const localStorageServices = {
  setItemWithExpiry,
  getItemWithExpiry,
  getUserData,
  getLocalStorage,
  logOutService,
};

export default localStorageServices;
