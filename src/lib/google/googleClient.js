import { google } from 'googleapis';

export function getGoogleOAuthClient() {
  const isServiceAccount = !!process.env.GOOGLE_CLIENT_EMAIL;

  if (isServiceAccount) {
    return new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/calendar']
    );
  }

  // Modo desarrollo (OAuth)
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}
