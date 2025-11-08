import { google } from 'googleapis';
import { getGoogleOAuthClient } from '@/lib/google/googleClient';

// @route    GET /api/google/calendar/appointments/all
// @desc     Get all appointments from all specialties
// @access   Private
export async function GET() {
  try {
    const oauth2Client = getGoogleOAuthClient();
    oauth2Client.setCredentials({
      access_token: process.env.GOOGLE_ACCESS_TOKEN,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const monthFromNow = new Date();
    monthFromNow.setDate(now.getDate() + 30);

    const [weightRes, dentalRes] = await Promise.all([
      calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID_WEIGHT,
        timeMin: now.toISOString(),
        timeMax: monthFromNow.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: 'America/Mexico_City',
      }),
      calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID_DENTAL,
        timeMin: now.toISOString(),
        timeMax: monthFromNow.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: 'America/Mexico_City',
      }),
    ]);

    return Response.json({
      success: true,
      weightEvents: weightRes.data.items || [],
      dentalEvents: dentalRes.data.items || [],
    });
  } catch (error) {
    console.error('Error listing events:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
