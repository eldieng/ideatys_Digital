import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const realisations = await prisma.realisation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(realisations);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const realisation = await prisma.realisation.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        category: body.category,
        client: body.client || null,
        year: body.year || null,
        image: body.image || null,
        gallery: body.gallery || [],
        technologies: body.technologies || [],
        published: body.published || false,
        featured: body.featured || false,
      },
    });

    return NextResponse.json(realisation, { status: 201 });
  } catch (error) {
    console.error("Error creating realisation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création" },
      { status: 500 }
    );
  }
}
