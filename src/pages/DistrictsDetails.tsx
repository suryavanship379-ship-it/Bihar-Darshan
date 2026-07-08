import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import {
  Users,
  Maximize,
  BookOpen,

  Globe
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import AttractionSlider from '../components/districts/AttractionSlider';

import DistrictAbout from '../components/districts/DistrictAbout';

import { cultureData } from '../data/cultureData';
import { galleryData } from '../data/galleryData';
import { featuredTrips } from '../data/tourismData';

// Assets
import patnaHero from '../assets/patna-district.png';
import golgharImg from '../assets/hero.png'; // Using hero as Golghar placeholder if detailed image is missing

const DistrictsDetails = () => {
  const { name } = useParams();

  // Format the name for display (e.g., "patna" -> "Patna")
  const districtName = name ? name.charAt(0).toUpperCase() + name.slice(1) : "Patna";

 useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  });
}, [name]);

  const stats = [
    { icon: <Globe size={20} />, label: "Division", value: districtName },
    { icon: <Maximize size={20} />, label: "Area", value: "3202 km²" },
    { icon: <Users size={20} />, label: "Population", value: "58,38,000+" },
    { icon: <BookOpen size={20} />, label: "Language", value: "Hindi, Urdu, English" },
  ];



  // Dynamically gather attractions for the current district based on our data sources
  const districtCulture = cultureData.filter(c => c.district.toLowerCase() === districtName.toLowerCase());
  const districtGallery = galleryData.filter(g => g.location.toLowerCase().includes(districtName.toLowerCase()));
  const districtTrips = featuredTrips.filter(t => t.departureCity.toLowerCase() === districtName.toLowerCase() || t.places.some(p => p.toLowerCase().includes(districtName.toLowerCase())));

  let dynamicAttractions = [
    // 1. Map Culture Data (Food, Festivals)
    ...districtCulture.map(c => ({
      name: c.title,
      image: c.image,
      desc: c.description,
      category: (c.type === "Food" ? "Food" : c.type === "Festival" ? "Festivals" : "Places") as any
    })),

    // 2. Map Gallery Data (Places, Politicians/Personalities, Heritage)
    ...districtGallery.map(g => {
      let mappedCategory = "Places";
      if (g.category === "Politicians") mappedCategory = "Personalities";
      else if (g.category === "Food") mappedCategory = "Food";
      else if (g.category === "Festivals") mappedCategory = "Festivals";

      return {
        name: g.title,
        image: g.image,
        desc: `A stunning ${g.category.toLowerCase()} feature located in ${g.location}.`,
        category: mappedCategory as any
      };
    }),

    // 3. Map Tourism Trips
    ...districtTrips.map(t => ({
      name: t.title,
      image: t.image,
      desc: t.description,
      category: "Places" as any
    }))
  ];

  // If we don't have enough data for the specific district, fetch some popular ones globally as a fallback
  if (dynamicAttractions.length < 3) {
    const fallback = [
      ...galleryData.filter(g => g.category === "Politicians" || g.category === "Places").slice(0, 3).map(g => ({
        name: g.title,
        image: g.image,
        desc: `A renowned ${g.category.toLowerCase()} feature.`,
        category: (g.category === "Politicians" ? "Personalities" : "Places") as any
      })),
      ...cultureData.slice(0, 3).map(c => ({
        name: c.title,
        image: c.image,
        desc: c.description,
        category: (c.type === "Food" ? "Food" : c.type === "Festival" ? "Festivals" : "Places") as any
      }))
    ];

    // De-duplicate items based on name before appending
    const existingNames = new Set(dynamicAttractions.map(a => a.name));
    fallback.forEach(f => {
      if (!existingNames.has(f.name)) {
        dynamicAttractions.push(f);
        existingNames.add(f.name);
      }
    });
  }

  return (
    <div className="min-h-screen bg-brand-gray">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={patnaHero}
            alt="Patna"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r
from-black/70
via-black/45
to-black/20" />

          <div className="absolute inset-0 bg-gradient-to-t
from-black/60
via-transparent
to-black/20" />
        </div>

        <Container className="relative z-10 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl pl-4 md:pl-8 lg:pl-2"
          >


            <h1 className="text-7xl md:text-8xl font-serif text-white font-bold mb-4">
              {districtName}
            </h1>
            <p className="text-2xl md:text-3xl font-signature text-brand-gold mb-8 italic">
              The Timeless Capital of Bihar
            </p>
            <p className="text-lg text-white/90 leading-relaxed mb-10 max-w-2xl">
              A city where ancient history meets modern aspirations.
              Explore the heritage, culture, and vibrant life of Patna.
            </p>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 max-w-5xl shadow-2xl">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full border border-brand-gold/30 bg-brand-gold/5 flex items-center justify-center text-brand-gold shrink-0">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] uppercase tracking-[0.15em] font-medium mb-0.5">{stat.label}</p>
                    <p className="text-white font-bold text-base tracking-wide">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* About District Section */}
      <DistrictAbout
        districtName={districtName}
        image={golgharImg}
        stats={stats}
      />



      {/* Top Attractions Slider */}
      <AttractionSlider
        title={`Top Attractions in ${districtName}`}
        attractions={dynamicAttractions}
      />

      <Footer />
    </div>
  );
};

export default DistrictsDetails;
