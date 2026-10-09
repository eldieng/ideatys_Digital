import { NextRequest, NextResponse } from "next/server";
import { denyUnless, isDenied } from "@/lib/admin-auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const access = await denyUnless("admin");
  if (isDenied(access)) return access;

  const devis = await prisma.devis.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(devis);
}

export async function POST(request: NextRequest) {
  const access = await denyUnless("admin");
  if (isDenied(access)) return access;

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
