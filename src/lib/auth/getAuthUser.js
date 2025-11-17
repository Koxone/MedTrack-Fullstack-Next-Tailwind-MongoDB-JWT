import jwt from 'jsonwebtoken';
import User from '@/models/User';

export async function getAuthUser(req) {
  // Read cookies
  const cookieHeader = req.headers.get('cookie') || '';
  const refreshToken =
    cookieHeader
      .split('; ')
      .find((c) => c.startsWith('refreshToken='))
      ?.split('=')[1] || null;

  // Read authorization header
  const authHeader = req.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  // Resolve final token
  const token = bearerToken || refreshToken;
  if (!token) return { error: 'Unauthorized', status: 401 };

  // Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return { error: 'Invalid or expired token', status: 401 };
  }

  // Fetch user
  const user = await User.findById(decoded.id);
  if (!user) return { error: 'User not found', status: 404 };

  return { user, userId: user._id, specialty: user.specialty || 'weight' };
}

// Auth
// const auth = await getAuthUser(req);
// if (auth.error) {
//   return NextResponse.json({ error: auth.error }, { status: auth.status });
// }

// const { userId, specialty } = auth;
