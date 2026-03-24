'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './StackSection.module.css'

interface Skill { name: string; pct: number; tags: string[] }

const SKILLS: Skill[] = [
  { name: 'React / Next.js', pct: 92, tags: ['App Router', 'SSR'] },
  { name: 'TypeScript',      pct: 85, tags: ['Zod', 'Types'] },
  { name: 'GSAP / CSS',      pct: 78, tags: ['ScrollTrigger', 'Motion'] },
  { name: 'Tailwind CSS',    pct: 88, tags: ['Responsive'] },
  { name: 'Zustand / State', pct: 70, tags: ['Zustand', 'Context'] },
]

const MARQUEE_ITEMS = ['React', 'Next.js', 'TypeScript', 'GSAP', 'Tailwind', 'Zustand', 'Figma']

export default function StackSection() {
  const labelRef   = useRef<HTMLDivElement>(null)
  const h1Ref      = useRef<HTMLSpanElement>(null)
  const h2Ref      = useRef<HTMLSpanElement>(null)
  const rowRefs    = useRef<HTMLDivElement[]>([])
  const fillRefs   = useRef<HTMLDivElement[]>([])
  const mqWrapRef  = useRef<HTMLDivElement>(null)
  const mqTrackRef = useRef<HTMLDivElement>(null)
  const mqAnimRef  = useRef<gsap.core.Tween | null>(null)
  const lastYRef   = useRef(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // 이 컴포넌트가 만든 ScrollTrigger만 추적
    const triggers: ScrollTrigger[] = []

    /* 마키 */
    mqAnimRef.current = gsap.to(mqTrackRef.current, {
      x: '-50%', duration: 22, repeat: -1, ease: 'none',
    })

    /* 섹션 진입 */
    triggers.push(
      ScrollTrigger.create({
        trigger: '#sec2', start: 'top 70%', once: true,
        onEnter: () => {
          gsap.to(labelRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
          gsap.to(h1Ref.current, { y: '0%', duration: 0.8, ease: 'expo.out', delay: 0.1 })
          gsap.to(h2Ref.current, { y: '0%', duration: 0.8, ease: 'expo.out', delay: 0.28 })
        },
      })
    )

    /* 스킬 행 개별 진입 */
    rowRefs.current.forEach((row, i) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: row, start: 'top 88%', once: true,
          onEnter: () => {
            gsap.to(row, { opacity: 1, x: 0, duration: 0.75, ease: 'expo.out', delay: i * 0.1 })
            setTimeout(() => {
              if (fillRefs.current[i]) fillRefs.current[i].style.width = `${SKILLS[i].pct}%`
            }, i * 100 + 350)
          },
        })
      )
    })

    /* 마키 fade in */
    triggers.push(
      ScrollTrigger.create({
        trigger: mqWrapRef.current, start: 'top 92%', once: true,
        onEnter: () => gsap.to(mqWrapRef.current, { opacity: 1, duration: 0.6 }),
      })
    )

    /* 스크롤 속도 → 마키 속도 */
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastYRef.current)
      lastYRef.current = window.scrollY
      if (delta > 1 && mqAnimRef.current) {
        mqAnimRef.current.timeScale(22 / Math.max(6, 22 - delta * 0.25))
        gsap.to(mqAnimRef.current, { timeScale: 1, duration: 1.5, ease: 'power2.out', delay: 0.3 })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      mqAnimRef.current?.kill()
      triggers.forEach((t) => t.kill())
    }
  }, [])

  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <section id="sec2" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid} />

        <div
          ref={labelRef}
          className={styles.label}
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          // 02 · What I Work With
        </div>

        <div className={styles.heading}>
          <span className={styles.headingLine}>
            <span ref={h1Ref} className={styles.headingLineInner}>TOOLS &amp;</span>
          </span>
          <span className={styles.headingLine}>
            <span ref={h2Ref} className={`${styles.headingLineInner} ${styles.headingAccent}`}>
              STACK
            </span>
          </span>
        </div>

        <div className={styles.skills}>
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              ref={(el) => { if (el) rowRefs.current[i] = el }}
              className={styles.skillRow}
              style={{ opacity: 0, transform: 'translateX(-50px)' }}
            >
              <span className={styles.skillName}>{skill.name}</span>
              <div className={styles.barTrack}>
                <div
                  ref={(el) => { if (el) fillRefs.current[i] = el }}
                  className={styles.barFill}
                />
              </div>
              <span className={styles.pct}>{skill.pct}%</span>
              <div className={styles.tags}>
                {skill.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          ref={mqWrapRef}
          className={styles.marqueeWrap}
          style={{ opacity: 0 }}
        >
          <div ref={mqTrackRef} className={styles.marqueeTrack}>
            {doubled.map((item, i) => (
              <span key={i}>
                {item}
                <span className={styles.marqueeHl}> · </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
