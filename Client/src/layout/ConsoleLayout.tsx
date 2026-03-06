import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import { useSummary } from '../context/SummaryContext';

export default function ConsoleLayout() {
    const { user, loading: authLoading } = useAuth();
    const { projects, fetchProjects, loading: projectsLoading } = useProjects();
    const { fetchUserSummary } = useSummary();

    useEffect(() => {
        // Only fetch if the user is logged in AND we haven't fetched projects yet
        if (user && projects.length === 0) {
            fetchProjects();
            fetchUserSummary();
        }
    }, [user, projects.length]); // Re-run if user changes

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
        <div >
            {/* You can even put a global Sidebar or Navbar here! */}
            <main>
                <Outlet /> 
            </main>
        </div>
    );
}