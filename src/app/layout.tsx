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
    "Agence digitale à Dakar, Sénégal. Création de sites web, stratégie digitale, community management, production audiovisuelle et design graphique. Transformez vos idées en solutions digitales performantes.",
  keywords: [
    "agence digitale Dakar",
    "agence de communication Dakar",
    "agence de communication digitale Dakar",
    "agence marketing Dakar",
    "agence marketing digital Sénégal",
    "agence web Sénégal",
    "création site web Dakar",
    "développement web Sénégal",
    "community management Dakar",
    "design graphique Sénégal",
    "production audiovisuelle Dakar",
    "stratégie digitale Sénégal",
    "branding Dakar",
    "agence communication Afrique",
    "IDEATYS Digital",
  ],
  authors: [{ name: "IDEATYS Digital" }],
  creator: "IDEATYS Digital",
  metadataBase: new URL("https://ideatysdigital.com"),
  openGraph: {
    type: "website",
    locale: "fr_SN",
    siteName: "IDEATYS Digital",
    title: "IDEATYS Digital | Agence Digitale à Dakar, Sénégal",
    description:
      "Agence digitale à Dakar. Création de sites web, community management, production audiovisuelle et design graphique au Sénégal.",
  },
  twitter: {
    card: "summary_large_image",
    title: "IDEATYS Digital | Agence Digitale à Dakar, Sénégal",
    description:
      "Agence digitale à Dakar. Création de sites web, community management, production audiovisuelle et design graphique au Sénégal.",
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
      url: "https://ideatysdigital.com",
      logo: "https://ideatysdigital.com/img/ideatysdigital_logo.jpg",
      description:
        "Agence digitale à Dakar, Sénégal. Spécialisée en création de sites web, stratégie digitale, community management, production audiovisuelle et design graphique.",
      sameAs: [
        "https://www.linkedin.com/company/ideatysdigital/",
        "https://www.facebook.com/ideatys.digital",
        "https://www.instagram.com/ideatysdigital/"
      ],
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
