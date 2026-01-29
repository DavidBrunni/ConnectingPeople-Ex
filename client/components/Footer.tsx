import Link from "next/link";
import { Plane, Facebook, Instagram, Twitter, Linkedin, LucideIcon } from "lucide-react";

// Typer för struktur
interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Data-struktur
  const links: Record<string, FooterLink[]> = {
    product: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Destinations", href: "/#destinations" },
      { label: "Community", href: "/#community" },
      { label: "Pricing", href: "#" },
    ],
    company: [
      { label: "About us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Safety", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  };

  const socialLinks: SocialLink[] = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#0a1628] text-white pt-20 pb-8 outline-none">
      {/* Separator som heldragen linje istället för border (undviker prickad rendering i Chrome) */}
      <div className="h-px w-full bg-white/5" aria-hidden />
      <div className="container mx-auto px-6">
        
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Brand & Socials */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628]">
              <Plane className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-semibold">Connecting People</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              The travel platform that connects solo adventurers around the world. Find your tribe,
              share experiences, and make unforgettable memories.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-500 hover:text-white flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628]"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {/* Vi loopar igenom kategorierna för att minska upprepad kod */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 capitalize">{category}</h3>
              <ul className="space-y-3">
                {items.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors block w-fit rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8">
          <div className="h-px w-full bg-white/10 mb-8" aria-hidden />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Connecting People. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628]">
                Terms
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628]">
                Privacy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628]">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}