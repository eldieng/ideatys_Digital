import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Shield, Users as UsersIcon } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

const roleLabels = {
  ADMIN: "Administrateur",
  COMMUNITY_MANAGER: "Community Manager",
  EDITOR: "Éditeur",
};

const roleColors = {
  ADMIN: "bg-red-100 text-red-700",
  COMMUNITY_MANAGER: "bg-blue-100 text-blue-700",
  EDITOR: "bg-green-100 text-green-700",
};

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-600 mt-1">Gérez les utilisateurs et leurs rôles</p>
        </div>
        <Link
          href="/admin/users/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouvel utilisateur
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                Utilisateur
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                Rôle
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                Date de création
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                      {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name || "Sans nom"}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${roleColors[user.role]}`}>
                    <Shield className="w-3 h-3" />
                    {roleLabels[user.role]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="p-2 text-gray-400 hover:text-accent transition-colors"
                      title="Modifier"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteButton
                      id={user.id}
                      endpoint="/api/admin/users"
                      itemName="cet utilisateur"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="p-12 text-center">
            <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun utilisateur</p>
          </div>
        )}
      </div>
    </div>
  );
}
