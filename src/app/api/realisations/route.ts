import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const realisations = await prisma.realisation.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(realisations);
}
