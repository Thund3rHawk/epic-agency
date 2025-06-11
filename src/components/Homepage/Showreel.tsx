'use client'
import React, { useRef, useState } from 'react'

const Showreel = () => {
  const [isPlaying, setIsPlaying] = useState(false)
            const iframeRef = useRef<HTMLIFrameElement>(null)
            const btnRef = useRef<HTMLButtonElement>(null)
            const [btnPos, setBtnPos] = useState({ x: 0, y: 0 })

            const handlePlay = () => {
              setIsPlaying(true)
              // Play the video via postMessage API
              iframeRef.current?.contentWindow?.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                '*'
              )
            }

            const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              if (!btnRef.current) return
              const rect = btnRef.current.getBoundingClientRect()
              const parentRect = e.currentTarget.getBoundingClientRect()
              const mouseX = e.clientX - parentRect.left
              const mouseY = e.clientY - parentRect.top
              const btnCenterX = rect.left - parentRect.left + rect.width / 2
              const btnCenterY = rect.top - parentRect.top + rect.height / 2
              const dx = mouseX - btnCenterX
              const dy = mouseY - btnCenterY
              const distance = Math.sqrt(dx * dx + dy * dy)
              const maxDist = 60
              if (distance < maxDist) {
                setBtnPos({ x: dx * 0.3, y: dy * 0.3 })
              } else {
                setBtnPos({ x: 0, y: 0 })
              }
            }

            const handleMouseLeave = () => setBtnPos({ x: 0, y: 0 })
  return (
    <div className='container mx-auto border-t border-b border-t-black border-b-black pb-20 pt-6'>
        <h1 className='uppercase text-center text-xs my-16'>showreel</h1>
          <div className="relative w-full flex justify-center">
            

            <div
              className="relative group w-[1200px] h-[600px] flex items-center justify-center"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <iframe
                ref={iframeRef}
                width="1200"
                height="600"
                src={`https://www.youtube.com/embed/LXb3EKWsInQ?si=P9gApScy0D5yl9JK&enablejsapi=1${isPlaying ? '&autoplay=1' : ''}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="pointer-events-none"
              ></iframe>
                {!isPlaying && (
                  <button
                    ref={btnRef}
                    id="custom-play-btn"
                    className="absolute w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer z-10"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    aria-label="Play Video"
                    onClick={handlePlay}
                  >
                    <span
                      className="block"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: `translate(${btnPos.x}px, ${btnPos.y}px)`,
                        transition: 'transform 0.2s',
                        position: 'relative',
                      }}
                    >
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="24" fill="#000" opacity="0.7"/>
                        <polygon points="20,16 36,24 20,32" fill="#fff"/>
                      </svg>
                      {/* Animated "play video" text in a circle */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: 70,
                          height: 70,
                          pointerEvents: 'none',
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <svg width="70" height="70" viewBox="0 0 70 70">
                          <defs>
                            <path
                              id="circlePath"
                              d="M35,35 m-28,0 a28,28 0 1,1 56,0 a28,28 0 1,1 -56,0"
                            />
                          </defs>
                          <g>
                            <text fill="#000" fontSize="12" fontFamily="Arial" letterSpacing="2">
                                <textPath
                                href="#circlePath"
                                startOffset="0"
                                textLength="175"
                                lengthAdjust="spacingAndGlyphs"
                                >
                                play video    play video    
                                </textPath>
                            </text>
                            <animateTransform
                              attributeName="transform"
                              attributeType="XML"
                              type="rotate"
                              from="0 35 35"
                              to="360 35 35"
                              dur="6s"
                              repeatCount="indefinite"
                            />
                          </g>
                        </svg>
                      </div>
                    </span>
                  </button>
                )}
            </div>
          </div>
    </div>
  )
}

export default Showreel