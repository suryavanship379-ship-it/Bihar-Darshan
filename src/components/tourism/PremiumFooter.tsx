import { useState } from "react";
import { motion } from "framer-motion";
import {
  Facebook, Instagram, Youtube, Twitter, Linkedin,
  Mail, ArrowRight, ArrowUp, MapPin, Shield, CheckCircle
} from "lucide-react";

// helper: staggered fade-up props for each column
const col = (i: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay: i * 0.12 },
});

// ─── Data ────────────────────────────────────────────────────────────────────
const exploreLinks = [
  "Home", "Districts", "Tourism", "Tribes", "Culture", "Community", "Gallery", "Marketplace"
];
const companyLinks = [
  "About Us", "Become Partner", "Submit Tour", "Privacy Policy", "Terms & Conditions", "Contact", "Support"
];
const socialIcons = [
  { icon: <Facebook size={18} />, label: "Facebook", href: "#" },
  { icon: <Instagram size={18} />, label: "Instagram", href: "#" },
  { icon: <Youtube size={18} />, label: "YouTube", href: "#" },
  { icon: <Twitter size={18} />, label: "Twitter", href: "#" },
  { icon: <Linkedin size={18} />, label: "LinkedIn", href: "#" },
];

// ─── Sub-Components ──────────────────────────────────────────────────────────
const NavLink = ({ label }: { label: string }) => (
  <li>
    <a
      href="#"
      className="group flex items-center gap-2 text-white/50 hover:text-[#D4A017] text-sm font-medium transition-colors duration-300 py-1.5"
    >
      <ArrowRight
        size={12}
        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#D4A017]"
      />
      <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#D4A017] after:transition-all after:duration-300 group-hover:after:w-full">
        {label}
      </span>
    </a>
  </li>
);

const SocialButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <motion.a
    href="#"
    aria-label={label}
    whileHover={{ scale: 1.15, rotate: 8 }}
    whileTap={{ scale: 0.9 }}
    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/60 hover:bg-[#D4A017] hover:text-white hover:border-[#D4A017] hover:shadow-[0_0_20px_rgba(212,160,23,0.4)] transition-all duration-400"
  >
    {icon}
  </motion.a>
);

