import { useMemo } from 'react'
import { useRSVP } from './hooks/useRSVP'
import { EventCard } from './components/EventCard'
import { RSVPForm } from './components/RSVPForm'
import { Confirmation } from './components/Confirmation'
import { InvalidInvite } from './components/InvalidInvite'

function App() {
  // Get invite ID from URL query params
  const inviteId = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('id')
  }, [])

  // Simple UUID format validation
  const isValidId = useMemo(() => {
    if (!inviteId) return false
    return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(inviteId)
  }, [inviteId])

  const {
    status,
    formState,
    error,
    submittedData,
    setAttending,
    setGuests,
    handleSubmit,
    retry,
  } = useRSVP(isValidId ? inviteId : null)

  // Invalid or missing invite ID
  if (!isValidId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <InvalidInvite />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <EventCard>
        {status === 'submitted' && submittedData ? (
          <Confirmation data={submittedData} />
        ) : (
          <RSVPForm
            attending={formState.attending}
            guests={formState.guests}
            onAttendingChange={setAttending}
            onGuestsChange={setGuests}
            onSubmit={handleSubmit}
            isSubmitting={status === 'submitting'}
            error={status === 'error' ? error : null}
            onRetry={retry}
          />
        )}
      </EventCard>
    </div>
  )
}

export default App
