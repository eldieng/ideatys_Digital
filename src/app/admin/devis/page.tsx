import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, FileText, Download, Eye } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

const statusColors: Record<string, string> = {
  BROUILLON: "bg-gray-100 text-gray-800",
  ENVOYE: "bg-blue-100 text-blue-800",
  ACCEPTE: "bg-green-100 text-green-800",
  REFUSE: "bg-red-100 text-red-800",
  EXPIRE: "bg-orange-100 text-orange-800",
};

const statusLabels: Record<string, string> = {
  BROUILLON: "Brouillon",
  ENVOYE: "Envoyé",
  ACCEPTE: "Accepté",
  REFUSE: "Refusé",
  EXPIRE: "Expiré",
};

export default async function DevisPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const devisList = await prisma.devis.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Devis</h1>
          <p className="text-gray-600">Gérez vos devis clients</p>
        </div>
        <Link
          href="/admin/devis/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouveau devis
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total devis</p>
          <p className="text-2xl font-bold text-primary">{devisList.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600">En attente</p>
          <p className="text-2xl font-bold text-blue-600">
            {devisList.filter((d) => d.status === "ENVOYE").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Acceptés</p>
          <p className="text-2xl font-bold text-green-600">
            {devisList.filter((d) => d.status === "ACCEPTE").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Montant total accepté</p>
          <p className="text-2xl font-bold text-accent">
            {formatCurrency(
              devisList
                .filter((d) => d.status === "ACCEPTE")
                .reduce((sum, d) => sum + d.total, 0)
            )}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {devisList.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun devis pour le moment</p>
            <Link
              href="/admin/devis/new"
              className="inline-flex items-center gap-2 mt-4 text-accent hover:underline"
            >
              <Plus className="w-4 h-4" />
              Créer votre premier devis
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Numéro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Validité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {devisList.map((devis) => (
                  <tr key={devis.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono font-semibold text-primary">
                        {devis.numero}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {devis.clientNom}
                        </p>
                        {devis.clientEntreprise && (
                          <p className="text-sm text-gray-500">
                            {devis.clientEntreprise}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(devis.total)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {formatDate(devis.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {formatDate(devis.validite)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          statusColors[devis.status]
                        }`}
                      >
                        {statusLabels[devis.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/devis/${devis.id}`}
                          className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                          title="Voir / Modifier"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <a
                          href={`/api/admin/devis/${devis.id}/pdf`}
                          className="p-2 text-gray-600 hover:text-accent hover:bg-gray-100 rounded-lg transition-colors"
                          title="Télécharger PDF"
                          target="_blank"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <DeleteButton
                          id={devis.id}
                          endpoint="/api/admin/devis"
                          itemName="ce devis"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
