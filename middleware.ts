import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isConstructionHost } from "@/lib/hosts";

// Le domaine principal reste en construction. test.ideatysdigital.com et le local servent le site.

// Pages autorisées en mode présentation (seulement la page en construction et les ressources)
const allowedPaths = [
  "/en-construction",
  "/_next",
  "/api",
  "/img",
  "/favicon",
  "/sitemap.xml",
  "/robots.txt",
  "/admin",
];

export function middleware(request: NextRequest) {
  if (!isConstructionHost(request.headers.get("host"))) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Autoriser les ressources statiques et les pages autorisées
  const isAllowed = allowedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/") || pathname.startsWith(path + ".")
  );

  if (isAllowed) {
    return NextResponse.next();
  }

  // Rediriger vers la page en construction
  return NextResponse.redirect(new URL("/en-construction", request.url));
}

export const config = {
  matcher: [
    // Match all paths except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
