import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
} from 'lucide-react';
import Container from '../layout/Container';

interface FactProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const Fact: React.FC<FactProps> = ({ icon, label, value }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    className="flex flex-col items-center sm:items-start text-center sm:text-left py-2"
  >
    <div className="text-[#D4A017] mb-3">
      {icon}
    </div>
    <p className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/40 font-bold mb-1">
      {label}
    </p>
    <p className="text-[#1A1A1A] font-serif font-bold text-lg">
      {value}
    </p>
  </motion.div>
);

interface DistrictAboutProps {
  districtName: string;
  image: string;
  stats: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }[];
}

const DistrictAbout: React.FC<DistrictAboutProps> = ({ districtName, image, stats }) => {
  return (
    <section className="relative pt-20 pb-32 bg-[#F8F5EF] overflow-hidden">


      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.span
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="inline-block text-[#D4A017] text-[12px] font-bold tracking-[0.3em] uppercase mb-4"
            >
              About {districtName}
            </motion.span>

            <motion.h2
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              className="text-5xl lg:text-7xl font-serif font-bold text-[#1A1A1A] mb-6 leading-tight"
            >
              The Timeless Capital <br /> of <span className="italic">Bihar</span>
            </motion.h2>

            <motion.div
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
              className="w-24 h-1.5 bg-[#D4A017] mb-10 origin-left"
            />

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="space-y-6 text-[#1A1A1A]/70 leading-relaxed text-lg lg:text-xl font-light mb-12 max-w-xl"
            >
              <p>
                {districtName}, one of the world's oldest continuously inhabited places, stands as a testament
                to India's glorious past. From the golden era of the Maurya Empire to its modern
                metamorphosis, the city remains the heartbeat of Bihar.
              </p>
              <p>
                Explore a landscape where ancient stupas meet bustling modern boulevards,
                and every street corner whispers stories of legendary emperors and spiritual awakening.
              </p>
            </motion.div>

            <motion.button
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ backgroundColor: '#D4A017', color: '#FFFFFF' }}
              className="px-10 py-4 rounded-full border border-[#D4A017] text-[#D4A017] font-bold text-sm tracking-widest uppercase flex items-center gap-3 transition-all duration-300 group shadow-lg shadow-[#D4A017]/10"
            >
              Explore {districtName} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Fact Row */}
            {/* <div className="mt-20 pt-10 border-t border-[#1A1A1A]/10 grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center gap-8">
                  <Fact icon={stat.icon} label={stat.label} value={stat.value} />
                  {idx < stats.length - 1 && (
                    <div className="hidden lg:block h-12 w-[1px] bg-[#1A1A1A]/10 mt-2" />
                  )}
                </div>
              ))}
            </div> */}
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-[600px] lg:h-[700px]"
          >
            {/* Background radial glow */}
            <div className="absolute inset-0 bg-radial-gradient from-[#D4A017]/20 to-transparent blur-[120px] scale-150 z-0" />

            <div className="relative h-full w-full rounded-[32px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] z-10 group">
              <motion.img
                src={image}
                alt={districtName}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Soft golden overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A017]/10 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Image Frame Detail */}
              <div className="absolute inset-4 border border-white/20 rounded-[24px] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </Container>


    </section>
  );
};

export default DistrictAbout;
