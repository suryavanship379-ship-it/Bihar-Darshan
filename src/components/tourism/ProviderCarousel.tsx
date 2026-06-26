import { motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";

const providers = [
  { name: "Nirvana Travels", rating: 4.9, tours: 42, logo: "https://cdn-icons-png.flaticon.com/512/3233/3233481.png" },
  { name: "Bihar Heritage Guild", rating: 4.8, tours: 28, logo: "https://cdn-icons-png.flaticon.com/512/3233/3233497.png" },
  { name: "Ganga Voyages", rating: 4.7, tours: 15, logo: "https://cdn-icons-png.flaticon.com/512/3233/3233501.png" },
  { name: "Licchavi Tours", rating: 4.9, tours: 31, logo: "https://cdn-icons-png.flaticon.com/512/3233/3233515.png" },
  { name: "Patna Pioneers", rating: 4.6, tours: 22, logo: "https://cdn-icons-png.flaticon.com/512/3233/3233527.png" },
  { name: "Mithila Trails", rating: 4.8, tours: 19, logo: "https://cdn-icons-png.flaticon.com/512/3233/3233539.png" },
];

const ProviderCarousel = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold font-sans block mb-4">
          Platinum Partners
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">
          Verified Tour <span className="italic">Providers</span>
        </h2>
        <p className="text-brand-dark/40 max-w-xl mx-auto font-medium">
          Only the most trusted and highly-rated local operators earn a place in our exclusive circle.
        </p>
      </div>

      {/* Infinite Scroll Logo Carousel */}
      <div className="relative flex overflow-hidden group">
        <div className="flex animate-[scroll_40s_linear_infinite] whitespace-nowrap py-12">
          {[...providers, ...providers].map((provider, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              className="inline-block mx-6"
            >
              <div className="w-80 p-8 rounded-3xl bg-brand-gray border border-brand-dark/5 shadow-sm hover:shadow-xl hover:border-brand-gold/20 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-brand-gold">
                  <BadgeCheck size={20} fill="currentColor" className="text-white" />
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white p-4 shadow-inner">
                    <img src={provider.logo} alt={provider.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-dark mb-1">{provider.name}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-3 h-3 text-brand-gold fill-brand-gold" />
                      <span className="text-xs font-bold text-brand-dark">{provider.rating}</span>
                      <span className="text-[10px] text-brand-dark/40 uppercase font-bold tracking-tighter">• {provider.tours} Tours</span>
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-brand-gold py-1 px-3 bg-brand-gold/10 rounded-full">
                      Verified Partner
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
};

export default ProviderCarousel;
