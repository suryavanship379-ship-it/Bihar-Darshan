import { motion } from "framer-motion";
import { Upload, Camera, Video } from "lucide-react";
import ctaBg from "../../assets/cta-bg.png";

const UploadBanner = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={ctaBg}
        alt="Share Your Bihar Story"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      {/* Decorative Golden Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(212,160,23,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      >
        <div className="max-w-2xl">
          {/* Label */}
          <div className="flex items-center gap-2 mb-4">
            <Upload size={14} className="text-gold" />
            <span className="text-gold text-[11px] uppercase tracking-[0.2em] font-bold">
              Community Contribution
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight mb-4">
            Share Your{" "}
            <span
              className="text-gold italic"
              style={{ fontFamily: "var(--font-signature)" }}
            >
              Bihar
            </span>{" "}
            Story
          </h2>

          {/* Description */}
          <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
            Become part of the Bihar Darshan community. Upload your photos and
            videos to showcase the rich culture, stunning landscapes, and vibrant
            traditions of Bihar.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl bg-gold hover:bg-gold-dark text-black font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gold/20">
              <Camera size={16} />
              Upload Photos
            </button>
            <button className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm tracking-wide hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              <Video size={16} />
              Upload Videos
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default UploadBanner;
