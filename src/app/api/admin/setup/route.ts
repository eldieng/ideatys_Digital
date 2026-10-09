import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Non autorisé" }, { status: 404 });
}
