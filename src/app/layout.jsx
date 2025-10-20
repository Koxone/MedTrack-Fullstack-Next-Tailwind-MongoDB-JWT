import "./globals.css";

export const metadata = {
  title: "MedTrack - Control Médico Inteligente",
  description: "Aplicación médica para control de peso, historial clínico, citas y dietas personalizadas",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  themeColor: "#3b82f6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MedTrack",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

