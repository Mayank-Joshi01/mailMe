import { createContext, useState, useContext } from 'react'
import type { ReactNode } from 'react'
import { useAlert } from './AlertConext'
import { getErrorMessage } from '../Utils/errorHandler'

// ⚠️ Replace this import with your actual API file path
import { getUserSummary } from '../api/summary' 

// ── Types ──────────────────────────────────────────────
// Adjust these fields to match what your backend actually returns
export interface UserSummaryData {
    totalProjects: number;
    totalEntries: number;
    activeProjects: number;
}

interface SummaryContextType {
    summary: UserSummaryData | null;
    loading: boolean;
    error: string | null;
    fetchUserSummary: () => Promise<boolean>;
}

// ── Context Creation ───────────────────────────────────
export const SummaryContext = createContext<SummaryContextType>({
    summary: null,
    loading: false,
    error: null,
    fetchUserSummary: async () => false,
})

// ── Provider Component ─────────────────────────────────
export const SummaryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [summary, setSummary] = useState<UserSummaryData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    
    const { showAlert } = useAlert()

    // ── Fetch Summary ──────────────────────────────────────
    const fetchUserSummary = async (): Promise<boolean> => {
        setLoading(true)
        setError(null)
        
        try {
            // Assuming your API returns { data: UserSummaryData } or just the object itself
            const data = await getUserSummary()
            setSummary({totalEntries: data.totalEntries, totalProjects: data.totalProjects, activeProjects: data.activeProjects})
            return true
        } catch (err) {
            const errorMessage = getErrorMessage(err)
            setError(errorMessage.message || 'Failed to load dashboard summary.')
            showAlert(errorMessage.message || 'Failed to load dashboard summary.', 'error')
            return false
        } finally {
            setLoading(false)
        }
    }

    return (
        <SummaryContext.Provider value={{ 
            summary, 
            loading, 
            error, 
            fetchUserSummary 
        }}>
            {children}
        </SummaryContext.Provider>
    )
}

// ── Hook ───────────────────────────────────────────────
export const useSummary = () => useContext(SummaryContext)