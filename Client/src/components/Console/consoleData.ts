/// These are the exact copy of those in the ProjectContext

export interface Project {
    _id: string;
    name: string;
    description: string;
    publicId: string;
    allowedDomain: string;
    targetEmail: string;
    status: string;
    totalEntries: number;
    createdAt: string;
}
export interface UserSummaryData {
    totalProjects: number;
    totalEntries: number;
    activeProjects: number;
}