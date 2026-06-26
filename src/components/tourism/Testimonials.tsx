import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    country: "United Kingdom",
    text: "The spiritual retreat in Bodh Gaya was life-changing. The attention to detail and luxury accommodation surpassed all my expectations.",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Rajesh Malhotra",
    country: "India",
    text: "Never knew Bihar had such premium tourism options. The Nalanda heritage walk was like stepping back in time with modern comforts.",
    avatar: "https://i.pravatar.cc/150?u=rajesh"
  },
  {
    name: "Hiroshi Tanaka",
    country: "Japan",
    text: "The Vaishali expedition was perfectly organized. The private guide was incredibly knowledgeable and the transport was top-notch.",
    avatar: "https://i.pravatar.cc/150?u=hiroshi"
  }
];

const Testimonials = () => {
  return (
    <section className="py-32 bg-brand-gray relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-gold/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 mb-20 text-center">
        <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold font-sans block mb-6">
          Voices of the Voyage
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">
          Traveler <span className="italic">Testimonials</span>
        </h2>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            whileHover={{ y: -10 }}
            className="p-8 rounded-[40px] bg-white border border-brand-dark/5 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center relative group"
          >
            <div className="absolute top-6 left-6 text-brand-gold/10 group-hover:text-brand-gold/20 transition-colors">
              <Quote size={64} fill="currentColor" />
            </div>

            <img
              src={t.avatar}
              alt={t.name}
              className="w-20 h-20 rounded-full border-4 border-brand-gray shadow-md mb-6 object-cover"
            />

            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={14} className="text-brand-gold fill-brand-gold" />
              ))}
            </div>

            <p className="text-brand-dark/70 text-lg font-serif italic leading-relaxed mb-8 relative z-10">
              "{t.text}"
            </p>

            <div className="mt-auto">
              <h4 className="font-bold text-brand-dark">{t.name}</h4>
              <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">{t.country}</p>
            </div>

            {/* Float effect shadow */}
            <div className="absolute -bottom-4 inset-x-12 h-4 bg-black/5 blur-xl group-hover:bg-black/10 transition-all" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
