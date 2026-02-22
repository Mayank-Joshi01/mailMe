import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAlert } from './AlertConext'
import { useAuth } from './AppContext'

// ── Types ──────────────────────────────────────────────
export interface SendMailData {
  to: string
  subject: string
  body: string
}

export interface Mail {
  id: string
  to: string
  subject: string
  body: string
  sentAt: string   // ISO date string
}

interface MailContextType {
  sentMails: Mail[]
  loadingMails: boolean
  sending: boolean
  sendMail: (data: SendMailData) => Promise<boolean>
  fetchSentMails: () => Promise<void>
  deleteMail: (id: string) => Promise<boolean>
}

// ── Context ────────────────────────────────────────────
const MailContext = createContext<MailContextType>({
  sentMails: [],
  loadingMails: false,
  sending: false,
  sendMail: async () => false,
  fetchSentMails: async () => {},
  deleteMail: async () => false,
})

// ── Provider ───────────────────────────────────────────
export function MailProvider({ children }: { children: ReactNode }) {
  const [sentMails, setSentMails] = useState<Mail[]>([])
  const [loadingMails, setLoadingMails] = useState(false)
  const [sending, setSending] = useState(false)

  const BackendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api'
  const { showAlert } = useAlert()
  const { user } = useAuth()

  // ── Auth Header Helper ────────────────────────────────
  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user?.token ?? ''}`,
  })

  // ── Fetch Sent Mails ──────────────────────────────────
  const fetchSentMails = async (): Promise<void> => {
    if (!user) return
    setLoadingMails(true)
    try {
      const res = await fetch(`${BackendUrl}/mail/sent`, {
        method: 'GET',
        headers: authHeaders(),
      })

      const json = await res.json()

      if (!res.ok) {
        showAlert(json.message || 'Failed to load sent mails.', 'error')
        return
      }

      setSentMails(json.mails ?? [])
    } catch {
      showAlert('Network error while fetching mails.', 'error')
    } finally {
      setLoadingMails(false)
    }
  }

  // ── Send Mail ─────────────────────────────────────────
  const sendMail = async (data: SendMailData): Promise<boolean> => {
    if (!user) {
      showAlert('You must be logged in to send emails.', 'error')
      return false
    }

    setSending(true)
    try {
      const res = await fetch(`${BackendUrl}/mail/send`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        showAlert(json.message || 'Failed to send email.', 'error')
        return false
      }

      // Add the successfully sent mail to the top of the list
      const newMail: Mail = {
        id: json.mail?.id ?? crypto.randomUUID(),
        to: data.to,
        subject: data.subject,
        body: data.body,
        sentAt: json.mail?.sentAt ?? new Date().toISOString(),
      }

      setSentMails(prev => [newMail, ...prev])
      showAlert(`Email sent to ${data.to}!`, 'success')
      return true
    } catch {
      showAlert('Network error. Email could not be sent.', 'error')
      return false
    } finally {
      setSending(false)
    }
  }

  // ── Delete Mail ───────────────────────────────────────
  const deleteMail = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${BackendUrl}/mail/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })

      const json = await res.json()

      if (!res.ok) {
        showAlert(json.message || 'Failed to delete email.', 'error')
        return false
      }

      // Remove from local state immediately (optimistic update)
      setSentMails(prev => prev.filter(mail => mail.id !== id))
      showAlert('Email deleted.', 'info')
      return true
    } catch {
      showAlert('Network error. Could not delete email.', 'error')
      return false
    }
  }

  // // ── Auto-fetch when user logs in ──────────────────────
  // useEffect(() => {
  //   if (user) {
  //     fetchSentMails()
  //   } else {
  //     // Clear mails when user logs out
  //     setSentMails([])
  //   }
  // }, [user])

  return (
    <MailContext.Provider
      value={{ sentMails, loadingMails, sending, sendMail, fetchSentMails, deleteMail }}
    >
      {children}
    </MailContext.Provider>
  )
}

// ── Hook ───────────────────────────────────────────────
export const useMail = () => useContext(MailContext)