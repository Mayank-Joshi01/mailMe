export interface DocSection {
  id: string
  title: string
  subtitles: { id: string; label: string }[]
}

export const docsSections: DocSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    subtitles: [
      { id: 'what-is-postdrop', label: 'What is PostDrop ?' },
      { id: 'how-it-works', label: 'How it Works ?' },
      { id: 'why-postdrop',  label: 'Why PostDrop ?'  },
    ],
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    subtitles: [
      { id: 'quickstart-guide',         label: 'Quickstart Guide'          },
      { id: 'account-setup',      label: 'Account Setup'        },
      { id: 'your-first-project',  label: 'Your First Project'    },
    ],
  },
  {
    id: 'core-concepts',
    title: 'Core Concepts',
    subtitles: [
      { id: 'projects-workspaces',   label: 'Projects & Workspaces'    },
      { id: 'public-id',    label: 'The Public ID'     },
      { id: 'allowed-domains',   label: 'Allowed Domains'    },
      { id: 'target-emails',      label: 'Target Emails'  },
    ],
  },
  {
    id: 'integration-guides',
    title: 'Integration Guides',
    subtitles: [
      { id: 'plain-html-javascript',    label: 'Plain HTML & JavaScript'     },
      { id: 'custom-success-redirects',     label: 'Custom Success Redirects'      },
    ],
  },
  {
    id: 'security-spam-protection',
    title: 'Security & Spam Protection',
    subtitles: [
      { id: 'domain-verification', label: 'Domain Verification' },
      { id: 'honeypot-fields',         label: 'Honeypot Fields'         },
    ],
  },
]

