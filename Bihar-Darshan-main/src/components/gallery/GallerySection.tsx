
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ZoomIn } from "lucide-react";

import heritageImg from "../../assets/bihar-heritage.png";
import mountainsImg from "../../assets/bihar-mountains.png";
import foodImg from "../../assets/bihar-food.png";
import templeImg from "../../assets/bihar-temple.png";
import monumentImg from "../../assets/bihar-monument.png";
import folkDanceImg from "../../assets/bihar-folk-dance.png";

const galleryItems = [
  { id: 1, image: heritageImg, isVideo: false },
  { id: 2, image: mountainsImg, isVideo: false },
  { id: 3, image: foodImg, isVideo: false },
  { id: 4, image: templeImg, isVideo: true },
  { id: 5, image: monumentImg, isVideo: false },
  { id: 6, image: folkDanceImg, isVideo: true },
  { id: 7, image: heritageImg, isVideo: false },
  { id: 8, image: mountainsImg, isVideo: false },
  { id: 9, image: foodImg, isVideo: false },
];

type GalleryItem = (typeof galleryItems)[number];

const GallerySection = () => {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

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

          <a
            href="#gallery"
            className="hidden sm:inline-flex text-sm font-medium text-gold hover:text-gold-dark transition-colors"
          >
            View All →
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-3 gap-[3px]">
          {galleryItems.map((item, index) => (
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
                alt={`Gallery ${item.id}`}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.55]"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.isVideo ? (
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
              {item.isVideo && (
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
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 text-center sm:hidden">
          <a
            href="#gallery"
            className="text-sm font-medium text-gold"
          >
            View All Gallery →
          </a>
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
              {lightboxItem.isVideo ? (
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
                  alt=""
                  className="w-full max-h-[80vh] object-contain bg-black"
                />
              )}

              {/* Footer */}
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{
                  background: "rgba(15,10,5,0.95)",
                  borderTop: "1px solid rgba(184,134,11,0.3)",
                }}
              >
                <span
                  className="text-xs uppercase tracking-widest font-semibold"
                  style={{ color: "#b8860b" }}
                >
                  Bihar Darshan
                </span>

                <span className="text-white/40 text-xs">
                  {lightboxItem.isVideo ? "Video" : "Photo"}
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

