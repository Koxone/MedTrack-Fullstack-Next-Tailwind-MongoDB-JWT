import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'MedTrack',
  description: 'Plataforma médica moderna',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased  overflow-hidden max-h-screen border">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
