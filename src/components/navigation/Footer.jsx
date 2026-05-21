import React from "react";
import { clearAllData } from "../../utils/storage";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">ZOOMANIA</h2>
            <p className="text-gray-400 mt-1">
              Your ultimate zoo management system.
            </p>
          </div>
          <div className="flex space-x-6">
            <button
              onClick={clearAllData}
              className="text-gray-500 hover:text-red-400 text-xs uppercase tracking-widest font-bold"
            >
              Reset Data
            </button>
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Support
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} ZOOMANIA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
