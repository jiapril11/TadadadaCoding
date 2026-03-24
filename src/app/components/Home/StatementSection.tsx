'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './StatementSection.module.css'

interface WordDef { text: string; cls: 'normal' | 'outline' | 'accent' }
interface ColDef  { num: string; title: string; body: string }

const WORDS: WordDef[] = [
  { text: 'I',      cls: 'normal'  },
  { text: 'build',  cls: 'normal'  },
  { text: 'things', cls: 'outline' },
  { text: 'that',   cls: 'normal'  },
  { text: 'feel',   cls: 'normal'  },
  { text: 'alive.', cls: 'accent'  },
]

const COLS: ColDef[] = [
  { num: '// 01', title: 'Always Building', body: '새로운 기술을 배우고 직접 만들어보는 걸 멈추지 않습니다.' },
  { num: '// 02', title: 'Motion First',    body: '정적인 UI보다 살아 움직이는 인터페이스를 만들고 싶어합니다.' },
  { num: '// 03', title: 'Design-Driven',   body: '시각적 디테일에 집착하며, 픽셀 단위까지 의도적으로 설계합니다.' },
]

const wordClassMap = {
  normal:  '',
  accent:  styles.wordAccent,
  outline: styles.wordOutline,
}

export default function StatementSection() {
  const bgRef    = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<HTMLSpanElement[]>([])
  const colRefs  = useRef<HTMLDivElement[]>([])
  const botRef   = useRef<HTMLDivElement>(null)
  const divRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    /* 배경 워터마크 패럴랙스 */
    gsap.to(bgRef.current, {
      y: -150, ease: 'none',
      scrollTrigger: { trigger: '#sec3', start: 'top bottom', end: 'bottom top', scrub: true },
    })

    /* 라벨 */
    ScrollTrigger.create({
      trigger: '#sec3', start: 'top 68%', once: true,
      onEnter: () => gsap.to(labelRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }),
    })

    /* 단어 scrub 등장 */
    wordRefs.current.forEach((el, i) => {
      gsap.to(el, {
        y: '0%', ease: 'power3.out',
        scrollTrigger: {
          trigger: '#sec3',
          start: `top+=${i * 55} 68%`,
          end:   `top+=${i * 55 + 90} 48%`,
          scrub: 0.6,
        },
      })
    })

    /* 컬럼 진입 */
    colRefs.current.forEach((col, i) => {
      ScrollTrigger.create({
        trigger: col, start: 'top 88%', once: true,
        onEnter: () =>
          gsap.to(col, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: i * 0.13 }),
      })
    })

    /* 하단 바 */
    ScrollTrigger.create({
      trigger: botRef.current, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.to(botRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' })
        gsap.fromTo(
          divRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 1.1, ease: 'expo.out', delay: 0.3 }
        )
      },
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section id="sec3" className={styles.section}>
      <div className={styles.inner}>
        <div ref={bgRef} aria-hidden className={styles.bgWord}>TADADADA</div>

        <div
          ref={labelRef}
          className={styles.label}
          style={{ opacity: 0, transform: 'translateY(16px)' }}
        >
          // 03 · Who I Am
        </div>

        <div className={styles.statement}>
          {WORDS.map((w, i) => (
            <span key={i} className={styles.word}>
              <span
                ref={(el) => { if (el) wordRefs.current[i] = el }}
                className={`${styles.wordInner} ${wordClassMap[w.cls]}`}
              >
                {w.text}
              </span>
            </span>
          ))}
        </div>

        <div className={styles.cols}>
          {COLS.map((col, i) => (
            <div
              key={i}
              ref={(el) => { if (el) colRefs.current[i] = el }}
              className={styles.col}
              style={{ opacity: 0, transform: 'translateY(32px)' }}
            >
              <div className={styles.colLine} />
              <div className={styles.colNum}>{col.num}</div>
              <div className={styles.colTitle}>{col.title}</div>
              <div className={styles.colBody}>{col.body}</div>
            </div>
          ))}
        </div>

        <div
          ref={botRef}
          className={styles.bottom}
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          <Link href="/contact" className={styles.ctaBtn}>
            <span className={styles.ctaBtnInner}>Contact Me →</span>
          </Link>
          <div ref={divRef} className={styles.divider} />
          <div className={styles.statusText}>Seoul · 2025 · Frontend Dev</div>
        </div>
      </div>
    </section>
  )
}
