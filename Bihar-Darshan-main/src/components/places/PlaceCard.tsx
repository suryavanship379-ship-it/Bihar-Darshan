

interface PlaceCardProps {
  image: string;
  name: string;
  district: string;
  index: number;
}

const PlaceCard = ({ image, name, district }: PlaceCardProps) => {
  return (
    <div className="group flex-shrink-0 w-[260px] sm:w-[280px] cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />


        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-semibold text-lg leading-tight">
            {name}
          </h3>
          <p className="text-white/70 text-sm mt-1">{district}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;

