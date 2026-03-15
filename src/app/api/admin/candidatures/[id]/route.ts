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

  const candidature = await prisma.candidature.findUnique({
    where: { id },
  });

  if (!candidature) {
    return NextResponse.json({ error: "Candidature non trouvée" }, { status: 404 });
  }

  return NextResponse.json(candidature);
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

  const candidature = await prisma.candidature.update({
    where: { id },
    data: {
      status: data.status,
      notes: data.notes,
    },
  });

  return NextResponse.json(candidature);
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

  await prisma.candidature.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
