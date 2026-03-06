import { createContext, useState, useContext } from 'react'
import type { ReactNode } from 'react'
import { CreateProject, DeleteProject, UpdateProject, FetchProjects } from "../api/projects"
import { GetEntries } from "../api/Entries"
import { useAlert } from './AlertConext'
import { getErrorMessage } from '../Utils/errorHandler'

// ── Types ──────────────────────────────────────────────
export interface Project {
    _id: string;
    name: string;
    description: string;
    publicId: string;
    allowedDomain: string;
    targetEmail: string;
    status: "active" | "inactive";
    totalEntries: number;
    createdAt: string;
}

export interface Entries {
    data:  Record<string, string>;
    createdAt: string;
}

export interface CurrentEntries {
    CurrentEntries: Entries[]; 
    pagination:{
        totalEntries: number,
        totalPages: number,
        currentPage: number,
        limit: number
    }
}

// Fixed: Added missing fetchEntries signature
interface ProjectContextType {
    projects: Project[];
    loading: boolean;
    error: string | null;
    currentEntries: CurrentEntries | null; 
    currentProject: Project | null; // Added currentProject to context
    createProject: (name: string, description: string, allowedDomain: string) => Promise<boolean>;
    deleteProject: (projectId: string) => Promise<boolean>;
    updateProject: (projectId: string, name: string, description: string, allowedDomain: string, status: string) => Promise<boolean>;
    fetchProjects: () => Promise<void>;
    fetchEntries: (projectId: string, page?: number, limit?: number) => Promise<void>; 
    fetchCurrentProject: (projectId: string) => void; // Added fetchCurrentProject signature
}

// ── Context Creation ───────────────────────────────────
export const ProjectContext = createContext<ProjectContextType>({
    projects: [],
    loading: false,
    error: null,
    currentEntries: null,
    currentProject: null, // Default value for currentProject
    createProject: async () => false,
    deleteProject: async () => false,
    updateProject: async () => false,
    fetchProjects: async () => {},
    fetchEntries: async () => {}, // Added missing default
    fetchCurrentProject: () => {} // Added missing default
    
})

// ── Provider Component ─────────────────────────────────
export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [currentEntries, setCurrentEntries] = useState<CurrentEntries | null>(null) // Fixed casing
    const [currentProject, setCurrentProject] = useState<Project | null>(null) // Added currentProject state

    const { showAlert } = useAlert()

    // ── Fetch Projects ─────────────────────────────────────
    const fetchProjects = async () => {
        setLoading(true)
        setError(null) 
        try {
            const data = await FetchProjects()
            setProjects(data)
            console.log('Fetched projects:', data) // Debug log
        } catch (err) {
            const errorMessage = getErrorMessage(err)
            setError(errorMessage.message || 'Failed to fetch projects.')
            showAlert(errorMessage.message || 'Failed to fetch projects.', 'error')
        } finally {
            setLoading(false)
        }
    }

    // ── Create Project ─────────────────────────────────────
    const createProject = async (name: string, description: string, allowedDomain: string): Promise<boolean> => {
        setLoading(true)
        setError(null)
        try {
            await CreateProject(name, description, allowedDomain)
            showAlert('Project created successfully!', 'success')
            await fetchProjects() // You can keep this for now, or update local state later
            return true
        } catch (err) {
            const errorMessage = getErrorMessage(err)
            setError(errorMessage.message || 'Failed to create project.')
            showAlert(errorMessage.message || 'Failed to create project.', 'error')
            return false
        } finally {
            setLoading(false)
        }
    }

    // ── Delete Project ─────────────────────────────────────
    const deleteProject = async (projectId: string): Promise<boolean> => {
        setLoading(true)
        setError(null)
        try {
            await DeleteProject(projectId)
            showAlert('Project deleted successfully!', 'success')
            // Optimization: Remove from local state instantly instead of refetching all projects
            setProjects(prevProjects => prevProjects.filter(p => p._id !== projectId))
            return true
        } catch (err) {
            const errorMessage = getErrorMessage(err)
            setError(errorMessage.message || 'Failed to delete project.')
            showAlert(errorMessage.message || 'Failed to delete project.', 'error')
            return false
        } finally {
            setLoading(false)
        }
    }

    // ── Update Project ─────────────────────────────────────
    const updateProject = async (projectId: string, name: string, description: string, allowedDomain: string, status: string): Promise<boolean> => {
        setLoading(true)
        setError(null)
        try {
            await UpdateProject(projectId, name, description, allowedDomain, status)
            showAlert('Project updated successfully!', 'success')
            await fetchProjects()
            return true
        } catch (err) {
            const errorMessage = getErrorMessage(err)
            setError(errorMessage.message || 'Failed to update project.')
            showAlert(errorMessage.message || 'Failed to update project.', 'error')
            return false
        } finally {
            setLoading(false)
        }
    }

    // ── Fetch Entries ──────────────────────────────────────
    const fetchEntries = async (projectId: string, page: number = 1, limit: number = 10) => {
        setLoading(true)
        setError(null)
        try {
            const data = await GetEntries(projectId, page, limit)
            setCurrentEntries({CurrentEntries: data.data, pagination: data.pagination}) // Assuming API returns { data: Entries[], pagination: PaginationInfo }
        } catch (err) {
            const errorMessage = getErrorMessage(err)
            setError(errorMessage.message || 'Failed to fetch entries.')
            showAlert(errorMessage.message || 'Failed to fetch entries.', 'error')
        } finally {
            setLoading(false)
        }
    }

    // ── Fetch Current Project ──────────────────────────────────────
    const fetchCurrentProject = (projectId: any) => {
        const project = projects.find(p => p._id === projectId) || null
        setCurrentProject(project)
    }

    // REMOVED: useEffect(() => { fetchProjects() }, [])
    // Why? It's better to call fetchProjects() manually in the component that needs it 
    // so it doesn't fire before the user is logged in.

    return (
        <ProjectContext.Provider value={{ 
            projects, 
            loading, 
            error, 
            currentEntries, // Exposed
            currentProject, // Exposed
            createProject, 
            deleteProject, 
            updateProject, 
            fetchProjects,
            fetchEntries,    // Exposed
            fetchCurrentProject // Exposed
        }}>
            {children}
        </ProjectContext.Provider>
    )
}

// ── Hook ───────────────────────────────────────────────
// Makes importing much easier in your components!
export const useProjects = () => useContext(ProjectContext)