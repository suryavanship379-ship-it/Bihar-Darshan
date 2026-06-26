import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Image,
  Video,
  Layers,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Filter,
} from "lucide-react";
import type { GalleryCategory } from "../../data/galleryData";
import { galleryCategories } from "../../data/galleryData";

export type MediaFilter = "all" | "photo" | "video";
export type SortOption = "latest" | "popular" | "most-viewed" | "trending";
export type ViewMode = "masonry" | "feed";

interface GalleryFiltersProps {
  mediaFilter: MediaFilter;
  categoryFilter: string;
  sortBy: SortOption;
  viewMode: ViewMode;
  onMediaChange: (v: MediaFilter) => void;
  onCategoryChange: (v: string) => void;
  onSortChange: (v: SortOption) => void;
  onViewChange: (v: ViewMode) => void;
  totalResults: number;
}

const mediaOptions: { value: MediaFilter; label: string; icon: typeof Image }[] = [
  { value: "all", label: "All", icon: Layers },
  { value: "photo", label: "Photos", icon: Image },
  { value: "video", label: "Videos", icon: Video },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "most-viewed", label: "Most Viewed" },
  { value: "trending", label: "Trending" },
];

const categoryIcons: Record<string, string> = {
  "All Categories": "🏛️",
  Food: "🍽️",
  Culture: "🎭",
  Politicians: "🏛️",
  Places: "📍",
  Heritage: "🏯",
  Festivals: "🎊",
  Agriculture: "🌾",
  "Art & Craft": "🎨",
  Wildlife: "🦁",
  Community: "👥",
  Tourism: "✈️",
  Architecture: "🕌",
  Religion: "🙏",
};

const GalleryFilters = ({
  mediaFilter,
  categoryFilter,
  sortBy,
  viewMode,
  onMediaChange,
  onCategoryChange,
  onSortChange,
  onViewChange,
  totalResults,
}: GalleryFiltersProps) => {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const mediaRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (mediaRef.current && !mediaRef.current.contains(e.target as Node))
        setMediaOpen(false);
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node))
        setCategoryOpen(false);
      if (sortRef.current && !sortRef.current.contains(e.target as Node))
        setSortOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const allCategories: (GalleryCategory | "All Categories")[] = [
    "All Categories",
    ...galleryCategories,
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -8, scale: 0.95 },
  };

  return (
    <div className="sticky top-[72px] z-[100] px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-2xl px-4 sm:px-5 py-3.5 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            {/* Left Side — Filters */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Filter Icon */}
              <div className="hidden sm:flex items-center gap-1.5 text-white/30 mr-1">
                <Filter size={14} />
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  Filters
                </span>
              </div>

              {/* Media Dropdown */}
              <div ref={mediaRef} className="relative">
                <button
                  onClick={() => {
                    setMediaOpen(!mediaOpen);
                    setCategoryOpen(false);
                    setSortOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                    mediaOpen
                      ? "bg-gold/10 border-gold/30 text-gold"
                      : "bg-white/[0.04] border-white/[0.08] text-white/70 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  <SlidersHorizontal size={13} />
                  <span>
                    {mediaOptions.find((m) => m.value === mediaFilter)?.label}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-300 ${
                      mediaOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mediaOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-44 bg-[#1a1f2a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden z-50"
                    >
                      {mediaOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            onMediaChange(opt.value);
                            setMediaOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold transition-colors ${
                            mediaFilter === opt.value
                              ? "bg-gold/15 text-gold"
                              : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                          }`}
                        >
                          <opt.icon size={14} />
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Category Dropdown */}
              <div ref={categoryRef} className="relative">
                <button
                  onClick={() => {
                    setCategoryOpen(!categoryOpen);
                    setMediaOpen(false);
                    setSortOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                    categoryOpen
                      ? "bg-gold/10 border-gold/30 text-gold"
                      : "bg-white/[0.04] border-white/[0.08] text-white/70 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  <span className="text-sm">
                    {categoryIcons[categoryFilter] || "🏛️"}
                  </span>
                  <span className="max-w-[100px] truncate">{categoryFilter}</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-300 ${
                      categoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {categoryOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-52 bg-[#1a1f2a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden z-50 max-h-[320px] overflow-y-auto scrollbar-hide"
                    >
                      {allCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            onCategoryChange(cat);
                            setCategoryOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold transition-colors ${
                            categoryFilter === cat
                              ? "bg-gold/15 text-gold"
                              : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                          }`}
                        >
                          <span className="text-sm">{categoryIcons[cat]}</span>
                          {cat}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Results count */}
              <span className="text-white/25 text-[11px] font-medium ml-1 hidden sm:inline">
                {totalResults} results
              </span>
            </div>

            {/* Right Side — Sort + View Toggle */}
            <div className="flex items-center gap-2.5">
              {/* Sort Dropdown */}
              <div ref={sortRef} className="relative">
                <button
                  onClick={() => {
                    setSortOpen(!sortOpen);
                    setMediaOpen(false);
                    setCategoryOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                    sortOpen
                      ? "bg-gold/10 border-gold/30 text-gold"
                      : "bg-white/[0.04] border-white/[0.08] text-white/70 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  <span className="text-white/40 text-[10px] uppercase tracking-wider">
                    Sort
                  </span>
                  <span>
                    {sortOptions.find((s) => s.value === sortBy)?.label}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-300 ${
                      sortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-44 bg-[#1a1f2a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden z-50"
                    >
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            onSortChange(opt.value);
                            setSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${
                            sortBy === opt.value
                              ? "bg-gold/15 text-gold"
                              : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="w-px h-5 bg-white/10 hidden sm:block" />

              {/* View Toggle */}
              <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden">
                <button
                  onClick={() => onViewChange("masonry")}
                  className={`p-2 transition-all duration-300 ${
                    viewMode === "masonry"
                      ? "bg-gold/15 text-gold"
                      : "text-white/40 hover:text-white/70"
                  }`}
                  title="Masonry Grid View"
                >
                  <LayoutGrid size={15} />
                </button>
                <div className="w-px h-4 bg-white/10" />
                <button
                  onClick={() => onViewChange("feed")}
                  className={`p-2 transition-all duration-300 ${
                    viewMode === "feed"
                      ? "bg-gold/15 text-gold"
                      : "text-white/40 hover:text-white/70"
                  }`}
                  title="Instagram Feed View"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryFilters;
