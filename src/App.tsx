import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Culture from './pages/Culture';
import Tourism from './pages/Tourism';
import Tribals from './pages/Tribals';
import Gallery from './pages/Gallery';
import DistrictsDetails from './pages/DistrictsDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/tourism" element={<Tourism />} />
        <Route path="/tribals" element={<Tribals />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/districts/:name" element={<DistrictsDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

