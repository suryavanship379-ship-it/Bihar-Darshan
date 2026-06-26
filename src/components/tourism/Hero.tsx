import { motion } from "framer-motion";
import { Star, ShieldCheck, Headphones } from "lucide-react";
import SearchBar from "./SearchBar";
import tourismMain from "../../assets/tourism main.png";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col pt-32">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={tourismMain}
          alt="Bihar Tourism"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 mt-4 md:mt-8">
        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-brand-gold" />
              <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold">
                Exclusive Journeys
              </span>
              <div className="h-px w-8 bg-brand-gold" />
            </div>

            <h1 className="text-6xl md:text-[88px] font-serif text-white leading-[1.1] mb-6">
              Discover <span className="text-brand-gold">Bihar</span> <br />
              Like Never Before
            </h1>

            <p className="text-white/80 text-xl md:text-2xl max-w-xl mb-10 font-medium leading-relaxed">
              Handpicked travel experiences crafted by local experts for unforgettable memories.
            </p>

            <div className="flex flex-wrap gap-8 items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                  <ShieldCheck size={24} />
                </div>
                <div className="text-white leading-tight">
                  <p className="text-sm font-bold text-white/90">Trusted Local</p>
                  <p className="text-[11px] text-white/50 font-bold uppercase tracking-tighter">Partners</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                  <ShieldCheck size={24} />
                </div>
                <div className="text-white leading-tight">
                  <p className="text-sm font-bold text-white/90">Verified &</p>
                  <p className="text-[11px] text-white/50 font-bold uppercase tracking-tighter">Safe</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                  <Headphones size={24} />
                </div>
                <div className="text-white leading-tight">
                  <p className="text-sm font-bold text-white/90">24/7 Travel</p>
                  <p className="text-[11px] text-white/50 font-bold uppercase tracking-tighter">Support</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Floating Stats Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden lg:block"
        >
          <div className="w-[190px] p-8 rounded-[32px] bg-white shadow-[0_32px_64px_rgba(0,0,0,0.15)] flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-6 h-6 text-brand-gold fill-brand-gold" />
                <span className="text-2xl font-bold text-brand-dark">4.8</span>
                <span className="text-brand-dark/30 font-bold text-sm">/5</span>
              </div>
              <p className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest leading-none">Average Rating</p>
            </div>

            <div className="flex flex-col items-center">
              <h4 className="text-2xl font-bold text-brand-dark mb-1 leading-none">200+</h4>
              <p className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest leading-none">Happy Travelers</p>
            </div>

            <div className="flex flex-col items-center">
              <h4 className="text-2xl font-bold text-brand-dark mb-1 leading-none">50+</h4>
              <p className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest leading-none">Curated Trips</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom: Search Bar Container */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-6xl px-6 z-20">
        <SearchBar />
      </div>
    </section>
  );
};

export default Hero;
