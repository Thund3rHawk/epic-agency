'use client'
import Footer from '@/components/Footer'
import AboutSection from '@/components/Homepage/AboutSection'
import HeroSection from '@/components/Homepage/HeroSection'
import ServiceSection from '@/components/Homepage/ServiceSection'
import Showreel from '@/components/Homepage/Showreel'
import useColorCtx from '@/hooks/useColorCtx'
import React from 'react'

const Homepage = () => {
  const {color} = useColorCtx();
  return (
    <div style={{ backgroundColor: color }}>
        <HeroSection/>
        <Showreel/>
        <AboutSection/>
        <ServiceSection/>
        <Footer/>
    </div>
  )
}

export default Homepage