"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

const categories = ["Développement Web", "Community Management", "Design Graphique", "Production Audiovisuelle", "Branding", "Marketing Digital"];

export default function NewRealisationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "Développement Web",
    client: "",
    year: new Date().getFullYear().toString(),
    technologies: "",
    published: false,
    featured: false,
    image: "",
    // Champs spécifiques par catégorie
    websiteUrl: "",
    videoUrl: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      linkedin: "",
      tiktok: "",
    },
    gallery: [] as string[],
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/realisations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
          gallery: formData.gallery.filter(Boolean),
          socialLinks: Object.values(formData.socialLinks).some(v => v) ? formData.socialLinks : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la création");
      }

      router.push("/admin/realisations");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/realisations"
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nouvelle réalisation</h1>
          <p className="text-gray-600 mt-1">Ajoutez un nouveau projet</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du projet *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                placeholder="Nom du projet"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                placeholder="nom-du-projet"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
              rows={6}
              placeholder="Description détaillée du projet"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                placeholder="Nom du client"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Année
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                placeholder="2026"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies (séparées par des virgules)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="Next.js, React, Tailwind CSS"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image principale du projet
            </label>
            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              folder="realisations"
            />
          </div>

          {/* Galerie d'images - Pour Design et CM */}
          {(formData.category === "Design Graphique" || formData.category === "Community Management") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Galerie d&apos;images
              </label>
              <div className="space-y-3">
                {formData.gallery.map((img, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-1">
                      <ImageUpload
                        value={img}
                        onChange={(url) => {
                          const newGallery = [...formData.gallery];
                          newGallery[index] = url;
                          setFormData({ ...formData, gallery: newGallery });
                        }}
                        folder="realisations"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newGallery = formData.gallery.filter((_, i) => i !== index);
                        setFormData({ ...formData, gallery: newGallery });
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gallery: [...formData.gallery, ""] })}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-accent border border-accent rounded-lg hover:bg-accent/5"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter une image
                </button>
              </div>
            </div>
          )}

          {/* Lien du site - Pour Développement Web */}
          {formData.category === "Développement Web" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lien du site web
              </label>
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                placeholder="https://exemple.com"
              />
            </div>
          )}

          {/* Lien vidéo - Pour Production Audiovisuelle */}
          {formData.category === "Production Audiovisuelle" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lien de la vidéo (YouTube, Vimeo)
              </label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          )}

          {/* Liens réseaux sociaux - Pour Community Management */}
          {formData.category === "Community Management" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Liens des réseaux sociaux
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Facebook</label>
                  <input
                    type="url"
                    value={formData.socialLinks.facebook}
                    onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, facebook: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Instagram</label>
                  <input
                    type="url"
                    value={formData.socialLinks.instagram}
                    onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, instagram: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, linkedin: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">TikTok</label>
                  <input
                    type="url"
                    value={formData.socialLinks.tiktok}
                    onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, tiktok: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    placeholder="https://tiktok.com/@..."
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
              />
              <label htmlFor="published" className="text-sm font-medium text-gray-700">
                Publier
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                Mettre en avant
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-6">
          <Link
            href="/admin/realisations"
            className="px-6 py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}
