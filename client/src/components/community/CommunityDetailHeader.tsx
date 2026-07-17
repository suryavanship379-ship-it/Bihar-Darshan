import { ArrowLeft, CheckCircle } from 'lucide-react';
import type { Community } from '../../data/communityData';

interface CommunityDetailHeaderProps {
  community: Community;
  onBack: () => void;
  isJoined?: boolean;
  onJoinClick?: () => void;
}

const CommunityDetailHeader = ({ community, onBack, isJoined, onJoinClick }: CommunityDetailHeaderProps) => {
  const icon = community.logoImageUrl || community.icon || '🌟';
  const iconBg = community.iconBg || 'bg-brand-gold';

  return (
    <div>
      {/* Back link */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-accent-brown font-medium mb-5 transition-colors duration-200 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform duration-200"
        />
        Back to Communities
      </button>

      {/* Banner card */}
      <div className="relative mb-6 rounded-xl border border-gray-100 shadow-sm bg-white">
        {/* Banner image */}
        <div className="relative h-40 sm:h-56 rounded-t-xl overflow-hidden">
          <img
            src={community.bannerImageUrl || community.image}
            alt={community.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Info row */}
        <div className="px-4 sm:px-6 relative flex flex-col sm:flex-row sm:items-end justify-between pb-4 bg-white rounded-b-xl">
          <div className="flex items-end gap-4">
            {/* Avatar */}
            <div
              className={`relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full ${iconBg} flex items-center justify-center text-3xl shadow-lg shrink-0 -mt-10 sm:-mt-12 border-4 border-white overflow-hidden`}
            >
              {(icon.startsWith('data:image/') || icon.startsWith('http')) ? (
                <img src={icon} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                icon
              )}
            </div>

            {/* Text */}
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                  {community.name}
                </h2>
                {community.verified && (
                  <CheckCircle size={18} className="text-gold-dark shrink-0" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailHeader;
