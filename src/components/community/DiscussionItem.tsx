import { useState } from 'react';
import { MessageSquare, Eye, ArrowBigUp, ArrowBigDown, Share2, Image as ImageIcon, Video } from 'lucide-react';
import type { Discussion } from '../../data/communityData';

interface DiscussionItemProps {
  discussion: Discussion;
}

const tagStyleMap: Record<string, string> = {
  Destinations: 'bg-blue-100 text-blue-700',
  Tips:         'bg-green-100 text-green-700',
  Itinerary:    'bg-yellow-100 text-yellow-700',
};

const avatarColorMap: Record<string, string> = {
  RK: 'bg-orange-400',
  NS: 'bg-purple-500',
  AR: 'bg-blue-500',
  TA: 'bg-teal-500',
  PV: 'bg-pink-500',
  BA: 'bg-indigo-500',
  WP: 'bg-green-500',
  ER: 'bg-red-500',
  YOU: 'bg-amber-400',
};

const DiscussionItem = ({ discussion }: DiscussionItemProps) => {
  const tagStyle = tagStyleMap[discussion.tag] ?? 'bg-gray-100 text-gray-600';
  const avatarColor = avatarColorMap[discussion.authorAvatar] ?? 'bg-gray-400';
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);

  // Calculate total votes for poll
  const totalVotes = discussion.poll?.options.reduce((sum, o) => sum + o.votes, 0) ?? 0;

  return (
    <div className="border-b border-gray-100 last:border-0 group hover:bg-gray-50/80 transition-colors duration-150">
      <div className="px-4 py-3">
        {/* Top row: avatar, author, tag */}
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-7 h-7 rounded-full ${avatarColor} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}
          >
            {discussion.authorAvatar}
          </div>
          <span className="text-xs font-semibold text-gray-700">{discussion.author}</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">{discussion.timeAgo}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagStyle} ml-auto`}>
            {discussion.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-semibold text-gray-900 leading-snug mb-1 group-hover:text-amber-700 transition-colors duration-150">
          {discussion.title}
        </h3>

        {/* Full content */}
        {discussion.content && (
          <p className="text-sm text-gray-500 leading-relaxed mb-2">
            {discussion.content}
          </p>
        )}

        {/* Inline Image / Video */}
        {discussion.mediaUrl && (
          <div className="mt-2 mb-2 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 max-h-[350px]">
            {discussion.mediaType === 'video' ? (
              <video 
                src={discussion.mediaUrl} 
                controls 
                className="w-full max-h-[350px] object-cover"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img 
                src={discussion.mediaUrl} 
                alt={discussion.title}
                className="w-full max-h-[350px] object-cover"
                loading="lazy"
              />
            )}
          </div>
        )}

        {/* Inline Poll */}
        {discussion.poll && (
          <div className="mt-2 mb-2 bg-gray-50 rounded-xl border border-gray-100 p-3" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-semibold text-gray-800 mb-3">{discussion.poll.question}</p>
            <div className="space-y-2">
              {discussion.poll.options.map((option) => {
                const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                return (
                  <div key={option.id} className="relative">
                    <div 
                      className="absolute inset-0 rounded-lg bg-amber-100/60"
                      style={{ width: `${pct}%` }}
                    />
                    <div className="relative flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 bg-white/60 hover:border-amber-300 transition-colors">
                      <span className="text-xs font-medium text-gray-700">{option.text}</span>
                      <span className="text-xs font-bold text-gray-500 ml-2 shrink-0">{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-gray-400 mt-2">{totalVotes} votes</p>
          </div>
        )}

        {/* Bottom action bar — Reddit-style */}
        <div className="flex items-center gap-1 mt-2 -ml-1">
          {/* Upvote/Downvote */}
          <div className="flex items-center bg-gray-100/80 rounded-full">
            <button 
              onClick={(e) => { e.stopPropagation(); setVoted(voted === 'up' ? null : 'up'); }}
              className={`p-1.5 rounded-l-full hover:bg-gray-200 transition-colors ${voted === 'up' ? 'text-amber-500' : 'text-gray-500'}`}
            >
              <ArrowBigUp size={18} fill={voted === 'up' ? 'currentColor' : 'none'} />
            </button>
            <span className="text-xs font-bold text-gray-700 px-1 min-w-[20px] text-center">
              {discussion.replies}
            </span>
            <button 
              onClick={(e) => { e.stopPropagation(); setVoted(voted === 'down' ? null : 'down'); }}
              className={`p-1.5 rounded-r-full hover:bg-gray-200 transition-colors ${voted === 'down' ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <ArrowBigDown size={18} fill={voted === 'down' ? 'currentColor' : 'none'} />
            </button>
          </div>



          {/* Share */}
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Share2 size={14} />
            Share
          </button>

          {/* Views */}
          <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
            <Eye size={13} />
            {discussion.views}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DiscussionItem;
