import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

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

    // TODO: Integrate with email service (Resend/SendGrid)
    // await sendEmail({
    //   to: "contact@ideatys.digital",
    //   subject: `Nouvelle demande de devis - ${data.fullName}`,
    //   html: `
    //     <h2>Nouvelle demande de devis</h2>
    //     <p><strong>Nom:</strong> ${data.fullName}</p>
    //     <p><strong>Email:</strong> ${data.email}</p>
    //     <p><strong>Téléphone:</strong> ${data.phone || "Non renseigné"}</p>
    //     <p><strong>Entreprise:</strong> ${data.company || "Non renseigné"}</p>
    //     <p><strong>Service:</strong> ${data.service}</p>
    //     <p><strong>Budget:</strong> ${data.budget || "Non renseigné"}</p>
    //     <p><strong>Message:</strong> ${data.message}</p>
    //   `,
    // });

    console.log("📩 Nouvelle demande de contact:", {
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
