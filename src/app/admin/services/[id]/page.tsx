"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { use } from "react";

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDesc: string | null;
  icon: string | null;
  features: string[];
  published: boolean;
  order: number;
}

export default function EditServicePage({
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
  const [service, setService] = useState<Service | null>(null);
  const [featuresInput, setFeaturesInput] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/admin/services/${id}`);
        if (res.ok) {
          const data = await res.json();
          setService(data);
          setFeaturesInput(data.features?.join(", ") || "");
        } else {
          setError("Service non trouvé");
        }
      } catch {
        setError("Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;

    setSaving(true);
    setError("");

    const features = featuresInput
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...service, features }),
      });

      if (res.ok) {
        router.push("/admin/services");
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

  if (!service) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || "Service non trouvé"}</p>
        <Link href="/admin/services" className="text-accent hover:underline mt-4 inline-block">
          Retour aux services
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux services
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Modifier le service</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre *
            </label>
            <input
              type="text"
              value={service.title}
              onChange={(e) => setService({ ...service, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={service.slug}
              onChange={(e) => setService({ ...service, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icône (nom Lucide)
            </label>
            <input
              type="text"
              value={service.icon || ""}
              onChange={(e) => setService({ ...service, icon: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Target, Code, Users, Video, Palette, Printer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordre d&apos;affichage
            </label>
            <input
              type="number"
              value={service.order}
              onChange={(e) => setService({ ...service, order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              min="0"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description courte
          </label>
          <input
            type="text"
            value={service.shortDesc || ""}
            onChange={(e) => setService({ ...service, shortDesc: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Une phrase résumant le service"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description complète *
          </label>
          <textarea
            value={service.description}
            onChange={(e) => setService({ ...service, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            required
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fonctionnalités (séparées par des virgules)
          </label>
          <input
            type="text"
            value={featuresInput}
            onChange={(e) => setFeaturesInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Audit, Stratégie, Mise en œuvre, Optimisation"
          />
        </div>

        <div className="mt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={service.published}
              onChange={(e) => setService({ ...service, published: e.target.checked })}
              className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <span className="text-sm text-gray-700">Service actif</span>
          </label>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin/services"
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
