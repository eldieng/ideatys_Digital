import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { isConstructionHost } from "@/lib/hosts";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? "";
  const hostname = host.split(":")[0];

  if (isConstructionHost(hostname)) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `https://${hostname}/sitemap.xml`,
  };
}
