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

  const devis = await prisma.devis.findUnique({
    where: { id },
  });

  if (!devis) {
    return NextResponse.json({ error: "Devis non trouvé" }, { status: 404 });
  }

  return NextResponse.json(devis);
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

    const devis = await prisma.devis.update({
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
        validite: new Date(data.validite),
        notes: data.notes || null,
        status: data.status,
      },
    });

    return NextResponse.json(devis);
  } catch (error) {
    console.error("Error updating devis:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du devis" },
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
    await prisma.devis.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting devis:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du devis" },
      { status: 500 }
    );
  }
}
