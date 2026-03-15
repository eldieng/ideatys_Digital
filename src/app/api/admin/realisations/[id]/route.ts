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

  const realisation = await prisma.realisation.findUnique({
    where: { id },
  });

  if (!realisation) {
    return NextResponse.json({ error: "Réalisation non trouvée" }, { status: 404 });
  }

  return NextResponse.json(realisation);
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

  try {
    const body = await request.json();

    const realisation = await prisma.realisation.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        category: body.category,
        client: body.client,
        year: body.year,
        image: body.image,
        gallery: body.gallery,
        technologies: body.technologies,
        published: body.published,
        featured: body.featured,
      },
    });

    return NextResponse.json(realisation);
  } catch (error) {
    console.error("Error updating realisation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
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

  try {
    await prisma.realisation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting realisation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
