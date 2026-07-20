export interface TribalArticle {
  id: string;
  headline: string;
  description: string;
  image: string;
  images?: string[];
  author: string;
  tribe: string;
  publishedDate: string;
  readTime: number;
  tags: string[];
  location: string;
  /** 'admin' = created by admin, 'user' = submitted by a user */
  source?: 'admin' | 'user';
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export const tribalArticles: TribalArticle[] = [
  {
    id: "art-001",
    headline: "Youth are reviving traditional art in village Sohrai; turning tribal villages into global art villages",
    description: "In the remote villages of Ranchi district, youth are reviving the traditional Sohrai art, which was on the verge of disappearing. Through community workshops and cultural festivals, a new generation is breathing life into ancient wall-painting traditions.",
    image: "/images/articles/article_1.png",
    author: "Tribal Chronicle",
    tribe: "Santhal Tribe",
    publishedDate: "2024-05-12",
    readTime: 5,
    tags: ["Art", "Culture", "Revival"],
    location: "Ranchi, Bihar",
    source: "admin"
  },
  {
    id: "art-002",
    headline: "After painting 300-400 mud walls, earning ₹6-7 thousand per month",
    description: "Manjeet recalls his father used to paint the village walls. What started as a means of livelihood has now become an identity. Earlier, he used to get ₹300-400 per wall painting, but now the demand for authentic tribal art has skyrocketed.",
    image: "/images/articles/article_2.png",
    author: "Tribal Chronicle",
    tribe: "Oraon Tribe",
    publishedDate: "2024-05-11",
    readTime: 4,
    tags: ["Livelihood", "Art", "Economy"],
    location: "Hazaribagh, Bihar",
    source: "admin"
  },
  {
    id: "art-003",
    headline: "Tribal artists are preserving traditional art in the villages by painting walls, huts and oil tanks",
    description: "From mud walls to oil tanks, tribal artists are showcasing their traditional art in villages. This art is not just a means of earning but also a symbol of their identity and pride, keeping centuries-old traditions alive for future generations.",
    image: "/images/articles/article_3.png",
    author: "Tribal Chronicle",
    tribe: "Munda Tribe",
    publishedDate: "2024-05-10",
    readTime: 6,
    tags: ["Heritage", "Art", "Preservation"],
    location: "Gumla, Bihar",
    source: "admin"
  },
  {
    id: "art-004",
    headline: "Sohrai art brings change in lives and the picture of the village",
    description: "Sohrai art, mural paintings are not just decorations but a source of information. In 2024, this art has given a new identity to the Sohrai painting community, transforming villages into vibrant galleries of indigenous expression.",
    image: "/images/articles/article_4.png",
    author: "Tribal Chronicle",
    tribe: "Santhal Tribe",
    publishedDate: "2024-05-09",
    readTime: 5,
    tags: ["Transformation", "Art", "Community"],
    location: "Dumka, Bihar",
    source: "admin"
  },
  {
    id: "art-005",
    headline: "The Karam festival: A celebration of nature's bounty and tribal unity",
    description: "Every year, the Oraon community comes together to celebrate Karam, a festival dedicated to the Karam tree. The festival features traditional dances, songs, and rituals that have been passed down through generations, strengthening community bonds.",
    image: "/images/articles/article_5.png",
    author: "Adivasi Voice",
    tribe: "Oraon Tribe",
    publishedDate: "2024-04-28",
    readTime: 7,
    tags: ["Festival", "Culture", "Nature"],
    location: "Palamu, Bihar",
    source: "admin"
  },
  {
    id: "art-006",
    headline: "Tharu women keep basket-weaving tradition alive against all odds",
    description: "In the Terai belt of West Champaran, Tharu women continue to create intricate bamboo baskets using techniques passed down for centuries. Despite modernization, these artisans are finding new markets for their sustainable craft.",
    image: "/images/articles/article_6.png",
    author: "Heritage India",
    tribe: "Tharu Tribe",
    publishedDate: "2024-04-22",
    readTime: 5,
    tags: ["Handicraft", "Women", "Sustainability"],
    location: "West Champaran, Bihar",
    source: "admin"
  },
  {
    id: "art-007",
    headline: "Sacred Sarna groves face threat from deforestation; communities fight back",
    description: "The ancient sacred groves, central to Munda and Oraon religious practices, are under threat from encroachment and deforestation. Tribal communities across Bihar are uniting to protect these irreplaceable spiritual and ecological sanctuaries.",
    image: "/images/articles/article_7.png",
    author: "Green Tribune",
    tribe: "Munda Tribe",
    publishedDate: "2024-04-15",
    readTime: 8,
    tags: ["Environment", "Religion", "Conservation"],
    location: "Lohardaga, Bihar",
    source: "admin"
  },
  {
    id: "art-008",
    headline: "The fading beats of the Mandar: Reviving tribal musical heritage in Bihar",
    description: "The Mandar drum, once the heartbeat of every tribal celebration, is slowly losing its master craftsmen. A new initiative by young Gond musicians is working to document and teach traditional drumming techniques to the next generation.",
    image: "/images/articles/article_8.png",
    author: "Cultural Desk",
    tribe: "Gond Tribe",
    publishedDate: "2024-04-08",
    readTime: 6,
    tags: ["Music", "Heritage", "Revival"],
    location: "Kaimur, Bihar",
    source: "admin"
  }
];

// Helper to get articles for a specific tribe
export const getArticlesByTribe = (tribeName: string): TribalArticle[] => {
  return tribalArticles.filter(
    (article) => article.tribe.toLowerCase() === tribeName.toLowerCase()
  );
};

// Get all unique tribe names from articles
export const getArticleTribes = (): string[] => {
  return [...new Set(tribalArticles.map((a) => a.tribe))];
};
