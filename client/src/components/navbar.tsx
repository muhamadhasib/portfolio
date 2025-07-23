import { Moon, Sun, Zap } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface NavbarProps {
  onNewsletterClick: () => void;
}

export function Navbar({ onNewsletterClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="navbar-section">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full glass-card"
      >
        <div className="max-container px-4 sm:px-6">
          <div className="flex justify-between items-center h-full">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text"
            >
              MH
            </motion.div>

            <div className="flex items-center space-x-[clamp(0.75rem,2vw,1.25rem)]">
            {/* Newsletter Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onNewsletterClick}
                className="newsletter-button newsletter-button-compact hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[hsl(188,95%,44%)]/25 flex items-center justify-center space-x-[clamp(0.5rem,1vw,0.75rem)] font-medium enhanced-3d-button rounded-full"
              >
                <motion.div
                  whileHover={{ 
                    rotateY: 15, 
                    rotateX: -15,
                    scale: 1.2,
                    rotateZ: 360,
                    transition: {
                      type: "spring", 
                      stiffness: 400, 
                      damping: 10,
                      duration: 0.6
                    }
                  }}
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    rotate: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    scale: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  style={{ 
                    transformStyle: "preserve-3d"
                  }}
                >
                  <Zap className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
                </motion.div>
                <span className="xs:hidden sm:hidden md:inline lg:hidden xl:inline">Join Newsletter</span>
                <span className="xs:inline sm:inline md:hidden lg:inline xl:hidden">Join</span>
              </Button>
            </motion.div>

            {/* Enhanced 3D Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className="theme-toggle-button relative w-[clamp(2.5rem,4vw,3rem)] h-[clamp(2.5rem,4vw,3rem)] rounded-full transition-all duration-500 hover:shadow-2xl group overflow-hidden flex items-center justify-center"
              >
                <motion.div
                  className="relative z-10"
                  animate={{ 
                    rotateY: theme === "dark" ? 0 : 180,
                    scale: theme === "dark" ? 1 : 0.8 
                  }}
                  transition={{ 
                    duration: 0.6, 
                    type: "spring", 
                    stiffness: 200 
                  }}
                >
                  <Sun className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] text-yellow-400" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 z-10 flex items-center justify-center"
                  animate={{ 
                    rotateY: theme === "dark" ? 180 : 0,
                    scale: theme === "dark" ? 0.8 : 1 
                  }}
                  transition={{ 
                    duration: 0.6, 
                    type: "spring", 
                    stiffness: 200 
                  }}
                >
                  <Moon className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] text-blue-300" />
                </motion.div>
                
                {/* Animated Background Glow with Rotation */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-20"
                  animate={{
                    background: theme === "dark" 
                      ? "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, transparent 70%)",
                    scale: [1, 1.15, 1],
                    rotate: [0, 360]
                  }}
                  transition={{
                    scale: {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    rotate: {
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                />
                
                {/* Enhanced Particle Effects with Orbital Motion */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    opacity: [0, 1, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    opacity: {
                      duration: 4,
                      repeat: Infinity,
                      delay: 1
                    },
                    rotate: {
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-current rounded-full"
                      style={{
                        left: `${20 + i * 10}%`,
                        top: `${20 + (i % 2) * 30}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, -360]
                      }}
                      transition={{
                        scale: {
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.3
                        },
                        opacity: {
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.3
                        },
                        rotate: {
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear"
                        }
                      }}
                    />
                  ))}
                </motion.div>
              </Button>
            </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
