import { useState } from "react";
import { motion } from "framer-motion";
import { Send, FileDown, Mail, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/typewriter";
import { Avatar3D } from "@/components/avatar-3d";
import { SocialIcons } from "@/components/social-icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAnalytics } from "@/hooks/use-analytics";

interface HeroSectionProps {
  onContactClick: () => void;
}

export function HeroSection({ onContactClick }: HeroSectionProps) {
  const isMobile = useIsMobile();
  const { trackEvent } = useAnalytics();

  const roles = [
    "Problem Solver",
    "Software Engineer",
    "Innovation Enthusiast"
  ];

  const handleResumeDownload = () => {
    trackEvent({
      action: "download",
      category: "resume",
      label: "hero_section",
    });
    
    // Download the actual resume PDF
    const link = document.createElement('a');
    link.href = '/assets/documents/Muhammad_Hasib_Resume.pdf';
    link.download = 'Muhammad_Hasib_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bioText = `I'm a Computer Science & Engineering student and passionate AI & ML Engineer. I architect intelligent systems with Python and JavaScript, solve complex algorithmic challenges on LeetCode, and push the boundaries of human-machine creativity.`;

  return (
    <article className="content-section overflow-visible" role="article" aria-labelledby="hero-heading">
      <div className="content-width-limit max-container overflow-visible">
        {/* Schema.org structured data for better SEO */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "mainEntity": {
                "@type": "Person",
                "name": "Muhammad Hasib",
                "jobTitle": "AI & ML Engineer",
                "description": bioText,
                "url": "https://muhammadhasib.dev",
                "knowsAbout": [
                  "Artificial Intelligence", 
                  "Machine Learning", 
                  "Neural Networks", 
                  "Deep Learning",
                  "Python Programming",
                  "JavaScript Development",
                  "Algorithm Design",
                  "Computer Science",
                  "LeetCode Problem Solving",
                  "Software Engineering"
                ],
                "sameAs": [
                  "https://github.com/muhamadhasib",
                  "https://linkedin.com/in/muhammad-hasib",
                  "https://twitter.com/hasib_me_"
                ]
              }
            })
          }}
        />
        
        {/* Desktop Layout - Foldable Optimized */}
        <div className="desktop-grid overflow-visible foldable-container">
          {/* Left Side: Text Content */}
          <motion.div
            className="space-y-6 fold:space-y-4 overflow-visible text-content-isolated foldable-spacing"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ 
              isolation: 'isolate',
              transform: 'translateZ(0)',
              contain: 'layout style'
            }}
          >
            {/* Desktop Welcome Text */}
            <motion.div
              className="flex items-center justify-start space-x-3 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-[clamp(1rem,2.5vw,1.25rem)] h-[clamp(1rem,2.5vw,1.25rem)] text-[hsl(270,85%,60%)]" />
              </motion.div>
              <p className="responsive-welcome text-gray-600 dark:text-gray-400">
                Welcome to my space
              </p>
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-[clamp(1rem,2.5vw,1.25rem)] h-[clamp(1rem,2.5vw,1.25rem)] text-[hsl(188,95%,44%)]" />
              </motion.div>
            </motion.div>

            {/* Name and Animated Roles */}
            <div className="space-y-[clamp(0.75rem,1.5vw,1.25rem)]">
              <motion.h1
                id="hero-heading"
                className="responsive-name font-bold gradient-text name-single-line"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                role="heading"
                aria-level={1}
              >
                Muhammad Hasib
              </motion.h1>
              <div 
                className="responsive-role font-medium text-gray-700 dark:text-gray-300 typing-container-isolated"
                role="heading"
                aria-level={2}
                aria-label="Professional roles"
              >
                <Typewriter texts={roles} className="typing-animation-isolated" />
              </div>
            </div>

            {/* Bio - Justified for All Devices */}
            <motion.p
              className="responsive-bio text-gray-600 dark:text-gray-400 bio-full-width bio-text-isolation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ isolation: 'isolate', transform: 'translateZ(0)' }}
              role="text"
              aria-label="Professional bio and introduction"
            >
              {bioText}
            </motion.p>



            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-[clamp(0.75rem,2vw,1.25rem)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              role="group"
              aria-label="Contact and resume actions"
            >
              <Button
                onClick={onContactClick}
                className="contact-button responsive-button hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[hsl(270,85%,60%)]/25 flex items-center justify-center space-x-[clamp(0.5rem,1vw,0.75rem)] font-medium enhanced-3d-button"
              >
                <motion.div
                  whileHover={{ rotateY: 15, rotateX: -15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Send className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
                </motion.div>
                <span>Say Hello</span>
              </Button>

              <Button
                onClick={handleResumeDownload}
                className="resume-button responsive-button hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[hsl(270,85%,60%)]/25 flex items-center justify-center space-x-[clamp(0.5rem,1vw,0.75rem)] font-medium enhanced-3d-button"
              >
                <motion.div
                  whileHover={{ rotateY: -15, rotateX: 15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FileDown className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
                </motion.div>
                <span>My Journey</span>
              </Button>
            </motion.div>

            {/* Social Icons */}
            <SocialIcons />
          </motion.div>

          {/* Right Side: 3D Avatar */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Avatar3D />
          </motion.div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="mobile-layout">
          {/* Mobile Avatar */}
          <motion.div
            className="avatar-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Avatar3D />
          </motion.div>

          {/* Mobile Text Content */}
          <motion.div
            className="space-y-[clamp(0.75rem,2vw,1.25rem)] w-full overflow-visible"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Mobile Welcome Text */}
            <motion.div
              className="flex items-center justify-center space-x-[clamp(0.5rem,2vw,0.75rem)] mb-[clamp(0.5rem,1.5vw,1rem)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-[clamp(0.875rem,2vw,1rem)] h-[clamp(0.875rem,2vw,1rem)] text-[hsl(270,85%,60%)]" />
              </motion.div>
              <p className="responsive-welcome text-gray-600 dark:text-gray-400">
                Welcome to my space
              </p>
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-[clamp(0.875rem,2vw,1rem)] h-[clamp(0.875rem,2vw,1rem)] text-[hsl(188,95%,44%)]" />
              </motion.div>
            </motion.div>

            <div className="space-y-[clamp(0.5rem,1.5vw,1rem)] text-center lg:text-left">
              <h1 className="responsive-name font-bold gradient-text name-single-line">
                Muhammad Hasib
              </h1>
              <div className="responsive-role font-medium text-gray-700 dark:text-gray-300 typing-container">
                <Typewriter texts={roles} className="w-full" />
              </div>
            </div>

            <p className="responsive-bio text-gray-600 dark:text-gray-400 leading-relaxed text-center lg:text-left max-w-lg mx-auto lg:mx-0 text-justify-mobile">
              {bioText}
            </p>



            {/* Action Buttons */}
            <motion.div
              className="flex flex-col gap-[clamp(0.75rem,2vw,1.25rem)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                onClick={onContactClick}
                className="contact-button responsive-button hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[hsl(270,85%,60%)]/25 flex items-center justify-center space-x-[clamp(0.5rem,1vw,0.75rem)] font-medium enhanced-3d-button"
              >
                <motion.div
                  whileHover={{ rotateY: 15, rotateX: -15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Send className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
                </motion.div>
                <span>Say Hello</span>
              </Button>

              <Button
                onClick={handleResumeDownload}
                className="resume-button responsive-button hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[hsl(270,85%,60%)]/25 flex items-center justify-center space-x-[clamp(0.5rem,1vw,0.75rem)] font-medium enhanced-3d-button"
              >
                <motion.div
                  whileHover={{ rotateY: -15, rotateX: 15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FileDown className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
                </motion.div>
                <span>My Journey</span>
              </Button>
            </motion.div>

            <div className="flex justify-center">
              <SocialIcons />
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
