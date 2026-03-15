import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Eye, Mail, Phone, Building, Calendar } from "lucide-react";

const statusColors = {
  NOUVELLE: "bg-blue-100 text-blue-700",
  EN_COURS: "bg-yellow-100 text-yellow-700",
  TRAITEE: "bg-green-100 text-green-700",
  ARCHIVEE: "bg-gray-100 text-gray-500",
};

const statusLabels = {
  NOUVELLE: "Nouvelle",
  EN_COURS: "En cours",
  TRAITEE: "Traitée",
  ARCHIVEE: "Archivée",
};

export default async function DemandesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const demandes = await prisma.demandeDevis.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Demandes de devis</h1>
        <p className="text-gray-600 mt-1">Gérez les demandes de devis reçues</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {demandes.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">Aucune demande de devis pour le moment</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {demandes.map((demande) => (
              <div key={demande.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{demande.nom}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[demande.status]}`}>
                        {statusLabels[demande.status]}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {demande.email}
                      </span>
                      {demande.telephone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {demande.telephone}
                        </span>
                      )}
                      {demande.entreprise && (
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {demande.entreprise}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(demande.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded bg-accent/10 text-accent">
                        {demande.service}
                      </span>
                      {demande.budget && (
                        <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600">
                          Budget: {demande.budget}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">{demande.message}</p>
                  </div>
                  
                  <Link
                    href={`/admin/demandes/${demande.id}`}
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
