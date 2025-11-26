export function InvalidInvite() {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="px-6 py-12 text-center space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-cranberry-50 p-3">
            <svg className="w-16 h-16 text-cranberry-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div>
          <h2 className="font-display text-2xl text-gray-800 mb-3">
            Oops! Invalid Invitation
          </h2>
          <p className="font-body text-gray-600 mb-2">
            The invitation link appears to be invalid or has expired.
          </p>
          <p className="font-body text-gray-600">
            Please contact the host for a new invitation link.
          </p>
        </div>

        {/* Decorative Element */}
        <div className="pt-4">
          <div className="inline-block px-4 py-2 bg-cream rounded-lg">
            <p className="font-body text-sm text-gray-500">
              Need help? Reach out to your host
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
