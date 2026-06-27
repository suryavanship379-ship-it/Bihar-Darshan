import { motion } from "framer-motion";
import { featuredTrips } from "../../data/tourismData";
import TripCard from "./TripCard";

const FeaturedTrips = () => {
  return (
    <section className="py-24 bg-brand-gray relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] flex items-center justify-center select-none">
        <h2 className="text-[20vw] font-serif font-bold whitespace-nowrap">BEYOND IMAGINATION</h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-6"
          >
            <div className="h-px w-12 md:w-24 bg-brand-gold" />
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-brand-gold">
              Handpicked Experiences
            </h2>
            <div className="h-px w-12 md:w-24 bg-brand-gold" />
          </motion.div>
          <h3 className="text-4xl md:text-6xl font-serif text-brand-dark max-w-3xl">
            Curated Voyages for the <span className="italic">Soul</span>
          </h3>
        </div>

        {/* Magazine Style Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {/* First card: Large landscape (Row 1, Cols 1-8) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 md:row-span-1"
          >
            <TripCard trip={featuredTrips[0]} variant="landscape" />
          </motion.div>

          {/* Second card: Tall portrait (Row 1-2, Cols 9-12) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 md:row-span-2"
          >
            <TripCard trip={featuredTrips[1]} variant="portrait" />
          </motion.div>

          {/* Third card: Medium (Row 2, Cols 1-5) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-5"
          >
            <TripCard trip={featuredTrips[2]} variant="standard" />
          </motion.div>

          {/* Fourth card: Large (Row 2, Cols 6-8) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-3"
          >
            <TripCard trip={featuredTrips[3]} variant="compact" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrips;
