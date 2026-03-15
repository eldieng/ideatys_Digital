"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Mail, Phone, Calendar, Trash2, FileText, ExternalLink } from "lucide-react";
import { use } from "react";

interface Candidature {
  id: string;
  nom: string;
  email: string;
  telephone: string | null;
  poste: string;
  cv: string | null;
  portfolio: string | null;
  message: string;
  status: "NOUVELLE" | "EN_COURS" | "ENTRETIEN" | "ACCEPTEE" | "REFUSEE" | "ARCHIVEE";
  notes: string | null;
  createdAt: string;
}

const statusOptions = [
  { value: "NOUVELLE", label: "Nouvelle" },
  { value: "EN_COURS", label: "En cours" },
  { value: "ENTRETIEN", label: "Entretien" },
  { value: "ACCEPTEE", label: "Acceptée" },
  { value: "REFUSEE", label: "Refusée" },
  { value: "ARCHIVEE", label: "Archivée" },
];

export default function CandidatureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { status } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [candidature, setCandidature] = useState<Candidature | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchCandidature = async () => {
      try {
        const res = await fetch(`/api/admin/candidatures/${id}`);
        if (res.ok) {
          const data = await res.json();
          setCandidature(data);
        } else {
          setError("Candidature non trouvée");
        }
      } catch {
        setError("Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidature();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidature) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/candidatures/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: candidature.status, notes: candidature.notes }),
      });

      if (res.ok) {
        router.push("/admin/candidatures");
        router.refresh();
      } else {
        setError("Erreur lors de la mise à jour");
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette candidature ?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/candidatures/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/candidatures");
        router.refresh();
      }
    } catch {
      setError("Erreur lors de la suppression");
    } finally {
      setDeleting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!candidature) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || "Candidature non trouvée"}</p>
        <Link href="/admin/candidatures" className="text-accent hover:underline mt-4 inline-block">
          Retour aux candidatures
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/candidatures"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux candidatures
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Candidature de {candidature.nom}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <a href={`mailto:${candidature.email}`} className="text-accent hover:underline">
                  {candidature.email}
                </a>
              </div>
            </div>
            
            {candidature.telephone && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Téléphone</p>
                  <a href={`tel:${candidature.telephone}`} className="text-accent hover:underline">
                    {candidature.telephone}
                  </a>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="font-medium">
                  {new Date(candidature.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-accent/10 text-accent">
              {candidature.poste}
            </span>
            {candidature.cv && (
              <a
                href={candidature.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                <FileText className="w-4 h-4" />
                Voir le CV
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {candidature.portfolio && (
              <a
                href={candidature.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200"
              >
                Portfolio
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Message</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">{candidature.message}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
          
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                value={candidature.status}
                onChange={(e) => setCandidature({ ...candidature, status: e.target.value as Candidature["status"] })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes internes
              </label>
              <textarea
                value={candidature.notes || ""}
                onChange={(e) => setCandidature({ ...candidature, notes: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Ajouter des notes..."
              />
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={saving}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50"
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

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-500 font-medium rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
