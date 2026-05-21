import { Outlet, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getStaffSession, clearStaffSession } from "../utils/storage";
import Button from "../components/common/Button";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const session = getStaffSession();

  const handleLogout = () => {
    clearStaffSession();
    toast.success("Logged out of staff portal.");
    navigate("/staff/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-green-700">
          <Link to="/">ZOOMANIA</Link>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <Link
            to="/staff/dashboard"
            className="block px-4 py-2 rounded hover:bg-green-700"
          >
            Overview
          </Link>
          <Link
            to="/staff/animals"
            className="block px-4 py-2 rounded hover:bg-green-700"
          >
            Manage Animals
          </Link>
          <Link
            to="/staff/bookings"
            className="block px-4 py-2 rounded hover:bg-green-700"
          >
            Manage Bookings
          </Link>
        </nav>
        <div className="p-4 border-t border-green-700 space-y-2">
          <Link
            to="/"
            className="block px-4 py-2 text-sm text-green-300 hover:text-white"
          >
            Back to Public Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-green-300 hover:text-white"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">Staff Portal</h1>
          <div className="flex items-center gap-4">
            {session?.email && (
              <span className="text-sm text-gray-500">{session.email}</span>
            )}
            <Button variant="outline" className="text-sm py-1" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </header>
        <main className="flex-grow overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
