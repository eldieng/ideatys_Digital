import { MetadataRoute } from "next";
import { services } from "@/data/services";

export const dynamic = "force-static";

const baseUrl = "https://ideatys.digital";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/a-propos",
    "/services",
    "/realisations",
    "/blog",
    "/candidature",
    "/contact",
    "/mentions-legales",
    "/politique-confidentialite",
  ];

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page === "" ? 1 : 0.8,
  }));

  return [...staticEntries, ...servicePages];
}
