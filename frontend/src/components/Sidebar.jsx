import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { sidebarLinks } from "../config/sidebarLinks";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="h-full flex flex-col py-8">

      {/* MAIN MENU */}
      <nav className="flex-1 space-y-1">
        {sidebarLinks.main.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 ${
                  isActive
                    ? "text-brand-blue"
                    : "text-gray-400 hover:text-gray-900"
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-semibold">{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* FOOTER (BOTTOM SETTINGS) */}
      <div className="mt-auto px-4 space-y-2">
        {sidebarLinks.footer.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-semibold">{link.label}</span>
            </NavLink>
          );
        })}

        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;