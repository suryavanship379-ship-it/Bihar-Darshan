import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "../../assets/gallery-hero.png";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${40 + Math.random() * 50}%`,
  delay: `${Math.random() * 6}s`,
  size: 2 + Math.random() * 4,
  duration: `${6 + Math.random() * 6}s`,
}));

const GalleryHero = () => {
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
      className="relative h-[70vh] min-h-[480px] max-h-[700px] overflow-hidden"
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0F1419]" />

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
        className="relative z-10 flex items-center justify-center h-full text-center px-4"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-16 h-px bg-gold mx-auto mb-6"
          />

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.1] tracking-tight">
            Photo{" "}
            <span
              className="text-gold italic inline-block"
              style={{
                fontFamily: "var(--font-signature)",
                fontSize: "1.15em",
                lineHeight: "0.8",
              }}
            >
              Gallery
            </span>
          </h1>

          {/* Decorative Ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center justify-center gap-3 mt-4 mb-5"
          >
            <div className="w-8 h-px bg-gold/40" />
            <div className="w-2 h-2 rounded-full bg-gold/60" />
            <div className="w-8 h-px bg-gold/40" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Explore the vibrant moments, rich culture, and timeless beauty
            <br className="hidden sm:block" />
            of Bihar through the lens of our community.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GalleryHero;
