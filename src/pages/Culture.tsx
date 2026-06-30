import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/layout/Container';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { cultureData, type CultureItem } from '../data/cultureData';

const Culture = () => {
  const [selectedItem, setSelectedItem] = useState<CultureItem | null>(null);
  
  const festivals = cultureData.filter(c => c.type === "Festival");
  const foods = cultureData.filter(c => c.type === "Food");

  const renderCultureCard = (item: CultureItem) => (
    <div key={item.id} className="bg-[#fdf9ef] rounded-[2rem] shadow-lg overflow-hidden flex flex-col group border border-[#e2d5b8] transform transition-transform hover:-translate-y-2 duration-300">
      <div className="relative h-64 overflow-hidden p-2">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover rounded-t-[1.5rem] rounded-b-xl group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#5c3a21] text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full opacity-90 shadow-md">
          {item.district}
        </div>
      </div>
      <div className="p-6 text-center flex-1 flex flex-col items-center">
        <h3 className="text-xl font-bold text-[#5c3a21] mb-3">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {item.description}
        </p>
        <div className="mt-auto">
          <button 
            onClick={() => setSelectedItem(item)}
            className="text-[#d4a017] font-bold text-sm uppercase tracking-wider hover:text-[#5c3a21] transition-colors flex items-center gap-1 group-hover:underline underline-offset-4"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-white relative">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center bg-[#f7f3e8] pt-16 overflow-hidden">
        {/* The generated high-def artwork. It naturally fades to paper color on the left. */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/culture/hero-artwork.png" 
            alt="Bihar Culture Hero" 
            className="w-full h-full object-cover object-right lg:object-center"
          />
        </div>
        
        {/* Left Side Content Container */}
        <Container>
          <div className="relative z-10 w-full md:w-1/2 lg:w-2/5 pr-4 flex flex-col items-start justify-center pt-20">
            <h2 className="text-[#d4a017] text-lg md:text-xl font-semibold mb-4 uppercase tracking-[0.2em]">
              Srinivaso Vijayathe!
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#5c3a21] mb-6 leading-tight font-serif drop-shadow-sm">
              Welcome to the Heart of <br/> Bihar Culture
            </h1>
            <p className="text-gray-800 text-lg mb-8 leading-relaxed">
              Please come and explore the rich heritage, classical art forms, and traditional culinary delights that define our beautiful state.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => document.getElementById('explore-all')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#5c3a21] hover:bg-[#4a2e1a] text-white font-bold py-3 px-8 rounded-sm tracking-wider uppercase transition-colors shadow-lg"
              >
                Explore All
              </button>
            </div>
          </div>
        </Container>
        
        {/* Torn paper divider effect at the bottom */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-white" style={{ clipPath: 'polygon(0% 100%, 5% 40%, 10% 80%, 15% 20%, 20% 90%, 25% 30%, 30% 70%, 35% 10%, 40% 80%, 45% 40%, 50% 100%, 55% 50%, 60% 90%, 65% 20%, 70% 80%, 75% 30%, 80% 90%, 85% 10%, 90% 70%, 95% 40%, 100% 100%, 100% 100%, 0% 100%)' }}></div>
      </section>

      {/* Intro section with ornate border top/bottom motif concept */}
      <div className="w-full py-8 bg-white text-center">
         <img src="/images/culture/ornate-divider.png" alt="" className="mx-auto h-4 opacity-50" onError={(e) => e.currentTarget.style.display = 'none'} />
      </div>

      {/* Welcome Section with Bihar Map Mask */}
      <section className="bg-white py-16 px-4 md:px-8">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 lg:pr-10">
              <h3 className="text-[#d4a017] text-sm font-bold uppercase tracking-[0.2em] mb-2">Heritage</h3>
              <h2 className="text-3xl md:text-4xl font-bold text-[#5c3a21] mb-6 uppercase tracking-wide font-serif">
                Welcome to Bihar Culture
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Bihar's cultural heritage is one of the oldest in the world, marked by a rich tapestry of festivals, art forms, and culinary delights. From the ancient teachings of Lord Buddha and Mahavira to the vibrant celebrations of Chhath Puja, the state offers a profound journey into spirituality and tradition.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                The harmonious blend of diverse communities has resulted in unique customs, folk songs, and crafts like Madhubani painting that continue to thrive today.
              </p>
              <button 
                onClick={() => document.getElementById('explore-all')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#5c3a21] hover:bg-[#4a2e1a] text-white font-bold py-3 px-8 rounded-sm tracking-wider uppercase transition-colors"
              >
                Discover More
              </button>
            </div>
            <div className="flex-1 flex justify-center relative w-full max-w-lg">
              <div 
                className="w-full aspect-square bg-[#fdf9ef] flex items-center justify-center p-4 relative"
                style={{
                  WebkitMaskImage: "url('/images/culture/bihar-map-mask.svg')",
                  maskImage: "url('/images/culture/bihar-map-mask.svg')",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center"
                }}
              >
                <div className="absolute inset-0 bg-[#d4a017] mix-blend-multiply opacity-20"></div>
                <img 
                  src="/images/culture/sonepur-mela.png" 
                  alt="Bihar Culture" 
                  className="w-full h-full object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Comprehensive Culture Display Section */}
      <section id="explore-all" className="bg-[#5c3a21] py-20 px-4 md:px-8 relative">
        {/* Decorative background pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#d4a017 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
        <Container>
          <div className="relative z-10 text-center mb-16">
             <h3 className="text-[#d4a017] text-sm font-bold uppercase tracking-[0.2em] mb-2">Explore All</h3>
             <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wide font-serif mb-6">
               Festivals & Celebrations
             </h2>
             <p className="text-gray-300 max-w-2xl mx-auto">
               Experience the vibrant colors and deep spirituality of Bihar's most prominent festivals, deeply rooted in history and tradition.
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 relative z-10">
            {festivals.map(renderCultureCard)}
          </div>

          {/* Section Divider */}
          <div className="w-full py-12 flex justify-center relative z-10">
            <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-[#d4a017] to-transparent"></div>
          </div>

          <div className="relative z-10 text-center mb-16">
             <h3 className="text-[#d4a017] text-sm font-bold uppercase tracking-[0.2em] mb-2">Taste The Tradition</h3>
             <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wide font-serif mb-6">
               Culinary Delights
             </h2>
             <p className="text-gray-300 max-w-2xl mx-auto">
               Savor the authentic flavors of Bihar. Our cuisine is a testament to the region's rich agricultural heritage and centuries-old recipes.
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {foods.map(renderCultureCard)}
          </div>
        </Container>
      </section>

      {/* Support Us Section */}
      <section className="bg-[#fcf9ef] py-20 px-4 md:px-8 text-center border-t-8 border-[#d4a017]">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wide text-[#5c3a21] font-serif">
            Become a Member of Bihar Darshan
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed mb-8">
            Original written and documented cultural experiences for more than 100 historical items. Become a member of our community to get complete access to exclusive heritage content, events, and tours.
          </p>
          <button className="bg-[#d4a017] hover:bg-[#c29112] text-[#5c3a21] font-bold py-4 px-12 rounded-sm tracking-widest uppercase transition-colors shadow-lg">
            Join Membership
          </button>
        </Container>
      </section>

      <Footer />

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fdf9ef] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative border-4 border-[#e2d5b8]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 hover:bg-white text-[#5c3a21] rounded-full flex items-center justify-center shadow-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Image Side */}
                <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] relative">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div className="bg-[#5c3a21] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                      {selectedItem.district}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-sm font-bold text-[#d4a017] uppercase tracking-[0.2em] mb-2">{selectedItem.type}</h3>
                  <h2 className="text-3xl font-bold text-[#5c3a21] mb-6 font-serif">{selectedItem.title}</h2>
                  <div className="h-px w-16 bg-[#d4a017] mb-6"></div>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedItem.longDescription || selectedItem.description}
                  </p>
                </div>
              </div>

              {/* Extended Details Section */}
              {selectedItem.extendedDetails && selectedItem.extendedDetails.length > 0 && (
                <div className="px-8 md:px-10 py-6 bg-white/50 border-t border-[#e2d5b8]">
                  <h4 className="text-lg font-bold text-[#5c3a21] mb-4">More Details</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {selectedItem.extendedDetails.map((detail, idx) => (
                      <li key={idx} className="leading-relaxed">{detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Video Section */}
              {selectedItem.videoUrl && (
                <div className="px-8 md:px-10 py-6 border-t border-[#e2d5b8]">
                  <h4 className="text-lg font-bold text-[#5c3a21] mb-4">Featured Video</h4>
                  <div className="aspect-video w-full rounded-xl overflow-hidden shadow-md">
                    <iframe 
                      src={selectedItem.videoUrl} 
                      title={`${selectedItem.title} Video`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Gallery Section */}
              {selectedItem.galleryImages && selectedItem.galleryImages.length > 0 && (
                <div className="px-8 md:px-10 py-6 border-t border-[#e2d5b8] bg-white/50">
                  <h4 className="text-lg font-bold text-[#5c3a21] mb-4">Photo Gallery</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedItem.galleryImages.map((img, idx) => (
                      <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-sm">
                        <img src={img} alt={`${selectedItem.title} Gallery ${idx}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"/>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="px-8 md:px-10 py-6 border-t border-[#e2d5b8] flex justify-end">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="border border-[#5c3a21] text-[#5c3a21] hover:bg-[#5c3a21] hover:text-white font-bold py-2 px-8 rounded-full tracking-widest uppercase transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Culture;
