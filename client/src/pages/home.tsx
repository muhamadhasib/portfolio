import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NeuralBackground } from "@/components/neural-background";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ContactModal } from "@/components/contact-modal";
import { NewsletterModal } from "@/components/newsletter-modal";
import { LoadingAnimation } from "@/components/loading-animation";
import { useAnalytics } from "@/hooks/use-analytics";

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    // Track page view
    trackPageView("home");
    
    // Optimize loading time for better TTI (Time to Interactive ≤ 1.5s)
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      // Set loaded state after loading animation
      setTimeout(() => setIsLoaded(true), 300);
    }, 1500); // 1.5 seconds loading for optimal performance
    
    return () => clearTimeout(loadingTimer);
  }, [trackPageView]);

  useEffect(() => {
    // Prevent body scroll when modals are open
    document.body.style.overflow = 
      (isContactModalOpen || isNewsletterModalOpen) ? "hidden" : "auto";
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isContactModalOpen, isNewsletterModalOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsContactModalOpen(false);
        setIsNewsletterModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingAnimation />}
      </AnimatePresence>
      
      <motion.main 
        className="main-layout"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        role="main"
        aria-label="Muhammad Hasib AI Engineer Portfolio"
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-blue-600 text-white px-4 py-2 rounded-md"
          tabIndex={1}
        >
          Skip to main content
        </a>

        {/* Neural Background - Decorative */}
        <div role="img" aria-label="Neural network background animation" className="fixed inset-0 pointer-events-none">
          <NeuralBackground />
        </div>

        {/* Header Navigation */}
        <header role="banner" aria-label="Site navigation">
          <Navbar onNewsletterClick={() => setIsNewsletterModalOpen(true)} />
        </header>

        {/* Main Content Section */}
        <section 
          id="main-content"
          role="main" 
          aria-labelledby="hero-heading"
          className="relative z-10"
        >
          <HeroSection onContactClick={() => setIsContactModalOpen(true)} />
        </section>

        {/* Contact Modal */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />

        {/* Newsletter Modal */}
        <NewsletterModal
          isOpen={isNewsletterModalOpen}
          onClose={() => setIsNewsletterModalOpen(false)}
        />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Muhammad Hasib",
              "jobTitle": ["AI Engineer", "Machine Learning Engineer"],
              "description": "AI & ML Engineer passionate about building intelligent systems and exploring human-machine creativity",
              "url": "https://muhammadhasib.dev",
              "sameAs": [
                "https://github.com/muhamadhasib",
                "https://linkedin.com/in/muhammad-hasib",
                "https://twitter.com/hasib_me_"
              ],
              "knowsAbout": ["Artificial Intelligence", "Machine Learning", "Problem Solving"]
            })
          }}
        />
      </motion.main>
    </>
  );
}
