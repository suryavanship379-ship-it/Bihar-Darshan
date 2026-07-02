import { CalendarDays, Users, FileText, Wifi, CheckCircle, Trophy, ExternalLink } from 'lucide-react';
import type { Community, Contributor } from '../../data/communityData';
import { communityGuidelines } from '../../data/communityData';

interface CommunitySidebarProps {
  community: Community;
  contributors: Contributor[];
  onCreatePost?: () => void;
  isJoined?: boolean;
  onJoinClick?: () => void;
  onViewGuidelines?: () => void;
}

const medalColors = ['text-yellow-500', 'text-gray-400', 'text-amber-600'];

const CommunitySidebar = ({ community, contributors, onCreatePost, isJoined, onJoinClick, onViewGuidelines }: CommunitySidebarProps) => {
  return (
    <aside className="flex flex-col gap-4">
      {/* About */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-2">About this Community</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
          {community.aboutText}
        </p>
        {community.createdOn && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <CalendarDays size={13} />
            Created on {community.createdOn}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3">Community Stats</h3>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={14} className="text-gray-400" />
              Total Members
            </div>
            <span className="font-bold text-sm text-gray-900">{community.members}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText size={14} className="text-gray-400" />
              Total Posts
            </div>
            <span className="font-bold text-sm text-gray-900">{community.posts}</span>
          </div>
        </div>
      </div>


      {/* Community Guidelines */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3">Community Guidelines</h3>
        <ul className="space-y-2">
          {communityGuidelines.map((guideline) => (
            <li key={guideline} className="flex items-start gap-2 text-xs text-gray-600">
              <CheckCircle size={13} className="text-emerald-500 shrink-0 mt-0.5" />
              {guideline}
            </li>
          ))}
        </ul>
        <button 
          onClick={onViewGuidelines}
          className="w-full mt-3 pt-3 border-t border-gray-100 text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center justify-center gap-1 transition-colors duration-200"
        >
          View All Guidelines
          <ExternalLink size={11} />
        </button>
      </div>
    </aside>
  );
};

export default CommunitySidebar;
