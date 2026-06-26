import { Search, MapPin, Calendar, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

const SearchBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="w-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[32px] p-4 flex flex-col md:flex-row items-center gap-2"
    >
      {/* Where from? */}
      <div className="flex-1 w-full px-8 py-4 border-r border-gray-100 group flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-brand-gold">
          <MapPin size={24} />
        </div>
        <div className="flex flex-col">
          <label className="text-brand-dark font-bold text-sm">Where from?</label>
          <input
            type="text"
            placeholder="Departure city"
            className="bg-transparent border-none outline-none text-brand-dark/40 placeholder:text-brand-dark/30 w-full text-sm font-medium"
          />
        </div>
      </div>

      {/* Best time */}
      <div className="flex-1 w-full px-8 py-4 border-r border-gray-100 group flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-brand-gold">
          <Calendar size={24} />
        </div>
        <div className="flex flex-col">
          <label className="text-brand-dark font-bold text-sm">Best time?</label>
          <p className="text-brand-dark/40 text-sm font-medium">Select dates</p>
        </div>
      </div>

      {/* Trip type */}
      <div className="flex-1 w-full px-8 py-4 group flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-brand-gold">
          <LayoutGrid size={24} />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-brand-dark font-bold text-sm">Trip type</label>
          <select className="bg-transparent border-none outline-none text-brand-dark/40 w-full text-sm font-medium focus:ring-0 appearance-none">
            <option>All types</option>
            <option>Spiritual</option>
            <option>Heritage</option>
          </select>
        </div>
      </div>

      {/* Explore Button */}
      <div className="px-4">
        <button className="h-16 px-10 bg-brand-gold hover:bg-gold-light text-white rounded-[24px] font-bold text-sm transition-all duration-500 shadow-lg flex items-center gap-3">
          <Search size={20} strokeWidth={3} />
          Explore Trips
        </button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
