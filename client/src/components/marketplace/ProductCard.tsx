import { Phone, Mail, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string | number;
  image: string;
  businessName: string;
  productName: string;
  contact?: string;
  email?: string;
  mapLink?: string;
  onMoreInfo: (id: string | number) => void;
}

const ProductCard = ({
  id,
  image,
  businessName,
  productName,
  contact,
  email,
  onMoreInfo,
}: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.35 }}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        {/* Tag Badge */}
        <div className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-[#EAB308] flex items-center justify-center shadow-md">
          <Tag size={15} className="text-black" />
        </div>

        <motion.img
          src={image}
          alt={productName}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.7 }}
        />
        {/* Subtle orange accent line below image */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EAB308] opacity-80" />
      </div>

      {/* Bottom Content */}
      <div className="p-5 flex flex-col justify-between">
        {/* Title, Subtitle, and Left Cushion icon */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#EAB308] shrink-0">
            <Tag size={20} className="stroke-[1.8]" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1A2530] leading-snug">
              {productName}
            </h2>
            <p className="text-xs font-semibold text-gray-400 mt-0.5">
              {businessName}
            </p>
          </div>
        </div>

        {/* Divider line */}
        <div className="border-t border-gray-100 my-2" />

        {/* Contact Info (Row layout with vertical divider) */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700 py-3.5">
          {contact && (
            <div className="flex items-center gap-1.5 shrink-0">
              <Phone size={14} className="text-[#EAB308]" />
              <span>{contact}</span>
            </div>
          )}
          {contact && email && (
            <div className="h-3 w-[1px] bg-slate-200 hidden sm:block" />
          )}
          {email && (
            <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
              <Mail size={14} className="text-[#EAB308] shrink-0" />
              <span className="truncate text-slate-600 font-medium">{email}</span>
            </div>
          )}
        </div>

        {/* Learn More Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onMoreInfo(id)}
          className="w-full rounded-xl bg-[#EAB308] hover:bg-[#EAB308]/90 py-3 font-bold text-black border border-transparent shadow shadow-yellow-600/10 hover:shadow-lg transition-all duration-300 text-sm tracking-wide mt-2"
        >
          Learn More →
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;