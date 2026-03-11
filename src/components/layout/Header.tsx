"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Aller au contenu principal
      </a>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
      >
      <Container>
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative z-50 shrink-0">
            <Image
              src="/img/ideatysdigital_logo_sans_fond.png"
              alt="IDEATYS Digital"
              width={200}
              height={56}
              className="h-23 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Hidden in presentation mode */}
          {!siteConfig.PRESENTATION_MODE && (
            <div className="hidden lg:flex items-center gap-8">
              {mainNavigation
                .filter((item) => item.label !== "Accueil")
                .map((item) => (
                  <div
                    key={item.href}
                    className="relative group"
                    onMouseEnter={() =>
                      item.children && setOpenDropdown(item.label)
                    }
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors duration-200 flex items-center gap-1",
                        isActive(item.href)
                          ? "text-accent"
                          : "text-primary hover:text-accent"
                      )}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                      )}
                    </Link>

                    {/* Dropdown */}
                    {item.children && openDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-2 animate-slide-down">
                        <div className="bg-white rounded-xl shadow-xl border border-gray/50 py-2 min-w-[220px]">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-gray-dark hover:text-accent hover:bg-gray-light transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

              <Button href="/contact" variant="primary" size="sm">
                Demander un devis
              </Button>
            </div>
          )}

          {/* Mobile Menu Button - Hidden in presentation mode */}
          {!siteConfig.PRESENTATION_MODE && (
            <button
              className="lg:hidden relative z-50 p-2 text-primary"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}

          {/* Mobile Menu Overlay */}
          {!siteConfig.PRESENTATION_MODE && isOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-2xl animate-slide-down">
                <div className="pt-24 px-6 pb-6 h-full overflow-y-auto">
                  <div className="flex flex-col gap-1">
                    {mainNavigation.map((item) => (
                      <div key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "block py-3 text-base font-medium transition-colors",
                            isActive(item.href)
                              ? "text-accent"
                              : "text-primary hover:text-accent"
                          )}
                        >
                          {item.label}
                        </Link>
                        {item.children && (
                          <div className="pl-4 border-l-2 border-gray ml-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 text-sm text-gray-dark hover:text-accent transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Button
                      href="/contact"
                      variant="primary"
                      size="md"
                      className="w-full"
                    >
                      Demander un devis
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </Container>
      </header>
    </>
  );
}
