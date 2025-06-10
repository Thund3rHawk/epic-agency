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

    // After non-keywords are gone, move keywords to same line and new positions
    ScrollTrigger.create({
      trigger: headlineRef.current,
      start: "bottom center",
      onEnter: () => {
        // Calculate target X positions for the three words
        // "imagine" to left, "build" stays, "tell" to right
        const [imagineEl, buildEl, tellEl] = [
          keywordEls.find((el) =>
            el.textContent?.toLowerCase().includes("imagine")
          ),
          keywordEls.find((el) =>
            el.textContent?.toLowerCase().includes("build")
          ),
          keywordEls.find((el) =>
            el.textContent?.toLowerCase().includes("tell")
          ),
        ];

        if (imagineEl && buildEl && tellEl) {
          // Get the vertical center of the "build" word
          const buildRect = buildEl.getBoundingClientRect();
          const buildCenterY = buildRect.top + buildRect.height / 2;

          // Helper to get the vertical center of an element
          const getCenterY = (el: Element) => {
            const rect = el.getBoundingClientRect();
            return rect.top + rect.height / 2;
          };

          // Move all keywords to the same vertical position as "build"
          [imagineEl, buildEl, tellEl].forEach((el) => {
            const deltaY = buildCenterY - getCenterY(el);
            gsap.to(el, {
              y: `+=${deltaY}`,
              duration: 0.8,
              ease: "power2.inOut",
            });
          });

          // Move imagine to left, build stays, tell to right
          gsap.to(imagineEl, {
            x: -420,
            duration: 0.8,
            ease: "power2.inOut",
          });
          gsap.to(buildEl, {
            x: -150,
            duration: 0.8,
            ease: "power2.inOut",
          });
          gsap.to(tellEl, {
            x: 150,
            duration: 0.8,
            ease: "power2.inOut",
          });
        }
      },
      onLeaveBack: () => {
        // Reset the transforms for all keywords
        const [imagineEl, buildEl, tellEl] = [
          keywordEls.find((el) =>
            el.textContent?.toLowerCase().includes("imagine")
          ),
          keywordEls.find((el) =>
            el.textContent?.toLowerCase().includes("build")
          ),
          keywordEls.find((el) =>
            el.textContent?.toLowerCase().includes("tell")
          ),
        ];

        [imagineEl, buildEl, tellEl].forEach((el) => {
          if (el) {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.8,
              ease: "power2.inOut",
            });
          }
        });
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
