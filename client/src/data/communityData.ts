// ── Community Data ─────────────────────────────────────────────────────────

export interface Community {
  id: string;
  slug?: string;
  name: string;
  subtitle?: string; // mapped to shortDescription
  shortDescription?: string;
  description: string;
  bannerImageUrl?: string;
  logoImageUrl?: string;
  image?: string;      // deprecated
  icon?: string;       // deprecated
  iconBg?: string;     // deprecated
  members: string | number;
  posts: string | number;
  online?: number;
  category: string | null;
  verified?: boolean;
  createdOn?: string;
  aboutText?: string;
  rules?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
  membersCount?: number;
  postsCount?: number;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  question: string;
  options: PollOption[];
}

export interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  replies?: Comment[];
}

export interface Discussion {
  id: string;
  communityId: string;
  title: string;
  content?: string;
  author: string;
  authorAvatar: string;
  timeAgo: string;
  views: string;
  replies: number;
  likes?: number;
  tag: 'Destinations' | 'Tips' | 'Events' | 'Itinerary';
  tagColor: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  poll?: Poll;
  comments?: Comment[];
}

export interface Contributor {
  id: string;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  color: string; // avatar ring color
}

// ── Communities ────────────────────────────────────────────────────────────
export const communities: Community[] = [];


// ── Discussions (for 'bihar-travel' community) ─────────────────────────────
export const discussions: Discussion[] = [
  {
    id: 'd1',
    communityId: 'bihar-travel',
    title: 'Best places to visit in Nalanda district',
    author: 'Rohit Kumar',
    authorAvatar: 'RK',
    timeAgo: '2h ago',
    views: '13K views',
    replies: 28,
    tag: 'Destinations',
    tagColor: 'bg-blue-100 text-blue-700',
    content: 'Nalanda is an incredible place! Here are some photos from my recent visit. What are your favorite spots in Nalanda district?',
    mediaUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
    mediaType: 'image',
  },
  {
    id: 'd2',
    communityId: 'bihar-travel',
    title: 'Exploring Rajgir: Top attractions and travel guide',
    author: 'Neha Singh',
    authorAvatar: 'NS',
    timeAgo: '5h ago',
    views: '980 views',
    replies: 16,
    tag: 'Destinations',
    tagColor: 'bg-blue-100 text-blue-700',
    content: 'Rajgir has so much to offer — from hot springs to ancient ruins. Here is my complete guide to making the most of your trip.',
  },
  {
    id: 'd3',
    communityId: 'bihar-travel',
    title: 'Is Bodh Gaya worth visiting in summer?',
    author: 'Aman Raj',
    authorAvatar: 'AR',
    timeAgo: '1d ago',
    views: '13K views',
    replies: 32,
    tag: 'Destinations',
    tagColor: 'bg-blue-100 text-blue-700',
    content: 'I am planning a trip to Bodh Gaya this summer. I heard it can be quite hot, but it is less crowded. What do you think?',
    poll: {
      question: 'Would you recommend visiting Bodh Gaya in Summer?',
      options: [
        { id: 'p1', text: 'Yes, it is peaceful and uncrowded', votes: 12 },
        { id: 'p2', text: 'No, it is too hot to explore properly', votes: 45 },
        { id: 'p3', text: 'Maybe, if you only go out early morning/late evening', votes: 20 },
      ]
    }
  },
  {
    id: 'd4',
    communityId: 'bihar-travel',
    title: 'Hidden places in Bihar you must explore',
    author: 'TravelWithAman',
    authorAvatar: 'TA',
    timeAgo: '2d ago',
    views: '2.3K views',
    replies: 45,
    tag: 'Tips',
    tagColor: 'bg-green-100 text-green-700',
    content: 'Bihar has so many offbeat places that most tourists never see. From the ruins of Vikramshila to the wetlands of Kanwar Lake, here are my top picks.',
    mediaUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80',
    mediaType: 'image',
  },
  {
    id: 'd5',
    communityId: 'bihar-travel',
    title: 'Best time to visit Bihar for Chhath Puja',
    author: 'Priya Verma',
    authorAvatar: 'PV',
    timeAgo: '3d ago',
    views: '1.8K views',
    replies: 12,
    tag: 'Events',
    tagColor: 'bg-pink-100 text-pink-700',
  },
  {
    id: 'd6',
    communityId: 'bihar-travel',
    title: 'How to plan a 5 day trip across Bihar?',
    author: 'BackpackerAnkit',
    authorAvatar: 'BA',
    timeAgo: '4d ago',
    views: '2.6K views',
    replies: 38,
    tag: 'Itinerary',
    tagColor: 'bg-yellow-100 text-yellow-700',
    content: 'Planning my first multi-city trip across Bihar. Looking at Patna → Nalanda → Rajgir → Bodh Gaya → Vaishali. Any suggestions on timing and transport?',
    poll: {
      question: 'What is the best way to travel between cities in Bihar?',
      options: [
        { id: 'p1', text: 'Hire a private car/driver for flexibility', votes: 34 },
        { id: 'p2', text: 'Use local buses — cheap and authentic', votes: 18 },
        { id: 'p3', text: 'Mix of trains and autos', votes: 27 },
        { id: 'p4', text: 'Join a guided tour group', votes: 8 },
      ]
    }
  },
  {
    id: 'd7',
    communityId: 'bihar-travel',
    title: 'Travelling to Bihar on a budget – Tips & tricks',
    author: 'WanderlustPriya',
    authorAvatar: 'WP',
    timeAgo: '5d ago',
    views: '1.7K views',
    replies: 9,
    tag: 'Tips',
    tagColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'd8',
    communityId: 'bihar-travel',
    title: 'Which is better: Patna or Gaya for a short trip?',
    author: 'ExplorerRahul',
    authorAvatar: 'ER',
    timeAgo: '5d ago',
    views: '870 views',
    replies: 14,
    tag: 'Destinations',
    tagColor: 'bg-blue-100 text-blue-700',
  },
];

// ── Top Contributors ────────────────────────────────────────────────────────
export const contributors: Contributor[] = [
  { id: 'c1', name: 'Rohit Kumar', avatar: 'RK', points: 2450, rank: 1, color: 'bg-orange-400' },
  { id: 'c2', name: 'Neha Singh', avatar: 'NS', points: 1980, rank: 2, color: 'bg-purple-500' },
  { id: 'c3', name: 'TravelWithAman', avatar: 'TA', points: 1650, rank: 3, color: 'bg-blue-500' },
  { id: 'c4', name: 'Priya Verma', avatar: 'PV', points: 1420, rank: 4, color: 'bg-pink-500' },
  { id: 'c5', name: 'WanderlustPriya', avatar: 'WP', points: 1210, rank: 5, color: 'bg-green-500' },
];

// ── Community Guidelines ────────────────────────────────────────────────────
export const communityGuidelines: string[] = [
  'Be respectful and kind',
  'Stay on topic',
  'No spam or self-promotion',
  'Share authentic information',
  'Keep Bihar clean, safe & green',
];

// ── Member avatars (for detail header) ─────────────────────────────────────
export const memberAvatars: { initials: string; color: string }[] = [
  { initials: 'RK', color: 'bg-orange-400' },
  { initials: 'NS', color: 'bg-purple-500' },
  { initials: 'TA', color: 'bg-blue-500' },
  { initials: 'PV', color: 'bg-pink-500' },
  { initials: 'WP', color: 'bg-green-500' },
];
