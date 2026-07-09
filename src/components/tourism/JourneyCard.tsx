import { Link } from "react-router-dom";
import type { TourTrip } from "../../data/tourismData";

interface JourneyCardProps {
  trip: TourTrip;
}

const JourneyCard = ({ trip }: JourneyCardProps) => {
  return (
    <Link to={`/tourism/${trip.id}`} className="bg-[#fdf9ef] rounded-[2rem] shadow-lg overflow-hidden flex flex-col group border border-[#e2d5b8] transform transition-transform hover:-translate-y-2 duration-300">

      {/* Image */}
      <div className="relative h-64 overflow-hidden p-2">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover rounded-t-[1.5rem] rounded-b-xl group-hover:scale-110 transition-transform duration-700"
        />

        {/* Location Badge */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#5c3a21] text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full opacity-90 shadow-md">
          {trip.departureCity}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 text-center flex-1 flex flex-col items-center">

        <h3 className="text-xl font-bold text-[#5c3a21] mb-3">{trip.title}</h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {trip.description}
        </p>

        <div className="mt-auto">
          <span
            className="text-[#d4a017] font-bold text-sm uppercase tracking-wider hover:text-[#5c3a21] transition-colors"
          >
            READ MORE
          </span>
        </div>

      </div>
    </Link>
  );
};

export default JourneyCard;