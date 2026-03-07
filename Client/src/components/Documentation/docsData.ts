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
      { id: 'introduction', label: 'Introduction' },
      { id: 'what-is-postdrop', label: 'What is PostDrop ?' },
      { id: 'how-it-works', label: 'How it Works ?' },
      { id: 'why-postdrop',  label: 'Why PostDrop ?'  },
    ],
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    subtitles: [
      { id : 'getting-started', label: 'Getting Started' },
      { id: 'quickstart-guide',         label: 'Quickstart Guide'          },
      { id: 'account-setup',      label: 'Account Setup'        },
      { id: 'your-first-project',  label: 'Your First Project'    },
    ],
  },
  {
    id: 'core-concepts',
    title: 'Core Concepts',
    subtitles: [
      { id: 'core-concepts' , label: 'Core Concepts'},
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
      { id: 'integration-guides',    label: 'Integration Guides'     },
      { id: 'plain-html-javascript',    label: 'Plain HTML & JavaScript'     },
      { id: 'custom-success-redirects',     label: 'Custom Success Redirects'      },
    ],
  },
  {
    id: 'security-spam-protection',
    title: 'Security & Spam Protection',
    subtitles: [
      { id: 'security-spam-protection', label: 'Security & Spam Protection' },
      { id: 'domain-verification', label: 'Domain Verification' },
      { id: 'honeypot-fields',         label: 'Honeypot Fields'         },
    ],
  },
]

