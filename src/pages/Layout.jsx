import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()

  return user ? (
    <div className="flex flex-col h-screen">

      {/* Navbar */}
      <nav className="w-full px-8 py-3 flex justify-between items-center border-b border-gray-200">
        <img
          src={assets.logo}
          alt="logo"
          className="cursor-pointer w-32 sm:w-44"
          onClick={() => navigate('/')}
        />

        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
          />
        )}
      </nav>

      {/* Main area */}
      <div className="flex-1 w-full flex overflow-hidden">

        <Sidebar
          sidebar={sidebar}
          setSidebar={setSidebar}
        />

        {/* Page content */}
        <main className="flex-1 bg-[#F4F7FB] overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  )
}

export default Layout