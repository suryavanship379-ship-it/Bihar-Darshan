import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Attraction {
  name: string;
  image: string;
  desc: string;
}

interface AttractionSliderProps {
  attractions: Attraction[];
  title: string;
}

const AttractionSlider: React.FC<AttractionSliderProps> = ({ attractions, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % attractions.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + attractions.length) % attractions.length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section className="py-24 bg-[#F8F5EF] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-4">
              {title}
            </h2>
            <div className="w-24 h-1 bg-[#D4A017] rounded-full" />
          </div>
          <button className="group flex items-center gap-2 text-[#D4A017] font-bold text-lg hover:text-[#B8860B] transition-colors">
            View All Attractions <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative h-[600px] flex items-center justify-center">
          {/* Navigation Arrows */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-10 z-30 pointer-events-none">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#1A1A1A] shadow-xl hover:bg-white hover:scale-110 transition-all pointer-events-auto"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#1A1A1A] shadow-xl hover:bg-white hover:scale-110 transition-all pointer-events-auto"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          <div className="relative w-full h-full flex items-center justify-center perspective-[2000px]">
            <AnimatePresence mode="popLayout" initial={false}>
              {attractions.map((attraction, index) => {
                const position = (index - activeIndex + attractions.length) % attractions.length;

                // Determine placement
                let x = '0%';
                let scale = 1;
                let zIndex = 10;
                let opacity = 0;
                let rotateY = 0;
                let blur = '0px';

                if (position === 0) {
                  // Center card
                  x = '0%';
                  scale = 1;
                  zIndex = 20;
                  opacity = 1;
                } else if (position === 1) {
                  // First on the right
                  x = '45%';
                  scale = 0.85;
                  zIndex = 15;
                  opacity = 0.7;
                  rotateY = -15;
                  blur = '4px';
                } else if (position === attractions.length - 1) {
                  // First on the left
                  x = '-45%';
                  scale = 0.85;
                  zIndex = 15;
                  opacity = 0.7;
                  rotateY = 15;
                  blur = '4px';
                } else if (position === 2) {
                  // Second on the right
                  x = '70%';
                  scale = 0.7;
                  zIndex = 10;
                  opacity = 0.4;
                  rotateY = -25;
                  blur = '8px';
                } else if (position === attractions.length - 2) {
                  // Second on the left
                  x = '-70%';
                  scale = 0.7;
                  zIndex = 10;
                  opacity = 0.4;
                  rotateY = 25;
                  blur = '8px';
                }

                if (opacity === 0) return null;

                return (
                  <motion.div
                    key={attraction.name}
                    initial={{ opacity: 0, x: position > 0 ? '100%' : '-100%' }}
                    animate={{ x, scale, zIndex, opacity, rotateY, filter: `blur(${blur})` }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="absolute w-[60%] max-w-[800px] aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                  >
                    <div className="relative w-full h-full group">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Featured Badge */}
                      {position === 0 && (
                        <div className="absolute top-8 left-8 bg-[#D4A017] text-white text-[10px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg uppercase">
                          Featured
                        </div>
                      )}

                      {/* Content Area */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <div className="flex items-end justify-between gap-6">
                          <div className="max-w-2xl">
                            {position === 0 && (
                              <p className="text-[#D4A017] font-signature text-2xl mb-2 italic">
                                Discovery {String(index + 1).padStart(2, '0')}
                              </p>
                            )}
                            <h3 className={`text-white font-serif font-bold ${position === 0 ? 'text-4xl md:text-5xl mb-4' : 'text-2xl'}`}>
                              {attraction.name}
                            </h3>
                            {position === 0 && (
                              <>
                                <p className="text-white/80 text-lg leading-relaxed mb-4 max-w-xl line-clamp-2">
                                  {attraction.desc}
                                </p>
                              </>
                            )}
                          </div>


                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>


      </div>
    </section>
  );
};

export default AttractionSlider;
