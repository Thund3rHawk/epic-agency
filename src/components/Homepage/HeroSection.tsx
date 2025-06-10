'use client'
import React from 'react'
import JournalCard from './JournalCard'
import HeroHeading from './HeroHeading';
import AnimatedBackground from './AnimatedBackground';

const HeroSection = () => {
  return (
    <div
      className="min-h-screen container mx-auto flex justify-between items-end py-44"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <AnimatedBackground />
    </div>
  )
}

export default HeroSection