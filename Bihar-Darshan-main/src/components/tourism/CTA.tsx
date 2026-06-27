import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background Image with Parallax-like effect overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2000&auto=format&fit=crop"
          alt="CTA Background"
          className="w-full h-full object-cover grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold flex items-center justify-center text-brand-dark shadow-[0_0_20px_rgba(212,160,23,0.5)]">
                <BadgeCheck size={28} />
              </div>
              <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold font-sans">
                Partnership Opportunities
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-[1.1]">
              Ready to showcase <br />
              your <span className="italic text-brand-gold">exclusive</span> tours?
            </h2>

            <p className="text-white/60 text-xl font-medium mb-12 max-w-xl leading-relaxed">
              Join the elite circle of Bihar's heritage storytellers.
              Register as a verified partner and connect with global travelers.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="h-16 px-12 bg-brand-gold hover:bg-gold-light text-brand-dark rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-500 shadow-xl hover:scale-105 flex items-center justify-center gap-3 active:scale-95 group">
                Register Your Business
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="h-16 px-12 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-sm uppercase tracking-widest transition-all">
                Partnership Guide
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute right-20 top-20 w-32 h-32 border-2 border-brand-gold/20 rounded-full animate-pulse" />
      <div className="absolute right-40 bottom-20 w-64 h-64 border border-brand-gold/10 rounded-full animate-[spin_20s_linear_infinite]" />
    </section>
  );
};

export default CTA;
