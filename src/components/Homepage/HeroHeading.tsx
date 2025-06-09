"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

const HeroHeading = () => {
    const headlineRef = useRef<HTMLHeadingElement>(null);

    gsap.registerPlugin(SplitText);
    useGSAP(() => {
        gsap.set(".split", { opacity: 1 });

        const split = SplitText.create(".split", {
            type: "chars",
            charsClass: "char++",
        });

        gsap.from(split.chars, {
            x: -10,
            opacity: 0,
            stagger: 0.05,
            duration: 1,
            ease: "back",
        });
    }, []);

    return (
        <div>
            <h1 className="split text-5xl my-8 uppercase" ref={headlineRef}>
                Heading
            </h1>
            <div className="flex gap-2">
                <button className="uppercase border-2 rounded-full px-2">
                    view project
                </button>
                <button className="uppercase border-2 rounded-full px-2">
                    see all projects
                </button>
            </div>
        </div>
    );
};

export default HeroHeading;
