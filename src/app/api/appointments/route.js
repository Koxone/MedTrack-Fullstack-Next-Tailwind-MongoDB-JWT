// /src/app/api/appointments/route.js
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// auth
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });
const calendarId = 'jcdeleonozuna@gmail.com'; 

// GET - obtener todas las citas
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeMin = searchParams.get('timeMin') || new Date('2024-01-01').toISOString();
    const timeMax = searchParams.get('timeMax') || new Date('2026-01-01').toISOString();

    const res = await calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return NextResponse.json(res.data.items, { status: 200 });
  } catch (error) {
    console.error('Error en GET /api/appointments:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - crear cita
export async function POST(request) {
  try {
    const body = await request.json();
    const { summary, description, start, end } = body;

    if (!summary || !start || !end) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const event = {
      summary,
      description: description || '',
      start: { dateTime: start, timeZone: 'America/Mexico_City' },
      end: { dateTime: end, timeZone: 'America/Mexico_City' },
    };

    const res = await calendar.events.insert({ calendarId, resource: event });
    return NextResponse.json(res.data, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/appointments:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - modificar cita
export async function PUT(request) {
  try {
    const body = await request.json();
    const { eventId, summary, description, start, end } = body;

    if (!eventId) {
      return NextResponse.json({ error: 'Falta eventId' }, { status: 400 });
    }

    const updatedEvent = {
      summary,
      description,
      start: { dateTime: start, timeZone: 'America/Mexico_City' },
      end: { dateTime: end, timeZone: 'America/Mexico_City' },
    };

    const res = await calendar.events.update({
      calendarId,
      eventId,
      resource: updatedEvent,
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.error('Error en PUT /api/appointments:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - eliminar cita
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json({ error: 'Falta eventId' }, { status: 400 });
    }

    await calendar.events.delete({ calendarId, eventId });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error en DELETE /api/appointments:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
