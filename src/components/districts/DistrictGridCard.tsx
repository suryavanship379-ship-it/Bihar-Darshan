import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

interface DistrictGridCardProps {
  name: string;
  image: string;
  isSelected: boolean;
  onClick: () => void;
}

const DistrictGridCard = ({
  name,
  image,
  isSelected,
  onClick,
}: DistrictGridCardProps) => {
  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Selected badge */}
        {isSelected && (
          <div className="absolute top-3 right-3 bg-gold text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
            Selected
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 py-3.5 flex items-center justify-between">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-gray-900 truncate leading-tight mb-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-gray-400">
            <MapPin size={12} strokeWidth={2} />
            <span className="text-[11px] font-medium truncate">{name}</span>
          </div>
        </div>

        {/* Arrow button */}
        <Link
          to={`/districts/${name.toLowerCase()}`}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-gold group-hover:border-gold group-hover:text-white transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
};

export default DistrictGridCard;
