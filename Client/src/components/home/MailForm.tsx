import { useState } from 'react'
import InputField from '../InputField'
import Button from '../Button'
import { useMail } from '../../context/MailContext'

export default function MailForm() {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const { sendMail } = useMail()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!to || !message) {
      setError('Please fill in the "To" and "Message" fields.')
      return
    }
    setError('')
    sendMail({ to, subject, body: message })
    setTo('')
    setSubject('')
    setMessage('')
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Send a Message
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="To"
          type="email"
          placeholder="recipient@example.com"
          value={to}
          onChange={setTo}
        />

        <InputField
          label="Subject"
          placeholder="Subject (optional)"
          value={subject}
          onChange={setSubject}
        />

        {/* Textarea — not using InputField since it's different */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            rows={4}
            placeholder="Write your message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm outline-none resize-none
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {sent && (
          <p className="text-sm text-green-600 dark:text-green-400">
            ✓ Message sent!
          </p>
        )}

        <div className="flex justify-end">
          <Button type="submit">Send Message</Button>
        </div>
      </form>
    </div>
  )
}