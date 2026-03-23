"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

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
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
      >
      <Container>
        <nav className="flex items-center justify-between h-20 relative">
          {/* Logo */}
          <Link href="/" className="relative z-50 shrink-0">
            <Image
              src="/img/ideatysdigital_logo_sans_fond.png"
              alt="IDEATYS Digital"
              width={200}
              height={56}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Centered, Hidden in presentation mode */}
          {!siteConfig.PRESENTATION_MODE && (
            <div className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
              {mainNavigation
                .filter((item) => !["Accueil", "Candidature", "Contact"].includes(item.label))
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
            </div>
          )}

          {/* Right side actions - Hidden in presentation mode */}
          {!siteConfig.PRESENTATION_MODE && (
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/candidature"
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  isActive("/candidature")
                    ? "text-accent"
                    : "text-primary hover:text-accent"
                )}
              >
                Candidature
              </Link>

              <div className="w-px h-5 bg-gray-300" />

              <Button href="/contact" variant="primary" size="sm" className="whitespace-nowrap">
                Demander un devis
              </Button>
              
              {/* User Auth Section */}
              {session ? (
                <div
                  className="relative"
                  onMouseEnter={() => setShowUserMenu(true)}
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
                      {session.user?.name?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
                    </div>
                    <span className="hidden xl:inline">{session.user?.name?.split(" ")[0]}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute top-full right-0 pt-2 animate-slide-down">
                      <div className="bg-white rounded-xl shadow-xl border border-gray/50 py-2 min-w-[180px]">
                        <Link
                          href="/admin"
                          className="block px-4 py-2.5 text-sm text-gray-dark hover:text-accent hover:bg-gray-light transition-colors"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/admin/login"
                  className="text-sm font-medium text-primary hover:text-accent transition-colors"
                >
                  Connexion
                </Link>
              )}
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
                  <div className="mt-8 space-y-4">
                    <Button
                      href="/contact"
                      variant="primary"
                      size="md"
                      className="w-full"
                    >
                      Demander un devis
                    </Button>
                    
                    {session ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 px-2 py-2">
                          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                            {session.user?.name?.charAt(0).toUpperCase() || <User className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-medium text-primary">{session.user?.name}</p>
                            <p className="text-xs text-gray-500">{session.user?.email}</p>
                          </div>
                        </div>
                        <Link
                          href="/admin"
                          onClick={() => setIsOpen(false)}
                          className="block text-center py-2 text-sm font-medium text-accent hover:underline"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            signOut({ callbackUrl: "/" });
                          }}
                          className="w-full text-center py-2 text-sm font-medium text-red-500 hover:underline flex items-center justify-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Déconnexion
                        </button>
                      </div>
                    ) : (
                      <Link
                        href="/admin/login"
                        onClick={() => setIsOpen(false)}
                        className="block text-center py-2 text-sm font-medium text-primary hover:text-accent transition-colors"
                      >
                        Connexion
                      </Link>
                    )}
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
