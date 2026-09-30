"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getCurrentStaff,
  logout,
} from "../../services/authService";

export default function Navbar() {
  const router = useRouter();

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

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Student Support
          </h1>

          <p className="text-xs text-slate-500">
            Support Management System
          </p>
        </div>

        <div className="flex items-center gap-4">

          {staff && (
            <>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">
                  {staff.name}
                </p>

                <p className="text-xs text-slate-500">
                  {staff.role}
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                {staff.name.charAt(0).toUpperCase()}
              </div>
            </>
          )}

          <button
            onClick={handleLogout}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            Logout
          </button>

        </div>

      </div>
    </header>
  );
}