import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <AboutUs />;
      case 'services':
        return <Services />;
      case 'projects':
        return <Projects />;
      case 'faq':
        return <FAQ />;
      case 'contact':
        return <Contact />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;