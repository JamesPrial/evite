import { useState, useCallback } from 'react'
import { submitRSVP, type RSVPData } from '../lib/api'

export type RSVPStatus = 'form' | 'submitting' | 'submitted' | 'error'

export interface RSVPState {
  attending: boolean | null
  guests: number
}

export function useRSVP(inviteId: string | null) {
  const [status, setStatus] = useState<RSVPStatus>('form')
  const [formState, setFormState] = useState<RSVPState>({
    attending: null,
    guests: 1,
  })
  const [error, setError] = useState<string | null>(null)
  const [submittedData, setSubmittedData] = useState<RSVPData | null>(null)

  const handleSubmit = useCallback(async () => {
    if (!inviteId || formState.attending === null) return

    setStatus('submitting')
    setError(null)

    const data: RSVPData = {
      attending: formState.attending,
      guests: formState.attending ? formState.guests : 0,
    }

    try {
      const response = await submitRSVP(inviteId, data)

      if (response.success) {
        setSubmittedData(data)
        setStatus('submitted')
      } else {
        setError(response.error || 'Something went wrong')
        setStatus('error')
      }
    } catch {
      setError('Unable to connect. Please try again.')
      setStatus('error')
    }
  }, [inviteId, formState])

  const setAttending = useCallback((attending: boolean) => {
    setFormState(prev => ({ ...prev, attending }))
  }, [])

  const setGuests = useCallback((guests: number) => {
    setFormState(prev => ({ ...prev, guests }))
  }, [])

  const retry = useCallback(() => {
    setStatus('form')
    setError(null)
  }, [])

  return {
    status,
    formState,
    error,
    submittedData,
    setAttending,
    setGuests,
    handleSubmit,
    retry,
  }
}
