import { Link, useNavigate } from "react-router-dom";
import type { TourTrip } from "../../data/tourismData";
import { ArrowRight, Edit3 } from "lucide-react";
import { auth } from "../../lib/firebase";

interface JourneyCardProps {
  trip: TourTrip;
}

const JourneyCard = ({ trip }: JourneyCardProps) => {
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const isAuthor = currentUser && (trip as any).authorId === currentUser.uid;

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/tourism/create-journey?editId=${trip.id}`);
  };

  return (
    <Link
      to={`/tourism/${trip.id}`}
      className="group block w-full transform transition-transform hover:-translate-y-1 duration-500"
    >
      <div className="bg-[#FFFFEF] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-gray-100 flex flex-col relative h-full">
        {/* Top: Image Section */}
        <div className="relative h-56 md:h-64 overflow-hidden">
          <img
            src={trip.image}
            alt={trip.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {isAuthor && (
            <button
              onClick={handleEditClick}
              className="absolute top-4 right-4 z-20 bg-[#F4A261] hover:bg-[#E5914F] text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 font-sans"
              title="Edit Experience"
            >
              <Edit3 size={16} />
            </button>
          )}
        </div>

        {/* Bottom: Minimal Content Section */}
        <div className="p-8 flex flex-col items-center justify-center text-center relative z-10 flex-1 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]">
          <h3 className="text-xl md:text-2xl font-serif text-brand-dark mb-4 group-hover:text-brand-gold transition-colors duration-300">
            {trip.title}
          </h3>

          <div className="flex items-center gap-2 text-[10px] font-bold text-brand-dark/60 uppercase tracking-[0.2em] group-hover:text-brand-dark transition-colors duration-300">
            View Details
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Golden Bottom Border on Hover */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </Link>
  );
};

export default JourneyCard;