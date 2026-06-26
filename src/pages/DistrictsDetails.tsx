import { motion } from 'framer-motion';
import {
  Users,
  Maximize,
  BookOpen,
  History,
  Palmtree,
  GraduationCap,
  Train,
  Camera,
  ChevronRight,
  Globe
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import Carousel from '../components/common/Carousel';

// Assets
import patnaHero from '../assets/patna-district.png';
import golgharImg from '../assets/hero.png'; // Using hero as Golghar placeholder if detailed image is missing
import patnaSahib from '../assets/patna-sahib.png';
import mahavirMandir from '../assets/bihar-temple.png';
import patnaMuseum from '../assets/bihar-monument.png';

const DistrictsDetails = () => {
  const stats = [
    { icon: <Globe size={20} />, label: "Division", value: "Patna" },
    { icon: <Maximize size={20} />, label: "Area", value: "3202 km²" },
    { icon: <Users size={20} />, label: "Population", value: "58,38,000+" },
    { icon: <BookOpen size={20} />, label: "Language", value: "Hindi, Urdu, English" },
  ];

  const highlights = [
    { icon: <History className="text-brand-gold" />, title: "Historical Significance", desc: "Ancient capital of Magadh and Maurya Empire" },
    { icon: <Palmtree className="text-brand-gold" />, title: "Cultural Hub", desc: "Blend of ancient traditions and modern lifestyle" },
    { icon: <GraduationCap className="text-brand-gold" />, title: "Educational Center", desc: "Home to top universities and institutions" },
    { icon: <Train className="text-brand-gold" />, title: "Connectivity", desc: "Well connected by air, rail & road" },
    { icon: <Camera className="text-brand-gold" />, title: "Tourism", desc: "Temples, museums, parks & heritage sites" },
  ];

  const attractions = [
    { name: "Golghar", image: golgharImg, desc: "Iconic granary with panoramic views" },
    { name: "Mahavir Mandir", image: mahavirMandir, desc: "Famous temple dedicated to Lord Hanuman" },
    { name: "Patna Museum", image: patnaMuseum, desc: "Explore artifacts from Bihar's rich past" },
    { name: "Takht Sri Harmandir Sahib", image: patnaSahib, desc: "One of the holiest Sikh shrines" },
    { name: "Sanjay Gandhi Biological Park", image: patnaHero, desc: "A popular zoo and botanical garden" },
  ];

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
            <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
              <span>Home</span>
              <ChevronRight size={14} />
              <span>Districts</span>
              <ChevronRight size={14} />
              <span className="text-brand-gold font-medium">Patna</span>
            </nav>

            <h1 className="text-7xl md:text-8xl font-serif text-white font-bold mb-4">
              Patna
            </h1>
            <p className="text-2xl md:text-3xl font-signature text-brand-gold mb-8 italic">
              The Timeless Capital of Bihar
            </p>
            <p className="text-lg text-white/90 leading-relaxed mb-10 max-w-2xl">
              A city where ancient history meets modern aspirations.
              Explore the heritage, culture, and vibrant life of Patna.
            </p>

            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-5xl shadow-2xl">
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

        {/* Curved Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-brand-gray rounded-t-[2rem] z-20" />
      </section>

      {/* Decorative Border Section (Folk Art Style) */}
      <div className="bg-brand-gray py-0">
        <div className="h-14 w-full bg-[url('https://www.transparenttextures.com/patterns/cream-pixels.png')] opacity-10 flex items-center justify-center border-y border-brand-gold/10 overflow-hidden">
          <span className="text-brand-gold/20 font-serif text-3xl whitespace-nowrap tracking-[1em]">
            ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜ ⚜
          </span>
        </div>
      </div>

      {/* About Section */}
      <section className="pt-10 pb-20 bg-brand-gray">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-brand-dark mb-2">About Patna</h2>
              <div className="w-12 h-1.5 bg-brand-gold mb-8" />
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Patna, the capital city of Bihar, is one of the world's oldest continuously inhabited places.
                  Steeped in history, it was once known as Pataliputra, the glorious capital of the Maurya Empire.
                </p>
                <p>
                  Today, it blends a rich cultural heritage with a rapidly growing urban landscape, serving as
                  the gateway to the historic heart of ancient India.
                </p>
              </div>
              <button className="mt-10 px-8 py-3 rounded-full border border-brand-gold text-brand-gold font-bold hover:bg-brand-gold hover:text-brand-dark transition-all flex items-center gap-2">
                Know More About Patna <ChevronRight size={18} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[450px]"
            >
              <img
                src={golgharImg}
                alt="Golghar"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Patna Highlights */}
      <section className="py-20 bg-[#F5F5F0]">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">Patna Highlights</h2>
            <div className="w-16 h-1.5 bg-brand-gold mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center"
              >
                <div className="mb-4 p-3 bg-brand-gray rounded-xl">
                  {item.icon}
                </div>
                <h3 className="font-bold text-brand-dark text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Top Attractions Carousel */}
      <section className="py-24 bg-brand-gray">
        <Carousel
          title="Top Attractions in Patna"
          subtitle="Explore"
          actionLabel="View All Attractions"
        >
          {attractions.map((place, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-md w-[320px] flex-shrink-0">
              <div className="h-64 overflow-hidden">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-brand-dark mb-2">{place.name}</h3>
                <p className="text-gray-500 text-sm">{place.desc}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      <Footer />
    </div>
  );
};

export default DistrictsDetails;
