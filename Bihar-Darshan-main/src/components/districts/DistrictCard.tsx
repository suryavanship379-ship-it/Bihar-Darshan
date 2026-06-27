import { Link } from 'react-router-dom';

interface DistrictCardProps {
  image: string;
  name: string;
  index: number;
}

const DistrictCard = ({ image, name }: DistrictCardProps) => {
  return (
    <Link to={`/districts/${name.toLowerCase()}`} className="group flex-shrink-0 w-[260px] sm:w-[280px] cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">
            District
          </p>
          <h3 className="text-white font-semibold text-lg leading-tight">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default DistrictCard;

