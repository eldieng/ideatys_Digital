import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/ui/Breadcrumb";
import prisma from "@/lib/prisma";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, published: true },
    select: { title: true, excerpt: true, image: true },
  });
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: article.image ? { images: [article.image] } : undefined,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, published: true },
  });

  if (!article) {
    notFound();
  }

  const otherArticles = await prisma.article.findMany({
    where: { published: true, slug: { not: slug } },
    take: 2,
    orderBy: { createdAt: "desc" },
  });

  return (
    <MainLayout>
      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          { label: article.title },
        ]}
      />

      {/* Hero with gradient background */}
      <section className="relative pt-32 pb-48 md:pt-40 md:pb-56 bg-linear-to-br from-primary via-primary-dark to-primary overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <Container size="md" className="relative z-10">
          <AnimatedSection>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour au blog
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="light">{article.category}</Badge>
              <span className="text-white/50">•</span>
              <span className="text-sm text-white/70 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime} de lecture
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white max-w-4xl">
              {article.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">
              {article.excerpt}
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Article Content - Floating card effect */}
      <section className="relative -mt-32 pb-20 md:pb-28">
        <Container size="md">
          <AnimatedSection>
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16">
              {/* Author info */}
              <div className="flex items-center gap-4 pb-8 mb-8 border-b border-gray">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-accent to-accent-dark flex items-center justify-center text-white font-bold text-lg">
                  ID
                </div>
                <div>
                  <p className="font-semibold text-primary">{article.author}</p>
                  <p className="text-sm text-gray-medium">{formatDate(article.createdAt.toISOString())}</p>
                </div>
              </div>

              {/* Article body */}
              <article
                className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-bold prose-headings:mt-10 prose-headings:mb-4 prose-h2:text-2xl md:prose-h2:text-3xl prose-p:text-gray-dark prose-p:leading-relaxed prose-p:mb-6 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-primary"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Share section */}
              <div className="mt-16 pt-8 border-t border-gray">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-sm font-semibold text-primary">
                    Partager cet article
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=https://ideatys.digital/blog/${article.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-gray-light flex items-center justify-center text-gray-dark hover:bg-[#0077B5] hover:text-white transition-all hover:scale-110"
                      aria-label="Partager sur LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=https://ideatys.digital/blog/${article.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-gray-light flex items-center justify-center text-gray-dark hover:bg-[#1DA1F2] hover:text-white transition-all hover:scale-110"
                      aria-label="Partager sur Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=https://ideatys.digital/blog/${article.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-gray-light flex items-center justify-center text-gray-dark hover:bg-[#1877F2] hover:text-white transition-all hover:scale-110"
                      aria-label="Partager sur Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Related Articles */}
      {otherArticles.length > 0 && (
        <section className="py-20 md:py-28 bg-gray-light">
          <Container>
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
                Articles similaires
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {otherArticles.map((related, index) => (
                <AnimatedSection key={related.slug} delay={index * 0.15}>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="group block h-full"
                  >
                    <article className="bg-white rounded-2xl overflow-hidden h-full hover:shadow-xl transition-all duration-300">
                      <div className="aspect-video bg-gray relative overflow-hidden">
                        {related.image ? (
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-3xl font-bold text-primary/10">
                              BLOG
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <Badge>{related.category}</Badge>
                        <h3 className="mt-3 text-lg font-bold text-primary group-hover:text-accent transition-colors">
                          {related.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-dark line-clamp-2">
                          {related.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Newsletter */}
      <section className="py-16 bg-primary text-white">
        <Container size="sm">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold">
                Restez informé
              </h2>
              <p className="mt-3 text-white/70">
                Recevez nos derniers articles et conseils directement dans votre
                boîte mail.
              </p>
              <form className="mt-6 flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent rounded-lg font-semibold hover:bg-accent-dark transition-colors"
                >
                  S&apos;inscrire
                </button>
              </form>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </MainLayout>
  );
}
