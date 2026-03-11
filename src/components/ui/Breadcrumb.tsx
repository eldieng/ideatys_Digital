import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import Container from "./Container";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://ideatys.digital",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href
          ? { item: `https://ideatys.digital${item.href}` }
          : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Fil d'Ariane" className="py-4 bg-gray-light border-b border-gray/30">
        <Container>
          <ol className="flex items-center gap-1.5 text-sm flex-wrap">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 text-gray-dark hover:text-accent transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Accueil</span>
              </Link>
            </li>
            {items.map((item, index) => (
              <li key={item.label} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-gray-medium" />
                {item.href && index < items.length - 1 ? (
                  <Link
                    href={item.href}
                    className="text-gray-dark hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-primary font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </nav>
    </>
  );
}
