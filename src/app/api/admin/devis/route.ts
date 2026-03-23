import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const devis = await prisma.devis.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(devis);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Generate unique number
    const year = new Date().getFullYear();
    const count = await prisma.devis.count({
      where: {
        numero: {
          startsWith: `DEV-${year}`,
        },
      },
    });
    const numero = `DEV-${year}-${String(count + 1).padStart(4, "0")}`;

    const devis = await prisma.devis.create({
      data: {
        numero,
        clientNom: data.clientNom,
        clientEmail: data.clientEmail,
        clientTel: data.clientTel || null,
        clientAdresse: data.clientAdresse || null,
        clientEntreprise: data.clientEntreprise || null,
        items: data.items,
        sousTotal: data.sousTotal,
        tva: data.tva || 0,
        total: data.total,
        validite: new Date(data.validite),
        notes: data.notes || null,
        status: "BROUILLON",
      },
    });

    return NextResponse.json(devis, { status: 201 });
  } catch (error) {
    console.error("Error creating devis:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du devis" },
      { status: 500 }
    );
  }
}
