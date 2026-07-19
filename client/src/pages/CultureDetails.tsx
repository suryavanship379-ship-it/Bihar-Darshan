import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAdminData } from '../data/AdminContext';
import { useContributions } from '../data/ContributionContext';
import { MapPin, Utensils, PartyPopper } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CultureDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { cultureSubmissions } = useContributions();
  const { culture: cultureData } = useAdminData();

  const combinedCulture = [...cultureSubmissions, ...cultureData];
  const cultureItem = combinedCulture.find((item) => item.id.toString() === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!cultureItem) {
    return <Navigate to="/discover" />;
  }

  return (
    <div className="min-h-screen bg-brand-gray text-brand-dark font-sans overflow-x-hidden relative">
      <Navbar forceDarkText={true} />

      {/* Main Content Wrapper */}
      <div className="relative z-10 pt-32 pb-20 max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/culture" className="inline-flex items-center text-gray-500 hover:text-brand-dark font-bold uppercase transition-colors text-sm tracking-wide">
            <span className="mr-2">←</span> Back to Culture
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-brand-gold px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 text-brand-dark shadow-sm">
                {cultureItem.type === "Festival" ? <PartyPopper size={14} /> : <Utensils size={14} />}
                {cultureItem.type}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-bold text-gray-500">
                <MapPin size={16} />
                {cultureItem.district}
              </span>
              {cultureItem.submittedBy && (
                <span className="text-sm font-bold text-brand-gold">
                  By {cultureItem.submittedBy}
                </span>
              )}
            </div>

            <h1 className="font-display font-bold text-4xl md:text-6xl text-gray-900 mb-6 leading-tight">
              {cultureItem.title}
            </h1>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {cultureItem.longDescription || cultureItem.description}
            </p>

            {cultureItem.extendedDetails && cultureItem.extendedDetails.length > 0 && (
              <div className="space-y-4 mb-8">
                {cultureItem.extendedDetails.map((detail, index) => (
                  <p key={index} className="text-lg text-gray-600 leading-relaxed">
                    {detail}
                  </p>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Gallery Section */}
        {((cultureItem.galleryImages && cultureItem.galleryImages.length > 0) || cultureItem.image) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-16"
          >
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 inline-block relative">
                Gallery
                <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-brand-gold rounded-full" />
              </h2>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-sm">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="w-full !pb-16"
              >
                {(cultureItem.galleryImages && cultureItem.galleryImages.length > 0
                  ? cultureItem.galleryImages
                  : [cultureItem.image]
                ).map((src, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md group aspect-[4/3] cursor-pointer">
                      <img
                        src={src}
                        alt={`${cultureItem.title} Gallery ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CultureDetails;
