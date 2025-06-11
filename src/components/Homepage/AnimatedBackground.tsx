import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import HeroHeading from "./HeroHeading";
import JournalCard from "./JournalCard";
import { backgrounds } from "@/constants/Backgrounds";
import useColorCtx from "@/hooks/useColorCtx";

const AnimatedBackground: React.FC = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [nextBgIndex, setNextBgIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const { setColor } = useColorCtx();

  // Animate out, then change image, then animate in
  const [isInView, setIsInView] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleVisibility = (entries: IntersectionObserverEntry[]) => {
      setIsInView(entries[0].isIntersecting);
    };

    if (bgRef.current) {
      observerRef.current = new window.IntersectionObserver(handleVisibility, {
        threshold: 0.1,
      });
      observerRef.current.observe(bgRef.current);
    }

    return () => {
      if (observerRef.current && bgRef.current) {
        observerRef.current.unobserve(bgRef.current);
      }
    };
  }, []);

  useGSAP(() => {
    let timeout: NodeJS.Timeout;

    if (!isInView) return; // Pause animation if not in view

    if (!isTransitioning) {
      timeout = setTimeout(() => {
        const nextIndex = (bgIndex + 1) % backgrounds.length;
        if (backgrounds[nextIndex].image !== backgrounds[bgIndex].image) {
          const nextImg = new window.Image();
          nextImg.src = backgrounds[nextIndex].image;
          nextImg.onload = () => {
            setNextBgIndex(nextIndex);
            setIsTransitioning(true);
          };
        }
      }, 3000);
    } else {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 0.4,
          rotateY: 90,
          rotateX: 40,
          opacity: 0,
          x: 400,
          y: -400,
          duration: 0.7,
          ease: "power2.in",
          onComplete: () => {
            if (backgrounds[bgIndex].image !== backgrounds[nextBgIndex].image) {
              setBgIndex(nextBgIndex);
            }
            setTimeout(() => {
              if (bgRef.current) {
                gsap.set(bgRef.current, {
                  scale: 0.4,
                  rotateY: 90,
                  rotateX: 40,
                  opacity: 1,
                  x: 0,
                  y: 0,
                });
                gsap.to(bgRef.current, {
                  scale: 1,
                  rotateY: 0,
                  rotateX: 0,
                  opacity: 1,
                  x: 0,
                  y: 0,
                  duration: 1,
                  ease: "power2.out",
                  onComplete: () => {
                    setIsTransitioning(false);
                  },
                });
              } else {
                setIsTransitioning(false);
              }
            }, 100);
          },
        });
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isTransitioning, bgIndex, nextBgIndex, isInView]);

  const bg = backgrounds[bgIndex];

  useEffect(() => {
    if (!isTransitioning) {
      setColor(bg.color);
    }
  }, [bg.color, setColor, isTransitioning]);

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 z-10 w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg.image})`,
        backgroundColor: bg.color,
        transition: "background-image 1s ease-in-out",
      }}
      aria-hidden="true"
    >
      <div
        className="min-h-screen container mx-auto flex justify-between items-end py-44"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <HeroHeading />
        <JournalCard />
      </div>
    </div>
  );
};

export default AnimatedBackground;
