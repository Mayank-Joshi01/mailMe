import { useState , useEffect } from 'react'
import { useNavigate , useParams } from 'react-router'
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
  const { updateProject , fetchCurrentProject , currentProject  } = useProjects() // Get updateProject from context
  const { projectId } = useParams() // Get project ID from route params
  const navigate = useNavigate()
  const [name, setName]               = useState(currentProject?.name || '')
  const [domain, setDomain]           = useState(currentProject?.allowedDomain || '')
  const [description, setDescription] = useState(currentProject?.description || '')
  const [status, setStatus]           = useState<'active' | 'inactive'>(currentProject?.status || 'active')
  const [errors, setErrors]           = useState<FormErrors>({})
  const [loading, setLoading]         = useState(false)
  const { showAlert } = useAlert()

 
 
  // Using useEffect to fetch current project details when component mounts
  useEffect(() => {
    fetchCurrentProject(projectId) // Fetch current project details using the ID from params
  }, [fetchCurrentProject, projectId])


  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!name.trim())          e.name = 'Project name is required.'
    else if (name.length < 3)  e.name = 'Name must be at least 3 characters.'
    if (!domain.trim())        e.domain = 'Allowed domain is required.'
    else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) e.domain = 'Enter a valid domain (e.g. example.com)'
    if (description.length > 200) e.description = 'Max 200 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const response = await updateProject(projectId, name,  description, domain, status ) // Call updateProject from context
      if (!response) {setLoading(false)
      showAlert('Failed to create project. Please try again.', 'error')
      return}
    navigate('/console')
      return
    } catch (err) {
      console.error('Failed to update project:', err)
      setErrors({ name: 'Failed to update. Please try again.' })
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Edit project</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Update your project details below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <NameInput        value={name}        onChange={setName}        error={errors.name}        />
            <DomainInput      value={domain}      onChange={setDomain}      error={errors.domain}      />
            <DescriptionInput value={description} onChange={setDescription} error={errors.description} />
            <StatusInput      value={status}      onChange={setStatus}                                 />
            <FormActions loading={loading} submitLabel="Save Changes" loadingLabel="Saving..." />
          </form>

        </div>
      </div>
    </div>
  )
}