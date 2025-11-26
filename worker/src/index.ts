import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  RSVPS: KVNamespace
  ADMIN_KEY: string
}

type RsvpData = {
  attending: boolean
  guests: number
  timestamp: string
}

type RsvpRequest = {
  inviteId: string
  attending: boolean
  guests: number
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS middleware - allow all origins (can be restricted to GitHub Pages URL if needed)
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}))

// Add Referrer-Policy header to all responses
app.use('/*', async (c, next) => {
  await next()
  c.header('Referrer-Policy', 'no-referrer')
})

// UUID validation regex
const UUID_REGEX = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i

// Health check endpoint
app.get('/', (c) => c.json({ status: 'ok' }))

// POST /rsvp - Submit RSVP
app.post('/rsvp', async (c) => {
  try {
    const body = await c.req.json<RsvpRequest>()

    // Validate request body
    if (!body.inviteId || typeof body.attending !== 'boolean' || typeof body.guests !== 'number') {
      return c.json({ success: false, error: 'Invalid request body. Required: inviteId, attending, guests' }, 400)
    }

    // Validate inviteId is UUID format
    if (!UUID_REGEX.test(body.inviteId)) {
      return c.json({ success: false, error: 'Invalid inviteId format. Must be a valid UUID' }, 400)
    }

    // Validate guests is a non-negative integer
    if (body.guests < 0 || !Number.isInteger(body.guests)) {
      return c.json({ success: false, error: 'guests must be a non-negative integer' }, 400)
    }

    // Store in KV
    const rsvpData: RsvpData = {
      attending: body.attending,
      guests: body.guests,
      timestamp: new Date().toISOString()
    }

    const key = `rsvp:${body.inviteId}`
    await c.env.RSVPS.put(key, JSON.stringify(rsvpData))

    return c.json({ success: true })
  } catch (error) {
    console.error('Error processing RSVP:', error)
    return c.json({ success: false, error: 'Failed to process RSVP' }, 500)
  }
})

// GET /admin - List all RSVPs with summary
app.get('/admin', async (c) => {
  try {
    // Check admin key
    const key = c.req.query('key')
    if (!key || key !== c.env.ADMIN_KEY) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    // List all keys with prefix "rsvp:"
    const list = await c.env.RSVPS.list({ prefix: 'rsvp:' })

    // Fetch all RSVPs
    const rsvps = await Promise.all(
      list.keys.map(async (key) => {
        const value = await c.env.RSVPS.get(key.name)
        if (!value) return null

        const data = JSON.parse(value) as RsvpData
        const inviteId = key.name.replace('rsvp:', '')

        return {
          id: inviteId,
          attending: data.attending,
          guests: data.guests,
          timestamp: data.timestamp
        }
      })
    )

    // Filter out null values
    const validRsvps = rsvps.filter((rsvp): rsvp is NonNullable<typeof rsvp> => rsvp !== null)

    // Calculate summary
    const summary = {
      total: validRsvps.length,
      attending: validRsvps.filter(r => r.attending).length,
      notAttending: validRsvps.filter(r => !r.attending).length,
      totalGuests: validRsvps.filter(r => r.attending).reduce((sum, r) => sum + r.guests, 0)
    }

    return c.json({
      summary,
      rsvps: validRsvps
    })
  } catch (error) {
    console.error('Error fetching admin data:', error)
    return c.json({ error: 'Failed to fetch RSVP data' }, 500)
  }
})

export default app
