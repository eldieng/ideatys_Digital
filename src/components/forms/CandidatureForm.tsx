"use client";

import { useState, useRef } from "react";
import { useFormDataSubmit } from "@/lib/hooks";
import { Loader2, CheckCircle, AlertCircle, Upload } from "lucide-react";

const positions = [
  "Développeur(se) Full-Stack",
  "Designer UI/UX",
  "Community Manager",
  "Chef(fe) de projet digital",
  "Vidéaste / Monteur(se)",
  "Autre",
];

const experienceLevels = [
  "Junior (0-2 ans)",
  "Intermédiaire (2-5 ans)",
  "Senior (5+ ans)",
];

export default function CandidatureForm() {
  const { state, submit, reset } = useFormDataSubmit("/api/candidature");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cvFileName, setCvFileName] = useState("");
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    motivation: "",
    portfolioUrl: "",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Seuls les fichiers PDF sont acceptés.");
        e.target.value = "";
        setCvFileName("");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Le fichier ne doit pas dépasser 5 Mo.");
        e.target.value = "";
        setCvFileName("");
        return;
      }
      setCvFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, String(value));
    });

    const cvFile = fileInputRef.current?.files?.[0];
    if (cvFile) {
      fd.append("cv", cvFile);
    }

    const success = await submit(fd);
    if (success) {
      setFormData({
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        motivation: "",
        portfolioUrl: "",
        consent: false,
        honeypot: "",
      });
      setCvFileName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (state.status === "success") {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-primary mb-2">Candidature envoyée !</h3>
        <p className="text-gray-dark">{state.message}</p>
        <button
          onClick={reset}
          className="mt-6 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors cursor-pointer"
        >
          Envoyer une autre candidature
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Envoyez votre candidature
        </h2>
        <p className="mt-4 text-gray-dark">
          Remplissez le formulaire ci-dessous et nous vous recontacterons
          dans les meilleurs délais.
        </p>
      </div>

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
            <label htmlFor="lastName" className="block text-sm font-medium text-primary mb-2">
              Nom *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary placeholder:text-gray-medium focus:outline-none focus:border-accent transition-colors"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-primary mb-2">
              Prénom *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary placeholder:text-gray-medium focus:outline-none focus:border-accent transition-colors"
              placeholder="Votre prénom"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="cand-email" className="block text-sm font-medium text-primary mb-2">
              Email *
            </label>
            <input
              type="email"
              id="cand-email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary placeholder:text-gray-medium focus:outline-none focus:border-accent transition-colors"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label htmlFor="cand-phone" className="block text-sm font-medium text-primary mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              id="cand-phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary placeholder:text-gray-medium focus:outline-none focus:border-accent transition-colors"
              placeholder="+33 6 00 00 00 00"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-primary mb-2">
              Poste souhaité *
            </label>
            <select
              id="position"
              name="position"
              required
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary focus:outline-none focus:border-accent transition-colors"
            >
              <option value="">Sélectionnez un poste</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-primary mb-2">
              Niveau d&apos;expérience *
            </label>
            <select
              id="experience"
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary focus:outline-none focus:border-accent transition-colors"
            >
              <option value="">Sélectionnez votre niveau</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="motivation" className="block text-sm font-medium text-primary mb-2">
            Message de motivation *
          </label>
          <textarea
            id="motivation"
            name="motivation"
            required
            rows={5}
            value={formData.motivation}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary placeholder:text-gray-medium focus:outline-none focus:border-accent transition-colors resize-none"
            placeholder="Parlez-nous de vous et de votre motivation..."
          />
        </div>

        <div>
          <label htmlFor="cv" className="block text-sm font-medium text-primary mb-2">
            CV (PDF, max 5MB) *
          </label>
          <div
            className="w-full px-4 py-6 rounded-lg border-2 border-dashed border-gray bg-white text-center cursor-pointer hover:border-accent transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-8 h-8 text-gray-medium mx-auto mb-2" />
            {cvFileName ? (
              <p className="text-sm text-primary font-medium">{cvFileName}</p>
            ) : (
              <p className="text-sm text-gray-medium">
                Cliquez pour sélectionner votre CV (PDF, max 5MB)
              </p>
            )}
            <input
              type="file"
              id="cv"
              ref={fileInputRef}
              accept=".pdf"
              required
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div>
          <label htmlFor="portfolioUrl" className="block text-sm font-medium text-primary mb-2">
            Portfolio (URL)
          </label>
          <input
            type="url"
            id="portfolioUrl"
            name="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary placeholder:text-gray-medium focus:outline-none focus:border-accent transition-colors"
            placeholder="https://votre-portfolio.com"
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="cand-consent"
            name="consent"
            required
            checked={formData.consent}
            onChange={handleChange}
            className="mt-1 w-4 h-4 accent-accent"
          />
          <label htmlFor="cand-consent" className="text-sm text-gray-dark">
            J&apos;accepte que mes données soient traitées dans le cadre de
            ma candidature conformément à la{" "}
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
            "Envoyer ma candidature"
          )}
        </button>
      </form>
    </div>
  );
}
