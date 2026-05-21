import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { getCurrentUser, clearCurrentUser } from "../../utils/storage";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/animals", label: "Animals" },
  { to: "/book-tickets", label: "Tickets" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = getCurrentUser();

  const closeMobile = () => setMobileOpen(false);

  const handleLogout = () => {
    clearCurrentUser();
    closeMobile();
    navigate("/login");
  };

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  const mobileLinkClass = (path) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive(path)
        ? "text-green-700 bg-green-50"
        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <nav className="bg-white shadow-md relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 font-bold text-xl sm:text-2xl text-green-600"
              onClick={closeMobile}
            >
              ZOOMANIA
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:gap-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Register
                </Link>
              </>
            )}
            <Link
              to="/staff/login"
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
            >
              Staff Portal
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={closeMobile}
                className={mobileLinkClass(to)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-gray-200 space-y-1">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobile}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobile}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobile}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Register
                  </Link>
                </>
              )}
              <Link
                to="/staff/login"
                onClick={closeMobile}
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700 text-center mt-2"
              >
                Staff Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
