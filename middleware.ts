import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Mode présentation : redirige toutes les pages sauf l'accueil vers /en-construction
const PRESENTATION_MODE = false;

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
  if (!PRESENTATION_MODE) {
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
