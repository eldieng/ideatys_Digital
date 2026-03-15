import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    const email = "admin@ideatysdigital.com";
    const password = "Admin@2026!";
    const name = "Admin IDEATYS";

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "L'utilisateur admin existe déjà" },
        { status: 200 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "ADMIN",
      },
    });

    return NextResponse.json({
      message: "Utilisateur admin créé avec succès",
      email: user.email,
      password: password,
      warning: "Changez ce mot de passe après la première connexion !",
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'admin" },
      { status: 500 }
    );
  }
}
