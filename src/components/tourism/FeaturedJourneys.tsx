import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useContributions } from "../../data/ContributionContext";
import bodhGaya from "../../assets/bodh-gaya.png";
import nalanda from "../../assets/nalanda.png";
import patnaSahib from "../../assets/patna-sahib.png";
import vaishali from "../../assets/vaishali.png";
import valmiki from "../../assets/W.jfif"; // Placeholder for wildlife
import biharFood from "../../assets/bihar-food.png";

const originalJourneys = [
  {
    id: "1",
    image: bodhGaya,
    title: "Mahabodhi Trail",
    desc: "Walk the path of Buddha in Bodh Gaya.",
    duration: "2 Nights / 3 Days",
  },
  {
    id: "2",
    image: nalanda,
    title: "Nalanda Heritage Walk",
    desc: "Explore the glory of the ancient Nalanda University.",
    duration: "1 Day Trip",
  },
  {
    id: "3",
    image: patnaSahib,
    title: "Patna River Cruise",
    desc: "Enjoy a serene cruise on the Ganga.",
    duration: "2 Hours",
  },
  {
    id: "4",
    image: vaishali,
    title: "Vaishali Legacy Tour",
    desc: "Discover the republic city and its timeless stories.",
    duration: "1 Day Trip",
  },
  {
    id: "1", // Fallback to id 1 as there are only 4 in data
    image: valmiki,
    title: "Valmiki Wildlife Safari",
    desc: "Experience nature at its purest.",
    duration: "2 Nights / 3 Days",
  },
  {
    id: "2", // Fallback to id 2
    image: biharFood,
    title: "Bihar Food Trail",
    desc: "A journey through local flavours and traditions.",
    duration: "1 Day Trip",
  }
];

const FeaturedJourneys = () => {
  const [showAll, setShowAll] = useState(false);
  const { journeySubmissions } = useContributions();

  // Prepend user-created journeys so the newest ones show up first
  const combinedJourneys = [...journeySubmissions, ...originalJourneys];
  
  // Show only the first 3 by default, or all if showAll is true
  const displayJourneys = showAll ? combinedJourneys : combinedJourneys.slice(0, 3);

  return (
    <section className="py-24 bg-[#F8F5EF]">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-3"
            >
              <span className="text-[#c19a5b] text-[11px] font-bold uppercase tracking-[0.2em]">
                HANDPICKED EXPERIENCES
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif text-[#3e2723] flex items-center gap-4"
            >
              Featured Journeys
              <div className="hidden md:block h-[2px] w-12 bg-[#c19a5b]" />
            </motion.h2>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/tourism/create-journey" 
              className="flex items-center gap-2 text-sm font-bold text-white bg-[#c19a5b] px-6 py-2 rounded-full hover:bg-[#a8864d] transition-colors shadow-sm"
            >
              Create
            </Link>
            <button 
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 text-sm font-bold text-[#3e2723] hover:text-[#c19a5b] transition-colors border border-[#3e2723]/20 px-4 py-2 rounded-full hover:border-[#c19a5b]"
            >
              {showAll ? "Show Less" : "See all experiences"} <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayJourneys.map((trip, i) => (
            <motion.div
              key={trip.id + i.toString()}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.1, duration: 0.7, ease: "easeOut" }}
              className="h-full"
            >
              <Link 
                to={`/tourism/${trip.id}`}
                className="bg-white rounded-2xl shadow-sm border border-[#e8dfcf]/50 overflow-hidden flex flex-col h-full group hover:shadow-[0_20px_40px_-15px_rgba(62,39,35,0.15)] hover:-translate-y-2 transition-all duration-500 relative"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden shrink-0">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Bihar+Tourism'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c1e16]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col justify-center items-center text-center relative bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]">
                  <h3 className="text-2xl font-serif font-bold text-[#3e2723] group-hover:text-[#8b5a2b] transition-colors duration-300">{trip.title}</h3>
                  
                  <div className="mt-6 overflow-hidden">
                    <div className="flex items-center justify-center gap-2 text-[#8b5a2b] font-bold text-xs uppercase tracking-widest translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      View Details 
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      >
                        <ArrowRight size={14} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Animated Bottom Border */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#c19a5b] group-hover:w-full transition-all duration-700 ease-in-out" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJourneys;
