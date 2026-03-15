"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Mail, Phone, Building, Calendar, Trash2 } from "lucide-react";
import { use } from "react";

interface DemandeDevis {
  id: string;
  nom: string;
  email: string;
  telephone: string | null;
  entreprise: string | null;
  service: string;
  budget: string | null;
  message: string;
  status: "NOUVELLE" | "EN_COURS" | "TRAITEE" | "ARCHIVEE";
  notes: string | null;
  createdAt: string;
}

const statusOptions = [
  { value: "NOUVELLE", label: "Nouvelle" },
  { value: "EN_COURS", label: "En cours" },
  { value: "TRAITEE", label: "Traitée" },
  { value: "ARCHIVEE", label: "Archivée" },
];

export default function DemandeDetailPage({
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
  const [demande, setDemande] = useState<DemandeDevis | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchDemande = async () => {
      try {
        const res = await fetch(`/api/admin/demandes/${id}`);
        if (res.ok) {
          const data = await res.json();
          setDemande(data);
        } else {
          setError("Demande non trouvée");
        }
      } catch {
        setError("Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchDemande();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demande) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/demandes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: demande.status, notes: demande.notes }),
      });

      if (res.ok) {
        router.push("/admin/demandes");
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/demandes/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/demandes");
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

  if (!demande) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || "Demande non trouvée"}</p>
        <Link href="/admin/demandes" className="text-accent hover:underline mt-4 inline-block">
          Retour aux demandes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/demandes"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux demandes
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Demande de {demande.nom}</h1>
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
                <a href={`mailto:${demande.email}`} className="text-accent hover:underline">
                  {demande.email}
                </a>
              </div>
            </div>
            
            {demande.telephone && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Téléphone</p>
                  <a href={`tel:${demande.telephone}`} className="text-accent hover:underline">
                    {demande.telephone}
                  </a>
                </div>
              </div>
            )}
            
            {demande.entreprise && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Building className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Entreprise</p>
                  <p className="font-medium">{demande.entreprise}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="font-medium">
                  {new Date(demande.createdAt).toLocaleDateString("fr-FR", {
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

          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-accent/10 text-accent">
              {demande.service}
            </span>
            {demande.budget && (
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-600">
                Budget: {demande.budget}
              </span>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Message</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">{demande.message}</p>
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
                value={demande.status}
                onChange={(e) => setDemande({ ...demande, status: e.target.value as DemandeDevis["status"] })}
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
                value={demande.notes || ""}
                onChange={(e) => setDemande({ ...demande, notes: e.target.value })}
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
