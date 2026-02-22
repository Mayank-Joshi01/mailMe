export interface DocSection {
  id: string
  title: string
  subtitles: { id: string; label: string }[]
}

export const docsSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    subtitles: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'installation', label: 'Installation' },
      { id: 'quick-start',  label: 'Quick Start'  },
    ],
  },
  {
    id: 'authentication',
    title: 'Authentication',
    subtitles: [
      { id: 'login',         label: 'Login'          },
      { id: 'register',      label: 'Register'        },
      { id: 'google-oauth',  label: 'Google OAuth'    },
    ],
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    subtitles: [
      { id: 'endpoints',   label: 'Endpoints'    },
      { id: 'requests',    label: 'Requests'     },
      { id: 'responses',   label: 'Responses'    },
      { id: 'errors',      label: 'Error Codes'  },
    ],
  },
  {
    id: 'components',
    title: 'Components',
    subtitles: [
      { id: 'button',    label: 'Button'     },
      { id: 'input',     label: 'Input'      },
      { id: 'alert',     label: 'Alert'      },
    ],
  },
  {
    id: 'deployment',
    title: 'Deployment',
    subtitles: [
      { id: 'env-variables', label: 'Env Variables' },
      { id: 'build',         label: 'Build'         },
    ],
  },
]

export const docsContent: Record<string, { title: string; body: string; code?: string }> = {
  introduction: {
    title: 'Introduction',
    body: 'Welcome to MyApp documentation. This guide will help you get up and running quickly. MyApp is a full-stack starter kit built with React, Vite, TypeScript, and Tailwind CSS on the frontend, and Node.js with Express on the backend.',
  },
  installation: {
    title: 'Installation',
    body: 'Clone the repository and install dependencies using npm. Make sure you have Node.js v18 or above installed on your machine.',
    code: `git clone https://github.com/yourname/myapp.git\ncd myapp\nnpm install`,
  },
  'quick-start': {
    title: 'Quick Start',
    body: 'After installing dependencies, create a .env file in the root of your project and add the required environment variables. Then start the development server.',
    code: `npm run dev`,
  },
  login: {
    title: 'Login',
    body: 'The login endpoint accepts a POST request with email and password. On success it returns a user object with a JWT token.',
    code: `POST /api/auth/login\n{\n  "email": "user@example.com",\n  "password": "password123"\n}`,
  },
  register: {
    title: 'Register',
    body: 'The register endpoint accepts a POST request with name, email, and password. It creates a new user and returns the user object with a token.',
    code: `POST /api/auth/register\n{\n  "name": "John Doe",\n  "email": "user@example.com",\n  "password": "password123"\n}`,
  },
  'google-oauth': {
    title: 'Google OAuth',
    body: 'Google OAuth is supported via Firebase. Install firebase, configure your project in the Firebase console, then use signInWithPopup with GoogleAuthProvider.',
    code: `npm install firebase`,
  },
  endpoints: {
    title: 'Endpoints',
    body: 'All API endpoints are prefixed with /api. The base URL is configured via the VITE_BACKEND_URL environment variable.',
    code: `GET    /api/auth/me\nPOST   /api/auth/login\nPOST   /api/auth/register\nDELETE /api/auth/logout`,
  },
  requests: {
    title: 'Requests',
    body: 'All requests must include Content-Type: application/json in the headers. Protected routes require a Bearer token in the Authorization header.',
    code: `headers: {\n  "Content-Type": "application/json",\n  "Authorization": "Bearer <token>"\n}`,
  },
  responses: {
    title: 'Responses',
    body: 'All responses follow a consistent structure with a success flag, message, and data payload.',
    code: `{\n  "success": true,\n  "message": "Login successful",\n  "user": {\n    "name": "John Doe",\n    "email": "user@example.com",\n    "token": "jwt_token_here"\n  }\n}`,
  },
  errors: {
    title: 'Error Codes',
    body: 'The API uses standard HTTP status codes. Below are the most common ones you may encounter.',
    code: `400 - Bad Request\n401 - Unauthorized\n403 - Forbidden\n404 - Not Found\n500 - Internal Server Error`,
  },
  button: {
    title: 'Button',
    body: 'The Button component supports two variants: primary and secondary. It also supports fullWidth and disabled props.',
    code: `<Button variant="primary" fullWidth>\n  Click me\n</Button>\n\n<Button variant="secondary" disabled>\n  Disabled\n</Button>`,
  },
  input: {
    title: 'Input',
    body: 'The InputField component accepts label, type, placeholder, value, onChange, and an optional error prop for validation messages.',
    code: `<InputField\n  label="Email"\n  type="email"\n  placeholder="you@example.com"\n  value={email}\n  onChange={setEmail}\n  error={errors.email}\n/>`,
  },
  alert: {
    title: 'Alert',
    body: 'The Alert component supports four types: success, error, warning, and info. Pass an onClose callback to show a close button.',
    code: `<Alert type="success" message="Saved!" />\n<Alert type="error"   message="Failed!" onClose={() => {}} />`,
  },
  'env-variables': {
    title: 'Environment Variables',
    body: 'Create a .env file in the project root. All frontend variables must be prefixed with VITE_ to be accessible in the browser.',
    code: `VITE_BACKEND_URL=http://localhost:5000/api`,
  },
  build: {
    title: 'Build',
    body: 'Run the build command to generate a production-ready dist folder. You can then deploy the contents of the dist folder to any static hosting provider.',
    code: `npm run build`,
  },
}