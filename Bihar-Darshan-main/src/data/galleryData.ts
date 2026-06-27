import heritageImg from "../assets/bihar-heritage.png";
import mountainsImg from "../assets/bihar-mountains.png";
import foodImg from "../assets/bihar-food.png";
import templeImg from "../assets/bihar-temple.png";
import monumentImg from "../assets/bihar-monument.png";
import folkDanceImg from "../assets/bihar-folk-dance.png";
import bodhGayaImg from "../assets/bodh-gaya.png";
import nalandaImg from "../assets/nalanda.png";
import rajgirImg from "../assets/rajgir.png";
import vaishaliImg from "../assets/vaishali.png";
import patnaSahibImg from "../assets/patna-sahib.png";
import pawapuriImg from "../assets/pawapuri.png";
import ctaBgImg from "../assets/cta-bg.png";
import heroImg from "../assets/hero.png";
import patnaDistrictImg from "../assets/patna-district.png";
import gayaDistrictImg from "../assets/gaya-district.png";
import darbhangaDistrictImg from "../assets/darbhanga-district.png";
import muzaffarpurDistrictImg from "../assets/muzaffarpur-district.png";
import bhagalpurDistrictImg from "../assets/bhagalpur-district.png";

export type MediaType = "photo" | "video";

export type GalleryCategory =
  | "Food"
  | "Culture"
  | "Politicians"
  | "Places"
  | "Heritage"
  | "Festivals"
  | "Agriculture"
  | "Art & Craft"
  | "Wildlife"
  | "Community"
  | "Tourism"
  | "Architecture"
  | "Religion";

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  mediaType: MediaType;
  category: GalleryCategory;
  photographer: string;
  likes: number;
  views: number;
  comments: number;
  uploadDate: string;
  location: string;
  duration?: string; // for videos, e.g. "2:34"
  aspectRatio: "square" | "portrait" | "landscape"; // controls masonry height
}

export const galleryCategories: GalleryCategory[] = [
  "Food",
  "Culture",
  "Politicians",
  "Places",
  "Heritage",
  "Festivals",
  "Agriculture",
  "Art & Craft",
  "Wildlife",
  "Community",
  "Tourism",
  "Architecture",
  "Religion",
];

