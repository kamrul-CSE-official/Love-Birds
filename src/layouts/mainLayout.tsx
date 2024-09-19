import React from "react";
import Navbar from "@/components/share/navbar";
import Footer from "@/components/share/footer";
import ScrollToTop from "@/components/share/scrollToTop";
import { Toaster } from "react-hot-toast";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Navbar */}
      <nav
        style={{ position: "absolute", top: 0, right: 0, zIndex: 100 }}
        className="w-full"
      >
        <Navbar />
      </nav>

      {/* Content: Flex-grow ensures this takes up remaining space */}
      <main className="flex-grow">
        {children}
        <ScrollToTop />
      </main>

      {/* Footer */}
      <footer className="w-full">
        <Footer />
      </footer>
      <Toaster position="top-right" />
    </div>
  );
};

export default MainLayout;
