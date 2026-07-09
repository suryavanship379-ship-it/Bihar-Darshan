import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import LatestArticlesSection from '../components/tribals/LatestArticlesSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const tribesData: Record<string, any> = {
  santhal: {
    hindiName: "संथाल",
    englishName: "Santhal Tribe",
    description: "The Santhal are the largest and one of the oldest indigenous tribes of India, known for their deep connection to nature and vibrant artistic traditions.",
    image: "/images/tribals/santhal_nobg.png",
    leftTitle: "Cultural Roots",
    leftDesc: "Santhal culture is deeply rooted in nature. They revere \"Marang Buru\" (the supreme deity) and celebrate agricultural festivals like \"Sohrai\" and \"Baha\" with vibrant rhythmic dances, accompanied by traditional instruments like the Madal and Tiriao (flute).",
    rightTitle: "Attire & Art",
    rightDesc: "Traditional Santhal women wear the 'Santhali Sari', draped elegantly, while men wear the 'Panche'. They are renowned for \"Jadopatia\" paintings and intricate wall art (Bhitti Chitra), using natural dyes to depict folklore and daily tribal life.",
    bottomDesc: "\"Their society is famously egalitarian. Santhal villages are governed by a unique council system led by a 'Manjhi Haram' (village headman), emphasizing community consensus.\""
  },
  oraon: {
    hindiName: "उरांव",
    englishName: "Oraon Tribe",
    description: "Also known as Kurukh, the Oraon tribe is celebrated for their progressive agricultural practices, deep-rooted animistic traditions, and dynamic community life.",
    image: "/images/tribals/oraon_nobg.png",
    leftTitle: "Dharmes & Sarnaism",
    leftDesc: "The Oraon traditionally follow Sarnaism, centering around the worship of nature. Their supreme deity is \"Dharmes,\" associated with the sun. Sacred groves called \"Sarna\" serve as their central places of worship.",
    rightTitle: "Youth Dormitories",
    rightDesc: "A distinct feature of Oraon society is the \"Dhumkuria\" (youth dormitory). It acts as a training ground where unmarried youth learn traditional songs, dances, folklore, and the social and religious customs of the tribe.",
    bottomDesc: "\"Festivals like 'Karam' and 'Sarhul' are celebrated with massive communal dances. The traditional Oraon dance often features rhythmic footwork perfectly synchronized to the beat of the 'Mandar' drum.\""
  },
  munda: {
    hindiName: "मुंडा",
    englishName: "Munda Tribe",
    description: "Famous for their rich history of rebellion and vibrant hunting and agricultural festivals. The legendary tribal freedom fighter Birsa Munda belongs to this community.",
    image: "/images/tribals/munda_nobg.png",
    leftTitle: "Sarna & Singbonga",
    leftDesc: "The Mundas believe in 'Singbonga', the Sun God. Their religious practices are deeply intertwined with nature, centered around sacred groves called 'Sarna' where they perform rituals.",
    rightTitle: "Akhra & Music",
    rightDesc: "The 'Akhra' is the village dancing ground and meeting place. Munda culture is rich in folk songs and dances like 'Jadur' and 'Mage', accompanied by traditional instruments like the Nagara.",
    bottomDesc: "\"The Munda rebellion, known as the 'Ulgulan' (The Great Tumult) led by Birsa Munda in the late 19th century, is a defining moment in India's struggle against British colonial rule.\""
  },
  kharwar: {
    hindiName: "खरवार",
    englishName: "Kharwar Tribe",
    description: "A martial tribe known for their resilience, truthfulness, and deep connection to the land. They are primarily agriculturists with a rich oral tradition.",
    image: "/images/tribals/kharwar_nobg.png",
    leftTitle: "Martial Heritage",
    leftDesc: "Historically, the Kharwars were known for their martial skills and bravery. They claim descent from the Suryavanshi Rajputs and have a strong code of honor and truthfulness.",
    rightTitle: "Baiga & Rituals",
    rightDesc: "Their religious life involves worshipping nature spirits and ancestors. The 'Baiga' (village priest) plays a crucial role in performing rituals and appeasing local deities to protect the village.",
    bottomDesc: "\"Despite their martial past, modern Kharwars are primarily peaceful agriculturists, though they retain their fierce independence and strong community bonds.\""
  },
  tharu: {
    hindiName: "थारू",
    englishName: "Tharu Tribe",
    description: "Residing primarily in the Terai region, specifically the West Champaran district of Bihar. Known for their unique architecture, matriarchal influences, and incredible malaria resistance.",
    image: "/images/tribals/tharu_nobg.png",
    leftTitle: "Terai Dwellers",
    leftDesc: "The Tharu have lived in the malarial Terai forests for centuries, developing a genetic resistance to malaria. Their culture is uniquely adapted to this forest-marsh ecosystem.",
    rightTitle: "Art & Architecture",
    rightDesc: "Tharu women are highly skilled in creating intricate, colorful baskets and decorating the mud walls of their homes with beautiful traditional murals and reliefs.",
    bottomDesc: "\"Tharu society has strong matriarchal elements. Women play a dominant role in household management, and their traditional attire is noted for its vibrant colors and heavy silver jewelry.\""
  },
  gond: {
    hindiName: "गोंड",
    englishName: "Gond Tribe",
    description: "One of the largest tribal groups in India, with significant populations in Bihar's Siwan, Bhojpur, and Kaimur districts. Renowned for their vibrant art and deep connection to nature.",
    image: "/images/tribals/gond_nobg.png",
    leftTitle: "Gondwana Heritage",
    leftDesc: "The Gonds trace their lineage back to the ancient kingdom of Gondwana. Their society is highly structured, and their language, Gondi, belongs to the Dravidian language family.",
    rightTitle: "Gond Art & Beliefs",
    rightDesc: "Gond art is world-famous. It is characterized by vibrant colors and intricate patterns of dots and lines, usually depicting local flora, fauna, and their primary deities like 'Bara Deo'.",
    bottomDesc: "\"The Gonds believe that viewing a good image brings good luck. This belief has fueled their rich tradition of decorating their houses and floors with elaborate traditional motifs.\""
  },
  asur: {
    hindiName: "आदिवासी",
    englishName: "Asur Tribe",
    description: "The Asur is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/asur_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Asur have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Asur are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Asur.\""
  },
  baiga: {
    hindiName: "आदिवासी",
    englishName: "Baiga Tribe",
    description: "The Baiga is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/baiga_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Baiga have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Baiga are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Baiga.\""
  },
  banjara: {
    hindiName: "आदिवासी",
    englishName: "Banjara Tribe",
    description: "The Banjara is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/banjara_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Banjara have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Banjara are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Banjara.\""
  },
  bathudi: {
    hindiName: "आदिवासी",
    englishName: "Bathudi Tribe",
    description: "The Bathudi is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/bathudi_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Bathudi have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Bathudi are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Bathudi.\""
  },
  beriya: {
    hindiName: "आदिवासी",
    englishName: "Beriya Tribe",
    description: "The Beriya is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/beriya_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Beriya have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Beriya are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Beriya.\""
  },
  bhejiya: {
    hindiName: "आदिवासी",
    englishName: "Bhejiya Tribe",
    description: "The Bhejiya is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/bhejiya_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Bhejiya have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Bhejiya are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Bhejiya.\""
  },
  bhumij: {
    hindiName: "आदिवासी",
    englishName: "Bhumij Tribe",
    description: "The Bhumij is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/bhumij_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Bhumij have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Bhumij are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Bhumij.\""
  },
  binjhia: {
    hindiName: "आदिवासी",
    englishName: "Binjhia Tribe",
    description: "The Binjhia is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/binjhia_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Binjhia have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Binjhia are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Binjhia.\""
  },
  birhor: {
    hindiName: "आदिवासी",
    englishName: "Birhor Tribe",
    description: "The Birhor is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/birhor_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Birhor have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Birhor are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Birhor.\""
  },
  birjia: {
    hindiName: "आदिवासी",
    englishName: "Birjia Tribe",
    description: "The Birjia is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/birjia_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Birjia have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Birjia are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Birjia.\""
  },
  chero: {
    hindiName: "आदिवासी",
    englishName: "Chero Tribe",
    description: "The Chero is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/chero_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Chero have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Chero are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Chero.\""
  },
  chickbaraik: {
    hindiName: "आदिवासी",
    englishName: "Chick Baraik Tribe",
    description: "The Chick Baraik is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/chickbaraik_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Chick Baraik have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Chick Baraik are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Chick Baraik.\""
  },
  gorait: {
    hindiName: "आदिवासी",
    englishName: "Gorait Tribe",
    description: "The Gorait is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/gorait_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Gorait have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Gorait are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Gorait.\""
  },
  ho: {
    hindiName: "आदिवासी",
    englishName: "Ho Tribe",
    description: "The Ho is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/ho_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Ho have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Ho are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Ho.\""
  },
  karmali: {
    hindiName: "आदिवासी",
    englishName: "Karmali Tribe",
    description: "The Karmali is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/karmali_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Karmali have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Karmali are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Karmali.\""
  },
  kharia: {
    hindiName: "आदिवासी",
    englishName: "Kharia Tribe",
    description: "The Kharia is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/kharia_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Kharia have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Kharia are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Kharia.\""
  },
  khond: {
    hindiName: "आदिवासी",
    englishName: "Khond Tribe",
    description: "The Khond is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/khond_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Khond have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Khond are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Khond.\""
  },
  kisan: {
    hindiName: "आदिवासी",
    englishName: "Kisan Tribe",
    description: "The Kisan is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/kisan_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Kisan have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Kisan are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Kisan.\""
  },
  kora: {
    hindiName: "आदिवासी",
    englishName: "Kora Tribe",
    description: "The Kora is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/kora_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Kora have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Kora are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Kora.\""
  },
  korba: {
    hindiName: "आदिवासी",
    englishName: "Korba Tribe",
    description: "The Korba is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/korba_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Korba have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Korba are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Korba.\""
  },
  loharalohra: {
    hindiName: "आदिवासी",
    englishName: "Lohara/Lohra Tribe",
    description: "The Lohara/Lohra is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/loharalohra_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Lohara/Lohra have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Lohara/Lohra are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Lohara/Lohra.\""
  },
  mahli: {
    hindiName: "आदिवासी",
    englishName: "Mahli Tribe",
    description: "The Mahli is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/mahli_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Mahli have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Mahli are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Mahli.\""
  },
  malpahariya: {
    hindiName: "आदिवासी",
    englishName: "Mal Pahariya Tribe",
    description: "The Mal Pahariya is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/malpahariya_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Mal Pahariya have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Mal Pahariya are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Mal Pahariya.\""
  },
  parhaiya: {
    hindiName: "आदिवासी",
    englishName: "Parhaiya Tribe",
    description: "The Parhaiya is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/parhaiya_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Parhaiya have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Parhaiya are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Parhaiya.\""
  },
  sauriapaharia: {
    hindiName: "आदिवासी",
    englishName: "Sauria Paharia Tribe",
    description: "The Sauria Paharia is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/sauriapaharia_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Sauria Paharia have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Sauria Paharia are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Sauria Paharia.\""
  },
  savar: {
    hindiName: "आदिवासी",
    englishName: "Savar Tribe",
    description: "The Savar is officially recognized as one of the 32 Scheduled Tribes in Bihar. Further anthropological details and history will be documented in upcoming expeditions.",
    image: "/images/tribals/savar_nobg.png",
    leftTitle: "Cultural Heritage",
    leftDesc: "Like many indigenous communities, the Savar have a rich oral tradition, unique customs, and a deep-rooted connection to the natural environment.",
    rightTitle: "Traditional Practices",
    rightDesc: "Specific traditional practices, religious beliefs, and societal structures of the Savar are integral to the cultural tapestry of the region.",
    bottomDesc: "\"A dedicated cultural expedition is planned to fully document and beautifully illustrate the unique heritage of the Savar.\""
  }
};

const TribeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const tribe = tribesData[id || ""];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!tribe) {
    return <Navigate to="/tribals" />;
  }

  // Combined Media for the slider
  const mediaItems = [
    { type: 'image', src: `/images/tribals/${id}.png` },
    { type: 'image', src: `/images/tribals/${id}_nobg.png` },
    { type: 'image', src: '/images/tribals/necklace_nobg.png' },
    { type: 'video', src: `/images/tribals/${id}.png` },
    { type: 'image', src: '/images/tribals/bow_nobg.png' },
    { type: 'video', src: '/images/tribals/generic.png' },
  ];

  return (
    <div className="min-h-screen bg-[#f4ebd0] text-[#3e2723] font-serif overflow-x-hidden relative">
      <Navbar />

      {/* Global Parchment Background Texture */}
      <div
        className="fixed inset-0 z-0 opacity-100 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "url('/images/tribals/parchment_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Main Content Wrapper */}
      <div className="relative z-10 pt-32 pb-20 max-w-[1400px] mx-auto px-4 sm:px-8">

        {/* Back Button */}
        <div className="mb-12">
          <Link to="/tribals" className="inline-flex items-center text-[#5d4037] hover:text-[#3e2723] font-bold tracking-widest uppercase transition-colors">
            <span className="mr-2">←</span> Back to Directory
          </Link>
        </div>

        {/* Decorative Elements */}
        <motion.img
          initial={{ opacity: 0, rotate: -20 }} animate={{ opacity: 0.6, rotate: -10 }} transition={{ duration: 1 }}
          src="/images/tribals/bow_nobg.png" className="absolute top-40 right-4 lg:right-20 w-32 lg:w-48 object-contain z-0 mix-blend-multiply pointer-events-none" alt=""
        />
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.5, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
          src="/images/tribals/fish_nobg.png" className="absolute top-[80vh] left-4 lg:left-12 w-24 lg:w-36 object-contain z-0 mix-blend-multiply pointer-events-none" alt=""
        />

        {/* Tribe Section */}
        <div className="relative flex flex-col items-center mb-16 mt-8">

          {/* Header Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl text-[#5d4037] mb-2 tracking-widest font-bold">{tribe.hindiName}</h2>
            <h1 className="text-5xl md:text-7xl uppercase tracking-[0.2em] text-[#3e2723] border-b border-[#3e2723]/30 pb-4 inline-block">
              {tribe.englishName}
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto italic text-[#4e342e]">
              {tribe.description}
            </p>
          </motion.div>

          {/* Infographic Layout */}
          <div className="w-full max-w-6xl mx-auto mt-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">

              {/* Left Info Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-4 flex flex-col order-2 lg:order-1 text-center lg:text-right px-4 lg:px-0"
              >
                <div className="bg-[#f4ebd0]/50 lg:bg-transparent p-6 lg:p-0 rounded-2xl lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none border border-[#3e2723]/10 lg:border-none shadow-sm lg:shadow-none lg:translate-y-8">
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-3 text-[#5d4037] border-b lg:border-b-0 lg:border-r-4 border-gold lg:pr-4 pb-2 lg:pb-0 inline-block lg:block">
                    {tribe.leftTitle}
                  </h3>
                  <p className="text-[1.05rem] leading-relaxed text-[#3e2723] mt-2 font-medium">
                    {tribe.leftDesc}
                  </p>
                </div>
              </motion.div>

              {/* Central Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-4 flex justify-center order-1 lg:order-2 px-0 lg:-mx-12 z-10"
              >
                <img
                  src={tribe.image}
                  alt={tribe.englishName}
                  className="w-full max-w-[20rem] lg:max-w-[32rem] h-auto object-contain drop-shadow-2xl my-8 lg:my-0"
                />
              </motion.div>

              {/* Right Info Column */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-4 flex flex-col order-3 text-center lg:text-left px-4 lg:px-0"
              >
                <div className="bg-[#f4ebd0]/50 lg:bg-transparent p-6 lg:p-0 rounded-2xl lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none border border-[#3e2723]/10 lg:border-none shadow-sm lg:shadow-none mt-4 lg:mt-0 lg:-translate-y-8">
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-3 text-[#5d4037] border-b lg:border-b-0 lg:border-l-4 border-gold lg:pl-4 pb-2 lg:pb-0 inline-block lg:block">
                    {tribe.rightTitle}
                  </h3>
                  <p className="text-[1.05rem] leading-relaxed text-[#3e2723] mt-2 font-medium">
                    {tribe.rightDesc}
                  </p>
                </div>
              </motion.div>

            </div>

            {/* Bottom Info Block */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl mx-auto text-center px-4 mt-8 lg:-mt-4 relative z-20"
            >
              <div className="bg-[#f4ebd0]/60 p-6 rounded-2xl border border-[#3e2723]/10 shadow-sm">
                <p className="text-[1.1rem] leading-relaxed text-[#3e2723] italic font-medium">
                  {tribe.bottomDesc}
                </p>
              </div>
            </motion.div>
          </div>
          {/* Media Slider Section */}
          <div className="w-full max-w-6xl mx-auto mt-20 mb-20 px-4 lg:px-0 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-serif font-bold text-[#5d4037] mb-2 uppercase tracking-widest border-b border-[#D4A017]/30 inline-block pb-2">
                Media & Artifacts
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-sm"
            >
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 4, spaceBetween: 24 },
                }}
                className="w-full !pb-16"
              >
                {mediaItems.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-[#e8dec0]/60 rounded-2xl overflow-hidden border border-[#3e2723]/10 shadow-sm relative group aspect-[4/5] flex items-center justify-center p-6 cursor-pointer hover:shadow-md transition-shadow">

                      {/* Subdued Glow Background */}
                      <div className="absolute inset-0 bg-[#D4A017]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-75 pointer-events-none" />

                      {item.type === 'video' ? (
                        <>
                          <img
                            src={item.src}
                            alt={`${tribe.englishName} Video ${index + 1}`}
                            className="w-full h-full object-cover absolute inset-0 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => { e.currentTarget.src = "/images/tribals/generic.png"; }}
                          />
                          <div className="absolute inset-0 bg-[#3e2723]/30 group-hover:bg-[#3e2723]/10 transition-colors duration-500 pointer-events-none" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-[#b71c1c] border-b-8 border-b-transparent ml-1" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <img
                          src={item.src}
                          alt={`${tribe.englishName} Image ${index + 1}`}
                          className="w-full h-full object-contain relative z-10 mix-blend-multiply group-hover:scale-110 transition-transform duration-700 drop-shadow-lg"
                          onError={(e) => { e.currentTarget.src = "/images/tribals/generic_nobg.png"; }}
                        />
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </div>

          {/* Latest Articles Section */}
          <LatestArticlesSection tribeName={tribe.englishName} />

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default TribeDetail;
