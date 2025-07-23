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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            className="relative rounded-3xl p-8 w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
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
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  <span>Join the Network</span>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
