"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const AboutSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  gsap.registerPlugin(SplitText, ScrollTrigger);

  useGSAP(() => {
    if (headlineRef.current) {
      gsap.set(headlineRef.current, { opacity: 1 });
      const headlineSplit = new SplitText(headlineRef.current, {
        type: "words",
        wordsClass: "word++",
      });

      // Find the "imagine", "build", and "tell" words
      const keywords = ["imagine", "build", "tell"];
      const keywordEls = headlineSplit.words.filter((wordEl) =>
        keywords.includes(
          wordEl.textContent?.replace(/[^a-z]/gi, "").toLowerCase() || ""
        )
      );

      // Animate all words except the keywords
      const nonKeywordEls = headlineSplit.words.filter(
        (wordEl) => !keywordEls.includes(wordEl)
      );

      gsap.to(nonKeywordEls, {
        y: -100,
        opacity: 0,
        rotation: "random(-10, 80)",
        stagger: 0.1,
        duration: 3,
        ease: "back.in",
        scrollTrigger: {
          trigger: headlineRef.current,
          scrub: true,
          start: "top center",
          end: "bottom center",
        },
      });

      // Optionally, you can pin the keywords in place
      gsap.to(keywordEls, {
        y: 0,
        opacity: 1,
        rotation: 0,
        scrollTrigger: {
          trigger: headlineRef.current,
          scrub: true,
          start: "top center",
          end: "bottom center",
        },
      });
    }
  }, []);

  return (
    <div className="container mx-auto py-40">
      <h1 className="uppercase text-center text-xs">about</h1>
      <h2 ref={headlineRef} className="text-center p-10 text-4xl">
        EPIC is a digital agency with a unique blend of technical, <br />
        strategic and creative skills. We help brands <b>imagine</b> the <br />
        most positive impact they can have and <b>build</b> powerfull <br />
        experience that <b>tell</b> a meaningful story to their audience
      </h2>
    </div>
  );
};

export default AboutSection;
