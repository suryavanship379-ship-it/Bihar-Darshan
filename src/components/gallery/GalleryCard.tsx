import { motion } from "framer-motion";
import { Heart, Share2, Bookmark, Eye, Play, Image, Clock } from "lucide-react";
import type { GalleryItem } from "../../data/galleryData";

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

const aspectHeights: Record<string, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
};

const formatCount = (n: number): string => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
};

const GalleryCard = ({ item, index, onClick }: GalleryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: (index % 10) * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-[#1a1f2a]"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className={`relative ${aspectHeights[item.aspectRatio]} overflow-hidden`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Default Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Hover Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold/90 text-[10px] font-bold uppercase tracking-wider text-black shadow-lg">
            {item.category}
          </span>
        </div>

        {/* Media Type Badge */}
        <div className="absolute top-3 right-3 z-10">
          {item.mediaType === "video" ? (
            <div className="flex items-center gap-1.5">
              {item.duration && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold">
                  <Clock size={10} />
                  {item.duration}
                </span>
              )}
            </div>
          ) : (
            <div className="w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Image size={12} className="text-white/70" />
            </div>
          )}
        </div>

        {/* Video Play Button (center) */}
        {item.mediaType === "video" && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center shadow-[0_0_30px_rgba(212,160,23,0.4)] group-hover:scale-110 transition-transform duration-500">
              <Play size={20} fill="black" className="text-black ml-0.5" />
            </div>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          {[
            { icon: Heart, label: "Like" },
            { icon: Share2, label: "Share" },
            { icon: Bookmark, label: "Save" },
            { icon: Eye, label: "View" },
          ].map((action) => (
            <button
              key={action.label}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:text-black transition-all duration-300"
              title={action.label}
            >
              <action.icon size={14} />
            </button>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
          {/* Photographer */}
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-[9px] font-bold text-gold">
              {item.photographer.charAt(0)}
            </div>
            <span className="text-white text-[11px] font-semibold truncate">
              {item.photographer}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-white/50 text-[10px] font-medium">
            <span className="flex items-center gap-1">
              <Heart size={10} />
              {formatCount(item.likes)}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={10} />
              {formatCount(item.views)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryCard;
