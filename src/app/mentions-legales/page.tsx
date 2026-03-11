import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site IDEATYS Digital.",
};

export default function MentionsLegalesPage() {
  return (
    <MainLayout>
      <section className="py-20 md:py-28 bg-white">
        <Container size="md">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-12">
            Mentions légales
          </h1>

          <div className="prose prose-lg max-w-none text-gray-dark space-y-8">
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">
                1. Éditeur du site
              </h2>
              <p className="leading-relaxed">
                Le site ideatys.digital est édité par :<br />
                <strong>IDEATYS Digital</strong>
                <br />
                Forme juridique : [À compléter]
                <br />
                SIRET : [À compléter]
                <br />
                Adresse : [À compléter]
                <br />
                Téléphone : [À compléter]
                <br />
                Email : contact@ideatys.digital
                <br />
                Directeur de la publication : [À compléter]
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">
                2. Hébergeur
              </h2>
              <p className="leading-relaxed">
                Ce site est hébergé par :<br />
                <strong>Vercel Inc.</strong>
                <br />
                340 S Lemon Ave #4133, Walnut, CA 91789, USA
                <br />
                Site web : https://vercel.com
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">
                3. Propriété intellectuelle
              </h2>
              <p className="leading-relaxed">
                L&apos;ensemble des contenus présents sur le site ideatys.digital
                (textes, images, vidéos, logos, icônes, etc.) sont protégés par
                le droit d&apos;auteur et le droit de la propriété
                intellectuelle. Toute reproduction, représentation, modification
                ou exploitation non autorisée de tout ou partie de ces éléments
                est interdite.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">
                4. Responsabilité
              </h2>
              <p className="leading-relaxed">
                IDEATYS Digital s&apos;efforce de fournir des informations
                exactes et à jour sur ce site. Toutefois, IDEATYS Digital ne
                saurait garantir l&apos;exactitude, la complétude ou
                l&apos;actualité des informations diffusées. En conséquence,
                l&apos;utilisateur reconnaît utiliser ces informations sous sa
                responsabilité exclusive.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">
                5. Cookies
              </h2>
              <p className="leading-relaxed">
                Ce site utilise des cookies pour améliorer l&apos;expérience
                utilisateur et mesurer l&apos;audience. Pour en savoir plus,
                consultez notre{" "}
                <a
                  href="/politique-confidentialite"
                  className="text-accent hover:underline"
                >
                  politique de confidentialité
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}
