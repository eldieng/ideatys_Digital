"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Cookie } from "lucide-react";

const COOKIE_CONSENT_KEY = "ideatys-cookie-consent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "all");
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "essential");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-60 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray/50 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-accent/10 items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary">
                  Nous utilisons des cookies
                </h3>
                <p className="mt-2 text-sm text-gray-dark leading-relaxed">
                  Ce site utilise des cookies essentiels pour son bon
                  fonctionnement et des cookies d&apos;analyse pour améliorer
                  votre expérience. Vous pouvez choisir d&apos;accepter tous les
                  cookies ou uniquement les cookies essentiels.{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="text-accent hover:underline"
                  >
                    En savoir plus
                  </Link>
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={acceptAll}
                    className="px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors cursor-pointer"
                  >
                    Tout accepter
                  </button>
                  <button
                    onClick={acceptEssential}
                    className="px-5 py-2.5 bg-white text-primary text-sm font-semibold rounded-lg border border-gray hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  >
                    Essentiels uniquement
                  </button>
                </div>
              </div>
              <button
                onClick={acceptEssential}
                className="text-gray-medium hover:text-primary transition-colors cursor-pointer shrink-0"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
