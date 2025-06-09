import Footer from '@/components/Footer'
import AboutSection from '@/components/Homepage/AboutSection'
import HeroSection from '@/components/Homepage/HeroSection'
import ServiceSection from '@/components/Homepage/ServiceSection'
import Showreel from '@/components/Homepage/Showreel'
import React from 'react'

const Homepage = () => {
  return (
    <div>
        <HeroSection/>
        <Showreel/>
        <AboutSection/>
        <ServiceSection/>
        <Footer/>
    </div>
  )
}

export default Homepage