export const docsContent: Record<string, { title: string; body: string; code?: string }> = {
  // ── Introduction ──────────────────────────────────────────────────────────

  introduction: {
    title: 'Introduction',
    body: 'Welcome to the PostDrop documentation. Here you will find everything you need to integrate, configure, and get the most out of PostDrop — from a quick overview of the product to advanced integration patterns.',
  },
  'what-is-postdrop': {
    title: 'What is PostDrop?',
    body: 'PostDrop is a lightweight form-backend service. It receives HTML form submissions from your website and forwards them straight to your inbox — no server, no backend code required.',
  },
  'how-it-works': {
    title: 'How it Works',
    body: 'Point your HTML form\'s action attribute at your unique PostDrop endpoint. When a visitor submits the form, PostDrop validates the request, filters spam, and delivers the data to your configured target emails.',
    code: `<form action="https://postdrop.io/f/{YOUR_PUBLIC_ID}" method="POST">
  <input type="text"  name="name"    placeholder="Your name" />
  <input type="email" name="email"   placeholder="Your email" />
  <textarea           name="message" placeholder="Your message"></textarea>
  <button type="submit">Send</button>
</form>`,
  },
  'why-postdrop': {
    title: 'Why PostDrop?',
    body: 'PostDrop removes the need to write, host, or maintain backend form-handling code. It ships with built-in spam protection, domain whitelisting, and file-upload support — so you can focus on building your product, not plumbing.',
  },

  // ── Getting Started ───────────────────────────────────────────────────────

  'getting-started': {
    title: 'Getting Started',
    body: 'This section walks you through creating an account, configuring your first project, and sending your first form submission in minutes.',
  },
  'quickstart-guide': {
    title: 'Quickstart Guide',
    body: 'Get up and running in three steps: create an account, create a project, and drop the endpoint into your form\'s action attribute.',
    code: `<!-- 1. Replace {PUBLIC_ID} with the ID from your project dashboard -->
<form action="https://postdrop.io/f/{PUBLIC_ID}" method="POST">
  <input  type="text"  name="name"  required />
  <input  type="email" name="email" required />
  <button type="submit">Submit</button>
</form>`,
  },
  'account-setup': {
    title: 'Account Setup',
    body: 'Sign up at postdrop.io with your email address. After verifying your email you will land on your dashboard where you can create and manage projects, view submission logs, and update billing.',
  },
  'your-first-project': {
    title: 'Your First Project',
    body: 'From the dashboard click "New Project", give it a name, and add at least one target email address. PostDrop will generate a Public ID for the project that you use in your form\'s action URL.',
  },

  // ── Core Concepts ─────────────────────────────────────────────────────────

  'core-concepts': {
    title: 'Core Concepts',
    body: 'Understanding the following concepts will help you configure PostDrop correctly and get reliable, secure form delivery.',
  },
  'projects-workspaces': {
    title: 'Projects & Workspaces',
    body: 'A Project represents a single form endpoint. A Workspace is a container for multiple projects and team members. Each project belongs to exactly one workspace and has its own Public ID, allowed domains, and target emails.',
  },
  'public-id': {
    title: 'The Public ID',
    body: 'The Public ID is a unique, randomly generated identifier for your project. It is safe to expose in your HTML — it is not a secret. Access is controlled by the Allowed Domains list rather than by keeping the ID private.',
    code: `<!-- Example endpoint using a Public ID -->
https://postdrop.io/f/abc123xyz`,
  },
  'allowed-domains': {
    title: 'Allowed Domains',
    body: 'PostDrop will only accept submissions whose HTTP Referer header matches a domain on your Allowed Domains list. This prevents other websites from using your endpoint without permission.',
    code: `// Allowed domains examples
yourdomain.com
staging.yourdomain.com
localhost  // useful during local development`,
  },
  'target-emails': {
    title: 'Target Emails',
    body: 'Target emails are the addresses that receive a formatted email every time a valid form submission arrives. You can add multiple addresses per project — useful for notifying both a team inbox and an individual.',
  },

  // ── Integration Guides ────────────────────────────────────────────────────

  'integration-guides': {
    title: 'Integration Guides',
    body: 'Step-by-step guides for the most common integration patterns, from a plain HTML page to handling file attachments and custom redirects.',
  },
  'plain-html-javascript': {
    title: 'Plain HTML & JavaScript',
    body: 'The simplest integration requires no JavaScript at all — just set the form action to your PostDrop endpoint. For a smoother user experience you can intercept the submit event and post via fetch instead.',
    code: `// Fetch-based submission (no page reload)
const form = document.querySelector('#contact-form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = new FormData(form)

  const res = await fetch('https://postdrop.io/f/{PUBLIC_ID}', {
    method: 'POST',
    body: data,
  })

  if (res.ok) {
    alert('Message sent!')
  }
})`,
  },
  'custom-success-redirects': {
    title: 'Custom Success Redirects',
    body: 'By default PostDrop redirects to a generic thank-you page after a successful submission. Add a hidden _redirect field to send users to your own page instead.',
    code: `<form action="https://postdrop.io/f/{PUBLIC_ID}" method="POST">
  <!-- Hidden redirect field -->
  <input type="hidden" name="_redirect" value="https://yourdomain.com/thank-you" />

  <input type="text"  name="name"  required />
  <input type="email" name="email" required />
  <button type="submit">Submit</button>
</form>`,
  },

  // ── Security & Spam Protection ────────────────────────────────────────────

  'security-spam-protection': {
    title: 'Security & Spam Protection',
    body: 'PostDrop includes multiple layers of protection to ensure only legitimate submissions reach your inbox.',
  },
  'domain-verification': {
    title: 'Domain Verification',
    body: 'Every inbound request is checked against your project\'s Allowed Domains list. Requests from unlisted origins are rejected with a 403 response before any processing occurs. Always add your production domain before going live.',
  },
  'honeypot-fields': {
    title: 'Honeypot Fields',
    body: 'Add a hidden input named _honey to your form. Real users won\'t see or fill it; bots typically will. If PostDrop receives a submission with a non-empty honeypot field, the submission is silently discarded.',
    code: `<!-- Honeypot field — hide it with CSS, not the hidden type -->
<input
  type="text"
  name="_honey"
  style="display: none"
  tabindex="-1"
  autocomplete="off"
/>`,
  },
}