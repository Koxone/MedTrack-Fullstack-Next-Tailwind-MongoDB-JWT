import { google } from 'googleapis';
import { getGoogleOAuthClient } from '@/lib/google/googleClient';

// @route    GET /api/google/calendar/appointments
// @desc     Get appointments (both specialties)
// @access   Private
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const specialty = searchParams.get('specialty') || 'weight';

    const auth = getGoogleOAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const calendarId =
      specialty === 'weight'
        ? process.env.GOOGLE_CALENDAR_ID_WEIGHT
        : process.env.GOOGLE_CALENDAR_ID_DENTAL;

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const monthFromNow = new Date(now);
    monthFromNow.setDate(now.getDate() + 30);

    const response = await calendar.events.list({
      calendarId,
      timeMin: now.toISOString(),
      timeMax: monthFromNow.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      timeZone: 'America/Mexico_City',
    });

    return Response.json({
      success: true,
      events: response.data.items || [],
    });
  } catch (error) {
    console.error('Error listing events:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
