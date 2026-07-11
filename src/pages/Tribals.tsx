import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

export const tribesList = [
  {
    id: "santhal",
    hindiName: "संथाल",
    englishName: "Santhal Tribe",
    shortDesc: "The largest indigenous tribe of India, known for their deep connection to nature.",
    image: "/images/tribals/santhal.png",
    leftTitle: "Cultural Roots",
    leftDesc: "Santhal culture is deeply rooted in nature. They revere \"Marang Buru\" (the supreme deity) and celebrate agricultural festivals like \"Sohrai\" and \"Baha\" with vibrant rhythmic dances, accompanied by traditional instruments like the Madal and Tiriao (flute).",
    rightTitle: "Attire & Art",
    rightDesc: "Traditional Santhal women wear the 'Santhali Sari', draped elegantly, while men wear the 'Panche'. They are renowned for \"Jadopatia\" paintings and intricate wall art (Bhitti Chitra), using natural dyes to depict folklore and daily tribal life.",
    bottomDesc: "\"Their society is famously egalitarian. Santhal villages are governed by a unique council system led by a 'Manjhi Haram' (village headman), emphasizing community consensus.\""
  },
  {
    id: "oraon",
    hindiName: "उरांव",
    englishName: "Oraon Tribe",
    shortDesc: "Celebrated for progressive agricultural practices and dynamic community life.",
    image: "/images/tribals/oraon_tribe_1782405740193.png",
    leftTitle: "Dharmes & Sarnaism",
    leftDesc: "The Oraon traditionally follow Sarnaism, centering around the worship of nature. Their supreme deity is \"Dharmes,\" associated with the sun. Sacred groves called \"Sarna\" serve as their central places of worship.",
    rightTitle: "Youth Dormitories",
    rightDesc: "A distinct feature of Oraon society is the \"Dhumkuria\" (youth dormitory). It acts as a training ground where unmarried youth learn traditional songs, dances, folklore, and the social and religious customs of the tribe.",
    bottomDesc: "\"Festivals like 'Karam' and 'Sarhul' are celebrated with massive communal dances. The traditional Oraon dance often features rhythmic footwork perfectly synchronized to the beat of the 'Mandar' drum.\""
  },
  {
    id: "munda",
    hindiName: "मुंडा",
    englishName: "Munda Tribe",
    shortDesc: "Famous for their rich history of rebellion and vibrant hunting and agricultural festivals.",
    image: "/images/tribals/munda.png",
    leftTitle: "Sarna & Singbonga",
    leftDesc: "The Mundas believe in 'Singbonga', the Sun God. Their religious practices are deeply intertwined with nature, centered around sacred groves called 'Sarna' where they perform rituals.",
    rightTitle: "Akhra & Music",
    rightDesc: "The 'Akhra' is the village dancing ground and meeting place. Munda culture is rich in folk songs and dances like 'Jadur' and 'Mage', accompanied by traditional instruments like the Nagara.",
    bottomDesc: "\"The Munda rebellion, known as the 'Ulgulan' (The Great Tumult) led by Birsa Munda in the late 19th century, is a defining moment in India's struggle against British colonial rule.\""
  },
  {
    id: "kharwar",
    hindiName: "खरवार",
    englishName: "Kharwar Tribe",
    shortDesc: "A martial tribe known for their resilience and deep connection to the land.",
    image: "/images/tribals/kharwar.png",
    leftTitle: "Martial Heritage",
    leftDesc: "Historically, the Kharwars were known for their martial skills and bravery. They claim descent from the Suryavanshi Rajputs and have a strong code of honor and truthfulness.",
    rightTitle: "Baiga & Rituals",
    rightDesc: "Their religious life involves worshipping nature spirits and ancestors. The 'Baiga' (village priest) plays a crucial role in performing rituals and appeasing local deities to protect the village.",
    bottomDesc: "\"Despite their martial past, modern Kharwars are primarily peaceful agriculturists, though they retain their fierce independence and strong community bonds.\""
  },
  {
    id: "tharu",
    hindiName: "थारू",
    englishName: "Tharu Tribe",
    shortDesc: "Residing in the Champaran region, known for their unique architecture and malaria resistance.",
    image: "/images/tribals/tharu.png",
    leftTitle: "Forest Dwellers",
    leftDesc: "The Tharu people have lived in the malarial Terai region for centuries. They have developed a unique genetic resistance to malaria, allowing them to thrive in these dense forests.",
    rightTitle: "Matriarchal Influence",
    rightDesc: "Tharu society has strong matriarchal elements. Women hold significant decision-making power within the household and play a crucial role in agriculture and the local economy.",
    bottomDesc: "\"Their traditional mud houses, adorned with beautiful murals, are designed to be cool in the sweltering heat of the Terai, reflecting their deep understanding of their environment.\""
  },
  {
    id: "gond",
    hindiName: "गोंड",
    englishName: "Gond Tribe",
    shortDesc: "Found in Siwan and Kaimur, world-renowned for their vibrant, nature-inspired dot art.",
    image: "/images/tribals/gond.png",
    leftTitle: "Gond Art & Creativity",
    leftDesc: "Gond art is a famous tribal art form featuring intricate patterns and vibrant colors. It vividly depicts flora, fauna, and their deep spiritual connection with nature.",
    rightTitle: "Spiritual Beliefs",
    rightDesc: "The Gond people worship 'Bara Deo' as their supreme deity. They strongly believe that viewing good images brings good luck, which inspires their extensive wall and floor paintings.",
    bottomDesc: "\"Their rich oral traditions include the Gondi language and fascinating folk tales that are passed down through generations by community storytellers called Pardhans.\""
  },
  {
    id: "asur",
    hindiName: "आदिवासी",
    englishName: "Asur Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/asur.png",
    leftTitle: "Ancient Iron Smelters",
    leftDesc: "The Asur tribe has a fascinating history as traditional iron smelters. For centuries, they extracted iron from laterite rocks using indigenous, highly advanced techniques.",
    rightTitle: "Cultural Identity",
    rightDesc: "Though their traditional occupation is declining, they maintain a distinct cultural identity through their unique language, Asuri, and specific animistic rituals.",
    bottomDesc: "\"Preserving their ancient metallurgical knowledge and distinct folklore remains a critical challenge for the Asur community in the modern era.\""
  },
  {
    id: "baiga",
    hindiName: "आदिवासी",
    englishName: "Baiga Tribe",
    shortDesc: "A forest-dwelling community with immense knowledge of medicinal plants and herbs.",
    image: "/images/tribals/baiga.png",
    leftTitle: "Masters of the Forest",
    leftDesc: "The Baiga are deeply connected to the forest ecosystems. They are renowned for their exceptional knowledge of medicinal herbs and traditional healing practices.",
    rightTitle: "Shifting Cultivation",
    rightDesc: "Traditionally, they practiced 'Bewar' (shifting cultivation) and avoided ploughing the earth out of respect, though modern restrictions have forced changes in their lifestyle.",
    bottomDesc: "\"Tattooing is a vital part of Baiga culture, especially for women, who receive elaborate geometric tattoos throughout different stages of their lives.\""
  },
  {
    id: "banjara",
    hindiName: "आदिवासी",
    englishName: "Banjara Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/banjara.png"
  },
  {
    id: "bathudi",
    hindiName: "आदिवासी",
    englishName: "Bathudi Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/bathudi.png"
  },
  {
    id: "beriya",
    hindiName: "आदिवासी",
    englishName: "Beriya Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/beriya.png"
  },
  {
    id: "bhejiya",
    hindiName: "आदिवासी",
    englishName: "Bhejiya Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/bhejiya.png"
  },
  {
    id: "bhumij",
    hindiName: "आदिवासी",
    englishName: "Bhumij Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/bhumij.png"
  },
  {
    id: "binjhia",
    hindiName: "आदिवासी",
    englishName: "Binjhia Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/binjhia.png"
  },
  {
    id: "birhor",
    hindiName: "आदिवासी",
    englishName: "Birhor Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/birhor.png"
  },
  {
    id: "birjia",
    hindiName: "आदिवासी",
    englishName: "Birjia Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/birjia.png"
  },
  {
    id: "chero",
    hindiName: "आदिवासी",
    englishName: "Chero Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/chero.png"
  },
  {
    id: "chickbaraik",
    hindiName: "आदिवासी",
    englishName: "Chick Baraik Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/chickbaraik.png"
  },
  {
    id: "gorait",
    hindiName: "आदिवासी",
    englishName: "Gorait Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/gorait.png"
  },
  {
    id: "ho",
    hindiName: "आदिवासी",
    englishName: "Ho Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/ho.png"
  },
  {
    id: "karmali",
    hindiName: "आदिवासी",
    englishName: "Karmali Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/karmali.png"
  },
  {
    id: "kharia",
    hindiName: "आदिवासी",
    englishName: "Kharia Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/kharia.png"
  },
  {
    id: "khond",
    hindiName: "आदिवासी",
    englishName: "Khond Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/khond.png"
  },
  {
    id: "kisan",
    hindiName: "आदिवासी",
    englishName: "Kisan Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/kisan.png"
  },
  {
    id: "kora",
    hindiName: "आदिवासी",
    englishName: "Kora Tribe",
    shortDesc: "Known for their rich folklore and traditional earth-working skills in rural areas.",
    image: "/images/tribals/kora.png",
    leftTitle: "Earth Workers",
    leftDesc: "Historically, the Kora tribe specialized in earth-working, digging tanks, and constructing embankments. They have a profound, practical understanding of the local soil and terrain.",
    rightTitle: "Festivals & Deities",
    rightDesc: "Their religious calendar is filled with festivals honoring local deities and nature spirits, accompanied by communal feasts and traditional music.",
    bottomDesc: "\"The Kora community relies strongly on community cohesion and continues to celebrate their rich oral folklore despite modern economic challenges.\""
  },
  {
    id: "korba",
    hindiName: "आदिवासी",
    englishName: "Korba Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/korba.png"
  },
  {
    id: "loharalohra",
    hindiName: "आदिवासी",
    englishName: "Lohara/Lohra Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/loharalohra.png"
  },
  {
    id: "mahli",
    hindiName: "आदिवासी",
    englishName: "Mahli Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/mahli.png"
  },
  {
    id: "malpahariya",
    hindiName: "आदिवासी",
    englishName: "Mal Pahariya Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/malpahariya.png"
  },
  {
    id: "parhaiya",
    hindiName: "आदिवासी",
    englishName: "Parhaiya Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/parhaiya.png"
  },
  {
    id: "sauriapaharia",
    hindiName: "आदिवासी",
    englishName: "Sauria Paharia Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/sauriapaharia.png"
  },
  {
    id: "savar",
    hindiName: "आदिवासी",
    englishName: "Savar Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/savar.png"
  }
];