export const docsContent: Record<string, { title: string; body: string; code?: string }> = {
  // ── Introduction ──────────────────────────────────────────────────────────

  introduction: {
    title: 'Introduction',
    body: 'Welcome to the official PostDrop documentation. Whether you are launching a quick landing page or integrating a complex web application, this guide provides everything you need to know. Here you will find comprehensive details on integrating our API, configuring security rules, and utilizing advanced patterns like AJAX submissions and spam filtering.',
  },
  'what-is-postdrop': {
    title: 'What is PostDrop?',
    body: 'PostDrop is a headless form-backend-as-a-service. It acts as the bridge between your frontend UI and your inbox. Instead of writing your own server-side controllers, configuring SMTP servers, or managing database connections just to capture leads, you simply point your HTML form at our API. We handle the data parsing, security validation, spam rejection, and instant email delivery.',
  },
  'how-it-works': {
    title: 'How it Works',
    body: 'The architecture is beautifully simple. You paste a unique PostDrop Project public-id into your HTML form as value of data-public-id atribute . When a visitor submits the form, their browser sends a POST request to our API (Script you attach). PostDrop instantly verifies the origin domain, checks for spam signatures, logs the entry, and formats the data into a clean email delivered straight to your target inbox.\n\n ** id of the form must be "contactForm" ' ,
    code: `<form id="contactForm" data-public-id="your-public-id" >
  <input type="text" name="name" placeholder="Full Name" required />
  <input type="email" name="email" placeholder="Email Address" required />
  <textarea name="message" placeholder="How can we help?"></textarea>
  <button type="submit">Send Message</button>
</form>
<!-- PostDrop SDK (Optional for AJAX support) -->
<script src="https://postdrop.io/sdk.js"></script>`,
  },
  'why-postdrop': {
    title: 'Why PostDrop?',
    body: 'Building custom form backends is a time-sink. PostDrop eliminates the need to maintain boilerplate backend code, handle CORS headaches, or worry about email deliverability. It ships out-of-the-box with strict origin validation, honeypot spam protection, and frictionless AJAX support. It allows frontend developers to remain entirely on the frontend while still capturing critical user data securely.',
  },

  // ── Getting Started ───────────────────────────────────────────────────────

  'getting-started': {
    title: 'Getting Started',
    body: 'You are just a few minutes away from receiving your first submission. This section walks you through the initial account setup, creating your first secure endpoint, and connecting it to your frontend application.',
  },
  'quickstart-guide': {
    title: 'Quickstart Guide',
    body: `Getting started requires zero installations.\n\n1. Create a Project in your dashboard to generate a Public ID.\n2. Add your website\'s exact URL to the Allowed Domains list.\n3. Paste the provided endpoint into your form. \n\nNo NPM packages or backend configuration required.`,
    code: `<form id="contactForm" data-public-id="your-public-id" >>
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <button type="submit">Submit</button>
</form>`,
  },
  'account-setup': {
    title: 'Account Setup',
    body: 'Sign up at postdrop.io with a valid email address. We utilize a secure, passwordless Magic Link system for authentication. Once verified, you will be redirected to your developer console where you can manage projects, monitor submission analytics, and configure your global workspace settings.',
  },
  'your-first-project': {
    title: 'Your First Project',
    body: 'In the console, click "New Project". You will need to provide a Project Name,\n **Project Name should be unique**\n an Allowed Domain (where your form is hosted). Upon creation, PostDrop generates a permanent `Public ID`. This ID is all you need to link your frontend to our servers.',
  },

  // ── Core Concepts ─────────────────────────────────────────────────────────

  'core-concepts': {
    title: 'Core Concepts',
    body: 'Understanding PostDrop\'s data model ensures you configure your forms securely and efficiently. Here is a breakdown of the primary entities you will interact with.',
  },
  'projects-workspaces': {
    title: 'Projects & Workspaces',
    body: 'A **Workspace** is the top-level container for your account. Inside a workspace, you can create multiple **Projects**. Each Project represents a single, unique form endpoint (like a "Contact Us" form or a "Newsletter Signup"). Projects maintain their own isolated submission logs, security rules, and target email configurations. \n** You can only create at max 10 Projects , In order to create new projects you have to delet older unused one ** ',
  },
  'public-id': {
    title: 'The Public ID',
    body: 'Every project receives a randomly generated alphanumeric string known as the Public ID. \n**This ID is not a secret.** \nIt is perfectly safe to expose in your frontend HTML or JavaScript. Malicious actors cannot spam your endpoint just by knowing your Public ID, because PostDrop relies on strict Origin matching for security, not ID obfuscation.',
    code: `<form data-public-id="your-public-id" >
  <!-- Your form fields here -->
</form>`,
  },
  'allowed-domains': {
    title: 'Allowed Domains',
    body: 'This is the core of PostDrop\'s security. You must explicitly declare where your form is hosted. \n**Important: You must include the exact protocol (http:// or https://).**\n When a submission arrives, PostDrop strictly compares the browser\'s Origin header against your saved domain. If they do not match perfectly, the request is instantly rejected with a 403 Forbidden error.',
    code: `// ✅ VALID Domain Formats
https://yourdomain.com
http://localhost:3000
http://127.0.0.1:5500

// ❌ INVALID Formats (Will be rejected)
yourdomain.com         // Missing protocol
https://yourdomain.com/ // Contains trailing slash`,
  },
  'target-emails': {
    title: 'Target Emails',
    body: 'The Target Email is the destination inbox for a specific project. When a valid submission passes all security checks, PostDrop compiles the form fields into a clean, readable email and instantly delivers it to this address.\n **You can not update your target email , it will always be the email with which you are loged in **.\n',
  },

  // ── Integration Guides ────────────────────────────────────────────────────

  'integration-guides': {
    title: 'Integration Guides',
    body: 'PostDrop supports multiple integration methods to fit your tech stack. Whether you want a zero-JS HTML setup or a seamless asynchronous React integration, we have you covered.',
  },
  'plain-html-javascript': {
    title: 'AJAX & Vanilla JavaScript',
    body: 'While standard HTML form submissions work perfectly, they force a page reload. For a premium user experience, we recommend intercepting the submission using JavaScript and the native `fetch` API. This allows you to show custom loading states and success messages without navigating the user away from your page.',
    code: `script src="https://cdn.jsdelivr.net/gh/Mayank-joshi123/postdrop-cdn@1.0.0/postdrop.js"></script>`,
  },
  'custom-success-redirects': {
    title: 'Custom Success Redirects',
    body: 'If you are using standard HTML forms (without AJAX/fetch), PostDrop will redirect the user to a generic success page upon submission. To keep users on your brand, add a hidden `_redirect` field containing the URL of your own custom "Thank You" page.',
    code: `<form id="contactForm" data-public-id="your-public-id" >
  <input type="text" name="_gotcha" style="display:none"> // For spam bots potection
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <button type="submit">Submit</button>
</form>`,
  },

  // ── Security & Spam Protection ────────────────────────────────────────────

  'security-spam-protection': {
    title: 'Security & Spam Protection',
    body: 'Spam is the biggest enemy of form endpoints. PostDrop implements invisible, highly effective countermeasures to keep your inbox clean and your data relevant.',
  },
  'domain-verification': {
    title: 'Strict Origin Verification',
    body: 'Every inbound POST request is validated at the middleware level. If the `Origin` header from the browser does not perfectly match the exact protocol and domain saved in your settings, the request is dropped. This prevents scripts, automated Postman requests, or cloned websites from submitting data to your endpoint.',
  },
  'honeypot-fields': {
    title: 'Honeypot Fields',
    body: 'A honeypot is a hidden field designed to trick automated spam bots. Add an input named `_gotcha` to your form. Hide it using CSS (do not use `type="hidden"`, as smart bots ignore those). Real human users will never see it, but bots will automatically fill it out. If PostDrop detects any text inside the `_gotcha` field, the submission is silently discarded.',
    code: `// For spam bots potection
    <input 
    type="text" 
    name="_gotcha"
    style="display:none">`,
  },
};  

