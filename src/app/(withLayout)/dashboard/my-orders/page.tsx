"use client";

import Loading from "@/components/share/loading";
import createAxiosInstance from "@/services/axiosInstance";
import localStorageServices from "@/services/localStorageServices";
import React from "react";
import useSWR from "swr";

// Fetcher function to get the data using Axios
const fetcher = async (url: string) => {
  const response = await createAxiosInstance().get(url);
  return response.data; // Adjusted to return data directly
};

const MyOrders = () => {
  const userData = localStorageServices.getUserData();

  // Use SWR to fetch orders for the user
  const { data, error, isLoading } = useSWR(
    `/orders/user/${userData?.userId}`,
    fetcher
  );

  // Show loading indicator
  if (isLoading) return <Loading />;

  // Handle error state
  if (error) {
    return (
      <div className="text-red-500">
        Failed to load orders. Please try again later.
      </div>
    );
  }

  // Ensure there are orders to display
  if (!data || !data.length) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {data?.reverse()?.map((order: any) => (
        <div key={order._id} className="mb-6 border p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
          <p className="text-gray-600">Status: {order.status}</p>
          <p className="text-gray-600">Total Amount: ৳{order.totalAmount}</p>
          <p className="text-gray-600">Address: {order.address}</p>
          <p className="text-gray-600">Mobile: {order.mobile}</p>
          <p className="text-gray-600">Payment Method: {order.paymentWith}</p>

          <h3 className="mt-4 text-lg font-semibold">Products:</h3>
          <ul className="list-disc pl-5">
            {order.products.map((product: any) => (
              <li key={product._id} className="my-2">
                <strong>{product.product.name}</strong> (Quantity:{" "}
                {product.quantity}) - ৳{product.product.price}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-gray-600">
            <strong>Ordered On:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
