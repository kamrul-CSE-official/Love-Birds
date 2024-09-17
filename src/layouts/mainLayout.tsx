import React from "react";
import Navbar from "@/components/pageComponents/navbar";
import Footer from "@/components/pageComponents/footer";

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
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
