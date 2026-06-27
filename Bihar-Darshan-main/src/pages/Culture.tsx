import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cultureData } from '../data/cultureData';
import Container from '../components/layout/Container';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { MapPin, Utensils, PartyPopper, Search } from 'lucide-react';

const Culture = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDistrict, setActiveDistrict] = useState("All Districts");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getUniqueDistricts = () => {
    const districts = cultureData.map(item => item.district);
    return ["All Districts", ...new Set(districts)];
  };

  const districts = getUniqueDistricts();
  const categories = ["All", "Festival", "Food"];

  // Filter Logic
  const filteredData = cultureData.filter(item => {
    const matchCategory = activeCategory === "All" || item.type === activeCategory;
    const matchDistrict = activeDistrict === "All Districts" || item.district === activeDistrict;
    return matchCategory && matchDistrict;
  });

  return (
    <div className="min-h-screen bg-brand-gray">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-brand-dark pt-32 pb-16 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-gold/15 opacity-50 mix-blend-overlay"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-brand-gold/20"></div>
        <Container>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Bihar's Rich <span className="text-brand-gold">Culture</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Dive into the vibrant festivals and mouth-watering culinary heritage that define the soul of Bihar. Use the filters below to explore by region or category.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        {/* Filters Section */}
        <div className="bg-white p-3 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-12">

          {/* Category Pills */}
          <div className="flex gap-1.5 p-1 bg-gray-50 rounded-[1.25rem] w-full md:w-auto overflow-x-auto scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 shrink-0 ${activeCategory === category
                  ? "bg-brand-gold text-brand-dark shadow-md"
                  : "text-gray-500 hover:text-brand-dark hover:bg-gray-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Custom District Dropdown */}
          <div className="relative w-full md:w-56 shrink-0 z-40">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-gray-50 border border-transparent hover:border-gray-200 text-brand-dark text-sm rounded-[1.25rem] pl-10 pr-10 py-2.5 font-semibold transition-all flex items-center justify-between"
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

            {/* Invisible backdrop to close dropdown when clicking outside */}
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
                  {/* Search Input */}
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
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 flex items-center gap-2 ${activeDistrict === district ? 'text-brand-dark bg-gray-50' : 'text-gray-600'
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

        {/* Results Grid */}
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
                  <div
                    key={item.id}
                    className="relative flex-none h-[400px] rounded-[1.5rem] overflow-hidden group bg-white shadow-[0_4px_20px_rgb(0,0,0,0.04)] cursor-pointer"
                  >
                    {/* Shrinking Image Background */}
                    <div className="absolute top-0 left-0 right-0 h-full group-hover:h-[50%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:delay-100 group-hover:rounded-b-2xl overflow-hidden z-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 group-hover:delay-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700 group-hover:delay-100"></div>
                    </div>

                    {/* Top Badge */}
                    <div className="absolute top-3 left-3 bg-brand-gold px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 text-brand-dark shadow-md z-20">
                      {item.type === "Festival" ? <PartyPopper size={12} className="text-brand-dark" /> : <Utensils size={12} className="text-brand-dark" />}
                      {item.type}
                    </div>

                    {/* Content Panel */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end z-10">
                      {/* Header */}
                      <div className="mb-1">
                        <h3 className="text-[17px] font-bold text-white group-hover:text-gray-900 transition-colors duration-700 group-hover:delay-100 leading-tight mb-0.5 truncate">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-gray-300 group-hover:text-gray-500 transition-colors duration-700 group-hover:delay-100 truncate">
                          <MapPin size={12} />
                          {item.district}
                        </div>
                      </div>

                      {/* Expanded Info and Button */}
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 group-hover:delay-100 ease-in-out">
                        <div className="overflow-hidden">
                          <div className="pt-2 pb-1">
                            <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 mb-2">
                              {item.description}
                            </p>

                            {/* Button */}
                            <div className="flex items-center gap-2">
                              <button className="flex-1 py-2.5 rounded-[1rem] bg-brand-gold text-brand-dark text-[12px] font-bold tracking-wide shadow-sm active:scale-[0.98] hover:bg-gold-light transition-colors">
                                Learn More
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <MapPin size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">No results found</h3>
                  <p className="text-gray-500">We couldn't find any cultural items matching your specific filters.</p>
                  <button
                    onClick={() => { setActiveCategory("All"); setActiveDistrict("All Districts"); }}
                    className="mt-6 px-6 py-2 bg-brand-gold text-brand-dark font-bold rounded-full hover:bg-brand-gold/90 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Culture;