// ─── Main Footer ─────────────────────────────────────────────────────────────
const PremiumFooter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) { setSubscribed(true); setEmail(""); }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#111111] overflow-hidden">
      {/* ── Straight Divider ──────────────────────────────────────────────── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4A017]/30 to-transparent" />

      {/* ── Radial Gold Glow ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#D4A017]/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#D4A017]/4 rounded-full blur-[100px]" />
      </div>

      {/* ── Madhubani Low-opacity pattern ─────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/moroccan-flower.png')" }}
      />

      {/* ── Heritage Architecture Illustration (bottom-right) ─────────────── */}
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none opacity-[0.04]">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stylized temple silhouette */}
          <rect x="85" y="140" width="30" height="60" stroke="#D4A017" strokeWidth="1.5" />
          <polygon points="100,80 70,140 130,140" stroke="#D4A017" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="70" r="12" stroke="#D4A017" strokeWidth="1.5" fill="none" />
          <line x1="100" y1="58" x2="100" y2="30" stroke="#D4A017" strokeWidth="1" />
          <line x1="60" y1="140" x2="40" y2="200" stroke="#D4A017" strokeWidth="1" />
          <line x1="140" y1="140" x2="160" y2="200" stroke="#D4A017" strokeWidth="1" />
          <rect x="30" y="160" width="20" height="40" stroke="#D4A017" strokeWidth="1" fill="none" />
          <polygon points="40,140 25,160 55,160" stroke="#D4A017" strokeWidth="1" fill="none" />
          <rect x="150" y="160" width="20" height="40" stroke="#D4A017" strokeWidth="1" fill="none" />
          <polygon points="160,140 145,160 175,160" stroke="#D4A017" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* ── Floating Particles ────────────────────────────────────────────── */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#D4A017]/30 pointer-events-none"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }}
          animate={{ y: [-8, 8, -8], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── Main Grid ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 pt-8 pb-4 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* ── Col 1: Brand ───────────────────────────────────────────────── */}
          <motion.div {...col(0)}>
            <div className="flex items-center gap-3 mb-5">
              <MapPin className="w-7 h-7 text-[#D4A017]" />
              <h2 className="text-2xl font-serif text-white tracking-wider">BIHAR DARSHAN</h2>
            </div>
            <p className="text-[#D4A017] italic text-sm mb-4 font-medium">Discover the Soul of Bihar</p>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Your gateway to exploring Bihar's culture, heritage, tribes, festivals and tourism.
              A luxury-curated experience for the discerning traveler.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialIcons.map((s) => (
                <SocialButton key={s.label} icon={s.icon} label={s.label} />
              ))}
            </div>
          </motion.div>

          {/* ── Col 2: Explore ─────────────────────────────────────────────── */}
          <motion.div {...col(1)}>
            <h3 className="text-white font-serif text-xl mb-6 tracking-wide">Explore</h3>
            <div className="w-8 h-px bg-[#D4A017] mb-6" />
            <ul className="space-y-0.5">
              {exploreLinks.map((link) => <NavLink key={link} label={link} />)}
            </ul>
          </motion.div>

          {/* ── Col 3: Company ─────────────────────────────────────────────── */}
          <motion.div {...col(2)}>
            <h3 className="text-white font-serif text-xl mb-6 tracking-wide">Company</h3>
            <div className="w-8 h-px bg-[#D4A017] mb-6" />
            <ul className="space-y-0.5">
              {companyLinks.map((link) => <NavLink key={link} label={link} />)}
            </ul>
          </motion.div>

          {/* ── Col 4: Newsletter ──────────────────────────────────────────── */}
          <motion.div {...col(3)}>
            <h3 className="text-white font-serif text-xl mb-6 tracking-wide">Stay Updated</h3>
            <div className="w-8 h-px bg-[#D4A017] mb-6" />
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Subscribe to receive travel stories, festival updates and exclusive journeys.
            </p>

            {/* Input */}
            {subscribed ? (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#D4A017]/10 border border-[#D4A017]/30">
                <CheckCircle className="w-5 h-5 text-[#D4A017]" />
                <span className="text-[#D4A017] text-sm font-semibold">You're subscribed!</span>
              </div>
            ) : (
              <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full overflow-hidden focus-within:border-[#D4A017]/50 focus-within:shadow-[0_0_20px_rgba(212,160,23,0.15)] transition-all duration-300">
                <Mail className="absolute left-4 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent pl-10 pr-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                />
                <motion.button
                  onClick={handleSubscribe}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="m-1.5 px-5 py-2.5 bg-[#D4A017] rounded-full text-white flex items-center gap-1.5 font-semibold text-xs hover:shadow-[0_0_20px_rgba(212,160,23,0.5)] transition-shadow duration-300"
                >
                  <ArrowRight size={14} strokeWidth={3} />
                </motion.button>
              </div>
            )}

            {/* Trust Badges */}
            <div className="flex items-center gap-4 mt-5">
              <div className="flex items-center gap-1.5 text-white/30 text-[11px]">
                <Shield size={13} className="text-[#D4A017]" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/30 text-[11px]">
                <CheckCircle size={13} className="text-[#D4A017]" />
                <span>No Spam</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/30 text-[11px]">
                <CheckCircle size={13} className="text-[#D4A017]" />
                <span>Verified Partner</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── Bottom Bar ────────────────────────────────────────────────────── */}
        <div className="mt-16 pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left */}
          <p className="text-white/25 text-xs tabular-nums">
            © 2026 Bihar Darshan. All Rights Reserved.
          </p>

          {/* Center */}
          <p className="text-white/25 text-xs flex items-center gap-1.5">
            Made with <span className="text-[#D4A017]">❤️</span> for Bihar
          </p>

          {/* Right: Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, rotate: -8 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#D4A017] hover:text-white hover:border-[#D4A017] hover:shadow-[0_0_24px_rgba(212,160,23,0.5)] transition-all duration-300"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>

        {/* ── Madhubani Bottom Border ───────────────────────────────────────── */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[#D4A017]/20 to-transparent" />
        <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-[#D4A017]/10 to-transparent" />
      </div>
    </footer>
  );
};

export default PremiumFooter;
