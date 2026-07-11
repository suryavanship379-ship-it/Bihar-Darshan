import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Heart, Tag } from "lucide-react";
import { useAdminData } from "../../data/AdminContext";
import JourneyCard from "./JourneyCard";

// ─── Feature Strip ──────────────────────────────────────────────────────────
const features = [
  {
    icon: <CheckCircle2 className="w-7 h-7" />,
    title: "Authentic Experiences",
    desc: "Curated by local experts who know Bihar best.",
  },
  {
    icon: <Tag className="w-7 h-7" />,
    title: "Best Price Guarantee",
    desc: "Competitive pricing with no hidden charges.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "Safe & Secure Travel",
    desc: "Verified partners and 24/7 assistance.",
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: "Support Local",
    desc: "Empowering local communities through responsible tourism.",
  },
];

const FeatureStrip = () => (
  <div className="relative mt-16 border-t border-[#E8E0D4]">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#E8E0D4]">
      {features.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="flex items-start gap-5 p-8 group hover:bg-white transition-colors duration-300 rounded-xl"
        >
          {/* Icon */}
          <div className="w-14 h-14 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0 group-hover:bg-brand-gold group-hover:text-white group-hover:border-brand-gold transition-all duration-400 shadow-sm">
            {f.icon}
          </div>
          {/* Text */}
          <div>
            <h4 className="font-bold text-brand-dark text-base mb-1">{f.title}</h4>
            <p className="text-sm text-brand-dark/50 leading-relaxed">{f.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// ─── Main Section ────────────────────────────────────────────────────────────
const FeaturedJourneys = () => {
  const { tourism: featuredTrips } = useAdminData();
  // Prepare 12 cards by repeating available featuredTrips if necessary
  const totalToShow = 12;
  const cards = Array.from({ length: totalToShow }).map((_, i) => featuredTrips[i % featuredTrips.length]);

  return (
    <section className="py-24 bg-[#F8F5EF] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* ── Section Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-3"
            >
              <div className="h-px w-8 bg-brand-gold" />
              <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.35em]">
                Handpicked Experiences
              </span>
              <div className="h-px w-8 bg-brand-gold" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-serif text-brand-dark mb-3"
            >
              Featured Journeys
            </motion.h2>

            <p className="text-brand-dark/50 text-base">
              Explore the best travel experiences across Bihar.
            </p>
          </div>

        </div>

        {/* ── Grid of Cards (4 per row) ───────────────────────────────────────── */}
        <div className="py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {cards.map((trip, i) => (
              <motion.div
                key={`journey-${i}-${trip.id}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.05, duration: 0.35 }}
                className="flex justify-center"
              >
                <JourneyCard trip={trip} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Why Travel With Us ──────────────────────────────────────────────── */}
        <div className="mt-20">
          <div className="flex items-start gap-6">
            {/* Left heading */}
            <div className="shrink-0 max-w-[200px]">
              <h3 className="text-4xl font-serif text-brand-dark leading-tight">
                Why Travel<br />With Us?
              </h3>
              <div className="w-12 h-1 bg-brand-gold rounded-full mt-4" />
            </div>

            {/* Feature cards */}
            <div className="flex-1">
              <FeatureStrip />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedJourneys;
