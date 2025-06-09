'use client'
import { Circle } from '@mui/icons-material'
import React from 'react'

const Showreel = () => {
  return (
    <div className='container mx-auto border-t border-b border-t-black border-b-black pb-20 pt-6'>
        <h1 className='uppercase text-center text-xs my-16'>showreel</h1>
          <div className="relative w-full flex justify-center">
            <div className="relative">
              <img
                src="https://img.youtube.com/vi/aMI-vmQpNLs/maxresdefault.jpg"
                alt="Showreel Thumbnail"
                width={1200}
                height={600}
                className="rounded-lg"
              />
              <button
                className="absolute inset-0 flex items-center justify-center w-full h-full bg-transparent bg-opacity-40 hover:bg-opacity-60 transition"
                onClick={() => window.open('https://www.youtube.com/watch?v=aMI-vmQpNLs', '_blank')}
                aria-label="Play Showreel"
              >
                {/* Custom Play Button SVG */}
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <Circle cx="40" cy="40" r="40" fill="white" fillOpacity="0.8"/>
                  <polygon points="32,25 60,40 32,55" fill="#111"/>
                </svg>
              </button>
            </div>
          </div>
    </div>
  )
}

export default Showreel