import { motion, AnimatePresence } from "framer-motion";
import { X, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/use-analytics";
import { sendEmail } from "@/lib/email-service";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const newsletterMutation = useMutation({
    mutationFn: async (data: NewsletterFormData) => {
      return await sendEmail({
        email: data.email,
        type: 'newsletter'
      });
    },
    onSuccess: (response) => {
      toast({
        title: "Welcome to the Neural Network!",
        description: response.message,
      });
      trackEvent({
        action: "subscribe",
        category: "newsletter",
        label: "newsletter_signup",
      });
      reset();
      onClose();
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "Please try again later.";
      toast({
        title: "Subscription failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NewsletterFormData) => {
    newsletterMutation.mutate(data);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Revolutionary Immersive Backdrop */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-slate-900/50 to-violet-950/40 backdrop-blur-xl"
            initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
            animate={{ backdropFilter: "blur(24px)", opacity: 1 }}
            exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={handleBackdropClick}
          />

          {/* Neural Network Pattern Overlay */}
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={`newsletter-neural-${i}`}
                className="absolute w-0.5 h-10 bg-gradient-to-b from-cyan-400/40 to-violet-400/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scaleY: [0, 1, 0],
                  opacity: [0, 0.7, 0],
                  rotate: [0, Math.random() * 180],
                }}
                transition={{
                  duration: 3.5 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Centered Modal Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              className="relative w-full max-w-md"
              initial={{ scale: 0.85, opacity: 0, y: 80 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 80 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 18,
                duration: 0.7,
                delay: 0.15
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glass Card with Neural Glow */}
              <motion.div
                className="relative bg-white/12 dark:bg-gray-900/25 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-2xl overflow-hidden"
                animate={{
                  boxShadow: [
                    "0 25px 50px -12px rgba(6, 182, 212, 0.3)",
                    "0 25px 50px -12px rgba(139, 92, 246, 0.3)",
                    "0 25px 50px -12px rgba(6, 182, 212, 0.3)",
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Content Container */}
                <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8">
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </Button>

                  <div className="text-center mb-6">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 glass-card rounded-full flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <BrainCircuit className="w-8 h-8 text-[hsl(188,95%,44%)]" />
                    </motion.div>
                    <h2 className="text-2xl font-bold gradient-text mb-2">
                      Join the Neural Network
                    </h2>
                    <p className="text-muted-foreground">
                      Get updates on AI insights, projects, and breakthrough discoveries
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="newsletter-email">Email Address</Label>
                      <Input
                        id="newsletter-email"
                        type="email"
                        {...register("email")}
                        className="mt-1 glass-card border-white/20 focus:border-[hsl(188,95%,44%)]/50"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={newsletterMutation.isPending}
                      className="w-full glass-card border-0 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[hsl(188,95%,44%)]/25 font-medium py-4"
                    >
                      {newsletterMutation.isPending ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Connecting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <BrainCircuit className="w-4 h-4" />
                          <span>Join Network</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
