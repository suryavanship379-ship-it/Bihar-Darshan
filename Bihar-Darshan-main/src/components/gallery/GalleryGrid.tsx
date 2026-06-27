import { useEffect, useRef, useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { GalleryItem } from "../../data/galleryData";
import GalleryCard from "./GalleryCard";
import GallerySkeleton from "./GallerySkeleton";
import type { ViewMode } from "./GalleryFilters";

interface GalleryGridProps {
  items: GalleryItem[];
  viewMode: ViewMode;
  onItemClick: (item: GalleryItem) => void;
}

const INITIAL_COUNT = 15;
const LOAD_MORE_COUNT = 10;

const GalleryGrid = ({ items, viewMode, onItemClick }: GalleryGridProps) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset visible count when items change (e.g. filter change)
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [items]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  // Infinite scroll observer
  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;
    setLoading(true);
    // Simulate network delay for skeleton visibility
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, items.length));
      setLoading(false);
    }, 600);
  }, [hasMore, loading, items.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5">
          <span className="text-3xl">📷</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
        <p className="text-white/40 text-sm max-w-md">
          We couldn't find any gallery items matching your filters. Try adjusting
          your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          {viewMode === "masonry" ? (
            /* Masonry Grid View */
            <div key="masonry" className="gallery-masonry">
              {visibleItems.map((item, i) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={i}
                  onClick={() => onItemClick(item)}
                />
              ))}
            </div>
          ) : (
            /* Feed View — single column centered */
            <div
              key="feed"
              className="max-w-lg mx-auto flex flex-col gap-4"
            >
              {visibleItems.map((item, i) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={i}
                  onClick={() => onItemClick(item)}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Loading Skeleton */}
        {loading && (
          <div className="mt-4">
            <GallerySkeleton />
          </div>
        )}

        {/* Sentinel for infinite scroll */}
        {hasMore && <div ref={sentinelRef} className="h-4" />}

        {/* End indicator */}
        {!hasMore && items.length > 0 && (
          <div className="flex items-center justify-center gap-3 py-12 text-white/20">
            <div className="w-12 h-px bg-white/10" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              You've seen it all
            </span>
            <div className="w-12 h-px bg-white/10" />
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryGrid;
