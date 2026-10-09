import { getServerSession, type Session } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

const STAFF_ROLES = ["ADMIN", "COMMUNITY_MANAGER", "EDITOR"] as const;

export type StaffRole = (typeof STAFF_ROLES)[number];

export function isStaffRole(value: unknown): value is StaffRole {
  return typeof value === "string" && (STAFF_ROLES as readonly string[]).includes(value);
}

export async function denyUnless(gate: "staff" | "admin" = "staff") {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  if (gate === "admin" && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  return session;
}

export function isDenied(result: Session | NextResponse): result is NextResponse {
  return result instanceof NextResponse;
}
