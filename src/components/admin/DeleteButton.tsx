"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteButtonProps {
  id: string;
  type?: "articles" | "realisations" | "services" | "users";
  endpoint?: string;
  title?: string;
  itemName?: string;
}

export default function DeleteButton({ id, type, endpoint, title, itemName }: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const deleteUrl = endpoint ? `${endpoint}/${id}` : `/api/admin/${type}/${id}`;
  const displayName = title || itemName || "cet élément";

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch {
      alert("Erreur de connexion");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-2xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Confirmer la suppression
          </h3>
          <p className="text-gray-600 mb-6">
            Êtes-vous sûr de vouloir supprimer <strong>{displayName}</strong> ? Cette action est irréversible.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 inline-flex items-center gap-2"
            >
              {loading ? (
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
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
      title="Supprimer"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
