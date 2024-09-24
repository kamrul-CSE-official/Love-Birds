// services/axiosInstance.ts
"use client";

import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import envConfig from "@/config/envConfig";
import localStorageServices from "./localStorageServices";

interface ErrorResponse {
  statusCode: number;
  message: string;
  success: boolean;
  errorMessages: string[];
}

const storedAccessToken = localStorageServices.getItemWithExpiry(
  "accessToken"
) as string;

const createAxiosInstance = (
  accessToken: string = storedAccessToken || ""
): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: envConfig.API.PRIMARY_API,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    withCredentials: true,
    timeout: 60000,
  });

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      const config = error.config as InternalAxiosRequestConfig & {
        sent?: boolean;
      };

      if (error.response?.status === 403) {
        // window.location.href = "/";
        return Promise.reject({
          statusCode: 403,
          message: "Session expired. Please log in again.",
          success: false,
          errorMessages: ["Session expired"],
        });
      }

      console.error("Response error:", error);
      return Promise.reject({
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || "Something went wrong",
        success: error.response?.data?.success || false,
        errorMessages: error.response?.data?.errorMessages || [],
      });
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
