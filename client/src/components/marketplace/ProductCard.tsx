import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: number;
  image: string;
  businessName: string;
  productName: string;
  contact?: string;
  email?: string;
  mapLink?: string;
  onMoreInfo: (id: number) => void;
}

const ProductCard = ({
  id,
  image,
  businessName,
  productName,
  contact,
  email,
  mapLink,
  onMoreInfo,
}: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.35 }}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <motion.img
          src={image}
          alt={productName}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.7 }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Product Name */}
        <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 group-hover:-translate-y-5">
          <h2 className="text-2xl font-bold text-white">
            {productName}
          </h2>

          <p className="mt-1 text-white/80">
            {businessName}
          </p>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="bg-white p-6">
        <div className="space-y-4">
          {/* Contact */}
          <div className="flex items-center gap-3 text-gray-700">
            <Phone size={18} className="text-brand-gold" />
            <span>{contact}</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 text-gray-700">
            <Mail size={18} className="text-brand-gold" />
            <span className="truncate">{email}</span>
          </div>

          {/* View on Map */}
          {/* <div className="pt-2">
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-brand-gold px-4 py-2 text-sm font-medium text-brand-gold transition-all duration-300 hover:bg-brand-gold hover:text-white"
            >
              <MapPin size={16} />
              View on Map
            </a>
          </div> */}
        </div>

        {/* Learn More Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onMoreInfo(id)}
          className="mt-6 w-full rounded-xl bg-brand-gold py-3 font-bold text-brand-dark shadow-lg transition-all duration-300 hover:brightness-105"
        >
          Learn More →
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;