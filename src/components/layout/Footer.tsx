import { Facebook, Instagram, Youtube, ArrowUp } from "lucide-react";
import logo from "../../assets/new-logo.png";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Districts", href: "#districts" },
  { label: "Tourism", href: "#places" },
  { label: "Community", href: "#community" },
  { label: "Gallery", href: "#gallery" },
];

const connectLinks = [
  { label: "About Us", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-bg-dark text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Bihar Darshan"
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Your gateway to explore, experience
              and contribute to the rich heritage
              and culture of Bihar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif font-bold text-sm tracking-wide mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/45 hover:text-gold text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-serif font-bold text-sm tracking-wide mb-5">
              Connect
            </h3>
            <ul className="space-y-2.5">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/45 hover:text-gold text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-serif font-bold text-sm tracking-wide mb-5">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:bg-gold hover:border-gold hover:text-black transition-all duration-300"
                >
                  <social.icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="hidden sm:block flex-1" />
          <p className="text-center text-white/30 text-sm order-2 sm:order-2">
            © 2026 Bihar Darshan. All Rights Reserved.
          </p>
          <div className="flex-1 flex justify-center sm:justify-end order-1 sm:order-3">
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/50 transition-all duration-300 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
