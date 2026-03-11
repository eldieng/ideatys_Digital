import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CookieConsent from "@/components/ui/CookieConsent";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <ScrollToTop />
      <CookieConsent />
    </>
  );
}
