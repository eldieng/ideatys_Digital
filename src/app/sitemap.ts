import { MetadataRoute } from "next";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { isConstructionHost } from "@/lib/hosts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host") ?? "test.ideatysdigital.com";
  const hostname = host.split(":")[0];

  if (isConstructionHost(hostname)) {
    return [
      {
        url: `https://${hostname}/en-construction`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1,
      },
    ];
  }

  const baseUrl = `https://${hostname}`;
  const [services, articles, realisations] = await Promise.all([
    prisma.service.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.article.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.realisation.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

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

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...realisations.map((realisation) => ({
      url: `${baseUrl}/realisations/${realisation.slug}`,
      lastModified: realisation.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
