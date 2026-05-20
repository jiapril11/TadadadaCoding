"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
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
// WebGL shader sources — 유기체 파티클 필드
const VERT_SRC = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

function makeFragSrc(layers: number) {
  return `
precision highp float;
uniform float width;
uniform float height;
vec2 resolution = vec2(width, height);
uniform float time;

float random(vec2 par){
  return fract(sin(dot(par.xy, vec2(12.9898, 78.233))) * 43758.5453);
}
vec2 random2(vec2 par){
  float rand = random(par);
  return vec2(rand, random(par + rand));
}
float getGlow(float dist, float radius, float intensity){
  return pow(radius / dist, intensity);
}

void main(){
  float t = 1.0 + time * 0.05;
  const float layers = float(${layers});
  float scale = 32.0;
  float depth, phase, rotationAngle, size, glow;
  rotationAngle = time * -0.1;
  const float del = 1.0 / layers;

  vec2 uv, fl, local_uv, index, pos, seed, centre, cell;
  vec2 rot = vec2(cos(t), sin(t));
  mat2 rotation = mat2(cos(rotationAngle), -sin(rotationAngle),
                       sin(rotationAngle),  cos(rotationAngle));
  vec3 col = vec3(0);
  vec3 tone;

  for(float i = 0.0; i <= 1.0; i += del){
    depth = fract(i + t);
    centre = rot * 0.2 * depth + 0.5;
    uv = centre - gl_FragCoord.xy / resolution.x;
    uv *= rotation;
    uv *= mix(scale, 0.0, depth);
    fl = floor(uv);
    local_uv = uv - fl - 0.5;

    for(float j = -1.0; j <= 1.0; j++){
      for(float k = -1.0; k <= 1.0; k++){
        cell = vec2(j, k);
        index = fl + cell;
        seed = 128.0 * i + index;
        pos = cell + 0.9 * (random2(seed) - 0.5);
        phase = 128.0 * random(seed);
        tone = vec3(random(seed), random(seed + 1.0), random(seed + 2.0));
        size = (0.6 + 0.5 * sin(phase * t)) * depth;
        glow = size * getGlow(length(local_uv - pos), 0.07, 2.5);
        col += 3.0 * vec3(0.02 * glow) + tone * glow;
      }
    }
  }

  col = 1.0 - exp(-col);
  col = pow(col, vec3(0.4545));
  gl_FragColor = vec4(col, 1.0);
}
`;
}
const FLOWER_IMG =
  "https://www.nasa.gov/wp-content/uploads/2023/06/42604134635-f3e0783737-o.jpg";
// "https://www.nasa.gov/wp-content/uploads/2023/03/gpn-2001-000014.jpg";

export default function Universe() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLHeadingElement>(null);
  const middleRef = useRef<HTMLHeadingElement>(null);
  const bottomRef = useRef<HTMLHeadingElement>(null);

  const hWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const gridSectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowerSectionRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quote2Ref = useRef<HTMLDivElement>(null);

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

    const track = trackRef.current!;
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


    const g2Ctx = gsap.context(() => {
      gsap.set(quote2Ref.current, { opacity: 0 });
      gsap.to(quote2Ref.current, {
        opacity: 1,
        ease: "power1.in",
        scrollTrigger: {
          trigger: gridSectionRef.current,
          start: "33% top",
          end: "66% top",
          scrub: 1,
        },
      });
    });

    const fCtx = gsap.context(() => {
      gsap.set(flowerRef.current, { scale: 0.1, borderRadius: "50%" });
      gsap.to(flowerRef.current, {
        scale: 1,
        borderRadius: "0%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: flowerSectionRef.current,
          start: "top top",
          end: "80% top",
          scrub: 1,
        },
      });
    }, flowerSectionRef);

    const qCtx = gsap.context(() => {
      gsap.set(quoteRef.current, { opacity: 0 });
      gsap.to(quoteRef.current, {
        opacity: 1,
        ease: "power1.in",
        scrollTrigger: {
          trigger: flowerSectionRef.current,
          start: "80% top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      hCtx.revert();
      g2Ctx.revert();
      fCtx.revert();
      qCtx.revert();
    };
  }, []);

  // WebGL 파티클 필드 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = /Android|webOS|iPhone|BlackBerry|Windows Phone/i.test(
      navigator.userAgent,
    );
    const layers = isMobile ? 6 : 10;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    function compile(src: string, type: number) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(VERT_SRC, gl.VERTEX_SHADER));
    gl.attachShader(prog, compile(makeFragSrc(layers), gl.FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
      gl.STATIC_DRAW,
    );

    const posLoc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 8, 0);

    const timeLoc = gl.getUniformLocation(prog, "time")!;
    const wLoc = gl.getUniformLocation(prog, "width")!;
    const hLoc = gl.getUniformLocation(prog, "height")!;
    gl.uniform1f(wLoc, canvas.width);
    gl.uniform1f(hLoc, canvas.height);

    let raf: number;
    let last = Date.now();
    let elapsed = 0;
    let running = false;

    function draw() {
      const now = Date.now();
      elapsed += (now - last) / 1000;
      last = now;
      gl!.uniform1f(timeLoc, elapsed);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    }

    function start() {
      if (running) return;
      running = true;
      last = Date.now();
      draw();
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries[0].isIntersecting ? start() : stop();
      },
      { threshold: 0.01 },
    );
    observer.observe(canvas);

    function onResize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform1f(wLoc, canvas!.width);
      gl!.uniform1f(hLoc, canvas!.height);
    }
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
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
          <p className="text-white text-xl md:text-2xl leading-relaxed tracking-wide">
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

      {/* Section 3: WebGL 아스트로파지 유기체 필드 */}
      <div
        ref={gridSectionRef}
        className="relative bg-black"
        style={{ height: "300vh" }}
      >
        <div className="relative sticky top-0 h-screen overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full" />
          <div
            ref={quote2Ref}
            className="absolute inset-0 flex items-center justify-center"
          >
            <blockquote className="text-center max-w-3xl px-12 py-10 bg-black/60 rounded-2xl">
              <p className="text-white text-xl md:text-2xl leading-relaxed tracking-wide">
                "아스트로파지는 태양을 먹고 있었다.
                <br />
                그리고 우리 태양만이 아니었다."
              </p>
              <cite className="block mt-8 text-white/40 text-sm tracking-widest uppercase">
                Project Hail Mary — Andy Weir
              </cite>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div
        ref={flowerSectionRef}
        className="relative bg-black"
        style={{ height: "600vh" }}
      >
        <div className="relative sticky top-0 h-screen flex items-center justify-center">
          <div
            ref={flowerRef}
            className="w-screen h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${FLOWER_IMG})` }}
          />
          <div
            ref={quoteRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/40" />
            <blockquote className="relative text-center max-w-3xl px-8">
              <p className="text-white text-xl md:text-2xl leading-relaxed tracking-wide">
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
        </div>
      </div>
    </>
  );
}
