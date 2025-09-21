import React from "react";
import Navbar from "../Components/Navbar.jsx";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </>
  );
};

export default MainLayout;
