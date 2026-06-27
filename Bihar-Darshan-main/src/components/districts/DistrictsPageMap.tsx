import { useState, useEffect, useRef, useCallback, useMemo } from "react";

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

interface DistrictsPageMapProps {
  selectedDistrict: string | null;
  hoveredCardDistrict: string | null;
  onSelectDistrict: (name: string | null) => void;
  onHoverDistrict: (name: string | null) => void;
}

/* ─── Mercator projection helpers ─── */
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
  return (
    PADDING +
    ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) *
      (SVG_H - 2 * PADDING)
  );
}

function ringToPath(ring: number[][]): string {
  return (
    ring
      .map((coord, i) => {
        const x = projectLng(coord[0]).toFixed(2);
        const y = projectLat(coord[1]).toFixed(2);
        return i === 0 ? `M${x},${y}` : `L${x},${y}`;
      })
      .join(" ") + " Z"
  );
}

function geometryToPath(geometry: GeoFeature["geometry"]): string {
  if (geometry.type === "Polygon") {
    return (geometry.coordinates as number[][][])
      .map((ring) => ringToPath(ring))
      .join(" ");
  }
  return (geometry.coordinates as number[][][][])
    .map((polygon) => polygon.map((ring) => ringToPath(ring)).join(" "))
    .join(" ");
}

function getCentroid(geometry: GeoFeature["geometry"]): [number, number] {
  let coords: number[][] = [];
  if (geometry.type === "Polygon") {
    coords = (geometry.coordinates as number[][][])[0];
  } else {
    const polys = geometry.coordinates as number[][][][];
    let maxLen = 0;
    for (const poly of polys) {
      if (poly[0].length > maxLen) {
        maxLen = poly[0].length;
        coords = poly[0];
      }
    }
  }
  let sumX = 0,
    sumY = 0;
  for (const c of coords) {
    sumX += c[0];
    sumY += c[1];
  }
  return [sumX / coords.length, sumY / coords.length];
}

/* ─── Light beige fills for the districts page ─── */
const LIGHT_FILLS = [
  "#F5F0E8",
  "#EDE8DF",
  "#F0EBE2",
  "#E8E3DA",
  "#F2ECE3",
  "#EBE5DC",
  "#EFEAD1",
  "#E9E4DB",
];

const HOVER_FILL = "#F5E6C8";
const SELECTED_FILL = "#D4A017";

/* ─── Component ─── */
const DistrictsPageMap = ({
  selectedDistrict,
  hoveredCardDistrict,
  onSelectDistrict,
  onHoverDistrict,
}: DistrictsPageMapProps) => {
  const [geoData, setGeoData] = useState<GeoJSON | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/bihar-districts.geojson")
      .then((r) => r.json())
      .then((data: GeoJSON) => setGeoData(data))
      .catch((err) => console.error("Failed to load Bihar GeoJSON:", err));
  }, []);

  const districtPaths = useMemo(() => {
    if (!geoData) return [];
    return geoData.features.map((feature, i) => ({
      name: feature.properties.district,
      path: geometryToPath(feature.geometry),
      centroid: getCentroid(feature.geometry),
      fill: LIGHT_FILLS[i % LIGHT_FILLS.length],
    }));
  }, [geoData]);

  // Compute label positions (using centroids projected to SVG coords)
  const labelPositions = useMemo(() => {
    return districtPaths.map((d) => ({
      name: d.name,
      x: projectLng(d.centroid[0]),
      y: projectLat(d.centroid[1]),
    }));
  }, [districtPaths]);

  const handleDistrictHover = useCallback(
    (districtName: string, e: React.MouseEvent) => {
      setHoveredDistrict(districtName);
      onHoverDistrict(districtName);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setTooltipPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top - 12,
        });
      }
    },
    [onHoverDistrict]
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
    onHoverDistrict(null);
    setTooltipPos(null);
  }, [onHoverDistrict]);

  const handleDistrictClick = useCallback(
    (districtName: string) => {
      onSelectDistrict(
        selectedDistrict === districtName ? null : districtName
      );
    },
    [selectedDistrict, onSelectDistrict]
  );

  const activeHover = hoveredDistrict || hoveredCardDistrict;

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      onMouseMove={handleDistrictMouseMove}
      onMouseLeave={handleDistrictLeave}
    >
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ display: "block" }}
      >
        {/* District polygons */}
        {districtPaths.map((d) => {
          const isSelected = selectedDistrict === d.name;
          const isHovered = activeHover === d.name;
          let fill = d.fill;
          if (isSelected) fill = SELECTED_FILL;
          else if (isHovered) fill = HOVER_FILL;

          return (
            <path
              key={d.name}
              d={d.path}
              fill={fill}
              stroke="#C8C0B0"
              strokeWidth={isSelected ? 1.6 : 0.8}
              strokeLinejoin="round"
              className="cursor-pointer transition-all duration-200"
              style={{
                filter: isSelected
                  ? "drop-shadow(0 0 6px rgba(212, 160, 23, 0.4))"
                  : "none",
              }}
              onMouseEnter={(e) => handleDistrictHover(d.name, e)}
              onMouseLeave={handleDistrictLeave}
              onClick={() => handleDistrictClick(d.name)}
            />
          );
        })}

        {/* District name labels */}
        {labelPositions.map((lp) => (
          <text
            key={lp.name}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="pointer-events-none select-none"
            style={{
              fontSize: "9px",
              fontFamily: "Inter, sans-serif",
              fontWeight: selectedDistrict === lp.name ? 700 : 500,
              fill:
                selectedDistrict === lp.name
                  ? "#FFFFFF"
                  : "#4A4035",
              letterSpacing: "0.02em",
            }}
          >
            {lp.name}
          </text>
        ))}
      </svg>

      {/* Tooltip */}
      {activeHover && tooltipPos && (
        <div
          className="absolute pointer-events-none z-20"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-2.5 text-center">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gold" />
              <span className="text-sm font-bold text-gray-900">
                {activeHover}
              </span>
            </div>
            <p className="text-[11px] text-gray-400">Click to view details</p>
          </div>
          <div className="w-0 h-0 mx-auto border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-white" />
        </div>
      )}
    </div>
  );
};

export default DistrictsPageMap;
