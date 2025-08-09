import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

export default function App() {
  // State to handle sidebar collapse/expand
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BrowserRouter>
      {/* Full-page background with soft gradient */}
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
        <div className="flex">
          
          {/* ===== Sidebar Navigation ===== */}
          <aside
            className={`bg-gray-50 shadow-lg p-4 transition-all 
              ${collapsed ? 'w-20' : 'w-60'} h-screen`}
          >
            {/* Logo + App Name */}
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-600 text-white rounded-md w-10 h-10 flex items-center justify-center font-bold">
                ED
              </div>
              {/* Show title only if sidebar is expanded */}
              {!collapsed && (
                <div>
                  <div className="text-lg font-bold">Employee</div>
                  <div className="text-sm text-gray-950">Dashboard</div>
                </div>
              )}
            </div>

            {/* ===== Navigation Links ===== */}
            <nav className="space-y-2 mt-10">
              {/* Dashboard Link */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `w-full text-left px-3 py-2 rounded flex items-center gap-3 transition-colors duration-400 
                  ${isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-900 hover:bg-indigo-600 hover:text-white'}`
                }
              >
                <HomeIcon className="h-5 w-5" />
                {!collapsed && 'Dashboard'}
              </NavLink>

              {/* Employees Link */}
              <NavLink
                to="/employees"
                className={({ isActive }) =>
                  `w-full text-left px-3 py-2 rounded flex items-center gap-3 transition-colors duration-400 
                  ${isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-900 hover:bg-indigo-600 hover:text-white'}`
                }
              >
                <UsersIcon className="h-5 w-5" />
                {!collapsed && 'Employees'}
              </NavLink>
            </nav>
          </aside>

          {/* ===== Main Content Area ===== */}
          <div className="flex-1">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-gray-50 shadow-sm">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Employee Management</h1>
              </div>
              {/* User Profile / Avatar */}
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 text-white px-3 py-2 rounded-full">FF</div>
              </div>
            </header>

            {/* Main Page Content (Dynamic via Routes) */}
            <main className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
              </Routes>
            </main>
          </div>

        </div>
      </div>
    </BrowserRouter>
  );
}
