import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, FileText, Download, Eye } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

const statusColors: Record<string, string> = {
  EN_ATTENTE: "bg-yellow-100 text-yellow-800",
  PAYEE: "bg-green-100 text-green-800",
  PARTIELLEMENT_PAYEE: "bg-blue-100 text-blue-800",
  EN_RETARD: "bg-red-100 text-red-800",
  ANNULEE: "bg-gray-100 text-gray-800",
};

const statusLabels: Record<string, string> = {
  EN_ATTENTE: "En attente",
  PAYEE: "Payée",
  PARTIELLEMENT_PAYEE: "Partiellement payée",
  EN_RETARD: "En retard",
  ANNULEE: "Annulée",
};

export default async function FacturesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const factures = await prisma.facture.findMany({
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

  const totalEnAttente = factures
    .filter((f) => f.status === "EN_ATTENTE" || f.status === "EN_RETARD")
    .reduce((sum, f) => sum + f.total, 0);

  const totalPayee = factures
    .filter((f) => f.status === "PAYEE")
    .reduce((sum, f) => sum + f.total, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Factures</h1>
          <p className="text-gray-600">Gérez vos factures clients</p>
        </div>
        <Link
          href="/admin/factures/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouvelle facture
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total factures</p>
          <p className="text-2xl font-bold text-primary">{factures.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600">En attente</p>
          <p className="text-2xl font-bold text-yellow-600">
            {factures.filter((f) => f.status === "EN_ATTENTE").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Montant à recevoir</p>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(totalEnAttente)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Montant encaissé</p>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(totalPayee)}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {factures.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune facture pour le moment</p>
            <Link
              href="/admin/factures/new"
              className="inline-flex items-center gap-2 mt-4 text-accent hover:underline"
            >
              <Plus className="w-4 h-4" />
              Créer votre première facture
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
                    Échéance
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
                {factures.map((facture) => (
                  <tr key={facture.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono font-semibold text-primary">
                        {facture.numero}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {facture.clientNom}
                        </p>
                        {facture.clientEntreprise && (
                          <p className="text-sm text-gray-500">
                            {facture.clientEntreprise}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(facture.total)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {formatDate(facture.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {formatDate(facture.echeance)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          statusColors[facture.status]
                        }`}
                      >
                        {statusLabels[facture.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/factures/${facture.id}`}
                          className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                          title="Voir / Modifier"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <a
                          href={`/api/admin/factures/${facture.id}/pdf`}
                          className="p-2 text-gray-600 hover:text-accent hover:bg-gray-100 rounded-lg transition-colors"
                          title="Télécharger PDF"
                          target="_blank"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <DeleteButton
                          id={facture.id}
                          endpoint="/api/admin/factures"
                          itemName="cette facture"
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
