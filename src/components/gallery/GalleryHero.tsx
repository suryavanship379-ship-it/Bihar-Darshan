import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Image as ImageIcon, Video, Users, MapPin } from "lucide-react";
import heroImg from "../../assets/gallery-hero.png";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${40 + Math.random() * 50}%`,
  delay: `${Math.random() * 6}s`,
  size: 2 + Math.random() * 4,
  duration: `${6 + Math.random() * 6}s`,
}));

interface GalleryHeroProps {
  stats?: {
    images: number;
    videos: number;
    contributors: number;
    districts: number;
  };
}

const GalleryHero = ({ stats = { images: 0, videos: 0, contributors: 0, districts: 0 } }: GalleryHeroProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative h-[85vh] min-h-[580px] max-h-[850px] overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={heroImg}
          alt="Bihar Heritage Architecture"
          className="absolute inset-0 w-full h-full object-cover scale-110"
          loading="eager"
        />
      </motion.div>

      {/* Dark Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0F1419]" />

      {/* Warm Golden Lighting */}
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(212,160,23,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <span
            key={p.id}
            className="gallery-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-16"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-16 h-px bg-gold mx-auto mb-6"
          />

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl text-white leading-[1.1] tracking-tight">
            Bihar{" "}
            <span
              className="text-gold italic inline-block"
              style={{
                fontFamily: "var(--font-signature)",
                fontSize: "1.15em",
                lineHeight: "0.8",
              }}
            >
              Media
            </span>{" "}
            Archive
          </h1>

          {/* Decorative Ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center justify-center gap-3 mt-6 mb-8"
          >
            <div className="w-12 h-px bg-gold/40" />
            <div className="w-2 h-2 rounded-full bg-gold/60" />
            <div className="w-12 h-px bg-gold/40" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-white/70 text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-12"
          >
            Explore thousands of photographs and videos celebrating Bihar's heritage, festivals, traditions, cuisine, wildlife, architecture, and the stories shared by our community.
          </motion.p>
          
          {/* Live Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-3xl mx-auto"
          >
            {[
              { icon: ImageIcon, label: "Images", value: stats.images },
              { icon: Video, label: "Videos", value: stats.videos },
              { icon: Users, label: "Community Contributors", value: stats.contributors },
              { icon: MapPin, label: "Districts Covered", value: stats.districts },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
                <stat.icon size={20} className="text-gold mb-3" />
                <span className="text-2xl font-bold text-white mb-1">{stat.value}+</span>
                <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest font-semibold text-center">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GalleryHero;
