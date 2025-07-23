import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  texts: string[];
  className?: string;
}

export function Typewriter({ texts, className = "" }: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentCharIndex < currentText.length) {
          setDisplayText(currentText.substring(0, currentCharIndex + 1));
          setCurrentCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentCharIndex > 0) {
          setDisplayText(currentText.substring(0, currentCharIndex - 1));
          setCurrentCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentTextIndex, isDeleting, texts]);

  return (
    <motion.div
      className={`${className} flex items-center justify-center lg:justify-start min-h-[3rem] typing-animation-container`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      style={{ 
        isolation: 'isolate', 
        transform: 'translateZ(0)',
        contain: 'layout style paint',
        willChange: 'transform'
      }}
    >
      <span className="border-r-2 border-[hsl(270,85%,60%)] whitespace-nowrap inline-block min-w-0 text-ellipsis text-center lg:text-left typing-text-isolated">
        {displayText}
      </span>
    </motion.div>
  );
}
