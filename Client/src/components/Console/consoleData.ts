// export interface Project {
//   id: string
//   name: string
//   entries: number
//   createdAt: string
//   status: 'active' | 'inactive'
// }

export interface Project {
    id: string;
    name: string;
    description: string;
    allowedDomain: string;
    status: string;
    totalEntries: number;
    createdAt: string;
    publicId: string;
}

export interface UserSummaryData {
    totalProjects: number;
    totalEntries: number;
    activeProjects: number;
}


// export const mockProjects: Project[] = [
//   { id: '1', name: 'Contact Form',      entries: 142, createdAt: 'Jan 12, 2025', status: 'active'   },
//   { id: '2', name: 'Landing Page Form', entries: 89,  createdAt: 'Feb 3, 2025',  status: 'active'   },
//   { id: '3', name: 'Support Widget',    entries: 34,  createdAt: 'Mar 7, 2025',  status: 'inactive' },
//   { id: '4', name: 'Feedback Form',     entries: 210, createdAt: 'Mar 19, 2025', status: 'active'   },
//   { id: '5', name: 'Beta Signup',       entries: 0,   createdAt: 'Apr 1, 2025',  status: 'inactive' },
// ]