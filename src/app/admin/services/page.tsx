import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Eye, EyeOff, GripVertical } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function ServicesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-1">Gérez les services proposés</p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouveau service
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {services.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">Aucun service pour le moment</p>
            <Link
              href="/admin/services/new"
              className="inline-flex items-center gap-2 mt-4 text-accent hover:underline"
            >
              <Plus className="w-4 h-4" />
              Créer votre premier service
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-12">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Icône
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
              {services.map((service, index) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <GripVertical className="w-4 h-4" />
                      <span>{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{service.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-md">
                        {service.shortDesc}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-mono bg-gray-100 rounded">
                      {service.icon}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {service.published ? (
                      <span className="inline-flex items-center gap-1 text-green-600">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">Actif</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-400">
                        <EyeOff className="w-4 h-4" />
                        <span className="text-sm">Inactif</span>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="p-2 text-gray-400 hover:text-accent transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteButton
                        id={service.id}
                        type="services"
                        title={service.title}
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
