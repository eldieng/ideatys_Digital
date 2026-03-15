"use client";

import { useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Database, RefreshCw, Check, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeed = async () => {
    const session = await getSession();
    if (!session) {
      router.push("/admin/login");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        setResult({
          success: true,
          message: `Importé: ${data.services} services, ${data.realisations} réalisations, ${data.articles} articles`,
        });
      } else {
        setResult({ success: false, message: data.error || "Erreur" });
      }
    } catch {
      setResult({ success: false, message: "Erreur de connexion" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-1">Configuration du dashboard</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Import des données
        </h2>
        <p className="text-gray-600 mb-6">
          Importer les données statiques (services, réalisations, articles) dans la base de données.
        </p>

        {result && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              result.success
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {result.success ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {result.message}
          </div>
        )}

        <button
          onClick={handleSeed}
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50"
        >
          {loading ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Database className="w-5 h-5" />
          )}
          {loading ? "Import en cours..." : "Importer les données"}
        </button>
      </div>
    </div>
  );
}
