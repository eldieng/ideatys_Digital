"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  FolderOpen,
  LogOut,
  Settings,
  MessageSquare,
  Users,
  UserCog,
  Receipt,
  FileCheck,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, adminOnly: false },
  { name: "Articles", href: "/admin/articles", icon: FileText, adminOnly: false },
  { name: "Réalisations", href: "/admin/realisations", icon: FolderOpen, adminOnly: false },
  { name: "Services", href: "/admin/services", icon: Briefcase, adminOnly: false },
  { name: "Demandes", href: "/admin/demandes", icon: MessageSquare, adminOnly: false },
  { name: "Devis", href: "/admin/devis", icon: FileCheck, adminOnly: true },
  { name: "Factures", href: "/admin/factures", icon: Receipt, adminOnly: true },
  { name: "Candidatures", href: "/admin/candidatures", icon: Users, adminOnly: false },
  { name: "Utilisateurs", href: "/admin/users", icon: UserCog, adminOnly: true },
  { name: "Paramètres", href: "/admin/settings", icon: Settings, adminOnly: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data } = useSession();
  const isAdmin = data?.user?.role === "ADMIN";
  const items = navigation.filter((item) => isAdmin || !item.adminOnly);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-primary text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin">
          <Image
            src="/img/ideatysdigital_logo_sans_fond.png"
            alt="IDEATYS Digital"
            width={150}
            height={42}
            className="h-10 w-auto filter-[brightness(0)_invert(1)]"
          />
        </Link>
        <p className="text-xs text-white/50 mt-2">Administration</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
