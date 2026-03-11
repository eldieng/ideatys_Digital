"use client";

import { useState } from "react";
import { useFormSubmit } from "@/lib/hooks";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const serviceOptions = [
  "Stratégie digitale",
  "Développement web",
  "Community management",
  "Production audiovisuelle",
  "Design graphique",
  "Print & impression",
  "Autre",
];

const budgetOptions = [
  "< 2 000 €",
  "2 000 € - 5 000 €",
  "5 000 € - 10 000 €",
  "10 000 € - 20 000 €",
  "> 20 000 €",
];

export default function ContactForm() {
  const { state, submit, reset } = useFormSubmit("/api/contact");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    consent: false,
    honeypot: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submit(formData);
    if (success) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        message: "",
        consent: false,
        honeypot: "",
      });
    }
  };

  if (state.status === "success") {
    return (
      <div className="bg-gray-light rounded-2xl p-8 md:p-10 text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-primary mb-2">Message envoyé !</h3>
        <p className="text-gray-dark">{state.message}</p>
        <button
          onClick={reset}
          className="mt-6 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors cursor-pointer"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-light rounded-2xl p-8 md:p-10">
      <h2 className="text-2xl font-bold text-primary mb-8">
        Demander un devis
      </h2>

      {state.status === "error" && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{state.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-primary mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary placeholder:text-gray-medium focus:outline-none focus:border-accent transition-colors"
              placeholder="Votre nom complet"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary placeholder:text-gray-medium focus:outline-none focus:border-accent transition-colors"
              placeholder="votre@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary placeholder:text-gray-medium focus:outline-none focus:border-accent transition-colors"
              placeholder="+33 6 00 00 00 00"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-primary mb-2">
              Entreprise
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary placeholder:text-gray-medium focus:outline-none focus:border-accent transition-colors"
              placeholder="Nom de votre entreprise"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-primary mb-2">
              Service concerné *
            </label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary focus:outline-none focus:border-accent transition-colors"
            >
              <option value="">Sélectionnez un service</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-primary mb-2">
              Budget estimé
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary focus:outline-none focus:border-accent transition-colors"
            >
              <option value="">Sélectionnez une tranche</option>
              {budgetOptions.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
            Message / Description du projet *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary placeholder:text-gray-medium focus:outline-none focus:border-accent transition-colors resize-none"
            placeholder="Décrivez votre projet, vos besoins et vos objectifs..."
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            required
            checked={formData.consent}
            onChange={handleChange}
            className="mt-1 w-4 h-4 accent-accent"
          />
          <label htmlFor="consent" className="text-sm text-gray-dark">
            J&apos;accepte que mes données soient traitées conformément à la{" "}
            <a href="/politique-confidentialite" className="text-accent hover:underline">
              politique de confidentialité
            </a>. *
          </label>
        </div>

        <button
          type="submit"
          disabled={state.status === "loading"}
          className="w-full py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {state.status === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            "Envoyer ma demande"
          )}
        </button>
      </form>
    </div>
  );
}
