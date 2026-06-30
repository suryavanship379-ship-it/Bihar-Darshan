import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Award, ShieldCheck, Star, Compass, Play, ChevronDown, ChevronUp } from "lucide-react";

interface ContactDetails {
  mobile: string;
  email: string;
  website: string;
  Guide: String;
}

interface Trip {
  id: number;
  name: string;
  provider: string;
  departureCity: string;
  placesIncluded: string[];
  description: string;
  contactDetails: ContactDetails;
  image: string;
  videoUrl?: string;
  duration: string;
  rating: number;
}

const trips: Trip[] = [
  {
    id: 1,
    name: "Sacred Buddhist Pilgrimage",
    provider: "Magadh Heritage Travels",
    departureCity: "Patna",
    placesIncluded: ["Gaya", "Nalanda", "Rajgir", "Vaishali"],
    description: "A profound spiritual journey through the roots of Buddhism. Walk the path of enlightenment where Prince Siddhartha became Buddha. From the Bodhi tree in Gaya to the ancient ruins of Nalanda University, witness the cradle of human knowledge and spirituality.",
    contactDetails: {
      Guide: "Vihan Gupta",
      mobile: "+91 98765 43210",
      email: "tours@magadhheritage.com",
      website: "www.magadhheritage.com"
    },
    image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "5 Days / 4 Nights",
    rating: 4.9
  },
  {
    id: 2,
    name: "Mithila Art & Heritage Trail",
    provider: "Mithila Cultural Tours",
    departureCity: "Darbhanga",
    placesIncluded: ["Madhubani", "Darbhanga", "Sitamari", "Rajnagar"],
    description: "Immerse yourself in the vibrant world of Mithila. This tour takes you deep into the heart of Madhubani painting villages, where every wall tells a story. Visit magnificent Darbhanga palaces and the birthplace of Goddess Sita, experiencing the unique blend of art and devotion.",
    contactDetails: {
      Guide: "Rishabh Singh",
      mobile: "+91 87654 32109",
      email: "explore@mithilatours.in",
      website: "www.mithilatours.in"
    },
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
    duration: "4 Days / 3 Nights",
    rating: 4.8
  },
  {
    id: 3,
    name: "Indo-Nepal Terai Wildlife Expedition",
    provider: "Vishwa Shanti Expeditions",
    departureCity: "Bettiah",
    placesIncluded: ["Valmiki Tiger Reserve", "Kaimur Hills", "Gandak River"],
    description: "Explore the wild frontier of Bihar. Valmiki Tiger Reserve offers a rare glimpse into the untouched Terai ecosystems. Spot majestic Bengal tigers, rare rhinos, and hundreds of bird species while trekking through dense forests and navigating the serene Gandak river.",
    contactDetails: {
      Guide: "Rohan Sharma",
      mobile: "+91 76543 21098",
      email: "wild@vishwashanti.com",
      website: "www.vishwashanti.com"
    },
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1200&auto=format&fit=crop",
    duration: "3 Days / 2 Nights",
    rating: 4.9
  },
  {
    id: 4,
    name: "Royal Pataliputra Heritage Walk",
    provider: "Patna City Walkers",
    departureCity: "Patna",
    placesIncluded: ["Golghar", "Patna Sahib", "Bihar Museum", "Kumhrar"],
    description: "Discover the layers of history in one of the world's oldest continuously inhabited cities. From the Mauryan ruins of Kumhrar to the spiritual aura of Takht Sri Patna Sahib, this curated walk explores the evolution of Patna from an ancient capital to a modern hub.",
    contactDetails: {
      Guide: "Naman Ojha",
      mobile: "+91 65432 10987",
      email: "walk@patnacity.com",
      website: "www.patnacity.com"
    },
    image: "https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?q=80&w=1200&auto=format&fit=crop",
    duration: "1 Day Intensive",
    rating: 4.7
  }
];

