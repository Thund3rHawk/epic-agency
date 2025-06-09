'use client'
import React from 'react'
import JournalCard from './JournalCard'
import HeroHeading from './HeroHeading';

const HeroSection = () => {
  return (
    <div className='min-h-screen container mx-auto flex justify-between items-end py-44'>
        <HeroHeading/>
        <JournalCard/>
    </div>
  )
}

export default HeroSection