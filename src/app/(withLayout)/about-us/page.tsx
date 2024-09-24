import React from "react";
import kamruImg from "@/assets/MdKamrulHasan.gif";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-28 p-10 rounded-lg shadow-md">
      <Image
        src={kamruImg}
        alt="MD.Kamrul Hasan"
        className="w-32 h-32 rounded-full border-4 border-primary"
      />
      <h1 className="mt-4 text-3xl font-bold">MD. Kamrul Hasan</h1>
      <p className="mt-2 text-lg">
        B.Sc in CSE at Port City International University CTG
      </p>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">
          Contact Information
        </h2>
        <p className="mt-2 text-gray-700">
          Email:{" "}
          <a
            href="mailto:kamrul24.official@gmail.com"
            className="text-blue-600 hover:underline"
          >
            kamrul24.official@gmail.com
          </a>
        </p>
        <p className="text-gray-700">
          Phone:{" "}
          <span className="text-blue-600 hover:underline">+88 01823855998</span>
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
