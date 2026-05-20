"use client";
import { useLayoutEffect, useRef } from "react";
import { Gasoek_One } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const gasoekOne = Gasoek_One({ weight: "400", subsets: ["latin"] });

const TEXT_STYLE = `${gasoekOne.className} absolute text-[30vh] text-white leading-none tracking-widest select-none`;
const PLANETS = [
  {
    name: "수성",
    distance: "0.39 AU",
    temp: "−180 ~ 430°C",
    desc: "태양계의 첫 번째 관문",
    img: "https://science.nasa.gov/wp-content/uploads/2024/03/pia15162-mercury-basins-messenger-16x9-1.jpg?resize=768,432",
  },
  {
    name: "금성",
    distance: "0.72 AU",
    temp: "465°C",
    desc: "두꺼운 대기의 지옥 행성",
    img: "https://science.nasa.gov/wp-content/uploads/2024/03/venus-mariner-10-pia23791-fig2-16x9-1.jpg?resize=768,432",
  },
  {
    name: "지구",
    distance: "1.00 AU",
    temp: "15°C",
    desc: "우리가 지켜야 할 단 하나의 집",
    img: "https://science.nasa.gov/wp-content/uploads/2024/03/blue-marble-apollo-17-16x9-1.jpg?resize=768,432",
    highlight: true,
  },
  {
    name: "화성",
    distance: "1.52 AU",
    temp: "−60°C",
    desc: "붉은 사막, 생명의 흔적",
    img: "https://science.nasa.gov/wp-content/uploads/2024/03/mars-full-globe-16x9-1.jpg?resize=768,432",
  },
  {
    name: "목성",
    distance: "5.20 AU",
    temp: "−110°C",
    desc: "거대한 폭풍의 수호자",
    img: "https://science.nasa.gov/wp-content/uploads/2024/03/jupiter-marble-pia22946-16x9-1.jpg?resize=768,432",
  },
  {
    name: "토성",
    distance: "9.58 AU",
    temp: "−140°C",
    desc: "고리를 두른 거대 행성",
    img: "https://science.nasa.gov/wp-content/uploads/2023/05/saturn-farewell-pia21345-sse-banner-1920x640-1.jpg?resize=768,256",
  },
  {
    name: "천왕성",
    distance: "19.2 AU",
    temp: "−195°C",
    desc: "옆으로 누운 얼음 행성",
    img: "https://science.nasa.gov/wp-content/uploads/2024/03/uranus-pia18182-16x9-1.jpg?resize=768,432",
  },
  {
    name: "해왕성",
    distance: "30.1 AU",
    temp: "−200°C",
    desc: "태양계의 마지막 경계",
    img: "https://science.nasa.gov/wp-content/uploads/2024/03/pia01492-neptune-full-disk-16x9-1.jpg?resize=768,432",
  },
  {
    name: "타우세티",
    distance: "11.9광년",
    temp: "미지",
    desc: "헤일메리호의 최종 목적지",
    img: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/e/ErisArtistConcept1200w.jpg?w=1200&h=900&fit=clip&crop=faces%2Cfocalpoint",
    isDestination: true,
  },
];
// SDO(태양역학관측위성) 다파장 태양 이미지 — NASA 공개 도메인
const SOLAR_IMGS = [
  "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0304.jpg",
  "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0171.jpg",
  "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0193.jpg",
  "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0211.jpg",
  "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0131.jpg",
  "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_HMIB.jpg",
  "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0304.jpg",
  "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0171.jpg",
  "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0193.jpg",
  "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0211.jpg",
  "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0131.jpg",
  "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_HMIB.jpg",
];

