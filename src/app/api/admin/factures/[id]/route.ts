import { NextRequest, NextResponse } from "next/server";
import { denyUnless, isDenied } from "@/lib/admin-auth";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await denyUnless("admin");
  if (isDenied(access)) return access;

  const { id } = await params;

  const facture = await prisma.facture.findUnique({
    where: { id },
  });

  if (!facture) {
    return NextResponse.json({ error: "Facture non trouvée" }, { status: 404 });
  }

  return NextResponse.json(facture);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await denyUnless("admin");
  if (isDenied(access)) return access;

  const { id } = await params;

  try {
    const data = await request.json();

    const facture = await prisma.facture.update({
      where: { id },
      data: {
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
        status: data.status,
      },
    });

    return NextResponse.json(facture);
  } catch (error) {
    console.error("Error updating facture:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la facture" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await denyUnless("admin");
  if (isDenied(access)) return access;

  const { id } = await params;

  try {
    await prisma.facture.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting facture:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la facture" },
      { status: 500 }
    );
  }
}
