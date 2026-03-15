import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import prisma from "@/lib/prisma";

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requests = requestLog.get(ip) || [];
  const recent = requests.filter((t) => now - t < RATE_LIMIT_WINDOW);
  requestLog.set(ip, recent);
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez réessayer dans quelques minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Sauvegarder dans la base de données
    await prisma.demandeDevis.create({
      data: {
        nom: data.fullName,
        email: data.email,
        telephone: data.phone || null,
        entreprise: data.company || null,
        service: data.service,
        budget: data.budget || null,
        message: data.message,
      },
    });

    console.log("📩 Nouvelle demande de devis enregistrée:", {
      name: data.fullName,
      email: data.email,
      service: data.service,
    });

    return NextResponse.json({
      success: true,
      message: "Votre demande a été envoyée avec succès. Nous vous répondrons sous 24h.",
    });
  } catch (error) {
    console.error("Erreur API contact:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
