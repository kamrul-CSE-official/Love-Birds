import Image from "next/image";
import loadingImg from "@/assets/love-bards logo.gif";

const Loading = () => (
  <div className="flex items-center justify-center p-3 mx-3 mt-10">
    <Image
      src={loadingImg}
      alt="Loading..."
      width={150}
      height={150}
      priority
    />
  </div>
);

export default Loading;
