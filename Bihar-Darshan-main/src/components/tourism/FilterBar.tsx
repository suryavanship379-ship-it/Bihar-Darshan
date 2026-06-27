import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const filterCategories = [
  { id: "all", label: "All Experiences" },
  { id: "spiritual", label: "Spiritual" },
  { id: "heritage", label: "Heritage" },
  { id: "adventure", label: "Adventure" },
  { id: "wildlife", label: "Wildlife" },
  { id: "culinary", label: "Culinary" },
];

const FilterBar = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="sticky top-[80px] z-[100] w-full px-6 py-4 bg-brand-gray/80 backdrop-blur-xl border-b border-brand-dark/5">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 border ${activeTab === cat.id
                ? "bg-brand-dark text-white border-brand-dark"
                : "bg-white text-brand-dark/60 border-brand-dark/5 hover:border-brand-gold hover:text-brand-gold"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filters & Search */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/40 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by district or keyword..."
              className="w-full bg-white border border-brand-dark/5 rounded-full pl-12 pr-6 py-2.5 text-sm focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>

          <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-brand-dark/5 rounded-full text-xs font-bold uppercase tracking-widest text-brand-dark hover:bg-brand-gray transition-colors">
            <SlidersHorizontal size={16} className="text-brand-gold" />
            Filters
          </button>

          <button
            className="text-xs font-bold text-brand-dark/40 hover:text-brand-gold transition-colors"
            onClick={() => setActiveTab("all")}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
