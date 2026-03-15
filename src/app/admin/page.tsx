import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { FileText, FolderOpen, Briefcase, MessageSquare, Users } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const [articlesCount, realisationsCount, servicesCount, demandesCount, candidaturesCount, newDemandesCount, newCandidaturesCount] = await Promise.all([
    prisma.article.count(),
    prisma.realisation.count(),
    prisma.service.count(),
    prisma.demandeDevis.count(),
    prisma.candidature.count(),
    prisma.demandeDevis.count({ where: { status: "NOUVELLE" } }),
    prisma.candidature.count({ where: { status: "NOUVELLE" } }),
  ]);

  const stats = [
    {
      name: "Articles",
      value: articlesCount,
      icon: FileText,
      href: "/admin/articles",
      color: "bg-blue-500",
    },
    {
      name: "Réalisations",
      value: realisationsCount,
      icon: FolderOpen,
      href: "/admin/realisations",
      color: "bg-green-500",
    },
    {
      name: "Services",
      value: servicesCount,
      icon: Briefcase,
      href: "/admin/services",
      color: "bg-purple-500",
    },
    {
      name: "Demandes de devis",
      value: demandesCount,
      icon: MessageSquare,
      href: "/admin/demandes",
      color: "bg-orange-500",
      badge: newDemandesCount > 0 ? newDemandesCount : undefined,
    },
    {
      name: "Candidatures",
      value: candidaturesCount,
      icon: Users,
      href: "/admin/candidatures",
      color: "bg-pink-500",
      badge: newCandidaturesCount > 0 ? newCandidaturesCount : undefined,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Bienvenue, {session.user?.name || session.user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <a
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
          >
            {stat.badge && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {stat.badge}
              </span>
            )}
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/articles/new"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-colors"
          >
            <FileText className="w-5 h-5 text-accent" />
            <span className="font-medium">Nouvel article</span>
          </a>
          <a
            href="/admin/realisations/new"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-colors"
          >
            <FolderOpen className="w-5 h-5 text-accent" />
            <span className="font-medium">Nouvelle réalisation</span>
          </a>
          <a
            href="/admin/services/new"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-colors"
          >
            <Briefcase className="w-5 h-5 text-accent" />
            <span className="font-medium">Nouveau service</span>
          </a>
        </div>
      </div>
    </div>
  );
}
