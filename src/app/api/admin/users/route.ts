import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { denyUnless, isDenied, isStaffRole } from "@/lib/admin-auth";
import bcrypt from "bcryptjs";

export async function GET() {
  const access = await denyUnless("admin");
  if (isDenied(access)) return access;

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const access = await denyUnless("admin");
  if (isDenied(access)) return access;

  const data = await request.json();

  if (!isStaffRole(data.role)) {
    return NextResponse.json({ error: "Rôle invalide" }, { status: 400 });
  }

  if (typeof data.password !== "string" || data.password.length < 12) {
    return NextResponse.json(
      { error: "Le mot de passe doit contenir au moins 12 caractères" },
      { status: 400 }
    );
  }

  if (typeof data.email !== "string" || !data.email.includes("@")) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  // Vérifier si l'email existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "Un utilisateur avec cet email existe déjà" },
      { status: 400 }
    );
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
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