export const galleryData: GalleryItem[] = [
  // ── Food ──
  {
    id: 1,
    title: "Litti Chokha — Soul of Bihar",
    image: foodImg,
    mediaType: "photo",
    category: "Food",
    photographer: "Rahul Sharma",
    likes: 1247,
    views: 8430,
    comments: 89,
    uploadDate: "2026-06-10",
    location: "Patna, Bihar",
    aspectRatio: "square",
  },
  {
    id: 2,
    title: "Thekua — Chhath Puja Delicacy",
    image: darbhangaDistrictImg,
    mediaType: "photo",
    category: "Food",
    photographer: "Priya Kumari",
    likes: 892,
    views: 5120,
    comments: 45,
    uploadDate: "2026-05-28",
    location: "Darbhanga, Bihar",
    aspectRatio: "portrait",
  },
  {
    id: 3,
    title: "Traditional Bhojpuri Cuisine",
    image: muzaffarpurDistrictImg,
    mediaType: "video",
    category: "Food",
    photographer: "Aditya Singh",
    likes: 2105,
    views: 14200,
    comments: 132,
    uploadDate: "2026-06-01",
    location: "Muzaffarpur, Bihar",
    duration: "3:45",
    aspectRatio: "landscape",
  },

  // ── Culture ──
  {
    id: 4,
    title: "Folk Dance of Mithila",
    image: folkDanceImg,
    mediaType: "photo",
    category: "Culture",
    photographer: "Sneha Das",
    likes: 1834,
    views: 11200,
    comments: 97,
    uploadDate: "2026-06-15",
    location: "Madhubani, Bihar",
    aspectRatio: "portrait",
  },
  {
    id: 5,
    title: "Madhubani Art — Living Heritage",
    image: ctaBgImg,
    mediaType: "photo",
    category: "Culture",
    photographer: "Vikram Jha",
    likes: 3210,
    views: 22400,
    comments: 201,
    uploadDate: "2026-05-20",
    location: "Madhubani, Bihar",
    aspectRatio: "landscape",
  },
  {
    id: 6,
    title: "Cultural Gathering in Vaishali",
    image: vaishaliImg,
    mediaType: "video",
    category: "Culture",
    photographer: "Ankit Kumar",
    likes: 1456,
    views: 9300,
    comments: 78,
    uploadDate: "2026-06-05",
    location: "Vaishali, Bihar",
    duration: "5:12",
    aspectRatio: "square",
  },

  // ── Politicians ──
  {
    id: 7,
    title: "Historical Bihar Leaders",
    image: patnaDistrictImg,
    mediaType: "photo",
    category: "Politicians",
    photographer: "Bihar Archives",
    likes: 4521,
    views: 31000,
    comments: 312,
    uploadDate: "2026-04-15",
    location: "Patna, Bihar",
    aspectRatio: "portrait",
  },
  {
    id: 8,
    title: "Public Assembly — Gandhi Maidan",
    image: heroImg,
    mediaType: "photo",
    category: "Politicians",
    photographer: "Manoj Tiwari",
    likes: 2890,
    views: 19500,
    comments: 187,
    uploadDate: "2026-05-01",
    location: "Patna, Bihar",
    aspectRatio: "landscape",
  },

  // ── Places ──
  {
    id: 9,
    title: "Rajgir — The Ancient Capital",
    image: rajgirImg,
    mediaType: "photo",
    category: "Places",
    photographer: "Deepak Verma",
    likes: 2678,
    views: 18900,
    comments: 156,
    uploadDate: "2026-06-12",
    location: "Rajgir, Bihar",
    aspectRatio: "landscape",
  },
  {
    id: 10,
    title: "Nalanda — Seat of Learning",
    image: nalandaImg,
    mediaType: "photo",
    category: "Places",
    photographer: "Suman Roy",
    likes: 3456,
    views: 24100,
    comments: 234,
    uploadDate: "2026-06-08",
    location: "Nalanda, Bihar",
    aspectRatio: "portrait",
  },
  {
    id: 11,
    title: "Bodh Gaya — Land of Enlightenment",
    image: bodhGayaImg,
    mediaType: "video",
    category: "Places",
    photographer: "Ravi Shankar",
    likes: 5210,
    views: 42000,
    comments: 389,
    uploadDate: "2026-05-15",
    location: "Bodh Gaya, Bihar",
    duration: "4:20",
    aspectRatio: "square",
  },
  {
    id: 12,
    title: "Vaishali — Birthplace of Democracy",
    image: vaishaliImg,
    mediaType: "photo",
    category: "Places",
    photographer: "Kavita Singh",
    likes: 1987,
    views: 13400,
    comments: 112,
    uploadDate: "2026-06-18",
    location: "Vaishali, Bihar",
    aspectRatio: "portrait",
  },

  // ── Heritage ──
  {
    id: 13,
    title: "Ancient Temples of Bihar",
    image: templeImg,
    mediaType: "photo",
    category: "Heritage",
    photographer: "Amit Pandey",
    likes: 2345,
    views: 16700,
    comments: 145,
    uploadDate: "2026-06-02",
    location: "Gaya, Bihar",
    aspectRatio: "square",
  },
  {
    id: 14,
    title: "Historical Monuments — Patna",
    image: monumentImg,
    mediaType: "photo",
    category: "Heritage",
    photographer: "Nisha Gupta",
    likes: 1890,
    views: 12300,
    comments: 98,
    uploadDate: "2026-05-25",
    location: "Patna, Bihar",
    aspectRatio: "landscape",
  },
  {
    id: 15,
    title: "Ruins of Nalanda University",
    image: heritageImg,
    mediaType: "video",
    category: "Heritage",
    photographer: "Arjun Mishra",
    likes: 3780,
    views: 28900,
    comments: 267,
    uploadDate: "2026-05-10",
    location: "Nalanda, Bihar",
    duration: "6:30",
    aspectRatio: "portrait",
  },

  // ── Festivals ──
  {
    id: 16,
    title: "Chhath Puja — Sacred Offering",
    image: gayaDistrictImg,
    mediaType: "photo",
    category: "Festivals",
    photographer: "Pooja Devi",
    likes: 6789,
    views: 52000,
    comments: 456,
    uploadDate: "2026-04-20",
    location: "Patna, Bihar",
    aspectRatio: "portrait",
  },
  {
    id: 17,
    title: "Holi Celebrations in Bihar",
    image: folkDanceImg,
    mediaType: "video",
    category: "Festivals",
    photographer: "Rohit Raj",
    likes: 4320,
    views: 35000,
    comments: 298,
    uploadDate: "2026-03-25",
    location: "Patna, Bihar",
    duration: "2:45",
    aspectRatio: "landscape",
  },
  {
    id: 18,
    title: "Diwali — Festival of Lights",
    image: patnaSahibImg,
    mediaType: "photo",
    category: "Festivals",
    photographer: "Shweta Kumari",
    likes: 3560,
    views: 27800,
    comments: 189,
    uploadDate: "2026-04-05",
    location: "Darbhanga, Bihar",
    aspectRatio: "square",
  },

  // ── Agriculture ──
  {
    id: 19,
    title: "Golden Paddy Fields",
    image: mountainsImg,
    mediaType: "photo",
    category: "Agriculture",
    photographer: "Kiran Yadav",
    likes: 1567,
    views: 10200,
    comments: 67,
    uploadDate: "2026-06-14",
    location: "Bhojpur, Bihar",
    aspectRatio: "landscape",
  },
  {
    id: 20,
    title: "Harvest Season — Rural Bihar",
    image: bhagalpurDistrictImg,
    mediaType: "photo",
    category: "Agriculture",
    photographer: "Suresh Mahato",
    likes: 1230,
    views: 8900,
    comments: 54,
    uploadDate: "2026-06-07",
    location: "Bhagalpur, Bihar",
    aspectRatio: "portrait",
  },

  // ── Art & Craft ──
  {
    id: 21,
    title: "Madhubani Painting Masterpiece",
    image: ctaBgImg,
    mediaType: "photo",
    category: "Art & Craft",
    photographer: "Meera Devi",
    likes: 4567,
    views: 33400,
    comments: 278,
    uploadDate: "2026-05-18",
    location: "Madhubani, Bihar",
    aspectRatio: "portrait",
  },
  {
    id: 22,
    title: "Sikki Grass Craft — Traditional Art",
    image: darbhangaDistrictImg,
    mediaType: "video",
    category: "Art & Craft",
    photographer: "Rani Kumari",
    likes: 2345,
    views: 15600,
    comments: 134,
    uploadDate: "2026-05-22",
    location: "Muzaffarpur, Bihar",
    duration: "3:15",
    aspectRatio: "square",
  },

  // ── Wildlife ──
  {
    id: 23,
    title: "Gangetic Dolphins — Vikramshila",
    image: mountainsImg,
    mediaType: "video",
    category: "Wildlife",
    photographer: "Dr. Ramesh Kumar",
    likes: 3890,
    views: 29100,
    comments: 213,
    uploadDate: "2026-05-30",
    location: "Bhagalpur, Bihar",
    duration: "7:20",
    aspectRatio: "landscape",
  },
  {
    id: 24,
    title: "Valmiki National Park",
    image: bhagalpurDistrictImg,
    mediaType: "photo",
    category: "Wildlife",
    photographer: "Santosh Thakur",
    likes: 2120,
    views: 16800,
    comments: 145,
    uploadDate: "2026-06-03",
    location: "West Champaran, Bihar",
    aspectRatio: "portrait",
  },

  // ── Community ──
  {
    id: 25,
    title: "Local Traditions — Rural Bihar",
    image: pawapuriImg,
    mediaType: "photo",
    category: "Community",
    photographer: "Ajay Sinha",
    likes: 1780,
    views: 11900,
    comments: 89,
    uploadDate: "2026-06-11",
    location: "Nalanda, Bihar",
    aspectRatio: "square",
  },
  {
    id: 26,
    title: "Village Life — Heart of Bihar",
    image: muzaffarpurDistrictImg,
    mediaType: "photo",
    category: "Community",
    photographer: "Sunita Devi",
    likes: 1340,
    views: 9800,
    comments: 72,
    uploadDate: "2026-06-09",
    location: "Muzaffarpur, Bihar",
    aspectRatio: "landscape",
  },

  // ── Tourism ──
  {
    id: 27,
    title: "Tourist Trail — Rajgir Hills",
    image: rajgirImg,
    mediaType: "photo",
    category: "Tourism",
    photographer: "Bihar Tourism Board",
    likes: 5670,
    views: 43200,
    comments: 356,
    uploadDate: "2026-06-16",
    location: "Rajgir, Bihar",
    aspectRatio: "portrait",
  },

  // ── Architecture ──
  {
    id: 28,
    title: "Patna Sahib Gurudwara",
    image: patnaSahibImg,
    mediaType: "photo",
    category: "Architecture",
    photographer: "Harpreet Singh",
    likes: 3210,
    views: 25600,
    comments: 198,
    uploadDate: "2026-05-12",
    location: "Patna, Bihar",
    aspectRatio: "landscape",
  },
  {
    id: 29,
    title: "Pawapuri — Jal Mandir",
    image: pawapuriImg,
    mediaType: "video",
    category: "Architecture",
    photographer: "Vivek Jain",
    likes: 2890,
    views: 20100,
    comments: 167,
    uploadDate: "2026-05-08",
    location: "Nalanda, Bihar",
    duration: "4:55",
    aspectRatio: "square",
  },

  // ── Religion ──
  {
    id: 30,
    title: "Mahabodhi Temple — Sacred Dawn",
    image: bodhGayaImg,
    mediaType: "photo",
    category: "Religion",
    photographer: "Monk Ananda",
    likes: 7890,
    views: 61000,
    comments: 534,
    uploadDate: "2026-04-28",
    location: "Bodh Gaya, Bihar",
    aspectRatio: "portrait",
  },
];
