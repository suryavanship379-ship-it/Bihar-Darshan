import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Headphones, Tag, Sparkles } from "lucide-react";

const features = [
  {
    title: "Verified Operators",
    desc: "Rigorous background checks for all providers.",
    icon: ShieldCheck
  },
  {
    title: "Local Experts",
    desc: "Guides who know every hidden secret of Bihar.",
    icon: UserCheck
  },
  {
    title: "24/7 Support",
    desc: "Round-the-clock assistance for all travelers.",
    icon: Headphones
  },
  {
    title: "Best Prices",
    desc: "Unbeatable value for luxury experiences.",
    icon: Tag
  },
  {
    title: "Authentic Experiences",
    desc: "True cultural immersion beyond tourism.",
    icon: Sparkles
  }
];

const Timeline = () => {
  return (
    <section className="py-32 bg-brand-dark text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 blur-[120px] rounded-full translate-x-1/3" />

      <div className="container mx-auto px-6 mb-24">
        <div className="max-w-2xl">
          <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold font-sans block mb-6">
            The Excellence Standard
          </span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8">
            Why Choose Our <br />
            <span className="italic text-brand-gold underline decoration-white/10 underline-offset-8">Darshan</span> Platinum
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Golden connecting line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent hidden lg:block" />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 relative z-10">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left group"
            >
              <div className="relative mb-8">
                {/* Node on the line */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-gold shadow-[0_0_15px_rgba(212,160,23,0.8)] z-20 hidden lg:block" />

                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-gold transition-all duration-500 group-hover:-translate-y-2">
                  <feature.icon className="w-8 h-8 text-brand-gold group-hover:text-brand-dark transition-colors" />
                </div>
              </div>

              <h4 className="text-xl font-bold mb-3 group-hover:text-brand-gold transition-colors">{feature.title}</h4>
              <p className="text-white/40 text-sm leading-relaxed max-w-[200px]">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
