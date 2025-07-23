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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
