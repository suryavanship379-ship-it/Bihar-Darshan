import { motion } from "framer-motion";
import { Image, Video } from "lucide-react";
import type { ExtendedGalleryItem } from "../../pages/Gallery";

export interface CollectionData {
  title: string;
  category: string;
  coverImage: string;
}

interface FeaturedCollectionsProps {
  collections: CollectionData[];
  items: ExtendedGalleryItem[];
  onSelectCollection: (category: string) => void;
  activeCategory: string;
}

const FeaturedCollections = ({
  collections,
  items,
  onSelectCollection,
  activeCategory,
}: FeaturedCollectionsProps) => {
  return (
    <div className="w-full overflow-x-auto pb-6 pt-2 scrollbar-hide px-4 sm:px-6 lg:px-8">
      <div className="flex gap-4 min-w-max max-w-[1400px] mx-auto">
        {collections.map((collection, idx) => {
          // Calculate counts
          const collectionItems = items.filter(
            (i) => i.category === collection.category || collection.category === "All Categories"
          );
          const photoCount = collectionItems.filter((i) => i.mediaType === "photo").length;
          const videoCount = collectionItems.filter((i) => i.mediaType === "video").length;

          const isActive = activeCategory === collection.category;

          return (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => onSelectCollection(collection.category)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group flex-shrink-0 w-64 h-36 border-2 transition-all duration-300 ${
                isActive ? "border-gold scale-105 shadow-[0_0_20px_rgba(212,160,23,0.3)]" : "border-white/[0.05] hover:border-white/20"
              }`}
            >
              {/* Background Image */}
              <img
                src={collection.coverImage}
                alt={collection.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlays */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${isActive ? "opacity-90" : "opacity-70 group-hover:opacity-90"}`} />
              
              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <h4 className="text-white font-bold text-lg leading-tight mb-1">
                  {collection.title}
                </h4>
                <div className="flex items-center gap-3 text-white/70 text-[10px] font-semibold">
                  {photoCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Image size={10} />
                      {photoCount} Photos
                    </span>
                  )}
                  {videoCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Video size={10} />
                      {videoCount} Videos
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedCollections;
