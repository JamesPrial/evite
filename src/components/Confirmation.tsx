import type { RSVPData } from '../lib/api'

interface ConfirmationProps {
  data: RSVPData
}

export function Confirmation({ data }: ConfirmationProps) {
  return (
    <div className="text-center space-y-6 py-8">
      {/* Checkmark Icon */}
      <div className="flex justify-center">
        <div className="rounded-full bg-holly-100 p-3">
          <svg className="w-16 h-16 text-holly-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Thank You Message */}
      <div>
        <h2 className="font-display text-3xl text-holly-900 mb-2">Thank you!</h2>
        <p className="font-body text-gray-600">Your RSVP has been received</p>
      </div>

      {/* Summary Card */}
      <div className="bg-cream rounded-lg p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-body text-sm font-medium text-gray-600">Status:</span>
          <span className={`font-body font-semibold ${data.attending ? 'text-holly-900' : 'text-cranberry-600'}`}>
            {data.attending ? 'Attending' : 'Not Attending'}
          </span>
        </div>

        {data.attending && (
          <div className="flex items-center justify-between">
            <span className="font-body text-sm font-medium text-gray-600">Number of guests:</span>
            <span className="font-body font-semibold text-holly-900">
              {data.guests} {data.guests === 1 ? 'guest' : 'guests'}
            </span>
          </div>
        )}
      </div>

      {/* Festive Message */}
      <div className="pt-4">
        {data.attending ? (
          <p className="font-body text-gray-700">
            We can't wait to celebrate with you!
            <br />
            <span className="text-gold-400">🎄</span> See you at the party! <span className="text-gold-400">🎄</span>
          </p>
        ) : (
          <p className="font-body text-gray-700">
            We'll miss you this year!
            <br />
            Hope to see you at the next one.
          </p>
        )}
      </div>
    </div>
  )
}
