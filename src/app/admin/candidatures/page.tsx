import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Eye, Mail, Phone, Calendar, FileText, Link as LinkIcon } from "lucide-react";

const statusColors = {
  NOUVELLE: "bg-blue-100 text-blue-700",
  EN_COURS: "bg-yellow-100 text-yellow-700",
  ENTRETIEN: "bg-purple-100 text-purple-700",
  ACCEPTEE: "bg-green-100 text-green-700",
  REFUSEE: "bg-red-100 text-red-700",
  ARCHIVEE: "bg-gray-100 text-gray-500",
};

const statusLabels = {
  NOUVELLE: "Nouvelle",
  EN_COURS: "En cours",
  ENTRETIEN: "Entretien",
  ACCEPTEE: "Acceptée",
  REFUSEE: "Refusée",
  ARCHIVEE: "Archivée",
};

export default async function CandidaturesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const candidatures = await prisma.candidature.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Candidatures</h1>
        <p className="text-gray-600 mt-1">Gérez les candidatures reçues</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {candidatures.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">Aucune candidature pour le moment</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {candidatures.map((candidature) => (
              <div key={candidature.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{candidature.nom}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[candidature.status]}`}>
                        {statusLabels[candidature.status]}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {candidature.email}
                      </span>
                      {candidature.telephone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {candidature.telephone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(candidature.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded bg-accent/10 text-accent">
                        {candidature.poste}
                      </span>
                      {candidature.cv && (
                        <a
                          href={candidature.cv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          <FileText className="w-3 h-3" />
                          CV
                        </a>
                      )}
                      {candidature.portfolio && (
                        <a
                          href={candidature.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          <LinkIcon className="w-3 h-3" />
                          Portfolio
                        </a>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">{candidature.message}</p>
                  </div>
                  
                  <Link
                    href={`/admin/candidatures/${candidature.id}`}
                    className="ml-4 p-2 text-gray-400 hover:text-accent transition-colors"
                    title="Voir les détails"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