// 꽃밭처럼 흩뿌려진 이미지 위치 (hydration mismatch 방지를 위해 고정값 사용)
const FLOWER_POSITIONS = [
  { top: 8,  left: 4,  size: 18, rotate: -8  },
  { top: 58, left: 12, size: 15, rotate: 12  },
  { top: 22, left: 28, size: 22, rotate: -5  },
  { top: 72, left: 38, size: 16, rotate: 7   },
  { top: 12, left: 52, size: 20, rotate: -15 },
  { top: 48, left: 62, size: 14, rotate: 10  },
  { top: 78, left: 72, size: 19, rotate: -3  },
  { top: 18, left: 76, size: 17, rotate: 15  },
  { top: 52, left: 86, size: 13, rotate: -10 },
  { top: 82, left: 6,  size: 21, rotate: 5   },
  { top: 38, left: 44, size: 16, rotate: -7  },
  { top: 65, left: 55, size: 18, rotate: 9   },
];
const FLOWER_IMG = "https://picsum.photos/seed/flower/1920/1080";

export default function Universe() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLHeadingElement>(null);
  const middleRef = useRef<HTMLHeadingElement>(null);
  const bottomRef = useRef<HTMLHeadingElement>(null);

  const hWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const gridSectionRef = useRef<HTMLDivElement>(null);
  const gridItemsRef = useRef<HTMLDivElement[]>([]);
  const flowerSectionRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.set(topRef.current, { xPercent: -50, yPercent: -50, y: "-32vh" });
      gsap.set(middleRef.current, { xPercent: -50, yPercent: -50, y: 0 });
      gsap.set(bottomRef.current, { xPercent: -50, yPercent: -50, y: "32vh" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
      tl.to(topRef.current, { y: 0, opacity: 0, ease: "none" }, 0)
        .to(bottomRef.current, { y: 0, opacity: 0, ease: "none" }, 0)
        .to(
          groupRef.current,
          { scale: 20, opacity: 0, ease: "power2.in" },
          0.5,
        );
    }, wrapperRef);

    const track    = trackRef.current!;
    const hWrapper = hWrapperRef.current!;
    const totalMove = track.scrollWidth - window.innerWidth;

    // 실제 track 너비 기반으로 wrapper 높이 정확히 설정
    hWrapper.style.height = `${totalMove + window.innerHeight}px`;

    const hCtx = gsap.context(() => {
      gsap.to(track, {
        x: -totalMove,
        ease: "none",
        scrollTrigger: {
          trigger: hWrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, hWrapperRef);

    const gCtx = gsap.context(() => {
      // 초기 상태 명시적으로 설정
      gsap.set(gridItemsRef.current, { opacity: 0, scale: 0, rotation: -15 });

      gsap.to(gridItemsRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        ease: "back.out(1.8)",
        stagger: { each: 0.15, from: "random" },
        scrollTrigger: {
          trigger: gridSectionRef.current,
          start: "top center",
          once: true,
        },
      });
    });

    const fCtx = gsap.context(() => {
      gsap.fromTo(
        flowerRef.current,
        { scale: 0.1, borderRadius: "50%" },
        {
          scale: 1,
          borderRadius: "0%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: flowerSectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, flowerSectionRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      hCtx.revert();
      gCtx.revert();
      fCtx.revert();
    };
  }, []);

  return (
    <>
      {/* Section 1 */}
      <div ref={wrapperRef} className="relative" style={{ height: "400vh" }}>
        <div
          className="sticky top-0 h-screen bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://assets.science.nasa.gov/dynamicimage/assets/science/missions/hubble/galaxies/spiral/Hubble_NGC3137_potm2604a.jpg?w=4182&h=3859&fit=clip&crop=faces%2Cfocalpoint)",
          }}
        >
          <div ref={groupRef} className="absolute inset-0">
            <h1
              ref={topRef}
              className={TEXT_STYLE}
              style={{ top: "50%", left: "50%" }}
            >
              AMAZE!
            </h1>
            <h1
              ref={middleRef}
              className={TEXT_STYLE}
              style={{ top: "50%", left: "50%" }}
            >
              AMAZE!
            </h1>
            <h1
              ref={bottomRef}
              className={TEXT_STYLE}
              style={{ top: "50%", left: "50%" }}
            >
              AMAZE!
            </h1>
          </div>
        </div>
      </div>

      {/* Quote 1 */}
      <div className="bg-black flex items-center justify-center py-40 px-16">
        <blockquote className="text-center max-w-3xl">
          <p className="text-white text-2xl md:text-4xl leading-relaxed tracking-wide">
            "지구까지 0.158광년.
            <br />
            돌아갈 연료는 없다.
            <br />
            하지만 나는 살아있다."
          </p>
          <cite className="block mt-8 text-white/40 text-sm tracking-widest uppercase">
            Project Hail Mary — Andy Weir
          </cite>
        </blockquote>
      </div>

      {/* Section 2 */}
      <div
        ref={hWrapperRef}
        className="relative bg-black"
        style={{ minHeight: "100vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div ref={trackRef} className="flex gap-[3vw] pl-[10vw]">
            {PLANETS.map((planet) => (
              <div
                key={planet.name}
                className="flex-shrink-0 relative rounded-2xl overflow-hidden flex flex-col justify-between p-8 text-white bg-cover bg-center"
                style={{
                  width: "30vw",
                  height: "30vw",
                  backgroundImage: `url(${planet.img})`,
                }}
              >
                {/* 텍스트 가독성을 위한 어두운 그라디언트 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
                {planet.isDestination && (
                  <span className="absolute inset-0 rounded-2xl ring-2 ring-yellow-300/60 animate-pulse" />
                )}
                <div className="relative flex flex-col gap-1">
                  <span className="text-xs tracking-[0.3em] uppercase text-white/70">
                    {planet.isDestination
                      ? "✦ 목적지"
                      : `태양으로부터 ${planet.distance}`}
                  </span>
                  <span className="text-sm text-white/50">{planet.temp}</span>
                </div>
                <div className="relative">
                  <p
                    className={`${gasoekOne.className} leading-none text-white`}
                    style={{ fontSize: "7vw" }}
                  >
                    {planet.name}
                  </p>
                  <p className="mt-2 text-sm text-white/80 leading-snug">
                    {planet.desc}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex-shrink-0 w-[35vw]" />
          </div>
        </div>
      </div>

      {/* Quote 2 */}
      <div className="bg-black flex items-center justify-center py-40 px-16">
        <blockquote className="text-center max-w-3xl">
          <p className="text-white text-2xl md:text-4xl leading-relaxed tracking-wide">
            "아스트로파지는 태양을 먹고 있었다.
            <br />
            그리고 우리 태양만이 아니었다."
          </p>
          <cite className="block mt-8 text-white/40 text-sm tracking-widest uppercase">
            Project Hail Mary — Andy Weir
          </cite>
        </blockquote>
      </div>

      {/* Section 3: 꽃밭처럼 뽁뽁 — 랜덤 위치에 랜덤 순서로 태양 이미지 등장 */}
      <div ref={gridSectionRef} className="relative bg-black h-screen overflow-hidden">
        {FLOWER_POSITIONS.map((pos, i) => (
          <div
            key={i}
            ref={(el) => { if (el) gridItemsRef.current[i] = el; }}
            className="absolute rounded-full bg-cover bg-center"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              width: `${pos.size}vw`,
              height: `${pos.size}vw`,
              backgroundImage: `url(${SOLAR_IMGS[i]})`,
              boxShadow: "0 0 30px 4px rgba(255,160,50,0.3)",
            }}
          />
        ))}
      </div>

      {/* Quote 3 */}
      <div className="bg-black flex items-center justify-center py-40 px-16">
        <blockquote className="text-center max-w-3xl">
          <p className="text-white text-2xl md:text-4xl leading-relaxed tracking-wide">
            "나는 혼자가 아니었다.
            <br />
            우주 어딘가에, 다른 누군가도
            <br />
            같은 문제를 풀고 있었다."
          </p>
          <cite className="block mt-8 text-white/40 text-sm tracking-widest uppercase">
            Project Hail Mary — Andy Weir
          </cite>
        </blockquote>
      </div>

      {/* Section 4 */}
      <div
        ref={flowerSectionRef}
        className="relative bg-black"
        style={{ height: "600vh" }}
      >
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
