export interface CultureItem {
  id: number;
  type: "Festival" | "Food" | "Art";
  district: string;
  image: string;
  title: string;
  description: string;
  longDescription?: string;
  featured?: boolean;
}

export const cultureData: CultureItem[] = [
  {
    id: 1,
    type: "Festival",
    district: "Patna",
    image: "/images/culture/chhath-puja.png",
    title: "Chhath Puja",
    description: "The most significant festival of Bihar dedicated to the Sun God.",
    longDescription:
      "A four-day ancient Vedic festival dedicated to Lord Surya and Chhathi Maiya. Devotees offer prayers to the setting and rising sun while standing in rivers and ponds.",
    featured: true,
  },
  {
    id: 3,
    type: "Food",
    district: "Gaya",
    image: "/images/culture/litti-chokha.png",
    title: "Litti Chokha",
    description:
      "The iconic traditional dish of Bihar loved across the country.",
    longDescription:
      "Roasted wheat balls stuffed with sattu and served with mashed vegetables flavored with mustard oil.",
    featured: true,
  },
  {
    id: 4,
    type: "Festival",
    district: "Sonepur",
    image: "/images/culture/sonepur-mela.png",
    title: "Sonepur Mela",
    description:
      "One of Asia's largest and most historic fairs held annually.",
    longDescription:
      "A centuries-old fair attracting traders, pilgrims, tourists, and cultural enthusiasts from across India.",
  },
  {
    id: 6,
    type: "Food",
    district: "Muzaffarpur",
    image: "/images/culture/shahi-lychee.png",
    title: "Shahi Lychee",
    description:
      "Juicy and aromatic lychee with GI tag recognition.",
    longDescription:
      "Muzaffarpur's Shahi Lychee is famous for its sweetness, fragrance, and superior quality.",
  },
  {
    id: 7,
    type: "Festival",
    district: "Bodh Gaya",
    image: "/images/culture/buddha-jayanti.png",
    title: "Buddha Jayanti",
    description:
      "Celebration of the birth, enlightenment, and teachings of Buddha.",
    longDescription:
      "Observed with prayers, cultural events, and ceremonies at the sacred Mahabodhi Temple.",
  },
  {
    id: 8,
    type: "Festival",
    district: "Mithila",
    image: "/images/culture/sama-chakeva.png",
    title: "Sama Chakeva",
    description:
      "Traditional Mithila festival celebrating sibling bonds.",
    longDescription:
      "Women and girls celebrate with clay idols, songs, and rituals symbolizing affection between brothers and sisters.",
  },
  {
    id: 9,
    type: "Festival",
    district: "Patna",
    image: "/images/culture/jitiya-festival.png",
    title: "Jitiya Festival",
    description:
      "Sacred fasting festival observed by mothers.",
    longDescription:
      "Women observe rigorous fasting and prayers for the health and prosperity of their children.",
  },
  {
    id: 10,
    type: "Festival",
    district: "Nalanda",
    image: "/images/culture/rajgir-mahotsav.png",
    title: "Rajgir Mahotsav",
    description:
      "A grand cultural festival showcasing Bihar's heritage.",
    longDescription:
      "Features folk music, dance performances, handicrafts, and local cuisine in the historic city of Rajgir.",
  },
  {
    id: 11,
    type: "Festival",
    district: "Vaishali",
    image: "/images/culture/vaishali-mahotsav.png",
    title: "Vaishali Mahotsav",
    description:
      "Celebration of Bihar's ancient republican heritage.",
    longDescription:
      "Held to commemorate the birth anniversary of Lord Mahavira with cultural programs and exhibitions.",
  },
  {
    id: 12,
    type: "Food",
    district: "Patna",
    image: "/images/culture/thekua.png",
    title: "Thekua",
    description:
      "Traditional sweet delicacy associated with Chhath Puja.",
    longDescription:
      "Prepared using wheat flour, jaggery, and ghee, Thekua is an essential offering during Chhath celebrations.",
  },
  {
    id: 13,
    type: "Food",
    district: "Darbhanga",
    image: "/images/culture/makhana-kheer.png",
    title: "Makhana Kheer",
    description:
      "Creamy dessert made from Bihar's famous fox nuts.",
    longDescription:
      "A delicious and nutritious dessert prepared using milk, sugar, and roasted makhana.",
  },
  {
    id: 14,
    type: "Food",
    district: "Nalanda",
    image: "/images/culture/silao-khaja.png",
    title: "Silao Khaja",
    description:
      "Layered crispy sweet famous across Bihar.",
    longDescription:
      "A GI-tagged sweet from Silao known for its flaky texture and rich taste.",
  },
  {
    id: 15,
    type: "Food",
    district: "Bhagalpur",
    image: "/images/culture/tilkut.png",
    title: "Tilkut",
    description:
      "Popular winter sweet made from sesame seeds and jaggery.",
    longDescription:
      "A traditional delicacy especially enjoyed during Makar Sankranti.",
  },
  {
    id: 16,
    type: "Food",
    district: "Gaya",
    image: "/images/culture/sattu-paratha.png",
    title: "Sattu Paratha",
    description:
      "Nutritious stuffed flatbread of Bihar.",
    longDescription:
      "Prepared using roasted gram flour and spices, served with curd and pickles.",
  },
  {
    id: 17,
    type: "Food",
    district: "Patna",
    image: "/images/culture/khurma.png",
    title: "Khurma",
    description:
      "Crunchy sweet snack enjoyed during festivals.",
    longDescription:
      "Made from flour, sugar, and ghee, Khurma is a beloved traditional sweet.",
  }
];

export const cultureStats = [
  { label: "Traditional Festivals", value: "50+" },
  { label: "Traditional Foods", value: "100+" },
  { label: "Folk Art Forms", value: "15+" },
  { label: "Years of Heritage", value: "3000+" }
];