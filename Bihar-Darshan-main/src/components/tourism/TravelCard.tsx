import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Phone, Play, ChevronRight, CheckCircle,
  Video, Flame, Clock, ArrowUpRight
} from "lucide-react";
import type { TourTrip } from "../../data/tourismData";

// ─── Types ───────────────────────────────────────────────────────────────────
type Badge = "video" | "featured" | "most-booked" | "limited" | "trending";

interface TravelCardProps {
  trip: TourTrip;
  badges?: Badge[];
  isCenter?: boolean;
}

// ─── Badge config ─────────────────────────────────────────────────────────────
const BADGES: Record<Badge, { label: string; color: string; icon?: React.ReactNode }> = {
  video: { label: "Video Tour", color: "bg-blue-500/80", icon: <Video size={10} /> },
  featured: { label: "Featured", color: "bg-[#D4A017]/90", icon: <Star size={10} className="fill-white" /> },
  "most-booked": { label: "Most Booked", color: "bg-emerald-600/80", icon: <Flame size={10} /> },
  limited: { label: "Limited Seats", color: "bg-red-500/80", icon: <Clock size={10} /> },
  trending: { label: "Trending", color: "bg-purple-600/80", icon: <ArrowUpRight size={10} /> },
};

// ─── Floating Particle ────────────────────────────────────────────────────────
const Particle = ({ x, y, delay }: { x: string; y: string; delay: number }) => (
  <motion.div
    className="absolute w-0.5 h-0.5 rounded-full bg-[#D4A017]/50 pointer-events-none"
    style={{ left: x, top: y }}
    animate={{ y: [0, -12, 0], opacity: [0, 1, 0] }}
    transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

// ─── Main Card ────────────────────────────────────────────────────────────────
const TravelCard = ({ trip, badges = [], isCenter = false }: TravelCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        y: -16,
        rotate: 0.8,
        transition: { type: "spring", stiffness: 200, damping: 20 },
      }}
      className="relative w-[380px] h-[700px] rounded-[32px] overflow-hidden cursor-pointer select-none"
      style={{
        boxShadow: hovered
          ? "0 40px 80px rgba(0,0,0,0.35), 0 0 0 1.5px rgba(212,160,23,0.5)"
          : isCenter
            ? "0 28px 60px rgba(0,0,0,0.25)"
            : "0 20px 50px rgba(0,0,0,0.18)",
      }}
    >
      {/* ── Full-cover image ─────────────────────────────────────────────── */}
      <motion.div className="absolute inset-0 z-0">
        <motion.img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85" />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />
        {/* Warm golden ambient glow on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ background: "radial-gradient(ellipse at center bottom, rgba(212,160,23,0.12) 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* ── Floating particles ───────────────────────────────────────────── */}
      <Particle x="15%" y="40%" delay={0} />
      <Particle x="80%" y="55%" delay={0.8} />
      <Particle x="50%" y="30%" delay={1.4} />

      {/* ── TOP BADGES ───────────────────────────────────────────────────── */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-start justify-between gap-3">
        {/* Left: Duration capsule */}
        <div className="flex flex-col gap-2">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#D4A017]/30 text-[11px] font-bold text-[#D4A017] uppercase tracking-widest shadow-lg">
            {trip.duration}
          </span>
          {/* Optional badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {badges.slice(0, 2).map((b) => (
                <span
                  key={b}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold text-white uppercase tracking-widest backdrop-blur-md ${BADGES[b].color}`}
                >
                  {BADGES[b].icon}
                  {BADGES[b].label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: Rating + Verified */}
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <Star className="w-3.5 h-3.5 fill-[#D4A017] text-[#D4A017]" />
            <span className="text-white font-bold text-sm tabular-nums">{trip.rating}</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <CheckCircle className="w-3 h-3 text-emerald-400 fill-emerald-400/20" />
            <span className="text-white/80 text-[9px] font-semibold uppercase tracking-wider">Verified</span>
          </div>
        </div>
      </div>

      {/* ── CENTER CONTENT ───────────────────────────────────────────────── */}
      <div className="absolute inset-x-0 z-20" style={{ top: "38%" }}>
        <div className="px-7">
          {/* Provider */}
          <div className="flex items-center gap-2 mb-3">
            <img src={trip.providerLogo} alt={trip.provider} className="w-5 h-5 rounded-full opacity-80" />
            <span className="text-white/70 text-xs font-semibold tracking-wide">{trip.provider}</span>
            <CheckCircle className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
          </div>

          {/* Title */}
          <h3
            className="font-serif text-white text-[2rem] leading-[1.15] mb-4"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
          >
            {trip.title}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-sm leading-relaxed font-medium line-clamp-3">
            {trip.description}
          </p>
        </div>
      </div>

      {/* ── FLOATING PLAY BUTTON (Mid-Right) ─────────────────────────────── */}
      {trip.hasVideo && (
        <motion.button
          className="absolute right-7 z-30 w-[72px] h-[72px] rounded-full flex items-center justify-center"
          style={{ top: "52%", background: "rgba(255,255,255,0.14)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(255,255,255,0.25)" }}
          whileHover={{
            scale: 1.15,
            rotate: 8,
            boxShadow: "0 0 30px rgba(212,160,23,0.6)",
          }}
          whileTap={{ scale: 0.92 }}
          animate={hovered ? { boxShadow: ["0 0 0px rgba(212,160,23,0)", "0 0 24px rgba(212,160,23,0.4)", "0 0 0px rgba(212,160,23,0)"] } : {}}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <Play className="w-7 h-7 text-white fill-white ml-1" />
        </motion.button>
      )}

      {/* ── BOTTOM GLASSMORPHISM PANEL ────────────────────────────────────── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 rounded-t-[28px] p-6"
        style={{ background: "rgba(10,8,6,0.72)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Departure + Places */}
        <div className="flex items-start gap-3 mb-5">
          <div className="mt-0.5">
            <MapPin className="w-4 h-4 text-[#D4A017]" />
          </div>
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1.5">
              From {trip.departureCity}
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {trip.places.map((p, i) => (
                <span key={i} className="text-white/75 text-xs font-medium flex items-center gap-1">
                  {i > 0 && <span className="text-white/20 mr-1">·</span>}
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Phone + CTA */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/8 border border-white/10 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-[#D4A017]" />
            </div>
            <span className="text-white/60 text-xs font-semibold tabular-nums">{trip.phone}</span>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(212,160,23,0.55)" }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #D4A017 0%, #C4900D 100%)", boxShadow: "0 8px 24px rgba(212,160,23,0.3)" }}
          >
            View Details
            <AnimatePresence>
              <motion.span
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TravelCard;
