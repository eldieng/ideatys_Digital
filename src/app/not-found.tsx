import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <MainLayout>
      <section className="py-20 md:py-28 min-h-[70vh] flex items-center bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-8xl md:text-9xl font-bold text-accent/20">
              404
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mt-4">
              Page introuvable
            </h1>
            <p className="mt-4 text-lg text-gray-dark">
              La page que vous recherchez n&apos;existe pas ou a été déplacée.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/"
                variant="primary"
                size="md"
                icon={<Home className="w-4 h-4" />}
              >
                Retour à l&apos;accueil
              </Button>
              <Button href="/services" variant="outline" size="md">
                Nos services
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-gray">
              <p className="text-sm text-gray-medium mb-4">
                Pages populaires :
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "Services", href: "/services" },
                  { label: "Réalisations", href: "/realisations" },
                  { label: "Blog", href: "/blog" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 rounded-full text-sm border border-gray text-gray-dark hover:border-accent hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}
