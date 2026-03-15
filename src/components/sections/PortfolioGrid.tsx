"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Realisation {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  client: string | null;
  year: string | null;
  image: string | null;
  technologies: string[];
}

const categories = [
  "Tous",
  "Développement Web",
  "Design Graphique",
  "Community Management",
  "Production Audiovisuelle",
  "Stratégie Digitale",
];

export default function PortfolioGrid() {
  const [projects, setProjects] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tous");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/realisations");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des réalisations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filtered =
    activeCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
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

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/realisations/${project.slug}`}
                className="group block overflow-hidden rounded-2xl bg-white border border-gray/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-gray-light">
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      Voir le projet
                    </span>
                  </div>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <span className="text-5xl font-bold text-primary/10">
                        {project.client?.charAt(0) || project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {project.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-primary group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-dark">
                    {project.client}
                  </p>
                </div>
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
          Aucun projet dans cette catégorie pour le moment.
        </p>
      )}
    </>
  );
}
