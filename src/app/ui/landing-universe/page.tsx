"use client";
import { useLayoutEffect, useRef } from "react";
import { Gasoek_One } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const gasoekOne = Gasoek_One({ weight: "400", subsets: ["latin"] });

const TEXT_STYLE = `${gasoekOne.className} absolute text-[30vh] text-white leading-none tracking-widest select-none`;
const PLANETS    = ["수", "금", "지", "화", "목", "토", "천", "해"];
const GRID_SEEDS = Array.from({ length: 12 }, (_, i) => `bloom${i + 1}`);
const FLOWER_IMG = "https://picsum.photos/seed/flower/1920/1080";

export default function Universe() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const groupRef    = useRef<HTMLDivElement>(null);
  const topRef      = useRef<HTMLHeadingElement>(null);
  const middleRef   = useRef<HTMLHeadingElement>(null);
  const bottomRef   = useRef<HTMLHeadingElement>(null);

  const hWrapperRef    = useRef<HTMLDivElement>(null);
  const trackRef       = useRef<HTMLDivElement>(null);
  const gridSectionRef = useRef<HTMLDivElement>(null);
  const gridItemsRef   = useRef<HTMLDivElement[]>([]);
  const flowerSectionRef = useRef<HTMLDivElement>(null);
  const flowerRef        = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.set(topRef.current,    { xPercent: -50, yPercent: -50, y: "-32vh" });
      gsap.set(middleRef.current, { xPercent: -50, yPercent: -50, y: 0 });
      gsap.set(bottomRef.current, { xPercent: -50, yPercent: -50, y: "32vh" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapperRef.current, start: "top top", end: "bottom bottom", scrub: 1 },
      });
      tl.to(topRef.current,    { y: 0, ease: "none" }, 0)
        .to(bottomRef.current, { y: 0, ease: "none" }, 0)
        .to(groupRef.current,  { scale: 20, opacity: 0, ease: "power2.in" }, 0.5);
    }, wrapperRef);

    const track     = trackRef.current!;
    const totalMove = track.scrollWidth - window.innerWidth;

    const hCtx = gsap.context(() => {
      gsap.to(track, {
        x: -totalMove,
        ease: "none",
        scrollTrigger: { trigger: hWrapperRef.current, start: "top top", end: "bottom bottom", scrub: 1 },
      });
    }, hWrapperRef);

    const gCtx = gsap.context(() => {
      gsap.fromTo(
        gridItemsRef.current,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1, scale: 1, ease: "power2.out",
          stagger: { each: 0.08, from: "random" },
          scrollTrigger: { trigger: gridSectionRef.current, start: "top top", end: "bottom bottom", scrub: 1 },
        }
      );
    }, gridSectionRef);

    const fCtx = gsap.context(() => {
      gsap.fromTo(
        flowerRef.current,
        { scale: 0.1, borderRadius: "50%" },
        {
          scale: 1, borderRadius: "0%", ease: "power1.inOut",
          scrollTrigger: { trigger: flowerSectionRef.current, start: "top top", end: "bottom bottom", scrub: 1 },
        }
      );
    }, flowerSectionRef);

    ScrollTrigger.refresh();

    return () => { ctx.revert(); hCtx.revert(); gCtx.revert(); fCtx.revert(); };
  }, []);

  return (
    <>
      {/* Section 1 */}
      <div ref={wrapperRef} className="relative" style={{ height: "400vh" }}>
        <div
          className="sticky top-0 h-screen bg-cover bg-center"
          style={{ backgroundImage: "url(https://assets.science.nasa.gov/dynamicimage/assets/science/missions/hubble/galaxies/spiral/Hubble_NGC3137_potm2604a.jpg?w=4182&h=3859&fit=clip&crop=faces%2Cfocalpoint)" }}
        >
          <div ref={groupRef} className="absolute inset-0">
            <h1 ref={topRef}    className={TEXT_STYLE} style={{ top: "50%", left: "50%" }}>AMAZE!</h1>
            <h1 ref={middleRef} className={TEXT_STYLE} style={{ top: "50%", left: "50%" }}>AMAZE!</h1>
            <h1 ref={bottomRef} className={TEXT_STYLE} style={{ top: "50%", left: "50%" }}>AMAZE!</h1>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div ref={hWrapperRef} className="relative bg-black" style={{ height: "calc(206vw + 100vh)" }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div ref={trackRef} className="flex gap-[3vw] pl-[10vw]">
            {PLANETS.map((planet) => (
              <div
                key={planet}
                className={`${gasoekOne.className} flex-shrink-0 flex items-center justify-center bg-white/5 border border-white/20 rounded-lg text-white`}
                style={{ width: "30vw", height: "30vw", fontSize: "10vw" }}
              >
                {planet}성
              </div>
            ))}
            <div className="flex-shrink-0 w-[35vw]" />
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div ref={gridSectionRef} className="relative bg-black" style={{ height: "300vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden grid grid-cols-4 grid-rows-3">
          {GRID_SEEDS.map((seed, i) => (
            <div
              key={seed}
              ref={(el) => { if (el) gridItemsRef.current[i] = el; }}
              className="bg-cover bg-center"
              style={{ backgroundImage: `url(https://picsum.photos/seed/${seed}/600/400)` }}
            />
          ))}
        </div>
      </div>

      {/* Section 4 */}
      <div ref={flowerSectionRef} className="relative bg-black" style={{ height: "400vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div
            ref={flowerRef}
            className="w-screen h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${FLOWER_IMG})` }}
          />
        </div>
      </div>
    </>
  );
}
