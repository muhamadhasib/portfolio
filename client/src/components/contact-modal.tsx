import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/use-analytics";
import { sendEmail } from "@/lib/email-service";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await sendEmail({
        name: data.name,
        email: data.email,
        message: data.message,
        type: 'contact'
      });
    },
    onSuccess: (response) => {
      toast({
        title: "Message sent successfully!",
        description: response.message,
      });
      trackEvent({
        action: "submit",
        category: "contact",
        label: "contact_form",
      });
      reset();
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
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
            className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-slate-900/50 to-cyan-950/40 backdrop-blur-xl"
            initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
            animate={{ backdropFilter: "blur(24px)", opacity: 1 }}
            exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={handleBackdropClick}
          />

          {/* Neural Network Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`neural-${i}`}
                className="absolute w-px h-12 bg-gradient-to-b from-violet-400/30 to-cyan-400/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scaleY: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Centered Modal Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              className="relative w-full max-w-lg"
              initial={{ scale: 0.9, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 60 }}
              transition={{ 
                type: "spring",
                stiffness: 280,
                damping: 20,
                duration: 0.6,
                delay: 0.1
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glass Card with Animated Border */}
              <motion.div
                className="relative bg-white/10 dark:bg-gray-900/20 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-2xl overflow-hidden"
                animate={{
                  boxShadow: [
                    "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
                    "0 25px 50px -12px rgba(6, 182, 212, 0.25)",
                    "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Content Container */}
                <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8"
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
                className="w-16 h-16 mx-auto mb-4 glass-card rounded-full flex items-center justify-center contact-icon-3d"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <BrainCircuit className="w-8 h-8 text-[hsl(270,85%,60%)]" />
              </motion.div>
              <h2 className="text-2xl font-bold gradient-text mb-2">Get In Touch</h2>
              <p className="text-muted-foreground">
                Let's discuss your next AI project or collaboration
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="mt-1 glass-card border-white/20 focus:border-[hsl(270,85%,60%)]/50"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1 glass-card border-white/20 focus:border-[hsl(270,85%,60%)]/50"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  rows={4}
                  className="mt-1 glass-card border-white/20 focus:border-[hsl(270,85%,60%)]/50 resize-none"
                  placeholder="Tell me about your project or idea..."
                />
                {errors.message && (
                  <p className="text-sm text-red-400 mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full glass-card border-0 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[hsl(270,85%,60%)]/25 font-medium py-4"
              >
                {contactMutation.isPending ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Send Message</span>
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
