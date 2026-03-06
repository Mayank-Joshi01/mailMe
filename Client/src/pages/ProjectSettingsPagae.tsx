import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import NameInput from '../Components/Project/NameInput'
import DomainInput from '../Components/Project/DomainInput'
import DescriptionInput from '../Components/Project/DescriptionInput'
import StatusInput from '../Components/Project/StatusInput'
import FormActions from '../Components/Project/FormActions'
import { useProjects } from '../context/ProjectContext'
import { useAlert } from '../context/AlertConext'

interface FormErrors {
  name?: string
  domain?: string
  description?: string
}

export default function ProjectSettingsPage() {
  const { updateProject, fetchCurrentProject, currentProject } = useProjects()
  const { projectId } = useParams()
  const navigate = useNavigate()
  
  // State initialized as empty strings
  const [name, setName]               = useState('')
  const [domain, setDomain]           = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus]           = useState<'active' | 'inactive'>('active')
  const [errors, setErrors]           = useState<FormErrors>({})
  const [loading, setLoading]         = useState(false)
  const [copied, setCopied]           = useState(false) // For the copy button UX
  const { showAlert } = useAlert()

  // 1. Fetch project on mount
  useEffect(() => {
    if (projectId) {
      fetchCurrentProject(projectId)
    }
  }, [fetchCurrentProject, projectId])

  // 2. CRITICAL FIX: Sync local state when currentProject data arrives from the backend
  useEffect(() => {
    if (currentProject) {
      setName(currentProject.name || '')
      setDomain(currentProject.allowedDomain || '')
      setDescription(currentProject.description || '')
      setStatus((currentProject.status as 'active' | 'inactive') || 'active')
    }
  }, [currentProject])

const validate = (): boolean => {
    const e: FormErrors = {}
    
    if (!name.trim())          e.name = 'Project name is required.'
    else if (name.length < 3)  e.name = 'Name must be at least 3 characters.'
    
    if (!domain.trim()) {
      e.domain = 'Allowed domain is required.'
    } else {
      // ✅ FIX: Removed the '?' after the protocol. It is now REQUIRED.
      const domainRegex = /^https?:\/\/(([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|localhost|(\d{1,3}\.){3}\d{1,3})(:\d{1,5})?$/
      
      if (!domainRegex.test(domain)) {
        e.domain = 'Must include http:// or https:// (e.g., https://example.com or http://127.0.0.1:5500)'
      }
    }
    
    if (description.length > 200) e.description = 'Max 200 characters.'
    
    setErrors(e)
    return Object.keys(e).length === 0
  }
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || !projectId) return
    setLoading(true)
    
    try {
      const response = await updateProject(projectId, name, description, domain, status)
      if (!response) {
        setLoading(false)
        showAlert('Failed to update project. Please try again.', 'error')
        return
      }
      navigate('/console')
    } catch (err) {
      console.error('Failed to update project:', err)
      setErrors({ name: 'Failed to update. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleCopyId = () => {
    if (currentProject?.publicId) {
      navigator.clipboard.writeText(currentProject.publicId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Show a loading state while fetching the initial data
  if (!currentProject) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">Loading settings...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-12">
      {/* Container max-w-5xl ensures it doesn't stretch too far on large screens */}
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* ─── LEFT COLUMN: Info & Instructions ─────────────────────── */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm">
            
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Project Settings</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Update your project domain and core configurations below.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <NameInput        value={name}        onChange={setName}        error={errors.name}        />
              <DomainInput      value={domain}      onChange={setDomain}      error={errors.domain}      />
              <DescriptionInput value={description} onChange={setDescription} error={errors.description} />
              <StatusInput      value={status}      onChange={setStatus}                                 />
              
              <div className="mt-2 border-t border-gray-100 dark:border-gray-800 pt-5">
                <FormActions loading={loading} submitLabel="Save Changes" loadingLabel="Saving..." />
              </div>
            </form>

          </div>
        </div>

                
        {/* ─── RIGHT COLUMN: Form ────────────────────────────────────── */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-transparent">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Integration Details</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Use these credentials to connect your frontend application to this endpoint. Keep your Public ID safe.
            </p>
            {currentProject.status === 'inactive' && (
              <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800 dark:text-yellow-200">
                  This project is currently inactive. You cant get entries into this project.
                </p>
              </div>
            )}

            <div className="space-y-5">
              {/* Public ID Field */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Public ID
                </label>
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded px-3 py-2 border border-gray-100 dark:border-gray-700">
                  <code className="text-sm text-gray-800 dark:text-gray-200 font-mono truncate mr-2">
                    {currentProject.publicId}
                  </code>
                  <button 
                    onClick={handleCopyId}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Add this ID to your HTML form action or Axios request URL.
                </p>
              </div>

              {/* Target Email Field */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Target Email
                </label>
                <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded px-3 py-2 border border-gray-100 dark:border-gray-700">
                  {/* Note: Ensure targetEmail is added to your Project TypeScript interface! */}
                  <span className="text-sm text-gray-800 dark:text-gray-200 font-medium truncate">
                    {(currentProject as any).targetEmail || 'No email set'} 
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  All new form submissions will be forwarded directly to this inbox.
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}