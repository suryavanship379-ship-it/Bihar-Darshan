import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Heart,
  Eye,
  MessageCircle,
  Calendar,
  MapPin,
  Tag,
} from "lucide-react";
import type { GalleryItem } from "../../data/galleryData";

interface GalleryLightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (item: GalleryItem) => void;
}

const formatCount = (n: number): string => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const GalleryLightbox = ({
  item,
  items,
  onClose,
  onNavigate,
}: GalleryLightboxProps) => {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(items[currentIndex - 1]);
  }, [hasPrev, currentIndex, items, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(items[currentIndex + 1]);
  }, [hasNext, currentIndex, items, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [item, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[300] flex items-center justify-center"
          style={{ background: "rgba(0, 0, 0, 0.95)" }}
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-white" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-5 z-50 text-white/40 text-sm font-medium">
            {currentIndex + 1} / {items.length}
          </div>

          {/* Previous Arrow */}
          {hasPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-gold/20 hover:border-gold/40 border border-white/10 flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
          )}

          {/* Next Arrow */}
          {hasNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-gold/20 hover:border-gold/40 border border-white/10 flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          )}

          {/* Content */}
          <motion.div
            key={item.id}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl mx-4 flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative flex-1 bg-black min-h-[300px] lg:min-h-[500px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover lg:object-contain max-h-[70vh]"
              />
            </div>

            {/* Info Panel */}
            <div className="w-full lg:w-80 bg-[#12161c] border-t lg:border-t-0 lg:border-l border-white/[0.08] flex flex-col">
              {/* Header */}
              <div className="p-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-sm font-bold text-gold">
                    {item.photographer.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      {item.photographer}
                    </p>
                    <p className="text-white/30 text-[11px] font-medium">
                      Photographer
                    </p>
                  </div>
                </div>
                <h3 className="text-white font-serif text-lg font-bold leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Meta Info */}
              <div className="p-5 border-b border-white/[0.06] space-y-3">
                <div className="flex items-center gap-2.5 text-white/50 text-xs">
                  <Tag size={13} className="text-gold/60" />
                  <span className="font-semibold text-gold/80">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-white/50 text-xs">
                  <MapPin size={13} className="text-white/30" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/50 text-xs">
                  <Calendar size={13} className="text-white/30" />
                  <span>{formatDate(item.uploadDate)}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="p-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1.5 text-white/50 text-xs">
                    <Heart size={14} className="text-red-400/60" />
                    <span className="font-semibold">
                      {formatCount(item.likes)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/50 text-xs">
                    <Eye size={14} className="text-white/30" />
                    <span className="font-semibold">
                      {formatCount(item.views)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/50 text-xs">
                    <MessageCircle size={14} className="text-white/30" />
                    <span className="font-semibold">
                      {formatCount(item.comments)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-5 mt-auto">
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold hover:bg-gold-dark text-black font-bold text-xs tracking-wide transition-all duration-300">
                    <Download size={14} />
                    Download
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white/70 hover:bg-white/[0.1] hover:text-white font-semibold text-xs transition-all duration-300">
                    <Share2 size={14} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryLightbox;
