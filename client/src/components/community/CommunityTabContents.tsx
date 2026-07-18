import { useState } from 'react';
import { Users, Shield, Calendar, MapPin, Clock, ExternalLink, Image as ImageIcon, BookOpen, Info, Play, BarChart2, Video as VideoIcon } from 'lucide-react';
import type { Community, Contributor, Discussion } from '../../data/communityData';

// ── Members Tab ───────────────────────────────────────────────────────────
export const TabMembers = ({ contributors }: { contributors: Contributor[] }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Users className="text-gold-dark" size={20} />
        Community Members
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contributors.map((c) => (
          <div key={c.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-md hover:bg-brand-gray/30 transition-all duration-200">
            <div className={`w-12 h-12 rounded-full ${c.color} text-white flex items-center justify-center font-bold text-lg shadow-inner`}>
              {c.avatar}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{c.name}</h4>
              <p className="text-xs font-medium text-gray-500 mt-0.5">{c.points.toLocaleString()} pts • Rank #{c.rank}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



interface TabMediaProps {
  community: Community;
  discussions?: Discussion[];
}

export const TabMedia = ({ community: _community, discussions = [] }: TabMediaProps) => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'photos' | 'videos' | 'polls'>('all');

  // Only show real community uploads — no dummy/fallback data
  const customPhotos = discussions
    .filter((d) => d.mediaUrl && d.mediaType === 'image')
    .map((d) => ({
      id: d.id,
      title: d.title,
      image: d.mediaUrl!,
      mediaType: 'photo' as const,
      photographer: d.author,
      location: 'Community Upload',
    }));

  const customVideos = discussions
    .filter((d) => d.mediaUrl && d.mediaType === 'video')
    .map((d) => ({
      id: d.id,
      title: d.title,
      image: d.mediaUrl!,
      mediaType: 'video' as const,
      photographer: d.author,
      location: 'Community Upload',
    }));

  const customPolls = discussions
    .filter((d) => d.poll)
    .map((d) => ({
      id: d.id,
      title: d.title,
      poll: d.poll!,
      author: d.author,
      timeAgo: d.timeAgo,
    }));

  const allPhotos = customPhotos;
  const allVideos = customVideos;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <ImageIcon className="text-gold-dark" size={20} />
          Shared Media & Polls
        </h3>
        <div className="flex flex-wrap gap-1 bg-gray-100/80 p-1 rounded-xl">
          {(['all', 'photos', 'videos', 'polls'] as const).map((tab) => {
            let label = '';
            let count = 0;
            if (tab === 'all') {
              label = 'All';
              count = allPhotos.length + allVideos.length + customPolls.length;
            } else if (tab === 'photos') {
              label = 'Photos';
              count = allPhotos.length;
            } else if (tab === 'videos') {
              label = 'Videos';
              count = allVideos.length;
            } else if (tab === 'polls') {
              label = 'Polls';
              count = customPolls.length;
            }

            return (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeSubTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {activeSubTab === 'polls' ? (
        customPolls.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm flex flex-col items-center gap-2">
            <BarChart2 size={36} className="text-gray-300" />
            No polls posted in this community yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customPolls.map((item) => {
              const totalVotes = item.poll.options.reduce((sum, o) => sum + o.votes, 0) || 0;
              return (
                <div key={item.id} className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:border-amber-200 hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2 text-xs text-gray-400 font-semibold">
                    <span>Posted by {item.author}</span>
                    <span>•</span>
                    <span>{item.timeAgo}</span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3">{item.poll.question}</h4>
                  <div className="space-y-2">
                    {item.poll.options.map((option) => {
                      const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                      return (
                        <div key={option.id} className="relative">
                          <div className="absolute inset-0 rounded-lg bg-amber-100/50" style={{ width: `${pct}%` }} />
                          <div className="relative flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 bg-white/60">
                            <span className="text-xs font-semibold text-gray-700">{option.text}</span>
                            <span className="text-xs font-bold text-gray-500">{pct}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 text-[10px] font-bold tracking-wider text-gray-400 border-t border-gray-100">
                    <span>{totalVotes} VOTES</span>
                    <span className="text-amber-600 bg-amber-100/50 px-2 py-0.5 rounded-full uppercase">POLL</span>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (activeSubTab === 'photos' && allPhotos.length === 0) || (activeSubTab === 'videos' && allVideos.length === 0) ? (
        <div className="text-center py-12 text-gray-400 text-sm flex flex-col items-center gap-2">
          {activeSubTab === 'photos' ? <ImageIcon size={36} className="text-gray-300" /> : <VideoIcon size={36} className="text-gray-300" />}
          No shared {activeSubTab} in this community yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Photos */}
          {(activeSubTab === 'all' || activeSubTab === 'photos') &&
            allPhotos.map((item) => (
              <div key={item.id} className="aspect-square rounded-xl overflow-hidden group relative cursor-pointer shadow-sm border border-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-white font-semibold text-xs line-clamp-1">{item.title}</span>
                  <span className="text-white/70 text-[10px] mt-0.5">by {item.photographer} • {item.location}</span>
                </div>
              </div>
            ))}

          {/* Videos */}
          {(activeSubTab === 'all' || activeSubTab === 'videos') &&
            allVideos.map((item) => (
              <div key={item.id} className="aspect-square rounded-xl overflow-hidden group relative cursor-pointer shadow-sm border border-gray-100 bg-black">
                <video
                  src={item.image}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  preload="metadata"
                  playsInline
                  onMouseOver={(e) => {
                    const video = e.target as HTMLVideoElement;
                    video.play().catch(() => { });
                  }}
                  onMouseOut={(e) => {
                    const video = e.target as HTMLVideoElement;
                    video.pause();
                  }}
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Play size={8} fill="currentColor" />
                  VIDEO
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
                  <span className="text-white font-semibold text-xs line-clamp-1">{item.title}</span>
                  <span className="text-white/70 text-[10px] mt-0.5">by {item.photographer} • {item.location}</span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

// ── Guides Tab ────────────────────────────────────────────────────────────
const MOCK_GUIDES = [
  { id: 1, title: 'Beginner\'s Guide to Nalanda Ruins', author: 'Rohit Kumar', readTime: '5 min read', tag: 'History' },
  { id: 2, title: 'Top 10 Street Food Spots in Patna', author: 'Neha Singh', readTime: '8 min read', tag: 'Food' },
  { id: 3, title: 'How to plan a Bodh Gaya spiritual retreat', author: 'TravelWithAman', readTime: '12 min read', tag: 'Travel' },
];

export const TabGuides = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BookOpen className="text-gold-dark" size={20} />
        Community Guides
      </h3>
      <div className="flex flex-col gap-4">
        {MOCK_GUIDES.map(g => (
          <div key={g.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-amber-300 hover:shadow-md transition-all duration-200 gap-4 group cursor-pointer bg-gradient-to-r from-white to-gray-50/50">
            <div>
              <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md mb-2">{g.tag}</span>
              <h4 className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{g.title}</h4>
              <p className="text-sm text-gray-500 mt-1">Written by <span className="font-semibold">{g.author}</span> • {g.readTime}</p>
            </div>
            <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-brand-gray text-accent-brown group-hover:bg-gold-dark group-hover:text-white transition-colors">
              <ExternalLink size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Events Tab ────────────────────────────────────────────────────────────
const MOCK_EVENTS = [
  { id: 1, title: 'Patna Heritage Walk', date: 'Oct 15, 2024', time: '07:00 AM', location: 'Golghar, Patna', attendees: 45 },
  { id: 2, title: 'Bihari Cuisine Meetup', date: 'Oct 22, 2024', time: '06:30 PM', location: 'Maurya Lok, Patna', attendees: 120 },
  { id: 3, title: 'Photography Expedition: Rajgir', date: 'Nov 5, 2024', time: '05:30 AM', location: 'Vishwa Shanti Stupa', attendees: 32 },
];

export const TabEvents = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Calendar className="text-gold-dark" size={20} />
        Upcoming Events
      </h3>
      <div className="flex flex-col gap-4">
        {MOCK_EVENTS.map(e => (
          <div key={e.id} className="flex gap-5 p-5 rounded-xl border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 group cursor-pointer bg-white">
            <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-brand-gray text-accent-brown shrink-0 border border-amber-100">
              <span className="text-xs font-bold uppercase">{e.date.split(' ')[0]}</span>
              <span className="text-xl font-black leading-none">{e.date.split(' ')[1].replace(',', '')}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-bold text-gray-900 truncate group-hover:text-amber-700 transition-colors">{e.title}</h4>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-600 font-medium">
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-gray-400" />{e.time}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400" />{e.location}</span>
                <span className="flex items-center gap-1.5"><Users size={14} className="text-gray-400" />{e.attendees} attending</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── About Tab ─────────────────────────────────────────────────────────────
export const TabAbout = ({ community }: { community: Community }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* About Box */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Info className="text-gold-dark" size={20} />
          About {community.name}
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {community.aboutText || community.description}
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <span className="block text-2xl font-black text-gray-900">{community.members}</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Members</span>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <span className="block text-2xl font-black text-gray-900">{community.posts}</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Posts</span>
          </div>

          <div className="text-center p-3 rounded-lg bg-gray-50">
            <span className="block text-2xl font-black text-gray-900">{community.createdOn?.split(', ')[1] || '2024'}</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Since</span>
          </div>
        </div>
      </div>

      {/* Rules Box */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="text-gold-dark" size={20} />
          Community Guidelines
        </h3>
        <ul className="space-y-3">
          {[
            'Be respectful and kind to fellow members.',
            'Stay on topic and relevant to the community theme.',
            'No spam, self-promotion, or unsolicited links.',
            'Share authentic and verifiable information.',
            'Keep discussions safe, clean, and constructive.'
          ].map((rule, idx) => (
            <li key={idx} className="flex gap-3 text-gray-700 text-sm">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold text-xs">
                {idx + 1}
              </span>
              <span className="pt-0.5">{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
