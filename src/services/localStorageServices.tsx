"use client";

import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const isBrowser = typeof window !== "undefined";

// Interface for the decoded JWT token
interface DecodedToken {
  exp: number;
  [key: string]: any; // Other JWT fields can vary
}

// Set item in localStorage with expiration time (TTL - Time to Live)
const setItemWithExpiry = (
  key: string,
  value: object | string | number,
  ttl: number
): void => {
  if (!isBrowser) return; // Ensure code runs only in the browser
  const expiryTime = Date.now() + ttl; // Calculate expiry time
  const item = {
    value,
    expiry: expiryTime,
  };
  localStorage.setItem(key, JSON.stringify(item)); // Store item
};

// Get item from localStorage and check if it has expired
const getItemWithExpiry = (key: string): string | null => {
  if (!isBrowser) return null; // Ensure code runs only in the browser
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = Date.now();

  if (now > item.expiry) {
    // Remove expired item from localStorage
    localStorage.removeItem(key);
    // toast.error("Session has expired, please log in again.");
    return null;
  }
  return item.value;
};

// Get user data by decoding the access token stored in localStorage
function getUserData(): DecodedToken | null {
  if (!isBrowser) return null;
  try {
    const token = getItemWithExpiry("accessToken");
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      const now = Date.now() / 1000; // Current time in seconds
      if (decoded.exp && decoded.exp < now) {
        toast.error("Token has expired, please log in again.");
        logOutService();
        return null;
      }
      return decoded;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    toast.error("Unable to fetch user data. Please log in again.");
    return null;
  }
}

// Log out user by removing accessToken and redirecting to login page
function logOutService() {
  if (!isBrowser) return;
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    toast.success("Logged out successfully!");
    window.location.href = "/"; // Redirect to home or login page
  } catch (error) {
    console.error("Error during logout:", error);
    toast.error("Error during logout, please try again.");
    window.location.href = "/";
  }
}

// Export the localStorage service
const localStorageServices = {
  setItemWithExpiry,
  getItemWithExpiry,
  getUserData,
  logOutService,
};

export default localStorageServices;
