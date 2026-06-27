import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Districts from './pages/Districts';
import Culture from './pages/Culture';
import Tourism from './pages/Tourism';
import Tribals from './pages/Tribals';
import TribeDetail from './pages/TribeDetail';
import Gallery from './pages/Gallery';
import DistrictsDetails from './pages/DistrictsDetails';
import LoginPage from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/districts" element={<Districts />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/tourism" element={<Tourism />} />
        <Route path="/tribals" element={<Tribals />} />
        <Route path="/tribals/:id" element={<TribeDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/districts/:name" element={<DistrictsDetails />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;

