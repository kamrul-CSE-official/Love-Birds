import useSWR from "swr";
import createAxiosInstance from "@/services/axiosInstance";

// Fetcher function for SWR
const fetcher = async (url: string) =>
  createAxiosInstance()
    .get(url)
    .then((res) => res);

export const useProductDetails = (id: string) => {
  const { data, error, isLoading } = useSWR(`/products/${id}`, fetcher);
  return {
    productDetails: data?.data,
    error,
    isLoading,
  };
};

export const useReviews = (id: string) => {
  const { data, error, isLoading } = useSWR(`/reviews/product/${id}`, fetcher);
  return {
    reviews: data?.data,
    error,
    isLoading,
  };
};

type UseIsBoughtReturn = {
  isBought: boolean;
  isLoading: boolean;
  error: any;
};

export const useIsBought = (productId: string): UseIsBoughtReturn => {
  const { data, error, isLoading } = useSWR(
    `/products/is-bought/${productId}`,
    fetcher
  );
  return {
    isBought: data?.data || false,
    error,
    isLoading,
  };
};

export const useSuggestedProducts = (id: string) => {
  const { data, error, isLoading } = useSWR(`/products/${id}/related`, fetcher);
  return {
    suggestedProducts: data?.data,
    error,
    isLoading,
  };
};
