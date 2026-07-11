import { motion } from "framer-motion";
import { Heart, Share2, Bookmark, Eye, Play, Image, Clock, MapPin, MessageCircle, CheckCircle2, Users } from "lucide-react";
import type { ExtendedGalleryItem } from "../../pages/Gallery";

interface GalleryCardProps {
  item: ExtendedGalleryItem;
  index: number;
  spanClass?: string;
  onClick: () => void;
}

const formatCount = (n: number): string => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const GalleryCard = ({ item, index, spanClass, onClick }: GalleryCardProps) => {
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
      className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-[#1a1f2a] w-full h-full ${spanClass || "col-span-1 row-span-1"}`}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative w-full h-full overflow-hidden">
        {item.mediaType === "video" ? (
          <video
            src={item.image}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Video Play Button (center) */}
        {item.mediaType === "video" && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 transition-transform duration-500 group-hover:scale-110">
              <Play size={20} fill="white" className="text-white ml-0.5" />
            </div>
          </div>
        )}

        {/* Community Contributor Name */}
        {item.source !== "official" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[10px] font-bold text-white">
                  {item.photographer.charAt(0)}
                </div>
                <span className="text-white text-xs font-medium truncate drop-shadow-md">
                  {item.photographer}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default GalleryCard;
