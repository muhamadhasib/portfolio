import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

interface SocialIconsProps {
  className?: string;
}

export function SocialIcons({ className = "" }: SocialIconsProps) {
  const { trackEvent } = useAnalytics();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/muhamadhasib",
      label: "GitHub",
      hoverColor: "hover:text-[hsl(270,85%,60%)] hover:shadow-[hsl(270,85%,60%)]/25",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/muhammadhasib/",
      label: "LinkedIn",
      hoverColor: "hover:text-[hsl(188,95%,44%)] hover:shadow-[hsl(188,95%,44%)]/25",
    },
    {
      icon: Twitter,
      href: "https://x.com/hasib_me_",
      label: "Twitter",
      hoverColor: "hover:text-[hsl(328,85%,70%)] hover:shadow-[hsl(328,85%,70%)]/25",
    },
    {
      icon: Mail,
      href: "mailto:muhammadhasib.me@gmail.com",
      label: "Gmail",
      hoverColor: "hover:text-[hsl(214,95%,58%)] hover:shadow-[hsl(214,95%,58%)]/25",
    },
    {
      icon: MapPin,
      href: "https://maps.google.com/?q=Dhaka,Bangladesh",
      label: "Location",
      hoverColor: "hover:text-[hsl(200,95%,50%)] hover:shadow-[hsl(200,95%,50%)]/25",
    },
  ];

  const handleSocialClick = (label: string, href: string) => {
    trackEvent({
      action: "click",
      category: "social",
      label: label.toLowerCase(),
    });
  };

  return (
    <div className={`flex space-x-[clamp(1rem,2vw,1.5rem)] ${className} overflow-visible`}>
      {socialLinks.map(({ icon: Icon, href, label, hoverColor }, index) => (
        <motion.a
          key={label}
          href={href}
          target={label === "Gmail" ? "_self" : "_blank"}
          rel={label === "Gmail" ? undefined : "noopener noreferrer"}
          onClick={() => handleSocialClick(label, href)}
          className={`p-[clamp(0.75rem,1.5vw,1rem)] rounded-full transition-all duration-300 hover:shadow-lg group relative social-icon-adaptive ${hoverColor}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] transition-colors duration-300 social-icon-color" />
          <span className="sr-only">{label}</span>
        </motion.a>
      ))}
    </div>
  );
}
