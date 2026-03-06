import { useState } from 'react'
import { useNavigate } from 'react-router'
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

export default function CreateProjectPage() {
  const navigate = useNavigate()
  const [name, setName]               = useState('')
  const [domain, setDomain]           = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors]           = useState<FormErrors>({})
  const [loading, setLoading]         = useState(false)
  const { createProject } = useProjects()
  const { showAlert } = useAlert()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
    const response = await createProject(name, description, domain)
    if (!response) {setLoading(false)
      showAlert('Failed to create project. Please try again.', 'error')
      return}
    navigate('/console')
      return
    }
    catch (err) {
      showAlert('Failed to create project. Please try again.', 'error')
      setLoading(false)
      return
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Create a project</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Fill in the details to set up your new project.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <NameInput        value={name}        onChange={setName}        error={errors.name}        />
            <DomainInput      value={domain}      onChange={setDomain}      error={errors.domain}      />
            <DescriptionInput value={description} onChange={setDescription} error={errors.description} />
            <StatusInput      value="active"      onChange={() => {}}       disabled                   />
            <FormActions loading={loading} submitLabel="Create Project" loadingLabel="Creating..." />
          </form>

        </div>
      </div>
    </div>
  )
}