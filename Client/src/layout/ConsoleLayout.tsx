import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import { useSummary } from '../context/SummaryContext';
import { useLocation } from 'react-router';

export default function ConsoleLayout() {
    const { user, loading: authLoading } = useAuth();
    const { projects, fetchProjects, loading: projectsLoading } = useProjects();
    const { fetchUserSummary } = useSummary();
    const location = useLocation();

    useEffect(() => {
        // Only fetch if the user is logged in AND we haven't fetched projects yet
        // if (user && projects.length === 0) {
        // Currently removing the projects.length check because i am not using Local State Update 
        //  just append that single new project to your existing React state.
        // just delet the single project from your existing React state.

        // This feature will be added soon ......

    //     if(user) {
    //         fetchProjects();
    //         fetchUserSummary();
    //         console.log('Fetching projects and summary for user:', user.name);
    //     }
    // }, [user, projects.length]); // Re-run if user changes
    
        if(user) {
            fetchProjects();
            fetchUserSummary();
        }

    }, [user , location.pathname]); // Re-run if user changes

    // 1. Wait for Auth to figure out if we are logged in
    if (authLoading) return <div>Loading...</div>;

    // 2. Protect the routes! If no user, kick them to login.
    if (!user) return <Navigate to="/login" replace />;

    // 3. Wait for the initial data to load so deep-linked pages don't crash
    if (projectsLoading && projects.length === 0) {
        return <div>Bootstrapping your workspace...</div>;
    }

    // 4. Render the actual page (Console, Settings, etc.) inside the layout
    return (
        <div className="min-h-screen w-full">
            {/* You can even put a global Sidebar or Navbar here! */}
            <main>
                <Outlet /> 
            </main>
        </div>
    );
}