import Navbar from "../components/layout/Navbar";
import Hero from "../components/tourism/Hero";
import FeaturedJourneys from "../components/tourism/FeaturedJourneys";
import PremiumFooter from "../components/tourism/PremiumFooter";

const Tourism = () => {
  return (
    <main className="bg-[#F8F5EF] selection:bg-brand-gold selection:text-brand-dark font-sans">
      <Navbar />

      <Hero />

      <FeaturedJourneys />

      <PremiumFooter />

      {/* Global Aesthetics Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-multiply">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
      </div>
    </main>
  );
};

export default Tourism;
