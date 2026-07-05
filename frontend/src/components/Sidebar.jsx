import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { dummyProfileData } from "../assets/assets";

import {
  Calendar1Icon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  User,
  XIcon,
} from "lucide-react";
const Sidebar = () => {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    setUserName(dummyProfileData.firstName + " " + dummyProfileData.lastName);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const role = "ADMIN" || "EMPLOYEE";

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },
    role === "ADMIN"
      ? { name: "Employees", href: "/employees", icon: User }
      : { name: "Attendance", href: "/attendance", icon: Calendar1Icon },
    { name: "Leave", href: "/leave", icon: FileTextIcon },
    { name: "Payslips", href: "/payslips", icon: DollarSignIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  const handleLogout = () => {
    window.location.href = "/login";
  };
  const sidebarContent = (
    <>
      <div className="px-5 pt-6 pb-5 border-b border-white/6">
        <div className="flex items-center gap-3">
          <User className="text-white size-10 shrink-0" />

          <div>
            <p className="text-2xl font-bold text-white leading-none">
              Employee
            </p>
            
            <p className="text-2xl text-slate-300">Management System</p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="ml-auto text-slate-300 hover:text-white"
        >
          <XIcon size={20} />
        </button>
      </div>

      {/* User profile card */}
      {userName && (
        <div className="px-3 py-4">
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-200 font-semibold">
              <span>{userName.charAt(0)}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">{userName}</p>
              <p className="text-xs text-slate-400">
                {role === "ADMIN" ? "Administrator" : "Employee"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* section label */}
      <div className="px-3 pt-2 pb-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Navigation
        </p>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 h-5 w-0.75 -translate-y-1/2 rounded-r-full bg-indigo-500" />
              )}

              <item.icon
                className={`w-4.5 h-9.5 shrink-0 ${
                  isActive
                    ? "text-indigo-300"
                    : "text-slate-400 group-hover:text-slate-300"
                }`}
              />

              <span className="flex-1">{item.name}</span>

              {isActive && (
                <ChevronRightIcon className="h-3.5 w-3.5 text-indigo-500/50" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="mt-auto border-t border-slate-700/90 p-4">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-100 transition-all duration-200 hover:text-red-400"
        >
          <LogOutIcon className="w-4.25 h-4.25 text-slate-200 group-hover:text-red-400" />

          <span className="flex-1 text-left">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 
       bg-slate-900 text-white rounded-lg shadow-lg border border-white/10"
      >
        <MenuIcon size={20} />
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 
       backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className="hidden lg:flex flex-col h-full w-92 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white shrink-0 border-r border-white/5">
        {sidebarContent}
      </aside>

      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white z-50 flex flex-col transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;