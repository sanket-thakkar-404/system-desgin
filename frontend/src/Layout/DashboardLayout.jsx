import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router'
import Header from '../components/Header'

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-[#F4F7FE] font-sans overflow-hidden">
      
      {/* Top Header Section */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Section */}
        <aside className="w-50 h-full transition-all duration-300">
          <Sidebar />
        </aside>

        {/* Main Dashboard Viewport */}
        <main className="flex-1 p-6 pl-0 flex flex-col overflow-hidden">
          <div className="bg-white rounded-[40px] flex-1 overflow-auto shadow-2xl shadow-gray-200/50 border border-white/50">
            {/* Page content padding */}
            <div className="p-5">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

    </div>
  )
}

export default DashboardLayout