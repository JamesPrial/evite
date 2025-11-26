import type { ReactNode } from 'react'

interface EventCardProps {
  children: ReactNode
}

export function EventCard({ children }: EventCardProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Decorative Header */}
      <div className="bg-holly-900 px-6 py-8 text-center">
        <p className="text-gold-400 font-body text-sm tracking-wide uppercase mb-2">
          You're Invited
        </p>
        <h1 className="text-white font-display text-3xl md:text-4xl">
          Girl's Christmas Party
        </h1>
      </div>

      {/* Event Details */}
      <div className="px-6 py-6 space-y-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-cranberry-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div>
            <p className="font-body text-gray-800 text-base">Saturday, December 14th</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-cranberry-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-body text-gray-800 text-base">2:00 PM</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-cranberry-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <p className="font-body text-gray-800 text-base">Mom's House</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200" />

      {/* Children (RSVP Form) */}
      <div className="px-6 py-6">
        {children}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-cream text-center">
        <p className="font-body text-sm text-gray-600">
          Please respond by <span className="font-semibold text-cranberry-600">December 10th</span>
        </p>
      </div>
    </div>
  )
}
