import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ZoomIn } from "lucide-react";
import { useAdminData } from "../../data/AdminContext";
import type { GalleryItem } from "../../data/galleryData";

const GallerySection = () => {
  const { gallery: galleryData } = useAdminData();
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Take the first 9 items from the central gallery data
  const galleryItems = galleryData.slice(0, 9);

  const openLightbox = (item: GalleryItem) => {
    setLightboxItem(item);
  };

  const closeLightbox = () => {
    setLightboxItem(null);
  };

  return (
    <section
      id="gallery"
      className="py-16 sm:py-20 lg:py-24 bg-bg-section"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
              Moments
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-bold leading-tight">
              Photo Gallery
            </h2>
          </div>

          <Link
            to="/gallery"
            className="hidden sm:inline-flex text-sm font-medium text-gold hover:text-gold-dark transition-colors"
          >
            View All →
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-3 gap-[3px]">
          {galleryItems.map((item, index) => {
            const isVideo = item.mediaType === "video";
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                }}
                className="relative aspect-square overflow-hidden cursor-pointer group bg-black"
                onClick={() => openLightbox(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.55]"
                  loading="lazy"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {isVideo ? (
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <Play
                        size={22}
                        fill="white"
                        className="text-white"
                      />
                      <span>Play</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <ZoomIn size={22} />
                      <span>View</span>
                    </div>
                  )}
                </div>

                {/* Video Badge */}
                {isVideo && (
                  <div className="absolute top-2.5 right-2.5 pointer-events-none">
                    <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <Play
                        size={12}
                        fill="white"
                        className="text-white ml-0.5"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/gallery"
            className="text-sm font-medium text-gold"
          >
            View All Gallery →
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full mx-4 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxItem.mediaType === "video" ? (
                <div className="relative bg-black aspect-video">
                  <img
                    src={lightboxItem.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(184, 134, 11, 0.9)",
                      }}
                    >
                      <Play
                        size={28}
                        fill="white"
                        className="text-white ml-1"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="w-full max-h-[85vh] object-contain bg-black mx-auto"
                />
              )}

              {/* Footer */}
              <div
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                style={{
                  background: "rgba(15,10,5,0.95)",
                  borderTop: "1px solid rgba(184,134,11,0.3)",
                }}
              >
                <div>
                  <h4 className="text-white font-bold text-sm">
                    {lightboxItem.title}
                  </h4>
                  <p className="text-white/60 text-xs mt-1">
                    by {lightboxItem.photographer} • {lightboxItem.location}
                  </p>
                </div>

                <span
                  className="text-xs uppercase tracking-widest font-semibold text-right"
                  style={{ color: "#b8860b" }}
                >
                  {lightboxItem.category} • {lightboxItem.mediaType === "video" ? "Video" : "Photo"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;

