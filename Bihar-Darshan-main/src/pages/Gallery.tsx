import { useState, useMemo, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GalleryHero from "../components/gallery/GalleryHero";
import GalleryFilters from "../components/gallery/GalleryFilters";
import GalleryGrid from "../components/gallery/GalleryGrid";
import GalleryLightbox from "../components/gallery/GalleryLightbox";
import UploadBanner from "../components/gallery/UploadBanner";
import { galleryData } from "../data/galleryData";
import type { GalleryItem } from "../data/galleryData";
import type {
  MediaFilter,
  SortOption,
  ViewMode,
} from "../components/gallery/GalleryFilters";

const Gallery = () => {
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [viewMode, setViewMode] = useState<ViewMode>("masonry");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Filter + Sort logic
  const filteredItems = useMemo(() => {
    let result = [...galleryData];

    // Media filter
    if (mediaFilter !== "all") {
      result = result.filter((item) => item.mediaType === mediaFilter);
    }

    // Category filter
    if (categoryFilter !== "All Categories") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    // Sort
    switch (sortBy) {
      case "latest":
        result.sort(
          (a, b) =>
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        );
        break;
      case "popular":
        result.sort((a, b) => b.likes - a.likes);
        break;
      case "most-viewed":
        result.sort((a, b) => b.views - a.views);
        break;
      case "trending":
        // Trending = high engagement ratio (likes + comments relative to views)
        result.sort(
          (a, b) =>
            (b.likes + b.comments) / (b.views || 1) -
            (a.likes + a.comments) / (a.views || 1)
        );
        break;
    }

    return result;
  }, [mediaFilter, categoryFilter, sortBy]);

  return (
    <div className="min-h-screen bg-bg-dark gallery-page">
      <Navbar />

      {/* Hero */}
      <GalleryHero />

      {/* Filter Bar */}
      <div className="py-5">
        <GalleryFilters
          mediaFilter={mediaFilter}
          categoryFilter={categoryFilter}
          sortBy={sortBy}
          viewMode={viewMode}
          onMediaChange={setMediaFilter}
          onCategoryChange={setCategoryFilter}
          onSortChange={setSortBy}
          onViewChange={setViewMode}
          totalResults={filteredItems.length}
        />
      </div>

      {/* Gallery Grid */}
      <div className="pb-16">
        <GalleryGrid
          items={filteredItems}
          viewMode={viewMode}
          onItemClick={setSelectedItem}
        />
      </div>

      {/* Upload CTA */}
      <UploadBanner />

      {/* Footer */}
      <Footer />

      {/* Lightbox Modal */}
      <GalleryLightbox
        item={selectedItem}
        items={filteredItems}
        onClose={() => setSelectedItem(null)}
        onNavigate={setSelectedItem}
      />
    </div>
  );
};

export default Gallery;
