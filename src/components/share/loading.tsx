import React from "react";
import loadingImg from "@/assets/love-bards logo.gif";
import Image from "next/image";

const Loading = () => {
  return (
    <div>
      <div className="flex items-center justify-center p-3 mx-3 mt-32">
        <Image
          src={loadingImg}
          alt="Loading..."
          width={150}
          height={150}
          priority
        />
      </div>
    </div>
  );
};

export default Loading;
