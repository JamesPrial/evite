const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export interface RSVPData {
  attending: boolean
  guests: number
}

export interface RSVPResponse {
  success: boolean
  error?: string
}

export async function submitRSVP(inviteId: string, data: RSVPData): Promise<RSVPResponse> {
  const response = await fetch(`${API_URL}/rsvp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inviteId,
      ...data,
    }),
  })

  return response.json()
}
