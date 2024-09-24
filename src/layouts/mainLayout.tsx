import React from "react";
import Navbar from "@/components/share/navbar";
import Footer from "@/components/share/footer";
import ScrollToTop from "@/components/share/scrollToTop";
import { Toaster } from "react-hot-toast";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </nav>

      {/* Content */}
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
