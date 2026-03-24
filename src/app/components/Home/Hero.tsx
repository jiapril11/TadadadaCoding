"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const vRuleRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const g1Ref = useRef<HTMLDivElement>(null);
  const g2Ref = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const els = [
      vRuleRef.current,
      promptRef.current,
      nameRef.current,
      taglineRef.current,
      ctaRef.current,
      cornerRef.current,
      statusRef.current,
      scrollHintRef.current,
    ];
    gsap.set(els, { opacity: 0 });

    /* ── 입장 타임라인 ── */
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(vRuleRef.current, { opacity: 1, duration: 0.8 }, 0.3)
      .to(promptRef.current, { opacity: 1, duration: 0.5 }, 0.9)
      .to(nameRef.current, { opacity: 1, duration: 0.05 }, 1.4)
      .to(
        [g1Ref.current, g2Ref.current],
        { opacity: 0.9, duration: 0.05 },
        1.41,
      )
      .to(nameRef.current, { x: 10, duration: 0.05, ease: "none" }, 1.41)
      .to(g1Ref.current, { x: -14, duration: 0.05 }, 1.41)
      .to(g2Ref.current, { x: 14, duration: 0.05 }, 1.41)
      .to(nameRef.current, { x: -6, duration: 0.05, ease: "none" }, 1.46)
      .to(g1Ref.current, { x: 8, duration: 0.05 }, 1.46)
      .to(g2Ref.current, { x: -8, duration: 0.05 }, 1.46)
      .to(
        [nameRef.current, g1Ref.current, g2Ref.current],
        { x: 0, duration: 0.04 },
        1.51,
      )
      .to([g1Ref.current, g2Ref.current], { opacity: 0, duration: 0.08 }, 1.52)
      .to(taglineRef.current, { opacity: 1, duration: 0.6 }, 1.65)
      .to(ctaRef.current, { opacity: 1, duration: 0.55 }, 1.85)
      .to(cornerRef.current, { opacity: 1, duration: 0.4 }, 2.1)
      .to(statusRef.current, { opacity: 1, duration: 0.4 }, 2.15)
      .to(scrollHintRef.current, { opacity: 1, duration: 0.5 }, 2.5);

    /* 커서 깜빡임 */
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.55,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });

    /* ── 반복 글리치
     *  isMounted: 언마운트 후 setTimeout 콜백이 실행되는 걸 막음
     *  timerIds:  재귀적으로 쌓이는 모든 타이머 id를 추적해 cleanup에서 일괄 해제
     * ── */
    let isMounted = true;
    const timerIds: ReturnType<typeof setTimeout>[] = [];

    const scheduleGlitch = () => {
      const id = setTimeout(
        () => {
          // 언마운트됐거나 ref가 null이면 즉시 중단
          if (
            !isMounted ||
            !g1Ref.current ||
            !g2Ref.current ||
            !nameRef.current
          )
            return;

          gsap
            .timeline()
            .to([g1Ref.current, g2Ref.current], {
              opacity: 0.7,
              duration: 0.04,
            })
            .to(nameRef.current, { x: 9, duration: 0.04, ease: "none" }, "<")
            .to(g1Ref.current, { x: -12, duration: 0.04 }, "<")
            .to(g2Ref.current, { x: 12, duration: 0.04 }, "<")
            .to(nameRef.current, { x: -5, duration: 0.04, ease: "none" })
            .to(g1Ref.current, { x: 7, duration: 0.04 }, "<")
            .to(g2Ref.current, { x: -7, duration: 0.04 }, "<")
            .to([nameRef.current, g1Ref.current, g2Ref.current], {
              x: 0,
              duration: 0.04,
            })
            .to([g1Ref.current, g2Ref.current], { opacity: 0, duration: 0.08 });

          scheduleGlitch();
        },
        2800 + Math.random() * 3000,
      );

      timerIds.push(id);
    };

    // 첫 글리치는 3.5초 뒤에 시작
    const firstTimer = setTimeout(scheduleGlitch, 3500);
    timerIds.push(firstTimer);

    /* 스크롤 시 hero content fade + parallax */
    gsap.to(contentRef.current, {
      y: -100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "65% top",
        scrub: 1.5,
      },
    });
    gsap.to(scrollHintRef.current, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "10% top",
        end: "25% top",
        scrub: true,
      },
    });

    return () => {
      // 1. 마운트 플래그 해제 → 진행 중인 타이머 콜백이 실행돼도 GSAP 호출 안 함
      isMounted = false;
      // 2. 추적한 모든 타이머 해제
      timerIds.forEach(clearTimeout);
      // 3. GSAP 타임라인·트윈 정리
      tl.kill();
      gsap.killTweensOf([
        g1Ref.current,
        g2Ref.current,
        nameRef.current,
        cursorRef.current,
        contentRef.current,
        scrollHintRef.current,
      ]);
      // 4. ScrollTrigger 정리
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="hero" className={styles.section}>
      <div className={styles.noise} />
      <div className={styles.scanlines} />
      <div className={styles.vignette} />
      <div ref={vRuleRef} className={styles.vRule} />
      <div ref={contentRef} className={styles.content}>
        <div ref={promptRef} className={styles.prompt}>
          $ whoami
        </div>

        <div className={styles.nameWrap}>
          <div ref={nameRef} className={styles.name}>
            TADADADA
          </div>
          <div ref={g1Ref} aria-hidden className={styles.glitchA}>
            TADADADA
          </div>
          <div ref={g2Ref} aria-hidden className={styles.glitchB}>
            TADADADA
          </div>
        </div>

        <div ref={taglineRef} className={styles.tagline}>
          <span className={styles.taglineHl}>Frontend Developer</span> — making
          the web feel <span className={styles.taglineHl}>alive</span>
          <span ref={cursorRef} className={styles.cursor} />
        </div>

        <div ref={ctaRef} className={styles.cta}>
          <Link href="/projects" className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}>
            <span className={styles.ctaBtnInner}>View Work</span>
          </Link>
          <Link href="https://github.com/jiapril11/TadadadaCoding" target="_blank" className={styles.ctaBtn}>
            <span className={styles.ctaBtnInner}>GitHub ↗</span>
          </Link>
          <Link href="/contact" className={styles.ctaBtn}>
            <span className={styles.ctaBtnInner}>Contact Me</span>
          </Link>
        </div>
      </div>
      <div ref={cornerRef} className={styles.cornerInfo}>
        <span className={styles.dotLive} />
        Seoul, KR
        <br />
        Frontend / Animation
        <br />
        Open to work
      </div>
      <div ref={statusRef} className={styles.status}>
        // 2025 · TADADADA
      </div>
      <div ref={scrollHintRef} className={styles.scrollHint}>
        <span>SCROLL</span>
        <div className={styles.scrollArrow} />
      </div>

    </section>
  );
}
