import { motion } from "framer-motion";
import { Star, MapPin, Play, Phone, ExternalLink, CalendarDays } from "lucide-react";
import type { TourTrip } from "../../data/tourismData";

interface TripCardProps {
  trip: TourTrip;
  variant?: 'landscape' | 'portrait' | 'standard' | 'compact';
}

const TripCard = ({ trip, variant = 'standard' }: TripCardProps) => {
  const isPortrait = variant === 'portrait';
  const isLandscape = variant === 'landscape';

  return (
    <motion.div
      whileHover={{ y: -10, rotate: variant === 'compact' ? 1 : variant === 'standard' ? -1 : 0 }}
      className={`group relative bg-white rounded-[32px] overflow-hidden border border-brand-dark/5 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col ${isLandscape ? 'h-[500px]' : isPortrait ? 'h-full md:min-h-[1040px]' : 'h-[600px]'
        }`}
    >
      {/* Top: Image Section */}
      <div className={`relative overflow-hidden ${isLandscape ? 'h-3/5' : isPortrait ? 'h-[400px]' : 'h-1/2'}`}>
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-110"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/10 transition-colors duration-700" />

        {/* Video Badge */}
        {trip.hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center p-1 group/play"
            >
              <div className="w-full h-full rounded-full bg-brand-gold flex items-center justify-center text-brand-dark shadow-[0_0_20px_rgba(212,160,23,0.5)] group-hover/play:bg-white transition-colors">
                <Play size={24} fill="currentColor" className="ml-1" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
            <Star className="w-3 h-3 text-brand-gold fill-brand-gold" />
            {trip.rating} Rating
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <div className="px-4 py-2 rounded-full bg-brand-gold text-brand-dark text-xs font-bold uppercase tracking-widest shadow-lg">
            {trip.duration}
          </div>
          <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
            <MapPin size={16} className="text-brand-gold" />
            {trip.departureCity}
          </div>
        </div>
      </div>

      {/* Bottom: Content Section */}
      <div className="flex-1 p-8 flex flex-col relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full border border-brand-dark/10 p-1 bg-brand-gray overflow-hidden">
            <img src={trip.providerLogo} alt={trip.provider} className="w-full h-full object-contain" />
          </div>
          <span className="text-brand-dark/40 text-[10px] uppercase font-bold tracking-[0.2em]">
            Offered by <span className="text-brand-gold ml-1">{trip.provider}</span>
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-serif text-brand-dark mb-4 group-hover:text-brand-gold transition-colors duration-500">
          {trip.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-6">
          {trip.places.map((place) => (
            <span key={place} className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/40 px-3 py-1 rounded-full border border-brand-dark/5 bg-brand-gray">
              {place}
            </span>
          ))}
        </div>

        <p className="text-brand-dark/60 text-sm leading-relaxed mb-8 flex-1">
          {trip.description}
        </p>

        {/* Hover Reveal Buttons & Info */}
        <div className="mt-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-brand-dark/40 text-[10px] uppercase font-bold tracking-widest mb-1">Price starts at</p>
              <p className="text-3xl font-bold text-brand-dark">{trip.price} <span className="text-sm font-normal text-brand-dark/40">/ person</span></p>
            </div>

            <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex gap-4">
              <button className="w-12 h-12 rounded-full border border-brand-dark/10 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-all">
                <Phone size={18} />
              </button>
              <button className="h-12 px-6 rounded-full bg-green-500 text-white flex items-center gap-2 font-bold text-sm tracking-wide hover:bg-green-600 transition-all shadow-lg shadow-green-500/20">
                <CalendarDays size={18} />
                Book Now
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <button className="flex-1 h-14 bg-brand-dark text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-dark transition-all duration-500 flex items-center justify-center gap-2">
              Learn More
              <ExternalLink size={14} />
            </button>
          </div>
        </div>

        {/* Dynamic Glow and Border on Hover */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </div>
    </motion.div>
  );
};

export default TripCard;
