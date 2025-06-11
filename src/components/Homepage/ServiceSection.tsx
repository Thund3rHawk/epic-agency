"use client";
import React, { useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef } from "react";
import gsap from "gsap";
import useColorCtx from "@/hooks/useColorCtx";

const ServiceSection = () => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const [rotateY, setRotateY] = useState(0);
  const [rotateX, setRotateX] = useState(0);

  // Magnetic effect state
  const [magneticX, setMagneticX] = useState(0);
  const [magneticY, setMagneticY] = useState(0);

  function handleMouseMove(e: React.MouseEvent) {
    if (!h1Ref.current) return;
    const rect = h1Ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation: max 20deg left/right, 10deg up/down
    const rotateYVal = ((mouseX - centerX) / centerX) * 20;
    const rotateXVal = -((mouseY - centerY) / centerY) * 10;

    // Magnetic effect: max 30px translation
    const magneticStrength = 30;
    const magX = ((mouseX - centerX) / centerX) * magneticStrength;
    const magY = ((mouseY - centerY) / centerY) * magneticStrength;

    gsap.to(h1Ref.current, {
      rotateY: rotateYVal,
      rotateX: rotateXVal,
      x: magX,
      y: magY,
      transformPerspective: 600,
      duration: 0.4,
      ease: "power3.out",
    });

    setRotateY(rotateYVal);
    setRotateX(rotateXVal);
    setMagneticX(magX);
    setMagneticY(magY);
  }

  function handleMouseLeave() {
    if (!h1Ref.current) return;
    gsap.to(h1Ref.current, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      transformPerspective: 600,
      duration: 0.4,
      ease: "power3.out",
    });

    setRotateY(0);
    setRotateX(0);
    setMagneticX(0);
    setMagneticY(0);
    setMouseEnter(false);
  }

  const {textColor} = useColorCtx();

  return (
    <div className="container mx-auto border-t py-20" style={{borderBottomColor: textColor}}>
      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: 600,
          rotateX: rotateX,
          rotateY: rotateY,
          x: magneticX * 0.5,
          y: magneticY * 0.2,
        }}
      >
        <h1 className="text-xs uppercase text-center">learn more about our</h1>
      </motion.div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <motion.h1
          ref={h1Ref}
          className="uppercase text-8xl text-center my-5 cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setMouseEnter(true)}
          style={{ position: "relative", display: "inline-block" }}
        >
          services
          {mouseEnter && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: magneticX*3,
                y: magneticY,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                position: "absolute",
                left: "40%",
                top: "20%",
                zIndex: 2,
                pointerEvents: "auto",
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="rounded-full bg-white border-2 border-green-900  p-10 text-black font-bold shadow-lg"
            >
              <motion.span
                animate={{
                  x: magneticX * 1,
                  y: magneticY * 0.5,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ display: "inline-block" }}
              >

                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </motion.button>
          )}
        </motion.h1>
      </div>
    </div>
  );
};

export default ServiceSection;
