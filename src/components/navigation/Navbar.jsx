import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center font-bold text-2xl text-green-600"
            >
              ZOOMANIA
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Home
              </Link>
              <Link
                to="/animals"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Animals
              </Link>
              <Link
                to="/book-tickets"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Tickets
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/staff/dashboard"
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
            >
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
