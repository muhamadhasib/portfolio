import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function NeuralBackground() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This would typically use React Three Fiber for more complex 3D animations
    // For now, we'll use CSS animations with dynamic particles
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
    }));

    if (canvasRef.current) {
      particles.forEach((particle) => {
        const element = document.createElement("div");
        element.className = "absolute w-1 h-1 bg-[hsl(270,85%,60%)] rounded-full opacity-60";
        element.style.left = `${particle.x}%`;
        element.style.top = `${particle.y}%`;
        element.style.animation = `float ${particle.duration}s ease-in-out infinite`;
        element.style.animationDelay = `${particle.delay}s`;
        canvasRef.current?.appendChild(element);
      });
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 neural-bg overflow-hidden pointer-events-none z-0">
      <div ref={canvasRef} className="absolute inset-0" />
      
      {/* Neural Connection Lines */}
      <motion.div
        className="absolute top-1/4 left-[15%] w-48 h-px bg-gradient-to-r from-transparent via-[hsl(188,95%,44%)] to-transparent opacity-40"
        style={{ transform: "rotate(45deg)" }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      />
      
      <motion.div
        className="absolute top-[65%] left-1/2 w-36 h-px bg-gradient-to-r from-transparent via-[hsl(328,85%,70%)] to-transparent opacity-40"
        style={{ transform: "rotate(-30deg)" }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
      />
      
      <motion.div
        className="absolute top-[45%] left-[20%] w-44 h-px bg-gradient-to-r from-transparent via-[hsl(270,85%,60%)] to-transparent opacity-40"
        style={{ transform: "rotate(60deg)" }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
      />
      
      <motion.div
        className="absolute top-[85%] left-[40%] w-32 h-px bg-gradient-to-r from-transparent via-[hsl(214,95%,58%)] to-transparent opacity-40"
        style={{ transform: "rotate(-45deg)" }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 3.5 }}
      />
    </div>
  );
}
