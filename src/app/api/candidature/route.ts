import { NextRequest, NextResponse } from "next/server";
import { candidatureSchema } from "@/lib/validation";
import prisma from "@/lib/prisma";

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 3;
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

    const formData = await request.formData();

    const body = {
      lastName: formData.get("lastName") as string,
      firstName: formData.get("firstName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      position: formData.get("position") as string,
      experience: formData.get("experience") as string,
      motivation: formData.get("motivation") as string,
      portfolioUrl: (formData.get("portfolioUrl") as string) || "",
      consent: formData.get("consent") === "true",
      honeypot: (formData.get("honeypot") as string) || "",
    };

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    const result = candidatureSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const cvFile = formData.get("cv") as File | null;

    if (!cvFile) {
      return NextResponse.json(
        { error: "Le CV est obligatoire." },
        { status: 400 }
      );
    }

    if (cvFile.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Le CV doit être au format PDF." },
        { status: 400 }
      );
    }

    if (cvFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Le CV ne doit pas dépasser 5 Mo." },
        { status: 400 }
      );
    }

    const data = result.data;

    // TODO: Upload CV to cloud storage (Cloudinary/S3)
    // Pour l'instant, on ne stocke pas le fichier CV
    // const cvUrl = await uploadFile(cvFile);

    // Sauvegarder dans la base de données
    await prisma.candidature.create({
      data: {
        nom: `${data.firstName} ${data.lastName}`,
        email: data.email,
        telephone: data.phone || null,
        poste: data.position,
        portfolio: data.portfolioUrl || null,
        message: data.motivation,
        // cv: cvUrl, // À activer quand l'upload sera implémenté
      },
    });

    console.log("👤 Nouvelle candidature enregistrée:", {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      position: data.position,
      cvSize: `${(cvFile.size / 1024).toFixed(0)} KB`,
    });

    return NextResponse.json({
      success: true,
      message:
        "Votre candidature a été envoyée avec succès. Nous vous recontacterons dans les meilleurs délais.",
    });
  } catch (error) {
    console.error("Erreur API candidature:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
