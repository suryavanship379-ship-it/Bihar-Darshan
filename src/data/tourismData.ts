export interface TourTrip {
  id: string;
  title: string;
  provider: string;
  providerLogo: string;
  rating: number;
  duration: string;
  departureCity: string;
  places: string[];
  description: string;
  price: string;
  phone: string;
  whatsapp: string;
  image: string;
  hasVideo?: boolean;
}

export const featuredTrips: TourTrip[] = [
  {
    id: "1",
    title: "Maha Bodhi Spiritual Retreat",
    provider: "Nirvana Travels",
    providerLogo: "https://cdn-icons-png.flaticon.com/512/3233/3233481.png",
    rating: 4.9,
    duration: "3 Days, 2 Nights",
    departureCity: "Patna",
    places: ["Mahabodhi Temple", "Dungeshwari Cave", "Great Buddha Statue"],
    description: "Follow the footsteps of Lord Buddha. A premium spiritual journey with 5-star accommodation and expert historians.",
    price: "₹18,500",
    phone: "+91 9876543210",
    whatsapp: "+91 9876543210",
    image: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=2000&auto=format&fit=crop",
    hasVideo: true
  },
  {
    id: "2",
    title: "The Nalanda Heritage Walk",
    provider: "Bihar Heritage Guild",
    providerLogo: "https://cdn-icons-png.flaticon.com/512/3233/3233497.png",
    rating: 4.8,
    duration: "2 Days, 1 Night",
    departureCity: "Gaya",
    places: ["Nalanda University Ruins", "Hiuen Tsang Memorial", "Pawapuri Jal Mandir"],
    description: "Uncover the secrets of the world's first residential university. Includes private museum tour and authentic Maithili lunch.",
    price: "₹12,000",
    phone: "+91 8765432109",
    whatsapp: "+91 8765432109",
    image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2000&auto=format&fit=crop",
    hasVideo: false
  },
  {
    id: "3",
    title: "Royal Patna River Cruise",
    provider: "Ganga Voyages",
    providerLogo: "https://cdn-icons-png.flaticon.com/512/3233/3233501.png",
    rating: 4.7,
    duration: "Full Day",
    departureCity: "Patna",
    places: ["Ganga Ghats", "Har Mandir Sahib", "Golghar", "Bihar Museum"],
    description: "Experience the sunset over the holy Ganges. A luxury cruise experience with gourmet catering and live Sufi music.",
    price: "₹6,500",
    phone: "+91 7654321098",
    whatsapp: "+91 7654321098",
    image: "https://images.unsplash.com/photo-1517670868065-9491d6dd8169?q=80&w=2000&auto=format&fit=crop",
    hasVideo: true
  },
  {
    id: "4",
    title: "Vaishali Peace Expedition",
    provider: "Licchavi Tours",
    providerLogo: "https://cdn-icons-png.flaticon.com/512/3233/3233515.png",
    rating: 4.9,
    duration: "2 Days",
    departureCity: "Vaishali",
    places: ["Ashoka Pillar", "Vishwa Shanti Stupa", "Coronation Tank"],
    description: "Explore the birthplace of Lord Mahavira and the world's first republic. A peaceful retreat for history lovers.",
    price: "₹9,800",
    phone: "+91 6543210987",
    whatsapp: "+91 6543210987",
    image: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=2000&auto=format&fit=crop",
    hasVideo: false
  }
];
