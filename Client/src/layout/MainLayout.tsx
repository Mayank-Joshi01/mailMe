import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Automatically check if we are on a docs route
  const isDocsPage = location.pathname.startsWith('/docs');

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar 
        showDocsToggle={isDocsPage} 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className="flex flex-1 ">
        {/* The Outlet passes the sidebar state down to child routes */}
        <Outlet context={{ isSidebarOpen, setIsSidebarOpen }} />
      </div>
    </div>
  );
};