const Tribals = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTribes = tribesList.filter(tribe =>
    tribe.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tribe.hindiName.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#f4ebd0] text-[#3e2723] font-sans overflow-x-hidden selection:bg-[#D4A017] selection:text-white relative">
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

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-6 inline-block"
            >
              <span className="px-4 py-1.5 rounded-full border border-[#3e2723]/20 bg-[#e8dec0]/80 text-[#5d4037] text-sm tracking-[0.2em] font-medium uppercase backdrop-blur-md shadow-sm">
                Indigenous Heritage
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#3e2723] tracking-wide mb-4 font-bold"
            >
              Tribes of <span className="text-[#D4A017]">Bihar</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl md:text-4xl text-[#5d4037] font-signature italic mb-8"
            >
              आदिवासी
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-[#4e342e] max-w-2xl leading-relaxed mx-auto md:mx-0"
            >
              Discover the rich, ancient cultures, arts, and traditions of Bihar's indigenous communities. Explore their vibrant legacy and unbreakable bond with nature.
            </motion.p>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex-1 w-full flex justify-center relative"
          >
            <div className="relative w-full max-w-md aspect-square rounded-full bg-[#e8dec0]/60 border border-[#3e2723]/10 shadow-xl overflow-hidden flex items-center justify-center p-8 backdrop-blur-md group">
              <div className="absolute inset-0 bg-[#D4A017]/10 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700" />
              <img
                src="/images/tribals/santhal_nobg.png"
                alt="Tribal Heritage"
                className="relative z-10 w-full h-full object-contain hover:scale-105 transition-transform duration-700 drop-shadow-xl opacity-90 hover:opacity-100"
                onError={(e) => {
                  e.currentTarget.src = "/images/tribals/santhal.png";
                }}
              />
            </div>
          </motion.div>
        </section>

        {/* Search & Filter */}
        <section className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto mb-16 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="relative max-w-md mx-auto"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#5d4037]" />
            </div>
            <input
              type="text"
              placeholder="Search tribes by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#e8dec0]/60 border border-[#3e2723]/20 text-[#3e2723] rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent transition-all backdrop-blur-md placeholder:text-[#5d4037]/70 shadow-sm"
            />
          </motion.div>
        </section>

        {/* Directory Grid */}
        <section className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto pb-32">
          {filteredTribes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredTribes.map((tribe, index) => (
                <motion.div
                  key={tribe.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1, margin: "50px" }}
                  transition={{ delay: (index % 4) * 0.05, duration: 0.4 }}
                >
                  <Link to={`/tribals/${tribe.id}`} className="block group h-full">
                    <div className="h-full bg-[#e8dec0]/80 rounded-3xl overflow-hidden border border-[#3e2723]/10 group-hover:border-[#D4A017]/60 transition-all duration-500 backdrop-blur-md flex flex-col group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(62,39,35,0.15)] relative">

                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#f4ebd0]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* Image Container */}
                      <div className="relative h-56 w-full overflow-hidden flex items-center justify-center p-6 bg-white/40">
                        <div className="absolute inset-0 bg-[#D4A017]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-50" />

                        <img
                          src={tribe.image}
                          alt={tribe.englishName}
                          className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-110 drop-shadow-xl opacity-90 group-hover:opacity-100 mix-blend-multiply"
                          onError={(e) => {
                            e.currentTarget.src = `/images/tribals/${tribe.id}_nobg.png`;
                          }}
                        />
                      </div>

                      {/* Content Container */}
                      <div className="p-6 flex-grow flex flex-col relative z-20 bg-gradient-to-t from-[#e8dec0] via-[#e8dec0] to-transparent pt-8 -mt-8">
                        <div className="flex justify-between items-start mb-2">
                          <h2 className="text-xl font-serif font-bold text-[#3e2723] group-hover:text-[#D4A017] transition-colors">{tribe.englishName}</h2>
                          <span className="text-xl font-signature font-bold text-[#5d4037]">{tribe.hindiName}</span>
                        </div>
                        <p className="text-sm text-[#4e342e] line-clamp-3 mb-6 flex-grow italic">
                          {tribe.shortDesc}
                        </p>
                        <div className="flex items-center text-[#b71c1c] text-sm font-bold uppercase tracking-wider group-hover:tracking-widest transition-all mt-auto group-hover:text-[#D4A017]">
                          Explore <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#e8dec0]/80 border border-[#3e2723]/10 rounded-3xl backdrop-blur-md shadow-sm">
              <p className="text-[#4e342e] text-lg">No tribes found matching "{searchTerm}"</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-6 py-2 bg-[#3e2723]/10 text-[#3e2723] font-medium rounded-full hover:bg-[#3e2723]/20 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Tribals;
