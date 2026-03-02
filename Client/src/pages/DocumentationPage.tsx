import { useState } from 'react'
import { useOutletContext } from 'react-router'
import DocsSidebar from '../Components/Documentation/DocsSidebar'
import DocsContent from '../Components/Documentation/DocsContent'

// Define the type for the context we set in MainLayout
interface MainLayoutContext {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function DocsPage() {
  const [activeId, setActiveId] = useState('introduction')
  
  // Use the global sidebar state from MainLayout instead of local state
  const { isSidebarOpen, setIsSidebarOpen } = useOutletContext<MainLayoutContext>()

  return (
    <div className="w-full flex">
      {/* Sidebar */}
      <DocsSidebar
        activeId={activeId}
        onSelect={(id) => {
          setActiveId(id)
          // Close sidebar on mobile after selecting an item
          if (window.innerWidth < 1024) setIsSidebarOpen(false)
        }}
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main content */}
      {/* Note: Margin changed to lg:ml-64 to match standard sidebar width */}
      <main className="flex-1 lg:ml-64 min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-950 transition-all duration-300">
        <div className="max-w-4xl mx-auto p-6 sm:p-10">
          <DocsContent activeId={activeId}  onNavigate={(id) => setActiveId(id)} />
        </div>
      </main>

      {/* Mobile Overlay: Closes sidebar when clicking outside */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}