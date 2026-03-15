import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Eye, EyeOff, Star } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function RealisationsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const realisations = await prisma.realisation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Réalisations</h1>
          <p className="text-gray-600 mt-1">Gérez vos projets et réalisations</p>
        </div>
        <Link
          href="/admin/realisations/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouvelle réalisation
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {realisations.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">Aucune réalisation pour le moment</p>
            <Link
              href="/admin/realisations/new"
              className="inline-flex items-center gap-2 mt-4 text-accent hover:underline"
            >
              <Plus className="w-4 h-4" />
              Créer votre première réalisation
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Projet
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {realisations.map((realisation) => (
                <tr key={realisation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{realisation.title}</p>
                      {realisation.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
                      {realisation.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {realisation.client || "-"}
                  </td>
                  <td className="px-6 py-4">
                    {realisation.published ? (
                      <span className="inline-flex items-center gap-1 text-green-600">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">Publié</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-400">
                        <EyeOff className="w-4 h-4" />
                        <span className="text-sm">Brouillon</span>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/realisations/${realisation.id}`}
                        className="p-2 text-gray-400 hover:text-accent transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteButton
                        id={realisation.id}
                        type="realisations"
                        title={realisation.title}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
