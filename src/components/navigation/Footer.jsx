import { Link } from "react-router-dom";
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
          <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6">
            <button
              type="button"
              onClick={clearAllData}
              className="text-gray-500 hover:text-red-400 text-xs uppercase tracking-widest font-bold"
            >
              Reset Data
            </button>
            <Link to="/contact" className="text-gray-400 hover:text-white text-sm">
              Contact
            </Link>
            <Link to="/about" className="text-gray-400 hover:text-white text-sm">
              About
            </Link>
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
