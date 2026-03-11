import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/ui/Breadcrumb";

const articles = [
  {
    slug: "optimiser-seo-2026",
    title: "Comment optimiser votre SEO en 2026",
    description:
      "Découvrez les meilleures pratiques SEO pour améliorer votre visibilité en ligne et attirer plus de trafic qualifié.",
    category: "SEO",
    author: "IDEATYS Digital",
    date: "2026-02-10",
    readTime: 5,
    content: `
      <h2>Introduction</h2>
      <p>Le SEO évolue constamment. En 2026, les moteurs de recherche sont plus intelligents que jamais, et les stratégies qui fonctionnaient hier ne suffisent plus. Voici un guide complet pour optimiser votre référencement naturel.</p>
      
      <h2>1. L'expérience utilisateur au cœur du SEO</h2>
      <p>Google privilégie désormais les sites qui offrent une excellente expérience utilisateur. Les Core Web Vitals restent des métriques clés : LCP, FID et CLS doivent être optimisés.</p>
      <p>Assurez-vous que votre site se charge en moins de 2 secondes, que l'interactivité est immédiate et que la mise en page est stable.</p>
      
      <h2>2. Le contenu E-E-A-T</h2>
      <p>Experience, Expertise, Authoritativeness, Trustworthiness — ces quatre piliers sont essentiels. Google veut du contenu créé par des experts, basé sur une expérience réelle.</p>
      
      <h2>3. L'optimisation technique</h2>
      <p>Les bases techniques restent fondamentales : balises meta, structure des URL, sitemap XML, données structurées Schema.org, et une architecture de site claire.</p>
      
      <h2>Conclusion</h2>
      <p>Le SEO en 2026, c'est avant tout créer de la valeur pour vos utilisateurs tout en respectant les bonnes pratiques techniques. Investissez dans le contenu de qualité et l'expérience utilisateur.</p>
    `,
  },
  {
    slug: "strategie-social-media",
    title: "Les clés d'une stratégie social media réussie",
    description:
      "Apprenez à construire une stratégie social media efficace qui engage votre audience et génère des résultats.",
    category: "Marketing Digital",
    author: "IDEATYS Digital",
    date: "2026-02-05",
    readTime: 7,
    content: `
      <h2>Pourquoi une stratégie social media est indispensable</h2>
      <p>Les réseaux sociaux sont devenus un canal de communication incontournable. Mais publier sans stratégie, c'est comme naviguer sans boussole.</p>
      
      <h2>1. Définir vos objectifs</h2>
      <p>Notoriété, engagement, génération de leads, recrutement... Chaque objectif nécessite une approche différente. Soyez précis et mesurable.</p>
      
      <h2>2. Connaître votre audience</h2>
      <p>Créez des personas détaillés. Où se trouve votre audience ? Quels contenus consomme-t-elle ? À quels moments est-elle active ?</p>
      
      <h2>3. Créer du contenu à forte valeur ajoutée</h2>
      <p>Le contenu roi reste le pilier de toute stratégie. Variez les formats : carrousels, vidéos courtes, infographies, stories, articles longs.</p>
      
      <h2>Conclusion</h2>
      <p>Une stratégie social media réussie demande de la cohérence, de la créativité et de l'analyse. Testez, mesurez, ajustez.</p>
    `,
  },
  {
    slug: "importance-branding",
    title: "Pourquoi le branding est essentiel pour votre entreprise",
    description:
      "Le branding va bien au-delà du logo. Découvrez comment une identité de marque forte peut transformer votre business.",
    category: "Branding",
    author: "IDEATYS Digital",
    date: "2026-01-28",
    readTime: 6,
    content: `
      <h2>Le branding, bien plus qu'un logo</h2>
      <p>Votre marque est la perception que les gens ont de votre entreprise. Elle englobe votre identité visuelle, votre ton de communication, vos valeurs et l'expérience que vous offrez.</p>
      
      <h2>1. Se différencier de la concurrence</h2>
      <p>Sur un marché saturé, une identité de marque forte est votre meilleur atout pour vous démarquer. Elle crée une connexion émotionnelle avec votre audience.</p>
      
      <h2>2. Construire la confiance</h2>
      <p>Une marque cohérente et professionnelle inspire confiance. Les consommateurs achètent auprès de marques qu'ils reconnaissent et en qui ils ont confiance.</p>
      
      <h2>3. Augmenter la valeur perçue</h2>
      <p>Un branding premium permet de justifier des prix plus élevés. La perception de qualité est directement liée à l'image de marque.</p>
      
      <h2>Conclusion</h2>
      <p>Investir dans votre branding, c'est investir dans l'avenir de votre entreprise. Une marque forte est un actif stratégique inestimable.</p>
    `,
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
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
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const otherArticles = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <MainLayout>
      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          { label: article.title },
        ]}
      />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-primary text-white">
        <Container size="md">
          <AnimatedSection>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>
            <Badge variant="light">{article.category}</Badge>
            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {article.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(article.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime} min de lecture
              </span>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-20 md:py-28 bg-white">
        <Container size="sm">
          <AnimatedSection>
            <article
              className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-bold prose-p:text-gray-dark prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </AnimatedSection>

          {/* Share */}
          <AnimatedSection delay={0.2}>
            <div className="mt-12 pt-8 border-t border-gray">
              <p className="text-sm font-semibold text-primary mb-4">
                Partager cet article
              </p>
              <div className="flex gap-3">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://ideatys.digital/blog/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-light flex items-center justify-center text-gray-dark hover:bg-accent hover:text-white transition-colors"
                  aria-label="Partager sur LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=https://ideatys.digital/blog/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-light flex items-center justify-center text-gray-dark hover:bg-accent hover:text-white transition-colors"
                  aria-label="Partager sur Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://ideatys.digital/blog/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-light flex items-center justify-center text-gray-dark hover:bg-accent hover:text-white transition-colors"
                  aria-label="Partager sur Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
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
                      <div className="aspect-video bg-gray flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary/10">
                          BLOG
                        </span>
                      </div>
                      <div className="p-6">
                        <Badge>{related.category}</Badge>
                        <h3 className="mt-3 text-lg font-bold text-primary group-hover:text-accent transition-colors">
                          {related.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-dark line-clamp-2">
                          {related.description}
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
