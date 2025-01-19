import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 transform transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:block`} // Sidebar will be shown only on large screens and tablet sizes when opened
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white text-3xl lg:hidden"
        >
          &times;
        </button>
        <nav className="mt-8 space-y-4">
          <Link to="/" className="block px-4 py-3 hover:bg-gray-700 rounded" onClick={toggleSidebar}>
            Home
          </Link>
          <Link to="/employee-directory" className="block px-4 py-3 hover:bg-gray-700 rounded" onClick={toggleSidebar}>
            Employee Directory
          </Link>
          <Link to="/attendance" className="block px-4 py-3 hover:bg-gray-700 rounded" onClick={toggleSidebar}>
            Attendance
          </Link>
          <Link to="/leave-management" className="block px-4 py-3 hover:bg-gray-700 rounded" onClick={toggleSidebar}>
            Leave Management
          </Link>
          <Link to="/payroll" className="block px-4 py-3 hover:bg-gray-700 rounded" onClick={toggleSidebar}>
            Payroll
          </Link>
          <Link to="/performance-reviews" className="block px-4 py-3 hover:bg-gray-700 rounded" onClick={toggleSidebar}>
            Performance Reviews
          </Link>
          <Link to="/reports" className="block px-4 py-3 hover:bg-gray-700 rounded" onClick={toggleSidebar}>
            Reports & Analytics
          </Link>
          <Link to="/training" className="block px-4 py-3 hover:bg-gray-700 rounded" onClick={toggleSidebar}>
            Training & Development
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-gray-100 overflow-hidden">
        {/* Navbar */}
        <header className="sticky top-0 bg-gray-900 text-white shadow-md z-30">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <h1 className="text-2xl font-extrabold tracking-wide">
              <Link to="/" className="text-blue-400 hover:text-blue-300">
                HRM Dashboard
              </Link>
            </h1>

            {/* Inline navigation for larger screens */}
            <div className="hidden lg:flex space-x-6"> {/* Inline links visible on lg and larger screens */}
              <Link
                to="/"
                className="text-sm font-medium text-gray-300 hover:text-blue-300 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/employee-directory"
                className="text-sm font-medium text-gray-300 hover:text-blue-300 transition-colors"
              >
                Employee Directory
              </Link>
              <Link
                to="/attendance"
                className="text-sm font-medium text-gray-300 hover:text-blue-300 transition-colors"
              >
                Attendance
              </Link>
              <Link
                to="/leave-management"
                className="text-sm font-medium text-gray-300 hover:text-blue-300 transition-colors"
              >
                Leave Management
              </Link>
              <Link
                to="/payroll"
                className="text-sm font-medium text-gray-300 hover:text-blue-300 transition-colors"
              >
                Payroll
              </Link>
              <Link
                to="/performance-reviews"
                className="text-sm font-medium text-gray-300 hover:text-blue-300 transition-colors"
              >
                Performance Reviews
              </Link>
              <Link
                to="/reports"
                className="text-sm font-medium text-gray-300 hover:text-blue-300 transition-colors"
              >
                Reports & Analytics
              </Link>
              <Link
                to="/training"
                className="text-sm font-medium text-gray-300 hover:text-blue-300 transition-colors"
              >
                Training & Development
              </Link>
            </div>

            {/* Hamburger Menu for smaller screens */}
            <button className="text-3xl lg:hidden" onClick={toggleSidebar}> {/* Show on mobile and tablet screens */}
              ☰
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
