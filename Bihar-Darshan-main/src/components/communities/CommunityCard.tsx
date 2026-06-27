import { motion } from "framer-motion";

interface CommunityCardProps {
  image: string;
  name: string;
  subtitle: string;
  index: number;
}

const CommunityCard = ({ image, name, subtitle, index }: CommunityCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex-shrink-0 w-[260px] sm:w-[280px] cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-semibold text-lg leading-tight">
            {name}
          </h3>
          <p className="text-white/60 text-sm mt-1">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityCard;
