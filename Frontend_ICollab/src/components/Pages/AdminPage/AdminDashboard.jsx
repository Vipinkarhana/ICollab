import React from 'react'
import AdminSidebar from './Sidebar/adminSidebar'
import Dashboard from './Dashboard/dashboard'

const AdminDashboard = () => {

  return (
    <div className="flex h-screen w-screen mt-16">
      <AdminSidebar />
      <Dashboard />
    </div>
  )
}

export default AdminDashboard