import { Users, FileText } from 'lucide-react';
import type { Community } from '../../data/communityData';

interface CommunityListCardProps {
  community: Community;
  onSelect: (community: Community) => void;
}

const CommunityListCard = ({ community, onSelect }: CommunityListCardProps) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Cover image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />


      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Stats removed as requested */}

        {/* Name */}
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-1.5 group-hover:text-amber-600 transition-colors duration-200">
          {community.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1 mb-4">
          {community.description}
        </p>

        {/* CTA row */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={() => onSelect(community)}
            className="flex-1 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-amber-400/30 active:scale-95"
          >
            Join Community
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityListCard;
