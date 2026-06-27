import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

const tribesList = [
  {
    id: "santhal",
    hindiName: "संथाल",
    englishName: "Santhal Tribe",
    shortDesc: "The largest indigenous tribe of India, known for their deep connection to nature.",
    image: "/images/tribals/santhal.png" // We can use the original with background for the card preview
  },
  {
    id: "oraon",
    hindiName: "उरांव",
    englishName: "Oraon Tribe",
    shortDesc: "Celebrated for progressive agricultural practices and dynamic community life.",
    image: "/images/tribals/oraon_tribe_1782405740193.png" // We can just use the cropped images for cards later, or the full images with object-cover
  },
  {
    id: "munda",
    hindiName: "मुंडा",
    englishName: "Munda Tribe",
    shortDesc: "Famous for their rich history of rebellion and vibrant hunting and agricultural festivals.",
    image: "/images/tribals/munda.png"
  },
  {
    id: "kharwar",
    hindiName: "खरवार",
    englishName: "Kharwar Tribe",
    shortDesc: "A martial tribe known for their resilience and deep connection to the land.",
    image: "/images/tribals/kharwar.png"
  },
  {
    id: "tharu",
    hindiName: "थारू",
    englishName: "Tharu Tribe",
    shortDesc: "Residing in the Champaran region, known for their unique architecture and malaria resistance.",
    image: "/images/tribals/tharu.png"
  },
  {
    id: "gond",
    hindiName: "गोंड",
    englishName: "Gond Tribe",
    shortDesc: "Found in Siwan and Kaimur, world-renowned for their vibrant, nature-inspired dot art.",
    image: "/images/tribals/gond.png"
  },
  {
    id: "asur",
    hindiName: "आदिवासी",
    englishName: "Asur Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/asur.png"
  },
  {
    id: "baiga",
    hindiName: "आदिवासी",
    englishName: "Baiga Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/baiga.png"
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
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/kora.png"
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
