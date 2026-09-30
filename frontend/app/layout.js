import "./globals.css";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export const metadata = {
  title: "Student Support System",
  description: "Student Support and Ticket Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProtectedRoute>
          <Navbar />

          <div className="flex">
            <Sidebar />

            <main className="min-h-[calc(100vh-4rem)] flex-1">
              {children}
            </main>
          </div>
        </ProtectedRoute>
      </body>
    </html>
  );
}