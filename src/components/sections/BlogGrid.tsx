"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User } from "lucide-react";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  image: string | null;
  createdAt: string;
}

const categories = ["Tous", "SEO", "Marketing Digital", "Branding", "Développement", "Design"];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogGrid() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles");
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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
                  <div className="aspect-video bg-gray-light relative overflow-hidden">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/10">
                          BLOG
                        </span>
                      </div>
                    )}
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
                        {article.readTime}
                      </span>
                      <span>{formatDate(article.createdAt)}</span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-dark py-12">
          Aucun article trouvé.
        </p>
      )}
    </>
  );
}
