import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const service = await prisma.service.create({
      data: {
        title: body.title,
        slug: body.slug,
        shortDesc: body.shortDesc,
        description: body.description,
        icon: body.icon,
        features: body.features || [],
        published: body.published ?? true,
        order: body.order || 0,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création" },
      { status: 500 }
    );
  }
}
