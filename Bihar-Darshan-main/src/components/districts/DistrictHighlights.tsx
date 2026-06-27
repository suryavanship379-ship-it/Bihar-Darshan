import React from "react";
import { motion } from "framer-motion";
import {
  History,
  Palmtree,
  GraduationCap,
  Train,
  Camera,
} from "lucide-react";

interface HighlightItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface DistrictHighlightsProps {
  districtName: string;
}

const DistrictHighlights: React.FC<DistrictHighlightsProps> = ({
  districtName,
}) => {
  const highlights: HighlightItem[] = [
    {
      icon: <History size={24} />,
      title: "Historical Heritage",
      desc: "Ancient capital of Magadh and Maurya Empire",
    },
    {
      icon: <Palmtree size={24} />,
      title: "Cultural Legacy",
      desc: "Festivals, traditions and historic identity",
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Education Hub",
      desc: "Home to India's oldest educational heritage",
    },
    {
      icon: <Train size={24} />,
      title: "Connectivity",
      desc: "Excellent road, rail and air connectivity",
    },
    {
      icon: <Camera size={24} />,
      title: "Tourism",
      desc: "UNESCO sites, temples, museums and riverfront",
    },
  ];

  return (
    <section className="relative py-24 bg-[#F8F5EF] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gold/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        {/* Mock Madhubani motifs pattern placeholder - could be an SVG background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-10" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#1A1A1A] mb-4 uppercase tracking-tight">
              {districtName} Highlights
            </h2>
            <p className="text-[#1A1A1A]/60 text-lg max-w-2xl mx-auto mb-8 font-light">
              Discover what makes {districtName} one of Bihar's most iconic
              destinations.
            </p>
            <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{
                y: -15,
                transition: { duration: 0.3 }
              }}
              className="relative group bg-white/40 backdrop-blur-md border border-white/60 p-8 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(212,160,23,0.15)] flex flex-col items-center text-center transition-all duration-300 overflow-hidden"
            >
              {/* Animated Border */}
              <div className="absolute inset-0 border-[1px] border-transparent group-hover:border-[#D4A017]/30 rounded-[32px] transition-all duration-500" />

              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#D4A017]/10 rounded-full scale-110 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="w-16 h-16 rounded-full border border-gray-100 flex items-center justify-center text-[#D4A017] bg-white shadow-sm ring-8 ring-[#D4A017]/5"
                >
                  {item.icon}
                </motion.div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[#1A1A1A]/50 leading-relaxed font-medium">
                {item.desc}
              </p>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#D4A017] rounded-t-full group-hover:w-16 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Decorative corner illustrations - absolute positioned icons or SVGs */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none hidden lg:block">
          {/* Placeholder for leaf illustration */}
          <Palmtree size={120} className="text-[#D4A017]" />
        </div>
        <div className="absolute bottom-0 left-0 p-12 opacity-5 pointer-events-none hidden lg:block rotate-180">
          <Palmtree size={120} className="text-[#D4A017]" />
        </div>
      </div>
    </section>
  );
};

export default DistrictHighlights;
