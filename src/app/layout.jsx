import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'MedTrack',
  description: 'Plataforma médica moderna',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
