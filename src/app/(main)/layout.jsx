import Sidebar from '@/components/general/nav/sidebar/SideBar';
import Header from '@/components/general/nav/Header';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export const runtime = 'nodejs';

export const metadata = {
  title: 'MedTrack',
  description: 'Medical management platform',
};

export default async function MainRootLayout({ children }) {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  console.log(role);
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  let type = 'guest';

  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      type = decoded.role || 'guest';
    } catch (error) {
      console.error('JWT verify error:', error);
      type = 'guest';
    }
  }
  return (
    <div>
      <div className="grid grid-rows-[auto_1fr]">
        <Header type={type} />
        <main className="grid grid-cols-[auto_1fr]">
          <Sidebar />
          <div className="mx-auto min-h-screen w-full max-w-7xl overflow-y-auto p-6 pb-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
