import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import LatestArticlesSection from '../components/tribals/LatestArticlesSection';
import TribeCulturalSections from '../components/tribals/CulturalHighlightsGrid';
import { getTribeCulturalSections } from '../data/tribeCulturalData';
import { useAdminData } from '../data/AdminContext';


const TribeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { tribes } = useAdminData();
  const [tribe, setTribe] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const foundTribe = tribes.find((t: any) => t.id === id);
    if (foundTribe) {
      setTribe(foundTribe);
      setIsLoading(false);
    } else {
      const fetchTribe = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/v1/tribes/${id}`);
          const data = await res.json();
          if (data.success && data.data.tribe) {
            setTribe(data.data.tribe);
          }
        } catch (error) {
          console.error("Error fetching tribe:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchTribe();
    }
  }, [id, tribes]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#8B3E2F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!tribe) {
    return <Navigate to="/tribals" />;
  }

  return (
    <div className="min-h-screen bg-[#FCEBD3] text-[#8B3E2F] overflow-x-hidden relative">
      <Navbar forceDarkText={true} />

      {/* Global Parchment Background Texture */}
      <div
        className="fixed inset-0 z-0 opacity-100 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "url('/images/tribals/parchment_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Main Content Wrapper */}
      <div className="relative z-10 pt-32 pb-20 max-w-[1400px] mx-auto px-4 sm:px-8 font-serif">

        {/* Back Button */}
        <div className="mb-12">
          <Link to="/tribals" className="inline-flex items-center text-[#8B3E2F] hover:text-[#8B3E2F] font-bold tracking-widest uppercase transition-colors">
            <span className="mr-2">←</span> Back to Directory
          </Link>
        </div>

        {/* Decorative Elements */}
        <motion.img
          initial={{ opacity: 0, rotate: -20 }} animate={{ opacity: 0.6, rotate: -10 }} transition={{ duration: 1 }}
          src="/images/tribals/bow_nobg.png" className="absolute top-40 right-4 lg:right-20 w-32 lg:w-48 object-contain z-0 mix-blend-multiply pointer-events-none" alt=""
        />
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.5, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
          src="/images/tribals/fish_nobg.png" className="absolute top-[80vh] left-4 lg:left-12 w-24 lg:w-36 object-contain z-0 mix-blend-multiply pointer-events-none" alt=""
        />

        {/* Tribe Section */}
        <div className="relative flex flex-col items-center mb-16 mt-8">

          {/* Header Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl text-[#8B3E2F] mb-2 tracking-widest font-bold">{tribe.hindiName}</h2>
            <h1 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-[0.2em] text-[#8B3E2F] border-b border-[#8B3E2F]/30 pb-4 inline-block">
              {tribe.englishName}
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto italic text-[#8B3E2F]">
              {tribe.description || tribe.shortDesc}
            </p>
          </motion.div>

          {/* Infographic Layout */}
          <div className="w-full max-w-6xl mx-auto mt-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">

              {/* Left Info Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-4 flex flex-col order-2 lg:order-1 text-center lg:text-right px-4 lg:px-0"
              >
                <div className="bg-[#FCEBD3]/50 lg:bg-transparent p-6 lg:p-0 rounded-2xl lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none border border-[#8B3E2F]/10 lg:border-none shadow-sm lg:shadow-none lg:translate-y-8">
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-3 text-[#8B3E2F] border-b lg:border-b-0 lg:border-r-4 border-gold lg:pr-4 pb-2 lg:pb-0 inline-block lg:block">
                    {tribe.leftTitle || "Cultural Heritage"}
                  </h3>
                  <p className="text-[1.05rem] leading-relaxed text-[#8B3E2F] mt-2 font-medium">
                    {tribe.leftDesc}
                  </p>
                </div>
              </motion.div>

              {/* Central Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-4 flex justify-center order-1 lg:order-2 px-0 z-10"
              >
                <img
                  src={tribe.image}
                  alt={tribe.englishName}
                  className="w-full max-w-[20rem] lg:max-w-[26rem] h-auto object-contain drop-shadow-2xl my-8 mix-blend-multiply"
                />
              </motion.div>

              {/* Right Info Column */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-4 flex flex-col order-3 text-center lg:text-left px-4 lg:px-0"
              >
                <div className="bg-[#FCEBD3]/50 lg:bg-transparent p-6 lg:p-0 rounded-2xl lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none border border-[#8B3E2F]/10 lg:border-none shadow-sm lg:shadow-none mt-4 lg:mt-0 lg:-translate-y-8">
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-3 text-[#8B3E2F] border-b lg:border-b-0 lg:border-l-4 border-gold lg:pl-4 pb-2 lg:pb-0 inline-block lg:block">
                    {tribe.rightTitle || "Traditional Practices"}
                  </h3>
                  <p className="text-[1.05rem] leading-relaxed text-[#8B3E2F] mt-2 font-medium">
                    {tribe.rightDesc}
                  </p>
                </div>
              </motion.div>

            </div>

            {/* Bottom Info Block */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl mx-auto text-center px-4 mt-12 relative z-20"
            >
              <div className="bg-[#FCEBD3]/60 p-6 rounded-2xl border border-[#8B3E2F]/10 shadow-sm">
                <p className="text-[1.1rem] leading-relaxed text-[#8B3E2F] italic font-medium">
                  {tribe.bottomDesc}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Cultural Highlights */}
          <div className="w-full max-w-6xl mx-auto mt-20 mb-20 px-4 lg:px-0 relative z-20">
            <TribeCulturalSections sections={(tribe.cultureSections && tribe.cultureSections.length > 0) ? tribe.cultureSections : getTribeCulturalSections(id || '', tribe.englishName)} />
          </div>

          {/* Latest Articles Section */}
          <LatestArticlesSection tribeName={tribe.englishName} />

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default TribeDetail;
