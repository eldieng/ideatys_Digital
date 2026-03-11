import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IDEATYS Digital | Agence Digitale Créative",
    template: "%s | IDEATYS Digital",
  },
  description:
    "Nous transformons vos idées en solutions digitales performantes et durables. Stratégie digitale, développement web, community management, production audiovisuelle, design graphique.",
  keywords: [
    "agence digitale",
    "développement web",
    "stratégie digitale",
    "community management",
    "design graphique",
    "production audiovisuelle",
    "branding",
    "IDEATYS Digital",
  ],
  authors: [{ name: "IDEATYS Digital" }],
  creator: "IDEATYS Digital",
  metadataBase: new URL("https://ideatys.digital"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "IDEATYS Digital",
    title: "IDEATYS Digital | Agence Digitale Créative",
    description:
      "Nous transformons vos idées en solutions digitales performantes et durables.",
  },
  twitter: {
    card: "summary_large_image",
    title: "IDEATYS Digital | Agence Digitale Créative",
    description:
      "Nous transformons vos idées en solutions digitales performantes et durables.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/img/ideatysdigital_logo.jpg",
    apple: "/img/ideatysdigital_logo.jpg",
  },
  other: {
    "schema:organization": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "IDEATYS Digital",
      url: "https://ideatys.digital",
      logo: "https://ideatys.digital/img/ideatysdigital_logo.jpg",
      description:
        "Agence digitale créative spécialisée en stratégie digitale, développement web, community management, production audiovisuelle et design graphique.",
      sameAs: [],
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
