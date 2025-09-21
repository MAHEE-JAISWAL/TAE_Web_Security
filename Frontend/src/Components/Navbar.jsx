import { Link } from "react-router-dom";
import React from "react";
const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Rentora
        </Link>

        {/* Navigation */}
        <ul className="flex space-x-6 font-medium text-gray-700">
          <li>
            <Link to="/" className="hover:text-indigo-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-indigo-600">
              About
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-indigo-600">
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Buttons */}
        <div className="space-x-4">
          <Link
            to="/login"
            className="text-indigo-600 border border-indigo-600 px-4 py-1.5 rounded hover:bg-indigo-50"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
