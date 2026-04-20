import React, { useState, useRef, useEffect } from "react";
import { Bell, User, Settings, Moon, LogOut, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "ST";

  return (
    <header className="w-full h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-30 sticky top-0 shadow-sm shadow-gray-50/50">
      {/* Left: Brand & Breadcrumbs */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* LEFT: Logo + Brand */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-10 h-10 bg-linear-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">B</span>
          </div>

          {/* Brand Text */}
          <div className="leading-tight">
            <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">
              BMP
            </h2>
            <p className="text-xs text-gray-500 font-medium">System Master</p>
          </div>
        </div>
      </div>

      {/* Right: Search & Profile */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F4F7FE] text-gray-400 hover:text-brand-blue transition-all">
            <Bell />
          </button>
          
          <div className="h-8 w-px bg-gray-100" />
          
          {/* Profile Container */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 pl-2 group outline-none"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-[#1B2559] leading-none mb-1 group-hover:text-brand-blue transition-colors">
                  {user?.name || "Sanket Thakkar"}
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  {user?.role || "Administrator"}
                </p>
              </div>
              
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 border-2 border-white flex items-center justify-center text-xs font-black text-brand-blue shadow-sm group-hover:scale-105 transition-all">
                  {userInitials}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-gray-200/50 py-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-50 mb-1">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                  <p className="text-sm font-bold text-[#1B2559] truncate">{user?.email || "sanket@example.com"}</p>
                </div>

                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-brand-blue hover:bg-[#F4F7FE] transition-all">
                  <User className="w-4 h-4" />
                  Profile settings
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-brand-blue hover:bg-[#F4F7FE] transition-all">
                  <Moon className="w-4 h-4" />
                  Change Theme
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-brand-blue hover:bg-[#F4F7FE] transition-all">
                  <Settings className="w-4 h-4" />
                  Account Preferences
                </button>

                <div className="h-px bg-gray-50 my-1" />

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
