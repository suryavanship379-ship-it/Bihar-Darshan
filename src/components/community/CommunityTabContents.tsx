import { Users, Shield, Calendar, MapPin, Clock, ExternalLink, Image as ImageIcon, BookOpen, Info } from 'lucide-react';
import type { Community, Contributor } from '../../data/communityData';

// ── Members Tab ───────────────────────────────────────────────────────────
export const TabMembers = ({ contributors }: { contributors: Contributor[] }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Users className="text-amber-500" size={20} />
        Community Members
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contributors.map((c) => (
          <div key={c.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-md hover:bg-amber-50/30 transition-all duration-200">
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

// ── Media Tab ─────────────────────────────────────────────────────────────
const MOCK_MEDIA = [
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
  'https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3bf?w=800&q=80',
  'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
  'https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=800&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
];

export const TabMedia = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <ImageIcon className="text-amber-500" size={20} />
        Shared Media
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {MOCK_MEDIA.map((url, idx) => (
          <div key={idx} className="aspect-square rounded-xl overflow-hidden group relative cursor-pointer shadow-sm">
            <img src={url} alt={`Media ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>
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
        <BookOpen className="text-amber-500" size={20} />
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
            <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
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
        <Calendar className="text-amber-500" size={20} />
        Upcoming Events
      </h3>
      <div className="flex flex-col gap-4">
        {MOCK_EVENTS.map(e => (
          <div key={e.id} className="flex gap-5 p-5 rounded-xl border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 group cursor-pointer bg-white">
            <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-amber-50 text-amber-600 shrink-0 border border-amber-100">
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
          <Info className="text-amber-500" size={20} />
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
          <Shield className="text-amber-500" size={20} />
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
