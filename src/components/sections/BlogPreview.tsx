"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string | null;
  createdAt: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPreview() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles");
        if (res.ok) {
          const data = await res.json();
          setArticles(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
      }
    };

    fetchArticles();
  }, []);
  return (
    <section className="py-20 md:py-28 bg-gray-light">
      <Container>
        <SectionHeading
          label="Notre blog"
          title="Actualités & conseils"
          subtitle="Restez informé des dernières tendances du digital et découvrez nos conseils d'experts."
          centered
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <AnimatedSection key={article.slug} delay={index * 0.1}>
              <Link href={`/blog/${article.slug}`} className="group block">
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="aspect-video bg-linear-to-br from-primary to-primary-light relative overflow-hidden">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/30 text-6xl font-bold">
                          {article.category.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge>{article.category}</Badge>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-sm text-gray-medium mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-dark text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                      Lire l&apos;article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/blog" variant="outline">
            Voir tous les articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
