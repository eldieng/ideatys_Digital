"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { use } from "react";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: "ADMIN" | "COMMUNITY_MANAGER" | "EDITOR";
}

const roleOptions = [
  { value: "ADMIN", label: "Administrateur" },
  { value: "COMMUNITY_MANAGER", label: "Community Manager" },
  { value: "EDITOR", label: "Éditeur" },
];

export default function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { status } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/admin/users/${id}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setError("Utilisateur non trouvé");
        }
      } catch {
        setError("Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setError("");

    if (newPassword && newPassword.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          role: user.role,
          password: newPassword || undefined,
        }),
      });

      if (res.ok) {
        router.push("/admin/users");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Erreur lors de la mise à jour");
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || "Utilisateur non trouvé"}</p>
        <Link href="/admin/users" className="text-accent hover:underline mt-4 inline-block">
          Retour aux utilisateurs
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux utilisateurs
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Modifier l&apos;utilisateur</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              value={user.name || ""}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              minLength={8}
              placeholder="Laisser vide pour ne pas changer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rôle *
            </label>
            <select
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value as User["role"] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-gray-500">
              <strong>Administrateur</strong> : Accès complet à toutes les fonctionnalités<br />
              <strong>Community Manager</strong> : Gestion des articles de blog uniquement<br />
              <strong>Éditeur</strong> : Création et modification de contenu
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin/users"
            className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Enregistrer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
