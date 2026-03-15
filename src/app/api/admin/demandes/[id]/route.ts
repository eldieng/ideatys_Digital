import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  const demande = await prisma.demandeDevis.findUnique({
    where: { id },
  });

  if (!demande) {
    return NextResponse.json({ error: "Demande non trouvée" }, { status: 404 });
  }

  return NextResponse.json(demande);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const data = await request.json();

  const demande = await prisma.demandeDevis.update({
    where: { id },
    data: {
      status: data.status,
      notes: data.notes,
    },
  });

  return NextResponse.json(demande);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.demandeDevis.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
