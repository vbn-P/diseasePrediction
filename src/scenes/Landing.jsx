import React from 'react'
import Footer from '../components/landing/Footer';
import About from '../components/landing/About';
import Home from './Home';
import Team from '../components/landing/Team';
import TopNavbar from '../components/landing/TopNavbar';

function Landing() {
  return (
    <div className="app-container">
      <TopNavbar />
      <Home />
      <About />
      <Team />
      <Footer />
      </div>
  )
}

export default Landing