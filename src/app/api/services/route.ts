import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(services);
}
