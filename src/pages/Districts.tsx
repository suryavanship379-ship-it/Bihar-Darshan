import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import DistrictsPageMap from "../components/districts/DistrictsPageMap";
import DistrictGridCard from "../components/districts/DistrictGridCard";
import {
  allDistricts,
  geoNameToDisplayName,
  displayNameToGeoName,
} from "../data/districtsData";
import biharHeritage from "../assets/bihar-heritage.png";

type SortOption = "a-z" | "z-a";

const Districts = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(
    null
  );
  const [hoveredCardDistrict, setHoveredCardDistrict] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("a-z");
  const [sortOpen, setSortOpen] = useState(false);
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Filtered + sorted districts
  const filteredDistricts = useMemo(() => {
    let result = [...allDistricts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((d) => d.name.toLowerCase().includes(q));
    }

    result.sort((a, b) =>
      sortBy === "a-z"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return result;
  }, [searchQuery, sortBy]);

  // Convert display name to geo name for map highlighting
  const selectedGeoName = useMemo(() => {
    if (!selectedDistrict) return null;
    return displayNameToGeoName[selectedDistrict] ?? selectedDistrict;
  }, [selectedDistrict]);

  const hoveredGeoName = useMemo(() => {
    if (!hoveredCardDistrict) return null;
    return displayNameToGeoName[hoveredCardDistrict] ?? hoveredCardDistrict;
  }, [hoveredCardDistrict]);

  // Handlers
  const handleMapSelect = (geoName: string | null) => {
    if (!geoName) {
      setSelectedDistrict(null);
      return;
    }
    const displayName = geoNameToDisplayName[geoName] ?? geoName;
    navigate(`/districts/${displayName.toLowerCase()}`);
  };

  const handleMapHover = (geoName: string | null) => {
    if (!geoName) {
      setHoveredCardDistrict(null);
      return;
    }
    const displayName = geoNameToDisplayName[geoName] ?? geoName;
    setHoveredCardDistrict(displayName);
  };

  const handleCardClick = (districtName: string) => {
    setSelectedDistrict(
      selectedDistrict === districtName ? null : districtName
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO: District Explorer
          ═══════════════════════════════════════════════════════ */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
        {/* Dark heritage background */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={biharHeritage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1510]/92 via-[#1e1912]/88 to-[#15110d]/92" />
          {/* Subtle warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#D4A017]/5 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-12 items-start">
            {/* ── Left Side ── */}
            <div className="pt-4 lg:pt-8">
              {/* Heading */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.15] tracking-tight mb-3">
                Explore Districts
                <br />
                of{" "}
                <span className="text-gold italic" style={{ fontFamily: "var(--font-signature)" }}>
                  Bihar
                </span>
              </h1>

              {/* Decorative gold line */}
              <div className="w-12 h-0.5 bg-gold rounded-full mb-6" />

              {/* Description */}
              <p className="text-white/60 text-[15px] leading-relaxed max-w-md mb-8">
                Explore all the districts of Bihar. Click on the map or select a
                district from below to discover its culture, heritage, places
                and more.
              </p>

              {/* Search input */}
              <div className="relative max-w-sm">
                <input
                  type="text"
                  placeholder="Search district..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl pl-5 pr-12 py-3.5 text-sm font-medium text-white placeholder:text-white/40 shadow-[0_2px_12px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50">
                  <Search size={18} strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* ── Right Side — Map ── */}
            <div className="relative">
              {/* Legend card */}
              <div className="relative md:absolute md:top-0 md:right-0 mb-4 md:mb-0 z-10 bg-white/10 backdrop-blur-md rounded-xl border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.2)] px-4 py-3 flex flex-row md:flex-col gap-4 md:gap-2 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gold" />
                  <span className="text-xs font-semibold text-white/90">
                    Selected District
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F5E6C8]" />
                  <span className="text-xs font-semibold text-white/90">
                    Hover District
                  </span>
                </div>
              </div>

              {/* Map */}
              <DistrictsPageMap
                selectedDistrict={selectedGeoName}
                hoveredCardDistrict={hoveredGeoName}
                onSelectDistrict={handleMapSelect}
                onHoverDistrict={handleMapHover}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — District Grid
          ═══════════════════════════════════════════════════════ */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-6 sm:p-8 lg:p-10">
            {/* Header row */}
            <div className="flex items-center justify-between mb-8">
              {/* Left */}
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  All Districts
                </h2>
                <span className="text-sm font-semibold text-gold">
                  ({filteredDistricts.length} Districts)
                </span>
              </div>

              {/* Right - Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-gray-300 transition-colors cursor-pointer"
                >
                  <span className="text-gray-400 text-xs font-medium">
                    Sort by:
                  </span>
                  <span>{sortBy === "a-z" ? "A to Z" : "Z to A"}</span>
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {sortOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setSortOpen(false)}
                    />
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-xl z-40 min-w-[140px] overflow-hidden">
                      {(["a-z", "z-a"] as SortOption[]).map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSortBy(opt);
                            setSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${sortBy === opt
                              ? "bg-gold/10 text-gold"
                              : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                          {opt === "a-z" ? "A to Z" : "Z to A"}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* District grid */}
            {filteredDistricts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {filteredDistricts.map((district) => (
                  <DistrictGridCard
                    key={district.name}
                    name={district.name}
                    image={district.image}
                    isSelected={selectedDistrict === district.name}
                    onClick={() => handleCardClick(district.name)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  No districts found
                </h3>
                <p className="text-sm text-gray-400">
                  Try a different search term
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-5 py-2 bg-gold text-white font-semibold text-sm rounded-full hover:bg-gold-dark transition-colors cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Districts;