const TourismSection = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-20 px-6 sm:px-10 bg-brand-gray min-h-screen relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-brand-gold/5 blur-[150px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-brand-gold/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">


        {/* Vertical Grid Trip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 items-start">
          {trips.map((trip, idx) => (
            <motion.div
              key={trip.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_40px_90px_-15px_rgba(0,0,0,0.12)] transition-all duration-700"
            >
              {/* Media Section - TOP IMAGE */}
              <div className="relative overflow-hidden aspect-[4/3] w-full">
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent opacity-60" />

                {/* Floating Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-white/20 flex items-center gap-2">
                    <Star size={14} className="fill-brand-gold text-brand-gold" />
                    <span className="text-[10px] font-bold text-brand-dark uppercase tracking-wider">{trip.rating}</span>
                  </div>
                  {/* <div className="bg-brand-dark/80 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-white/10 flex items-center gap-2 text-white"> */}
                    {/* <Compass size={14} className="text-brand-gold" /> */}
                    {/* <span className="text-[10px] font-bold uppercase tracking-wider">{idx === 0 ? "Bestseller"}</span> */}
                  {/* </div> */}
                  {trip.videoUrl && (
                    <div className="bg-brand-gold/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-brand-gold/20 flex items-center gap-2 text-brand-dark">
                      <Play size={10} className="fill-current" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Video Tour</span>
                    </div>
                  )}
                </div>

                {/* Play Video Button if exists */}
                {trip.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white group/play shadow-2xl"
                    >
                      <div className="h-11 w-11 rounded-full bg-brand-gold flex items-center justify-center shadow-lg group-hover/play:bg-white group-hover/play:text-brand-gold transition-colors duration-500 pl-0.5">
                        <Play size={18} className="fill-current" />
                      </div>
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-1 relative">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-brand-gold mb-3">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{trip.duration}</span>
                  </div>

                  <h3 className="text-2xl font-serif text-brand-dark mb-3 group-hover:text-brand-gold transition-colors duration-500 leading-tight line-clamp-2">
                    {trip.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 w-fit">
                      <Award size={14} className="text-brand-gold" />
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{trip.provider}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-brand-gold/5 px-3 py-1.5 rounded-full border border-brand-gold/10 w-fit">
                      <MapPin size={14} className="text-brand-gold" />
                      <span className="text-[11px] font-bold text-brand-gold uppercase tracking-wider">From {trip.departureCity}</span>
                    </div>
                  </div>

                  {/* Expandable Details Section */}
                  <AnimatePresence>
                    {expandedId === trip.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 pt-6 border-t border-gray-50">
                          <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">
                            "{trip.description}"
                          </p>
                          <div className="flex items-start gap-3">
                            <div className="h-9 w-9 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
                              <MapPin size={16} className="text-brand-gold" />
                            </div>
                            <div>
                              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Destinations</p>
                              <p className="text-[13px] font-bold text-brand-dark line-clamp-1">{trip.placesIncluded.join(", ")}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="h-9 w-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                              <Phone size={14} className="text-brand-gold" />
                            </div>
                            <div className="flex-1">
                              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Contact Partner</p>
                              <div className="space-y-1">
                                <p className="text-[13px] font-bold text-brand-dark flex items-center gap-2">
                                  <span className="text-[10px] text-gray-400 font-bold uppercase w-10">Guide:</span> {trip.contactDetails.Guide}
                                </p>
                                <p className="text-[13px] font-bold text-brand-dark flex items-center gap-2">
                                  <span className="text-[10px] text-gray-400 font-bold uppercase w-10">Call:</span> {trip.contactDetails.mobile}
                                </p>
                                <p className="text-[13px] font-bold text-brand-dark flex items-center gap-2">
                                  <span className="text-[10px] text-gray-400 font-bold uppercase w-10">Email:</span> {trip.contactDetails.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => toggleExpand(trip.id)}
                    className="w-full h-14 rounded-xl border-2 border-brand-dark/5 bg-gray-50/50 text-brand-dark font-bold text-[11px] uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-all duration-500 flex items-center justify-center gap-2 group/btn"
                  >
                    {expandedId === trip.id ? (
                      <>
                        Read Less
                        <ChevronUp size={16} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                      </>
                    ) : (
                      <>
                        Read More
                        <ChevronDown size={16} className="group-hover/btn:translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TourismSection;
