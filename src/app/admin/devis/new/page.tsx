"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from "lucide-react";

interface DevisItem {
  description: string;
  quantite: number;
  prixUnitaire: number;
  total: number;
}

export default function NewDevisPage() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/admin/login");
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    clientNom: "",
    clientEmail: "",
    clientTel: "",
    clientAdresse: "",
    clientEntreprise: "",
    validite: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    tva: 0,
    notes: "",
  });

  const [items, setItems] = useState<DevisItem[]>([
    { description: "", quantite: 1, prixUnitaire: 0, total: 0 },
  ]);

  const updateItem = (index: number, field: keyof DevisItem, value: string | number) => {
    const newItems = [...items];
    if (field === "description") {
      newItems[index].description = value as string;
    } else {
      newItems[index][field] = Number(value);
    }
    newItems[index].total = newItems[index].quantite * newItems[index].prixUnitaire;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantite: 1, prixUnitaire: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const sousTotal = items.reduce((sum, item) => sum + item.total, 0);
  const tvaAmount = (sousTotal * formData.tva) / 100;
  const total = sousTotal + tvaAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items,
          sousTotal,
          total,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la création");
      }

      router.push("/admin/devis");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/devis"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-primary">Nouveau devis</h1>
          <p className="text-gray-600">Créez un nouveau devis client</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {/* Client Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">
            Informations client
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet *
              </label>
              <input
                type="text"
                value={formData.clientNom}
                onChange={(e) =>
                  setFormData({ ...formData, clientNom: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.clientEmail}
                onChange={(e) =>
                  setFormData({ ...formData, clientEmail: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.clientTel}
                onChange={(e) =>
                  setFormData({ ...formData, clientTel: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Entreprise
              </label>
              <input
                type="text"
                value={formData.clientEntreprise}
                onChange={(e) =>
                  setFormData({ ...formData, clientEntreprise: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <input
                type="text"
                value={formData.clientAdresse}
                onChange={(e) =>
                  setFormData({ ...formData, clientAdresse: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-primary">
              Prestations / Produits
            </h2>
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter une ligne
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 items-end p-4 bg-gray-50 rounded-lg"
              >
                <div className="col-span-12 md:col-span-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(index, "description", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Description de la prestation"
                    required
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantité
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantite}
                    onChange={(e) =>
                      updateItem(index, "quantite", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix unitaire
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={item.prixUnitaire}
                    onChange={(e) =>
                      updateItem(index, "prixUnitaire", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>
                <div className="col-span-3 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total
                  </label>
                  <div className="px-4 py-2 bg-gray-100 rounded-lg font-semibold text-gray-900">
                    {formatCurrency(item.total)}
                  </div>
                </div>
                <div className="col-span-1">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    disabled={items.length === 1}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-end">
              <div className="w-full md:w-80 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span className="font-medium">{formatCurrency(sousTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">TVA</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.tva}
                      onChange={(e) =>
                        setFormData({ ...formData, tva: Number(e.target.value) })
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                    />
                    <span className="text-gray-600">%</span>
                  </div>
                  <span className="font-medium text-gray-600">
                    {formatCurrency(tvaAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary pt-3 border-t border-gray-200">
                  <span>Total TTC</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de validité *
              </label>
              <input
                type="date"
                value={formData.validite}
                onChange={(e) =>
                  setFormData({ ...formData, validite: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes / Conditions
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Conditions de paiement, délais, etc."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/devis"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Créer le devis
          </button>
        </div>
      </form>
    </div>
  );
}
