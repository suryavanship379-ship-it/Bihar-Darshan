import { motion } from "framer-motion";
import { Landmark, Map, Utensils, Sparkles, MessageSquare } from "lucide-react";
import heroImage from "../../assets/hero.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen lg:h-screen py-24 lg:py-0 overflow-hidden">
      {/* Hero Background */}
      <img
        src={heroImage}
        alt="Bihar Heritage Monument"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] lg:h-full text-center px-4 pb-12 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-white leading-[1.1] tracking-tight">
            Discover the
            <br />
            Soul of <span className="text-gold italic inline-block" style={{ fontFamily: 'var(--font-signature)', fontSize: '1.15em', lineHeight: '0.8' }}>Bihar</span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-6 sm:mt-8"
          >
            <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
              Journey through ancient civilizations, sacred temples, breathtaking landscapes,
              vibrant festivals, authentic cuisine, and modern stories waiting to be explored.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#places"
              className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-dark text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              Explore Places
            </a>
            <a
              href="#districts"
              className="px-8 py-3.5 rounded-full border border-white/25 text-white font-medium text-sm tracking-wide hover:bg-white/10 transition-all duration-300"
            >
              View Districts
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Stats Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        className="relative lg:absolute mt-8 lg:mt-0 lg:bottom-10 left-0 lg:left-1/2 lg:-translate-x-1/2 w-full max-w-7xl px-4 z-20"
      >
        <div className="border border-white/20 rounded-[2rem] lg:rounded-[3rem] py-6 lg:py-8 px-6 lg:px-16 flex flex-wrap items-center justify-center lg:justify-between gap-6 lg:gap-4 transition-all duration-500 hover:border-white/40">
          <StatItem icon={<Landmark size={24} strokeWidth={1.2} />} value="500+" label="Attractions" />
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <StatItem icon={<Map size={24} strokeWidth={1.2} />} value="38" label="Districts" />
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <StatItem icon={<Utensils size={24} strokeWidth={1.2} />} value="100+" label="Local Foods" />
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <StatItem icon={<Sparkles size={24} strokeWidth={1.2} />} value="50+" label="Festivals" />
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <StatItem icon={<MessageSquare size={24} strokeWidth={1.2} />} value="1000+" label="Stories" />
        </div>
      </motion.div>
    </section>
  );
};

const StatItem = ({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) => (
  <div className="flex items-center gap-3 group">
    <div className="text-gold flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
      {icon}
    </div>
    <div className="flex flex-col">
      <p className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none mb-0.5">{value}</p>
      <p className="text-white/40 text-[10px] font-semibold uppercase tracking-[0.2em]">{label}</p>
    </div>
  </div>
);

export default HeroSection;
