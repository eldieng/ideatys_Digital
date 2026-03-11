"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User } from "lucide-react";

const categories = ["Tous", "SEO", "Marketing Digital", "Branding", "Web", "Expertise"];

const articles = [
  {
    slug: "optimiser-seo-2026",
    title: "Comment optimiser votre SEO en 2026",
    excerpt:
      "Découvrez les meilleures pratiques SEO pour améliorer votre visibilité en ligne et attirer plus de trafic qualifié.",
    category: "SEO",
    author: "IDEATYS Digital",
    date: "2026-02-10",
    readTime: 5,
  },
  {
    slug: "strategie-social-media",
    title: "Les clés d'une stratégie social media réussie",
    excerpt:
      "Apprenez à construire une stratégie social media efficace qui engage votre audience et génère des résultats.",
    category: "Marketing Digital",
    author: "IDEATYS Digital",
    date: "2026-02-05",
    readTime: 7,
  },
  {
    slug: "importance-branding",
    title: "Pourquoi le branding est essentiel pour votre entreprise",
    excerpt:
      "Le branding va bien au-delà du logo. Découvrez comment une identité de marque forte peut transformer votre business.",
    category: "Branding",
    author: "IDEATYS Digital",
    date: "2026-01-28",
    readTime: 6,
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "Tous" || article.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Search + Filters */}
      <div className="mb-12 space-y-6">
        <div className="max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un article..."
            className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-primary placeholder:text-gray-medium focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                activeCategory === category
                  ? "bg-accent text-white border-accent"
                  : "border-gray text-gray-dark hover:border-accent hover:text-accent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((article, index) => (
            <motion.div
              key={article.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/blog/${article.slug}`}
                className="group block h-full"
              >
                <article className="bg-white border border-gray/50 rounded-2xl overflow-hidden h-full hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video bg-gray-light flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary/10">
                      BLOG
                    </span>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {article.category}
                    </span>
                    <h2 className="mt-2 text-lg font-bold text-primary group-hover:text-accent transition-colors leading-snug">
                      {article.title}
                    </h2>
                    <p className="mt-3 text-sm text-gray-dark leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-medium">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime} min
                      </span>
                      <span>{formatDate(article.date)}</span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-dark py-12">
          Aucun article trouvé.
        </p>
      )}
    </>
  );
}
