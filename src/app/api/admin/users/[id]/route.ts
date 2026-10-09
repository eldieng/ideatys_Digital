import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { denyUnless, isDenied, isStaffRole } from "@/lib/admin-auth";
import bcrypt from "bcryptjs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await denyUnless("admin");
  if (isDenied(access)) return access;

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await denyUnless("admin");
  if (isDenied(access)) return access;

  const { id } = await params;
  const data = await request.json();

  if (data.role !== undefined && !isStaffRole(data.role)) {
    return NextResponse.json({ error: "Rôle invalide" }, { status: 400 });
  }

  if (
    data.password &&
    (typeof data.password !== "string" ||
      (data.password.trim() !== "" && data.password.length < 12))
  ) {
    return NextResponse.json(
      { error: "Le mot de passe doit contenir au moins 12 caractères" },
      { status: 400 }
    );
  }

  // Vérifier si l'email existe déjà pour un autre utilisateur
  if (data.email) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email,
        NOT: { id },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Un utilisateur avec cet email existe déjà" },
        { status: 400 }
      );
    }
  }

  const updateData: Record<string, unknown> = {
    name: data.name,
    email: data.email,
    role: data.role,
  };

  // Si un nouveau mot de passe est fourni, le hasher
  if (data.password && data.password.trim() !== "") {
    updateData.password = await bcrypt.hash(data.password, 12);
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await denyUnless("admin");
  if (isDenied(access)) return access;

  const { id } = await params;

  // Empêcher la suppression de son propre compte
  if (access.user?.email) {
    const currentUser = await prisma.user.findUnique({
      where: { email: access.user.email },
    });

    if (currentUser?.id === id) {
      return NextResponse.json(
        { error: "Vous ne pouvez pas supprimer votre propre compte" },
        { status: 400 }
      );
    }
  }

  await prisma.user.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
