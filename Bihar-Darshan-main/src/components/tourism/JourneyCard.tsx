import { motion } from "framer-motion";
import { Star, MapPin, Phone, Play, ChevronRight } from "lucide-react";
import type { TourTrip } from "../../data/tourismData";

interface JourneyCardProps {
  trip: TourTrip;
  isCenter?: boolean;
}

const JourneyCard = ({ trip, isCenter = false }: JourneyCardProps) => {
  return (
    <div
      className={`relative flex flex-col rounded-[24px] overflow-hidden group cursor-pointer transition-all duration-500
        ${isCenter
          ? "w-[420px] h-[640px] shadow-[0_40px_80px_rgba(0,0,0,0.3)] border-2 border-brand-gold/40 z-20"
          : "w-[340px] h-[600px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#E8E0D4] z-10"
        }`}
    >
      {/* Full Background Image */}
      <motion.div className="absolute inset-0">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dark gradient overlay — heavier at top & bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </motion.div>

      {/* --- TOP SECTION (inside image) --- */}
      <div className="relative z-10 p-6 flex flex-col flex-1">
        {/* Duration Badge */}
        <div className="mb-auto">
          <span className="inline-block px-4 py-1.5 bg-black/50 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white rounded-full border border-white/20">
            {trip.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-serif text-white leading-tight mb-3 ${isCenter ? "text-3xl" : "text-2xl"}`}>
          {trip.title}
        </h3>

        {/* Provider + Rating */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5 text-white/70">
            <img src={trip.providerLogo} alt="" className="w-4 h-4 opacity-70 rounded-full" />
            <span className="text-[11px] font-semibold">{trip.provider}</span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
            <span className="text-[11px] font-bold text-white">{trip.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm leading-relaxed line-clamp-3 mb-4">
          {trip.description}
        </p>

        {/* Play Button */}
        {trip.hasVideo && (
          <div className="flex justify-end mb-2">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl"
            >
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </motion.button>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-white/10 my-4" />

        {/* --- BOTTOM SECTION (inside image) --- */}
        {/* Departure + Places */}
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">From {trip.departureCity}</p>
            <div className="flex flex-wrap gap-1">
              {trip.places.slice(0, 3).map((place, i) => (
                <span key={i} className="text-[10px] text-white/70 font-medium">
                  {place}{i < Math.min(trip.places.length, 3) - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Phone + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-white/60">
            <Phone className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-[11px] font-semibold tabular-nums">{trip.phone}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs transition-all duration-300
              ${isCenter
                ? "bg-brand-gold text-white shadow-[0_8px_24px_rgba(212,160,23,0.4)]"
                : "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-brand-gold hover:border-brand-gold"
              }`}
          >
            View Details
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default JourneyCard;
