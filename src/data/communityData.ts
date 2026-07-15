// ── Community Data ─────────────────────────────────────────────────────────

export interface Community {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  icon: string;        // emoji icon
  iconBg: string;      // tailwind bg color class
  members: string;
  posts: string;
  online: number;
  category: string;
  verified?: boolean;
  createdOn?: string;
  aboutText?: string;
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
export const communities: Community[] = [
  {
    id: 'bihar-travel',
    name: 'Bihar Travel & Destinations',
    subtitle: "Explore Bihar's best places",
    description:
      "Explore Bihar's best places to visit, travel tips, itineraries and hidden gems with fellow travellers and locals.",
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    icon: '📍',
    iconBg: 'bg-purple-600',
    members: '12.5K',
    posts: '1.2K',
    online: 320,
    category: 'Travel',
    verified: true,
    createdOn: 'Jan 10, 2024',
    aboutText:
      'A community for travellers and explorers to share experiences, ask questions and discover the beauty of Bihar together.',
  },
  {
    id: 'bihar-culture',
    name: 'Bihar Culture & Heritage',
    subtitle: "Discuss Bihar's culture",
    description:
      "Discuss Bihar's rich culture, heritage, traditions, art, literature and more.",
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
    icon: '🏛️',
    iconBg: 'bg-orange-500',
    members: '9.8K',
    posts: '956',
    online: 210,
    category: 'Culture',
    verified: true,
    createdOn: 'Mar 5, 2024',
    aboutText:
      'Celebrate and explore the vibrant cultural tapestry of Bihar — from Madhubani art to ancient temples.',
  },
  {
    id: 'bihari-food',
    name: 'Bihari Food Lovers',
    subtitle: 'Share recipes & street food',
    description:
      'Share recipes, street food spots and local delicacies from Bihar.',
    image: 'https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3bf?w=800&q=80',
    icon: '🍛',
    iconBg: 'bg-red-500',
    members: '7.3K',
    posts: '842',
    online: 168,
    category: 'Food',
    createdOn: 'Feb 14, 2024',
    aboutText:
      'A foodie paradise for lovers of Bihari cuisine — litti chokha, sattu, thekua and more!',
  },
  {
    id: 'bihar-festivals',
    name: 'Bihar Festivals & Events',
    subtitle: 'Festivals, events & celebrations',
    description:
      'Stay updated about festivals, events and celebrations across Bihar.',
    image: 'https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=800&q=80',
    icon: '🎉',
    iconBg: 'bg-pink-500',
    members: '4.2K',
    posts: '649',
    online: 190,
    category: 'Events',
    createdOn: 'Apr 2, 2024',
    aboutText:
      "From Chhath Puja to Sonepur Mela — never miss a moment of Bihar's vibrant festival calendar.",
  },
  {
    id: 'bihar-photography',
    name: 'Bihar Photography',
    subtitle: "Capture Bihar's beauty",
    description: 'Capture and share the beauty of Bihar through your lens.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    icon: '📷',
    iconBg: 'bg-blue-600',
    members: '5.9K',
    posts: '521',
    online: 110,
    category: 'Photography',
    createdOn: 'Jan 28, 2024',
    aboutText:
      "Share stunning photos of Bihar's landscapes, people, architecture and wildlife.",
  },
  {
    id: 'bihar-history',
    name: 'Bihar History & Heritage',
    subtitle: 'Ancient sites & monuments',
    description:
      "Dive into Bihar's glorious history, ancient sites, monuments and stories.",
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
    icon: '🏺',
    iconBg: 'bg-yellow-600',
    members: '4.1K',
    posts: '412',
    online: 153,
    category: 'History',
    createdOn: 'May 1, 2024',
    aboutText:
      'Explore the land of the Mauryan Empire, Nalanda University and countless archaeological wonders.',
  },
  {
    id: 'bihar-tribes',
    name: 'Bihar Tribes & Communities',
    subtitle: 'Tribal life & culture',
    description:
      "Learn about Bihar's tribal communities, their life, culture and traditions.",
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&q=80',
    icon: '🌿',
    iconBg: 'bg-green-600',
    members: '4.1K',
    posts: '367',
    online: 98,
    category: 'Culture',
    createdOn: 'Jun 15, 2024',
    aboutText:
      "Celebrating the richness and resilience of Bihar's indigenous communities.",
  },
  {
    id: 'students-bihar',
    name: 'Students in Bihar',
    subtitle: 'Academic help & resources',
    description:
      'A place for students to share academic help, resources and ideas.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    icon: '🎓',
    iconBg: 'bg-indigo-600',
    members: '3.4K',
    posts: '296',
    online: 85,
    category: 'Travel',
    createdOn: 'Jul 10, 2024',
    aboutText:
      'Connecting students across Bihar for study groups, exam tips and career guidance.',
  },
  {
    id: 'bihar-agriculture',
    name: 'Bihar Agriculture',
    subtitle: 'Farming tips & discussions',
    description:
      'Farmers, agri enthusiasts and experts sharing knowledge and ideas.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
    icon: '🌾',
    iconBg: 'bg-lime-600',
    members: '3.4K',
    posts: '274',
    online: 90,
    category: 'Food',
    createdOn: 'Aug 3, 2024',
    aboutText:
      "Supporting Bihar's farming community with modern techniques, crop advice and market insights.",
  },
];

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
  { id: 'c1', name: 'Rohit Kumar',    avatar: 'RK', points: 2450, rank: 1, color: 'bg-orange-400' },
  { id: 'c2', name: 'Neha Singh',     avatar: 'NS', points: 1980, rank: 2, color: 'bg-purple-500' },
  { id: 'c3', name: 'TravelWithAman', avatar: 'TA', points: 1650, rank: 3, color: 'bg-blue-500'   },
  { id: 'c4', name: 'Priya Verma',    avatar: 'PV', points: 1420, rank: 4, color: 'bg-pink-500'   },
  { id: 'c5', name: 'WanderlustPriya',avatar: 'WP', points: 1210, rank: 5, color: 'bg-green-500'  },
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
  { initials: 'TA', color: 'bg-blue-500'   },
  { initials: 'PV', color: 'bg-pink-500'   },
  { initials: 'WP', color: 'bg-green-500'  },
];
