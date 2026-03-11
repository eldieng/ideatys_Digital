import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles du site IDEATYS Digital.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <MainLayout>
      <section className="py-20 md:py-28 bg-white">
        <Container size="md">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-12">
            Politique de confidentialité
          </h1>

          <div className="prose prose-lg max-w-none text-gray-dark space-y-8">
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">
                1. Collecte des données
              </h2>
              <p className="leading-relaxed">
                IDEATYS Digital collecte les données personnelles suivantes via
                les formulaires du site :
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Nom de l&apos;entreprise</li>
                <li>CV et portfolio (dans le cadre des candidatures)</li>
                <li>Tout message transmis via les formulaires de contact</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">
                2. Finalités du traitement
              </h2>
              <p className="leading-relaxed">
                Les données collectées sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Répondre aux demandes de devis et de contact</li>
                <li>Traiter les candidatures</li>
                <li>Envoyer la newsletter (avec consentement explicite)</li>
                <li>Améliorer nos services et l&apos;expérience utilisateur</li>
                <li>Mesurer l&apos;audience du site (avec consentement)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">
                3. Durée de conservation
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Données de contact/devis :</strong> 3 ans après le
                  dernier contact
                </li>
                <li>
                  <strong>Candidatures :</strong> 2 ans après réception
                </li>
                <li>
                  <strong>Newsletter :</strong> jusqu&apos;au désabonnement
                </li>
                <li>
                  <strong>Cookies :</strong> 13 mois maximum
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">
                4. Droits des utilisateurs
              </h2>
              <p className="leading-relaxed">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Droit d&apos;accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l&apos;effacement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d&apos;opposition</li>
                <li>Droit à la limitation du traitement</li>
              </ul>
              <p className="mt-3 leading-relaxed">
                Pour exercer vos droits, contactez-nous à :{" "}
                <a
                  href="mailto:contact@ideatys.digital"
                  className="text-accent hover:underline"
                >
                  contact@ideatys.digital
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">
                5. Cookies
              </h2>
              <p className="leading-relaxed">
                Ce site utilise des cookies strictement nécessaires au
                fonctionnement du site. Les cookies d&apos;analyse
                d&apos;audience ne sont déposés qu&apos;après votre
                consentement explicite via le bandeau cookies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">
                6. Transfert de données
              </h2>
              <p className="leading-relaxed">
                Aucune donnée personnelle n&apos;est transférée en dehors de
                l&apos;Union Européenne sans garanties appropriées.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">
                7. Contact
              </h2>
              <p className="leading-relaxed">
                Pour toute question relative à la protection de vos données
                personnelles, contactez-nous à :{" "}
                <a
                  href="mailto:contact@ideatys.digital"
                  className="text-accent hover:underline"
                >
                  contact@ideatys.digital
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}
