import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Expertise from './pages/Expertise';
import Pricing from './pages/Pricing';
import Story from './pages/Story';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Admin from './pages/Admin';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navigation />
      <main className="page-transition" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/story" element={<Story />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/admin/verify" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;