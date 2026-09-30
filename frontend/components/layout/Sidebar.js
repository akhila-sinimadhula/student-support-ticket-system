"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getCurrentStaff } from "../../services/authService";

export default function Sidebar() {
  const pathname = usePathname();

  const [staff, setStaff] = useState(null);

 useEffect(() => {
  function loadStaff() {
    const currentStaff = getCurrentStaff();
    setStaff(currentStaff);
  }

  loadStaff();

  window.addEventListener("auth-change", loadStaff);

  return () => {
    window.removeEventListener("auth-change", loadStaff);
  };
}, []);
  const isActive = (path) => {
    return pathname === path;
  };

  const isAdmin = staff?.role?.trim() === "Admin";

  return (
    <aside className="hidden min-h-[calc(100vh-4rem)] w-64 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-full flex-col p-4">

        <nav className="space-y-1">

          <Link
            href="/"
            className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive("/")
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/tickets"
            className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive("/tickets")
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            Tickets
          </Link>

          <Link
            href="/students"
            className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive("/students")
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            Students
          </Link>

          {isAdmin && (
            <Link
              href="/staff"
              className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive("/staff")
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              Staff
            </Link>
          )}

        </nav>

        <div className="mt-auto border-t border-slate-200 pt-4">

          <a
            href="/settings"
            className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            Settings
          </a>

        </div>

      </div>
    </aside>
  );
}