import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Eye, EyeOff } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function ArticlesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
          <p className="text-gray-600 mt-1">Gérez les articles du blog</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouvel article
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {articles.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">Aucun article pour le moment</p>
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 mt-4 text-accent hover:underline"
            >
              <Plus className="w-4 h-4" />
              Créer votre premier article
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{article.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-md">
                        {article.excerpt}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {article.published ? (
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
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(article.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="p-2 text-gray-400 hover:text-accent transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteButton
                        id={article.id}
                        type="articles"
                        title={article.title}
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
