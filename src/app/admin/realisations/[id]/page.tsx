"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Plus, X } from "lucide-react";
import { use } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
}

interface Realisation {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  client: string | null;
  year: string | null;
  image: string | null;
  gallery: string[];
  technologies: string[];
  websiteUrl: string | null;
  videoUrl: string | null;
  socialLinks: SocialLinks | null;
  published: boolean;
  featured: boolean;
}

export default function EditRealisationPage({
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
  const [realisation, setRealisation] = useState<Realisation | null>(null);
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchRealisation = async () => {
      try {
        const res = await fetch(`/api/admin/realisations/${id}`);
        if (res.ok) {
          const data = await res.json();
          setRealisation({
            ...data,
            gallery: data.gallery || [],
            socialLinks: data.socialLinks || { facebook: "", instagram: "", linkedin: "", tiktok: "" },
          });
          setTechInput(data.technologies?.join(", ") || "");
        } else {
          setError("Réalisation non trouvée");
        }
      } catch {
        setError("Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchRealisation();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!realisation) return;

    setSaving(true);
    setError("");

    const technologies = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch(`/api/admin/realisations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...realisation,
          technologies,
          gallery: realisation.gallery?.filter(Boolean) || [],
          socialLinks: realisation.socialLinks && Object.values(realisation.socialLinks).some(v => v) ? realisation.socialLinks : null,
        }),
      });

      if (res.ok) {
        router.push("/admin/realisations");
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

  if (!realisation) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || "Réalisation non trouvée"}</p>
        <Link href="/admin/realisations" className="text-accent hover:underline mt-4 inline-block">
          Retour aux réalisations
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/realisations"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux réalisations
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Modifier la réalisation</h1>
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
              value={realisation.title}
              onChange={(e) => setRealisation({ ...realisation, title: e.target.value })}
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
              value={realisation.slug}
              onChange={(e) => setRealisation({ ...realisation, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie *
            </label>
            <select
              value={realisation.category}
              onChange={(e) => setRealisation({ ...realisation, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            >
              <option value="Développement Web">Développement Web</option>
              <option value="Community Management">Community Management</option>
              <option value="Design Graphique">Design Graphique</option>
              <option value="Production Audiovisuelle">Production Audiovisuelle</option>
              <option value="Branding">Branding</option>
              <option value="Marketing Digital">Marketing Digital</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client
            </label>
            <input
              type="text"
              value={realisation.client || ""}
              onChange={(e) => setRealisation({ ...realisation, client: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Année
            </label>
            <input
              type="text"
              value={realisation.year || ""}
              onChange={(e) => setRealisation({ ...realisation, year: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="2025"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image principale
          </label>
          <ImageUpload
            value={realisation.image || ""}
            onChange={(url) => setRealisation({ ...realisation, image: url })}
            folder="realisations"
          />
        </div>

        {/* Galerie d'images - Pour Design et CM */}
        {(realisation.category === "Design Graphique" || realisation.category === "Community Management") && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Galerie d&apos;images
            </label>
            <div className="space-y-3">
              {(realisation.gallery || []).map((img, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <ImageUpload
                      value={img}
                      onChange={(url) => {
                        const newGallery = [...(realisation.gallery || [])];
                        newGallery[index] = url;
                        setRealisation({ ...realisation, gallery: newGallery });
                      }}
                      folder="realisations"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newGallery = (realisation.gallery || []).filter((_, i) => i !== index);
                      setRealisation({ ...realisation, gallery: newGallery });
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setRealisation({ ...realisation, gallery: [...(realisation.gallery || []), ""] })}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-accent border border-accent rounded-lg hover:bg-accent/5"
              >
                <Plus className="w-4 h-4" />
                Ajouter une image
              </button>
            </div>
          </div>
        )}

        {/* Lien du site - Pour Développement Web */}
        {realisation.category === "Développement Web" && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lien du site web
            </label>
            <input
              type="url"
              value={realisation.websiteUrl || ""}
              onChange={(e) => setRealisation({ ...realisation, websiteUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="https://exemple.com"
            />
          </div>
        )}

        {/* Lien vidéo - Pour Production Audiovisuelle */}
        {realisation.category === "Production Audiovisuelle" && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lien de la vidéo (YouTube, Vimeo)
            </label>
            <input
              type="url"
              value={realisation.videoUrl || ""}
              onChange={(e) => setRealisation({ ...realisation, videoUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
        )}

        {/* Liens réseaux sociaux - Pour Community Management */}
        {realisation.category === "Community Management" && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Liens des réseaux sociaux
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Facebook</label>
                <input
                  type="url"
                  value={realisation.socialLinks?.facebook || ""}
                  onChange={(e) => setRealisation({ ...realisation, socialLinks: { ...realisation.socialLinks, facebook: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Instagram</label>
                <input
                  type="url"
                  value={realisation.socialLinks?.instagram || ""}
                  onChange={(e) => setRealisation({ ...realisation, socialLinks: { ...realisation.socialLinks, instagram: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">LinkedIn</label>
                <input
                  type="url"
                  value={realisation.socialLinks?.linkedin || ""}
                  onChange={(e) => setRealisation({ ...realisation, socialLinks: { ...realisation.socialLinks, linkedin: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="https://linkedin.com/company/..."
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">TikTok</label>
                <input
                  type="url"
                  value={realisation.socialLinks?.tiktok || ""}
                  onChange={(e) => setRealisation({ ...realisation, socialLinks: { ...realisation.socialLinks, tiktok: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="https://tiktok.com/@..."
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={realisation.description}
            onChange={(e) => setRealisation({ ...realisation, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            required
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technologies (séparées par des virgules)
          </label>
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Next.js, TypeScript, Tailwind CSS"
          />
        </div>

        <div className="mt-6 flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={realisation.published}
              onChange={(e) => setRealisation({ ...realisation, published: e.target.checked })}
              className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <span className="text-sm text-gray-700">Publié</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={realisation.featured}
              onChange={(e) => setRealisation({ ...realisation, featured: e.target.checked })}
              className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <span className="text-sm text-gray-700">Mis en avant</span>
          </label>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin/realisations"
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
