import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import NameInput from '../Components/Project/NameInput'
import DomainInput from '../Components/Project/DomainInput'
import DescriptionInput from '../Components/Project/DescriptionInput'
import StatusInput from '../Components/Project/StatusInput'
import FormActions from '../Components/Project/FormActions'
import DeleteProjectModal from '../Components/Project/DeleteProjectModal'
import { useProjects } from '../context/ProjectContext'
import { useAlert } from '../context/AlertConext'

interface FormErrors {
  name?: string
  domain?: string
  description?: string
}

export default function ProjectSettingsPage() {
  const { updateProject, deleteProject, fetchCurrentProject, currentProject } = useProjects()
  const { projectId } = useParams()
  const navigate = useNavigate()

  const [name, setName]               = useState('')
  const [domain, setDomain]           = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus]           = useState<'active' | 'inactive'>('active')
  const [errors, setErrors]           = useState<FormErrors>({})
  const [loading, setLoading]         = useState(false)
  const [copied, setCopied]           = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { showAlert } = useAlert()

  useEffect(() => {
    if (projectId) fetchCurrentProject(projectId)
  }, [fetchCurrentProject, projectId])

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
    if (!name.trim())         e.name = 'Project name is required.'
    else if (name.length < 3) e.name = 'Name must be at least 3 characters.'
    if (!domain.trim()) {
      e.domain = 'Allowed domain is required.'
    } else {
      const domainRegex = /^https?:\/\/(([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|localhost|(\d{1,3}\.){3}\d{1,3})(:\d{1,5})?$/
      if (!domainRegex.test(domain))
        e.domain = 'Must include http:// or https:// (e.g., https://example.com)'
    }
    if (description.length > 200) e.description = 'Max 200 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || !projectId) return
    setLoading(true)
    try {
      const response = await updateProject(projectId, name, description, domain, status)
      if (!response) {
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

  const handleDelete = async () => {
    if (!projectId) return
    try {
      await deleteProject(projectId)
      setShowDeleteModal(false)
      navigate('/console')
    } catch (err) {
      console.error('Failed to delete project:', err)
      showAlert('Failed to delete project. Please try again.', 'error')
    }
  }

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        Loading settings...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-start">

        {/* ─── LEFT COLUMN ────────────────────────────────────────── */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Project Settings</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Update your project domain and core configurations below.
              </p>
            </div>
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

        {/* ─── RIGHT COLUMN ───────────────────────────────────────── */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-transparent">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Integration Details</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Use these credentials to connect your frontend to this endpoint.
            </p>

            {currentProject.status === 'inactive' && (
              <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800 dark:text-yellow-200">
                  This project is currently inactive. You can't receive entries.
                </p>
              </div>
            )}

            <div className="space-y-5">
              {/* Public ID */}
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

              {/* Target Email */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Target Email
                </label>
                <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded px-3 py-2 border border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-800 dark:text-gray-200 font-medium truncate">
                    {(currentProject as any).targetEmail || 'No email set'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  All new form submissions will be forwarded to this inbox.
                </p>
              </div>

              {/* ─── Danger Zone ─── */}
              <div className="border border-zinc-800 rounded-xl p-4">
                <p className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-1">
                  Danger Zone
                </p>
                <p className="text-xs text-zinc-600 mb-3">
                  Permanently delete this project and all its entries.
                </p>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-900/60 bg-rose-950/40 text-rose-500 text-sm font-semibold transition-all duration-150 hover:bg-rose-900/50 hover:border-rose-700 hover:text-rose-300 cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                  </svg>
                  Delete Project
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <DeleteProjectModal
          projectName={currentProject.name}
          onConfirm={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  )
}