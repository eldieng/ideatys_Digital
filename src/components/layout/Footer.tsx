"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";
import { footerNavigation } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Simplified footer for presentation mode
  if (siteConfig.PRESENTATION_MODE) {
    return (
      <footer className="bg-primary text-white">
        <div className="py-12">
          <Container>
            <div className="flex flex-col items-center text-center">
              <Link href="/">
                <Image
                  src="/img/ideatysdigital_logo_sans_fond.png"
                  alt="IDEATYS Digital"
                  width={200}
                  height={56}
                  className="h-16 w-auto mb-6 filter-[brightness(0)_invert(1)]"
                />
              </Link>
              <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
                Nous transformons vos idées en solutions digitales performantes
                et durables.
              </p>
              <div className="flex gap-4 mb-8">
                <a
                  href="https://www.linkedin.com/company/ideatysdigital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/ideatys.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/ideatysdigital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
              <p className="text-sm text-white/50">
                &copy; {currentYear} IDEATYS Digital. Tous droits réservés.
              </p>
            </div>
          </Container>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="py-16 border-b border-white/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/">
                <Image
                  src="/img/ideatysdigital_logo_sans_fond.png"
                  alt="IDEATYS Digital"
                  width={200}
                  height={56}
                  className="h-16 w-auto mb-4 filter-[brightness(0)_invert(1)]"
                />
              </Link>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Nous transformons vos idées en solutions digitales performantes
                et durables.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/ideatysdigital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/ideatys.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/ideatysdigital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-base font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                {footerNavigation.services.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entreprise */}
            <div>
              <h3 className="text-base font-semibold mb-6">Entreprise</h3>
              <ul className="space-y-3">
                {footerNavigation.entreprise.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-base font-semibold mb-6">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-accent shrink-0" />
                  <span className="text-sm text-white/70">
                    Adresse de l&apos;agence
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <a
                    href="tel:+221786087014"
                    className="text-sm text-white/70 hover:text-accent transition-colors"
                  >
                    +221 78 608 70 14
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <a
                    href="mailto:ideatysdigital@gmail.com"
                    className="text-sm text-white/70 hover:text-accent transition-colors"
                  >
                    ideatysdigital@gmail.com
                  </a>
                </li>
              </ul>

              {/* Newsletter */}
              <div className="mt-8">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Footer */}
      <div className="py-6">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50">
              &copy; {currentYear} IDEATYS Digital. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/50 hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
