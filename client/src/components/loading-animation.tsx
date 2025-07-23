import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function LoadingAnimation() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Neural Background Effects - Exactly matching the main site */}
      <div className="absolute inset-0 neural-bg overflow-hidden">
        {/* Neural connection lines matching the homepage */}
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

        {/* Floating particles matching the main site */}
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-[hsl(270,85%,60%)] rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main Loading Content - Preview of actual site elements */}
      <div className="relative z-10 text-center space-y-8">
        
        {/* Welcome section preview with stars */}
        <motion.div
          className="flex items-center justify-center space-x-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-5 h-5 text-[hsl(270,85%,60%)]" />
          </motion.div>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 font-medium"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            CONNECTING.....
          </motion.p>
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-5 h-5 text-[hsl(188,95%,44%)]" />
          </motion.div>
        </motion.div>

        {/* Name preview - exactly matching homepage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text">
            Muhammad Hasib
          </h1>
        </motion.div>

        {/* Role preview with typing effect simulation */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.p
            className="text-xl text-gray-700 dark:text-gray-300 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            AI & ML Engineer
          </motion.p>
          
          {/* Loading dots matching the homepage typewriter */}
          <motion.div
            className="flex justify-center space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            {Array.from({ length: 3 }, (_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-[hsl(188,95%,44%)] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Neural network initialization progress */}
        <motion.div
          className="w-64 mx-auto space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <motion.p
            className="text-sm text-gray-600 dark:text-gray-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Establishing neural connections
          </motion.p>
          
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[hsl(270,85%,60%)] to-[hsl(188,95%,44%)] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}