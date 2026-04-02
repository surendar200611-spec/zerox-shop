import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WhatsAppButton from './components/WhatsAppButton';
import './styles/glassy.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default App;
