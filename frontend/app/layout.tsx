import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AISSIA SÉCURITÉ - Excellence en Sécurité Privée",
  description: "AISSIA SÉCURITÉ, votre partenaire de confiance pour tous vos besoins en sécurité privée et formation professionnelle.",
  keywords: "sécurité, sécurité privée, agent de sécurité, formation sécurité, gardiennage, AISSIA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen antialiased font-sans">{children}</body>
    </html>
  );
}
