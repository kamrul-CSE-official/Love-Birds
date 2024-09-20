"use client";

import axios from "axios";
import toast from "react-hot-toast";

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

export function setLocalStorage({
  key,
  value,
}: {
  key: string;
  value: string;
}) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting localStorage item ${key}:`, error);
  }
}

function getLocalStorage({ key }: { key: string }): string | null {
  try {
    const dataString = localStorage.getItem(key);
    return dataString !== null ? dataString : null;
  } catch (error) {
    console.error(`Error getting localStorage item ${key}:`, error);
    return null;
  }
}

interface IUserData {
  [key: string]: string;
}
function setUserData(userDataPayload: IUserData) {
  try {
    const userData = JSON.stringify(userDataPayload);
    setLocalStorage({ key: "userData", value: userData });
  } catch (error) {
    console.error("Error setting user data:", error);
  }
}

function getUserData() {
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

/*
async function logOutService() {
  try {
    const accessToken = getLocalStorage({ key: "accessToken" });
    const axiosInstance = createAxiosInstance();

    if (!accessToken) {
      window.location.href = "/";
      toast.error("No access token found!");
      console.error("No access token found.");
      return null;
    }

    const response = await axiosInstance.post(
      `${envConfig.API.SECONDARY_API}/users/logout`,
      { accessToken: accessToken }
    );

    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");

    // Redirect user to the homepage
    window.location.href = "/";

    return response;
  } catch (error) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    console.error("Error during logout!");
    console.error("Error during logout:", error);
    window.location.href = "/";
    return null;
  }
}
*/

const localStorageServices = {
  setItemWithExpiry,
  getItemWithExpiry,
  getUserData,
  setUserData,
};

export default localStorageServices;
