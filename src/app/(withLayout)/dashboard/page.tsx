"use client";

import React from "react";
import localStorageServices from "@/services/localStorageServices";
import createAxiosInstance from "@/services/axiosInstance";
import useSWR from "swr";
import Loading from "@/components/share/loading";

const fetcher = async (url: string) =>
  createAxiosInstance()
    .get(url)
    .then((res) => res);

const UserProfile = () => {
  const userData = localStorageServices.getUserData();

  const { data, error, isLoading } = useSWR(
    `/users/${userData?.userId}`,
    fetcher
  );

  if (isLoading) {
    <Loading />;
  }


  return (
    <div>
      <h1 className="text-xl">
        Role: <span className="text-primary">{data?.data?.role}</span>
      </h1>
      <h1 className="text-xl">
        Name: <span className="text-primary">{data?.data?.name}</span>
      </h1>
      <h1 className="text-xl">
        Email: <span className="text-primary">{data?.data?.email}</span>
      </h1>
      <h1 className="text-xl">
        User Id: <span className="text-primary">{data?.data?._id}</span>
      </h1>
    </div>
  );
};

export default UserProfile;
