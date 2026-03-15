"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

const roleOptions = [
  { value: "ADMIN", label: "Administrateur" },
  { value: "COMMUNITY_MANAGER", label: "Community Manager" },
  { value: "EDITOR", label: "Éditeur" },
];

export default function NewUserPage() {
  const router = useRouter();
  const { status } = useSession();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "COMMUNITY_MANAGER",
  });

  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/users");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Erreur lors de la création");
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setSaving(false);
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900">Nouvel utilisateur</h1>
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
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe *
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              required
              minLength={8}
              placeholder="Minimum 8 caractères"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rôle *
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
                Création...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Créer l&apos;utilisateur
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
