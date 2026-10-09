import { NextRequest, NextResponse } from "next/server";
import { denyUnless, isDenied } from "@/lib/admin-auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const access = await denyUnless("admin");
  if (isDenied(access)) return access;

  const factures = await prisma.facture.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(factures);
}

export async function POST(request: NextRequest) {
  const access = await denyUnless("admin");
  if (isDenied(access)) return access;

  try {
    const data = await request.json();

    // Generate unique number
    const year = new Date().getFullYear();
    const count = await prisma.facture.count({
      where: {
        numero: {
          startsWith: `FAC-${year}`,
        },
      },
    });
    const numero = `FAC-${year}-${String(count + 1).padStart(4, "0")}`;

    const facture = await prisma.facture.create({
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
        echeance: new Date(data.echeance),
        notes: data.notes || null,
        status: "EN_ATTENTE",
      },
    });

    return NextResponse.json(facture, { status: 201 });
  } catch (error) {
    console.error("Error creating facture:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la facture" },
      { status: 500 }
    );
  }
}
