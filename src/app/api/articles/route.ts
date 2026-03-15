import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      author: true,
      readTime: true,
      image: true,
      createdAt: true,
    },
  });

  return NextResponse.json(articles);
}
