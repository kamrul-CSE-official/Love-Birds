"use client";

import { useState, useEffect, FC } from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

const ScrollToTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const toggleVisibility = () => {
    if (typeof window !== "undefined") {
      setIsVisible(window.pageYOffset > 300);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", toggleVisibility);
      return () => {
        window.removeEventListener("scroll", toggleVisibility);
      };
    }
  }, []);

  return (
    <div title="Scroll To Top" className="rounded-full">
      <div className="fixed bottom-10 right-10 group rounded-full">
        {isVisible && (
          <Button
            size="round"
            variant="default"
            className="rounded-full border-2 border-secondary"
            onClick={scrollToTop}
          >
            <ArrowUpIcon className="w-5 h-5 transform group-hover:-translate-y-1 transition duration-300 ease-in-out text-xl font-extrabold" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ScrollToTop;
