import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminData } from '../data/AdminContext';

import Container from '../components/layout/Container';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { MapPin, Utensils, PartyPopper, Search, Sparkles, User, MessageSquare } from 'lucide-react';
import { useContributions } from '../data/ContributionContext';
import { Link, useLocation } from 'react-router-dom';

// 1. ADDED: FULL LIST OF BIHAR DISTRICTS
const BIHAR_DISTRICTS = [
  "All Districts",
  "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", 
  "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", 
  "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", 
  "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", 
  "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", 
  "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
];

interface DiscoverItem {
  id: string;
  type: "Food" | "Festival" | "Personality";
  district: string;
  image: string;
  title: string;
  description: string;
  longDescription?: string;
  extendedDetails?: string[];
  submittedBy?: string;
  caption?: string;
  videoUrl?: string;
  personalityCategory?: string;
}

const Discover = () => {
  const { cultureSubmissions } = useContributions();
  const { culture: cultureData, personalities } = useAdminData();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    const cat = searchParams.get('category');
    if (cat === 'food' || cat === 'Food') return 'Food';
    if (cat === 'festival' || cat === 'Festival' || cat === 'festivals' || cat === 'Festivals') return 'Festivals';
    if (cat === 'personalities' || cat === 'Personalities' || cat === 'personality' || cat === 'Personality') return 'Personalities';
    if (location.state && (location.state as any).activeCategory) {
      return (location.state as any).activeCategory;
    }
    return 'All';
  });
  const [activeDistrict, setActiveDistrict] = useState("All Districts");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const cat = searchParams.get('category');
    let targetCategory = 'All';
    if (cat === 'food' || cat === 'Food') targetCategory = 'Food';
    else if (cat === 'festival' || cat === 'Festival' || cat === 'festivals' || cat === 'Festivals') targetCategory = 'Festivals';
    else if (cat === 'personalities' || cat === 'Personalities' || cat === 'personality' || cat === 'Personality') targetCategory = 'Personalities';
    else if (location.state && (location.state as any).activeCategory) {
      targetCategory = (location.state as any).activeCategory;
    }

    if (targetCategory !== 'All') {
      setActiveCategory(targetCategory);
      setTimeout(() => {
        const element = document.getElementById('discover-explore-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  const combinedCultureData = [...cultureSubmissions, ...cultureData];
  const [selectedItem, setSelectedItem] = useState<DiscoverItem | null>(null);

  const unifiedCulture: DiscoverItem[] = combinedCultureData.map(item => ({
    id: `culture-${item.id}`,
    type: item.type === "Festival" ? "Festival" : "Food",
    district: item.district,
    image: item.image,
    title: item.title,
    description: item.description,
    longDescription: item.longDescription,
    extendedDetails: item.extendedDetails,
    submittedBy: item.submittedBy,
    caption: item.caption,
    videoUrl: item.videoUrl
  }));

  const unifiedPersonalities: DiscoverItem[] = personalities.map(item => ({
    id: `personality-${item.id}`,
    type: "Personality",
    district: item.district,
    image: item.imageUrl,
    title: item.name,
    description: item.description,
    personalityCategory: item.category
  }));

  const allDiscoverItems = [...unifiedCulture, ...unifiedPersonalities];

  // 2. REPLACED: DYNAMIC CALCULATION WITH STATIC DISTRICTS LIST
  const districts = BIHAR_DISTRICTS;
  const categories = ["All", "Food", "Festivals", "Personalities"];

  const filteredData = allDiscoverItems.filter(item => {
    const matchCategory =
      activeCategory === "All" ||
      (activeCategory === "Food" && item.type === "Food") ||
      (activeCategory === "Festivals" && item.type === "Festival") ||
      (activeCategory === "Personalities" && item.type === "Personality");

    const matchDistrict = activeDistrict === "All Districts" || item.district.toLowerCase() === activeDistrict.toLowerCase();
    return matchCategory && matchDistrict;
  });

  return (
    <div className="min-h-screen bg-brand-gray">
      <Navbar />

      <div
        className="bg-brand-dark pt-32 pb-16 mb-12 relative overflow-hidden"
        style={{ backgroundImage: "url('/images/culture/hero-artwork.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-brand-dark/70"></div>
        <div className="absolute inset-0 bg-brand-gold/15 opacity-50 mix-blend-overlay"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-brand-gold/20"></div>
        <Container>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Discover Bihar's <span className="text-brand-gold">Heritage</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Explore the rich history, vibrant festivals, delicious foods, and legendary personalities that represent the soul of Bihar.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div id="discover-explore-section" className="bg-white p-3 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${activeCategory === cat
                    ? 'bg-brand-dark text-white shadow-md'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-56 shrink-0 z-40">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-gray-50 border border-transparent hover:border-gray-200 text-brand-dark text-sm rounded-[1.25rem] pl-10 pr-10 py-2.5 font-semibold transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <MapPin size={16} className="text-gray-400" />
              </div>
              <span className="truncate">{activeDistrict}</span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {isDropdownOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => {
                  setIsDropdownOpen(false);
                  setSearchQuery("");
                }}
              ></div>
            )}

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-200 py-2 z-50 overflow-hidden"
                >
                  <div className="px-3 pb-2 mb-1 border-b border-gray-100">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search district..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 text-sm font-medium text-gray-900 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                      />
                    </div>
                  </div>

                  {/* 3. REPLACED: LIST RENDERING LOGIC TO USE THE 38 DISTRICTS */}
                  <div className="max-h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                    {districts.filter((d: string) => d.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                      districts.filter((d: string) => d.toLowerCase().includes(searchQuery.toLowerCase())).map((district: string) => (
                        <button
                          key={district}
                          onClick={() => {
                            setActiveDistrict(district);
                            setIsDropdownOpen(false);
                            setSearchQuery("");
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 flex items-center gap-2 cursor-pointer ${activeDistrict === district ? 'text-brand-dark bg-gray-50' : 'text-gray-600'
                            }`}
                        >
                          {activeDistrict === district && <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>}
                          <span className={activeDistrict === district ? 'font-bold' : ''}>{district}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-sm text-gray-400 font-medium">
                        No districts found
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results Grid - (Unchanged) */}
        <div className="mb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + activeDistrict}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <Link
                    key={item.id}
                    to={item.type === "Personality" || item.submittedBy ? "#" : `/culture/${item.id.replace('culture-', '')}`}
                    onClick={(e) => {
                      if (item.type === "Personality" || item.submittedBy) {
                        e.preventDefault();
                        setSelectedItem(item);
                      }
                    }}
                    className="relative block flex-none h-[400px] rounded-[1.5rem] overflow-hidden group bg-white shadow-[0_4px_20px_rgb(0,0,0,0.04)] cursor-pointer hover:shadow-xl transition-shadow"
                  >
                    <div className="absolute top-0 left-0 right-0 h-full group-hover:h-[50%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:delay-100 group-hover:rounded-b-2xl overflow-hidden z-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 group-hover:delay-100"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x600?text=Profile+Coming+Soon"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700 group-hover:delay-100"></div>
                    </div>

                    <div className="absolute top-3 left-3 bg-brand-gold px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 text-brand-dark shadow-md z-20">
                      {item.type === "Festival" ? <PartyPopper size={12} /> : item.type === "Food" ? <Utensils size={12} /> : <User size={12} />}
                      {item.type === "Personality" ? item.personalityCategory : item.type}
                    </div>

                    {item.submittedBy && (
                      <div className="absolute top-3 right-3 bg-brand-dark/80 backdrop-blur-sm border border-brand-gold/30 text-brand-gold px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md z-20">
                        <Sparkles size={10} /> Community
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end z-10">
                      <div className="mb-1">
                        <h3 className="text-[17px] font-bold text-white group-hover:text-gray-900 transition-colors duration-700 group-hover:delay-100 leading-tight mb-0.5 truncate">
                          {item.title}
                        </h3>
                        {item.submittedBy && (
                          <div className="text-[10px] font-bold text-brand-gold group-hover:text-amber-700 flex items-center gap-1 mb-0.5 transition-colors duration-700 group-hover:delay-100">
                            <User size={10} /> <span>By {item.submittedBy}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-[11px] font-bold text-gray-300 group-hover:text-gray-500 transition-colors duration-700 group-hover:delay-100 truncate">
                          <MapPin size={12} /> {item.district}
                        </div>
                      </div>
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 group-hover:delay-100 ease-in-out">
                        <div className="overflow-hidden">
                          <div className="pt-2 pb-1">
                            <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 mb-2">
                              {item.caption || item.description}
                            </p>
                            <span className="flex-1 py-2.5 rounded-[1rem] bg-brand-gold text-brand-dark text-[12px] font-bold tracking-wide shadow-sm hover:bg-gold-light transition-colors text-center block">
                              Learn More
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-20 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <MapPin size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">No results found</h3>
                  <p className="text-gray-500">We couldn't find any items matching your specific filters.</p>
                  <button
                    onClick={() => { setActiveCategory("All"); setActiveDistrict("All Districts"); }}
                    className="mt-6 px-6 py-2 bg-brand-gold text-brand-dark font-bold rounded-full hover:bg-brand-gold/90 transition-colors cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── RELATED COMMUNITY STORIES SECTION ── */}
        
      </Container>

      {/* Lightbox / Details Modal - (Unchanged) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-[#121620] border border-white/10 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 z-50 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors border border-white/10 cursor-pointer">✕</button>
              <div className="md:w-1/2 relative h-64 md:h-auto min-h-[300px]">
                <img src={selectedItem.image} alt={selectedItem.title} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x600?text=Profile+Coming+Soon"; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#121620]" />
                <div className="absolute top-4 left-4 bg-brand-gold text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">{selectedItem.type === "Personality" ? selectedItem.personalityCategory : selectedItem.type}</div>
              </div>
              <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-brand-gold tracking-wide uppercase"><MapPin size={14} /> <span>{selectedItem.district}</span></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{selectedItem.title}</h2>
                  {selectedItem.caption && <p className="text-gray-400 italic text-sm mb-4 leading-relaxed border-l-2 border-brand-gold pl-3">"{selectedItem.caption}"</p>}
                  {selectedItem.submittedBy && <div className="flex items-center gap-1.5 text-xs text-brand-gold font-bold mb-6"><User size={14} /> <span>Shared by: {selectedItem.submittedBy}</span></div>}
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 whitespace-pre-line">{selectedItem.longDescription || selectedItem.description}</p>
                  {selectedItem.extendedDetails && selectedItem.extendedDetails.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <h4 className="text-xs font-bold uppercase text-white/50 tracking-wider">Key Details</h4>
                      <ul className="space-y-1.5">{selectedItem.extendedDetails.map((detail: string, idx: number) => (<li key={idx} className="text-xs text-gray-400 flex items-start gap-1.5"><span className="text-brand-gold mt-0.5">•</span><span>{detail}</span></li>))}</ul>
                    </div>
                  )}
                  {selectedItem.videoUrl && (<div className="mt-6"><a href={selectedItem.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-brand-gold hover:underline">🎥 Watch Documentary Video</a></div>)}
                </div>
                <div className="pt-6 border-t border-white/5 flex gap-3 mt-6"><button onClick={() => setSelectedItem(null)} className="flex-1 py-3 bg-brand-gold text-brand-dark hover:bg-gold-light font-bold text-xs rounded-xl tracking-wider uppercase transition-colors cursor-pointer">Close Details</button></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Discover;