import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import biharMapBg from "../../assets/bihar-mountains.png";

/* ─── Types ─── */
interface GeoFeature {
  type: string;
  properties: { district: string; dt_code: string; st_nm: string };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

interface GeoJSON {
  type: string;
  features: GeoFeature[];
}

/* ─── Mercator projection helpers ─── */
// Bihar bounding box (approximate)
const BOUNDS = {
  minLng: 83.3,
  maxLng: 88.2,
  minLat: 23.8,
  maxLat: 27.6,
};

const SVG_W = 900;
const SVG_H = 700;
const PADDING = 30;

function projectLng(lng: number): number {
  return (
    PADDING +
    ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) *
      (SVG_W - 2 * PADDING)
  );
}

function projectLat(lat: number): number {
  // Invert Y because SVG Y goes down, latitude goes up
  return (
    PADDING +
    ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) *
      (SVG_H - 2 * PADDING)
  );
}

/** Convert a ring of [lng, lat] into an SVG path "M...L...Z" string */
function ringToPath(ring: number[][]): string {
  return ring
    .map((coord, i) => {
      const x = projectLng(coord[0]).toFixed(2);
      const y = projectLat(coord[1]).toFixed(2);
      return i === 0 ? `M${x},${y}` : `L${x},${y}`;
    })
    .join(" ") + " Z";
}

/** Convert a GeoJSON geometry to full SVG path d attribute */
function geometryToPath(geometry: GeoFeature["geometry"]): string {
  if (geometry.type === "Polygon") {
    return (geometry.coordinates as number[][][])
      .map((ring) => ringToPath(ring))
      .join(" ");
  }
  // MultiPolygon
  return (geometry.coordinates as number[][][][])
    .map((polygon) => polygon.map((ring) => ringToPath(ring)).join(" "))
    .join(" ");
}

/** Get centroid of a geometry for tooltip positioning */
function getCentroid(geometry: GeoFeature["geometry"]): [number, number] {
  let coords: number[][] = [];
  if (geometry.type === "Polygon") {
    coords = (geometry.coordinates as number[][][])[0];
  } else {
    // MultiPolygon — use the largest polygon
    const polys = geometry.coordinates as number[][][][];
    let maxLen = 0;
    for (const poly of polys) {
      if (poly[0].length > maxLen) {
        maxLen = poly[0].length;
        coords = poly[0];
      }
    }
  }
  let sumX = 0, sumY = 0;
  for (const c of coords) {
    sumX += c[0];
    sumY += c[1];
  }
  return [sumX / coords.length, sumY / coords.length];
}

/* ─── Semi-transparent fill colors for districts ─── */
const DISTRICT_FILLS = [
  "rgba(130, 145, 80, 0.55)",
  "rgba(115, 135, 70, 0.55)",
  "rgba(145, 155, 90, 0.55)",
  "rgba(120, 140, 75, 0.55)",
  "rgba(135, 150, 85, 0.55)",
  "rgba(125, 140, 78, 0.55)",
  "rgba(140, 152, 88, 0.55)",
  "rgba(118, 132, 72, 0.55)",
];

/* ─── Component ─── */
const BiharMapSection = () => {
  const [geoData, setGeoData] = useState<GeoJSON | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  /* ── Load GeoJSON ── */
  useEffect(() => {
    fetch("/bihar-districts.geojson")
      .then((r) => r.json())
      .then((data: GeoJSON) => setGeoData(data))
      .catch((err) => console.error("Failed to load Bihar GeoJSON:", err));
  }, []);

  /* ── Pre-compute SVG paths ── */
  const districtPaths = useMemo(() => {
    if (!geoData) return [];
    return geoData.features.map((feature, i) => ({
      name: feature.properties.district,
      path: geometryToPath(feature.geometry),
      centroid: getCentroid(feature.geometry),
      fill: DISTRICT_FILLS[i % DISTRICT_FILLS.length],
    }));
  }, [geoData]);



  /* ── Tooltip tracking ── */
  const handleDistrictHover = useCallback(
    (districtName: string, e: React.MouseEvent) => {
      setHoveredDistrict(districtName);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setTooltipPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top - 12,
        });
      }
    },
    []
  );

  const handleDistrictMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (hoveredDistrict && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setTooltipPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top - 12,
        });
      }
    },
    [hoveredDistrict]
  );

  const handleDistrictLeave = useCallback(() => {
    setHoveredDistrict(null);
    setTooltipPos(null);
  }, []);

  const handleDistrictClick = useCallback((districtName: string) => {
    setSelectedDistrict((prev) => (prev === districtName ? null : districtName));
  }, []);

  return (
    <section id="map" className="bihar-map-section py-0">
      {/* Background image */}
      <img
        src={biharMapBg}
        alt=""
        className="bihar-map-bg"
        loading="lazy"
      />
      <div className="bihar-map-overlay" />

      {/* Content */}
      <div className="bihar-map-container">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Header */}
            <div className="mb-8 sm:mb-10 text-center">
              <p className="text-gold-light text-sm font-semibold uppercase tracking-widest mb-2">
                Interactive
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight">
                Bihar District Map
              </h2>
              <p className="text-white/60 mt-3 text-sm sm:text-base max-w-xl mx-auto">
                Hover to explore and click to select a district.
              </p>
            </div>

            {/* Map Container */}
            <div
              ref={containerRef}
              className="relative mx-auto max-w-[1000px] rounded-2xl overflow-hidden select-none"
              onMouseMove={handleDistrictMouseMove}
              onMouseLeave={handleDistrictLeave}
            >
              {/* SVG Map */}
              <div className="bihar-svg-wrapper">
                <svg
                  ref={svgRef}
                  viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto"
                  style={{ display: "block" }}
                >
                  {/* District polygons */}
                  {districtPaths.map((d) => (
                    <path
                      key={d.name}
                      d={d.path}
                      fill={
                        selectedDistrict === d.name
                          ? "#D4A017"
                          : hoveredDistrict === d.name
                          ? "rgba(200, 195, 100, 0.7)"
                          : d.fill
                      }
                      className={`district-path${selectedDistrict === d.name ? " selected" : ""}`}
                      onMouseEnter={(e) => handleDistrictHover(d.name, e)}
                      onMouseLeave={handleDistrictLeave}
                      onClick={() => handleDistrictClick(d.name)}
                    />
                  ))}
                </svg>
              </div>

              {/* Tooltip */}
              {hoveredDistrict && tooltipPos && (
                <div
                  className="map-tooltip"
                  style={{ left: tooltipPos.x, top: tooltipPos.y }}
                >
                  <div className="map-tooltip-inner">{hoveredDistrict}</div>
                  <div className="map-tooltip-arrow" />
                </div>
              )}


            </div>

            {/* Selected District Info */}
            {selectedDistrict && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="w-3 h-3 rounded-full bg-gold" />
                  <span className="text-white font-semibold text-lg">
                    {selectedDistrict}
                  </span>
                  <button
                    onClick={() => setSelectedDistrict(null)}
                    className="ml-2 text-white/50 hover:text-white transition-colors text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BiharMapSection;
