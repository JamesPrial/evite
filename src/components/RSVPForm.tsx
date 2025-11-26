interface RSVPFormProps {
  attending: boolean | null
  guests: number
  onAttendingChange: (attending: boolean) => void
  onGuestsChange: (guests: number) => void
  onSubmit: () => void
  isSubmitting: boolean
  error: string | null
  onRetry: () => void
}

export function RSVPForm({
  attending,
  guests,
  onAttendingChange,
  onGuestsChange,
  onSubmit,
  isSubmitting,
  error,
  onRetry,
}: RSVPFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl text-gray-800 mb-4">Will you be attending?</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Yes Button/Card */}
          <button
            onClick={() => onAttendingChange(true)}
            className={`p-4 rounded-lg border-2 transition-all ${
              attending === true
                ? 'border-holly-900 bg-holly-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-holly-700'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <svg className={`w-8 h-8 ${attending === true ? 'text-holly-900' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`font-body font-semibold ${attending === true ? 'text-holly-900' : 'text-gray-600'}`}>
                Yes
              </span>
            </div>
          </button>

          {/* No Button/Card */}
          <button
            onClick={() => onAttendingChange(false)}
            className={`p-4 rounded-lg border-2 transition-all ${
              attending === false
                ? 'border-cranberry-600 bg-cranberry-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-cranberry-600'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <svg className={`w-8 h-8 ${attending === false ? 'text-cranberry-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`font-body font-semibold ${attending === false ? 'text-cranberry-600' : 'text-gray-600'}`}>
                No
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Guest Count Dropdown - Only visible when attending */}
      {attending === true && (
        <div className="animate-fadeIn">
          <label htmlFor="guests" className="block font-body text-sm font-medium text-gray-700 mb-2">
            Number of guests (including yourself)
          </label>
          <select
            id="guests"
            value={guests}
            onChange={(e) => onGuestsChange(Number(e.target.value))}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg font-body text-gray-800 focus:outline-none focus:ring-2 focus:ring-holly-900 focus:border-transparent"
          >
            <option value={1}>1 guest</option>
            <option value={2}>2 guests</option>
            <option value={3}>3 guests</option>
            <option value={4}>4 guests</option>
            <option value={5}>5+ guests</option>
          </select>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-cranberry-50 border-l-4 border-cranberry-600 p-4 rounded">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-cranberry-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="ml-3 flex-1">
              <p className="font-body text-sm text-cranberry-700">{error}</p>
              <button
                onClick={onRetry}
                className="mt-2 font-body text-sm font-semibold text-cranberry-600 hover:text-cranberry-700 underline"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={attending === null || isSubmitting}
        className={`w-full py-3 px-6 rounded-lg font-body font-semibold text-white transition-all ${
          attending === null
            ? 'bg-gray-300 cursor-not-allowed'
            : isSubmitting
            ? 'bg-holly-700 cursor-wait'
            : 'bg-holly-900 hover:bg-holly-800 shadow-md hover:shadow-lg'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Submitting...</span>
          </span>
        ) : (
          'Submit RSVP'
        )}
      </button>
    </div>
  )
}
