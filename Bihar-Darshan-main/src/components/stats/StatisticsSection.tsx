import { motion } from "framer-motion";
import {
  MapPin,
  Camera,
  FileText,
  PartyPopper,
  Landmark,
  Globe,
} from "lucide-react";

const stats = [
  { icon: MapPin, value: "38", label: "Districts", color: "text-blue-500" },
  { icon: Globe, value: "1000+", label: "Tourist Spots", color: "text-emerald-500" },
  { icon: Camera, value: "5000+", label: "Community Photos", color: "text-purple-500" },
  { icon: FileText, value: "1500+", label: "Articles", color: "text-orange-500" },
  { icon: PartyPopper, value: "100+", label: "Festivals", color: "text-pink-500" },
  { icon: Landmark, value: "300+", label: "Heritage Sites", color: "text-gold" },
];

const StatisticsSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-primary">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 mb-4 group-hover:bg-white/10 transition-all duration-300">
                <stat.icon size={24} className={stat.color} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-white/50 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
