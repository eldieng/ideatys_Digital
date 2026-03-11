"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(result.error || "Erreur");
        return;
      }

      setStatus("success");
      setMessage(result.message);
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion.");
    }
  };

  return (
    <div>
      <h4 className="text-sm font-semibold mb-3">Newsletter</h4>
      {status === "success" ? (
        <div className="flex items-center gap-2 text-sm text-accent">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            required
            className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-2 bg-accent rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors disabled:opacity-50 cursor-pointer"
          >
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "OK"
            )}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400 mt-1">{message}</p>
      )}
    </div>
  );
}
