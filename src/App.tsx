import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Districts from './pages/Districts';
import Culture from './pages/Culture';
import Tourism from './pages/Tourism';
import Tribals from './pages/Tribals';
import TribeDetail from './pages/TribeDetail';
import Gallery from './pages/Gallery';
import DistrictsDetails from './pages/DistrictsDetails';
import LoginPage from './pages/Login';
import Profile from './pages/Profile';
import Community from './pages/Community';
import MarketPlace from './pages/MarketPlace';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const isTranslated = document.cookie.includes("googtrans=/en/") && !document.cookie.includes("googtrans=/en/en");
    if (isTranslated) {
      setIsTranslating(true);
      const timer = setTimeout(() => setIsTranslating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <>
      <div 
        className={`fixed inset-0 z-[9999] bg-[#1a1a1a] flex flex-col items-center justify-center pointer-events-none ${
          isTranslating 
            ? 'opacity-100 transition-none' 
            : 'opacity-0 transition-opacity duration-500'
        }`}
      >
        <div className="w-12 h-12 border-4 border-[#D4A017]/20 border-t-[#D4A017] rounded-full animate-spin" />
        <p className="text-[#D4A017] mt-4 text-sm font-semibold tracking-wider animate-pulse uppercase">Translating...</p>
      </div>
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/districts" element={<Districts />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/community" element={<Community />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/Marketplace" element={<MarketPlace />} />
          <Route path="/tourism" element={<Tourism />} />
          <Route path="/tribals" element={<Tribals />} />
          <Route path="/tribals/:id" element={<TribeDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/districts/:name" element={<DistrictsDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </PageTransition>
    </Router>
  );
}

export default App;

