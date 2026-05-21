import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Menu, X } from "lucide-react";
import { getStaffSession, clearStaffSession } from "../utils/storage";
import Button from "../components/common/Button";

const staffNavLinks = [
  { to: "/staff/dashboard", label: "Overview" },
  { to: "/staff/animals", label: "Manage Animals" },
  { to: "/staff/bookings", label: "Manage Bookings" },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const session = getStaffSession();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = () => {
    clearStaffSession();
    toast.success("Logged out of staff portal.");
    navigate("/staff/login");
  };

  const closeMobileNav = () => setMobileNavOpen(false);

  const navLinkClass =
    "block px-4 py-2 rounded hover:bg-green-700 text-green-100 hover:text-white";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-green-800 text-white flex-col shrink-0">
        <div className="p-6 text-2xl font-bold border-b border-green-700">
          <Link to="/">ZOOMANIA</Link>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {staffNavLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={navLinkClass}>
              {label}
            </Link>
          ))}
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
      </aside>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="fixed inset-0 bg-black/50"
            aria-label="Close menu"
            onClick={closeMobileNav}
          />
          <aside className="relative w-72 max-w-[85vw] bg-green-800 text-white flex flex-col h-full shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-green-700">
              <Link
                to="/"
                className="text-xl font-bold"
                onClick={closeMobileNav}
              >
                ZOOMANIA
              </Link>
              <button
                type="button"
                onClick={closeMobileNav}
                className="p-2 rounded-md hover:bg-green-700"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
              {staffNavLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={closeMobileNav}
                  className={navLinkClass}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-green-700 space-y-2">
              <Link
                to="/"
                onClick={closeMobileNav}
                className="block px-4 py-2 text-sm text-green-300 hover:text-white"
              >
                Back to Public Site
              </Link>
              <button
                type="button"
                onClick={() => {
                  closeMobileNav();
                  handleLogout();
                }}
                className="block w-full text-left px-4 py-2 text-sm text-green-300 hover:text-white"
              >
                Log Out
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex-grow flex flex-col min-w-0">
        <header className="bg-white shadow-sm min-h-16 flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
              Staff Portal
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {session?.email && (
              <span className="hidden sm:inline text-sm text-gray-500 truncate max-w-[140px]">
                {session.email}
              </span>
            )}
            <Button
              variant="outline"
              className="text-sm py-1 px-2 sm:px-4"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        </header>
        <main className="flex-grow overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
