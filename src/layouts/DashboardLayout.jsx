import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-green-700">
          <Link to="/">ZOOMANIA</Link>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-green-700">Overview</Link>
          <Link to="/dashboard/animals" className="block px-4 py-2 rounded hover:bg-green-700">Animals</Link>
          <Link to="/dashboard/bookings" className="block px-4 py-2 rounded hover:bg-green-700">Bookings</Link>
          <Link to="/dashboard/staff" className="block px-4 py-2 rounded hover:bg-green-700">Staff</Link>
        </nav>
        <div className="p-4 border-t border-green-700">
          <Link to="/" className="block px-4 py-2 text-sm text-green-300 hover:text-white">Back to Public Site</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center px-8">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        </header>
        <main className="flex-grow overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
