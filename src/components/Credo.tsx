import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionDots from './SectionDots'
import { useLang } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

/*
  The one big typographic moment, in Galya's own words: clean line against bursting colour.
  "קו נקי" is thin, with a single pen line drawing itself under it.
  "צבע מתפרץ" is heavy and full of her colour, with drops of paint bursting out of it.
*/
const drops = [
  { c: '#d6246e', x: '6%', y: '-18%', s: 0.16 },
  { c: '#f2c918', x: '18%', y: '96%', s: 0.11 },
  { c: '#2f9a6a', x: '41%', y: '-24%', s: 0.09 },
  { c: '#3d8cb5', x: '63%', y: '102%', s: 0.14 },
  { c: '#e8762b', x: '84%', y: '-14%', s: 0.12 },
  { c: '#7b4fa8', x: '97%', y: '70%', s: 0.08 },
]

export default function Credo() {
  const { lang, t } = useLang()
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.credo-pen', { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: '.credo-line', start: 'top 80%', end: 'top 35%', scrub: 0.6 },
      })
      gsap.fromTo('.credo-color', { backgroundPosition: '50% 0%' }, {
        backgroundPosition: '50% 100%', ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.fromTo('.credo-drop', { scale: 0, autoAlpha: 0 }, {
        scale: 1, autoAlpha: 0.9, ease: 'back.out(3)', stagger: 0.08,
        scrollTrigger: { trigger: '.credo-color', start: 'top 85%', end: 'top 50%', scrub: 0.6 },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    // Picks up exactly where the blue blot flooded the hero, then washes back to paper at the bottom.
    <section
      ref={root}
      id="story"
      className="relative overflow-x-clip pt-[20svh] pb-[30svh] text-paper"
      aria-labelledby="credo-title"
      style={{ background: 'linear-gradient(to bottom, var(--color-blue) 0%, var(--color-blue-night) 30%, var(--color-blue-night) 74%, var(--color-paper) 100%)' }}
    >
      <SectionDots tone="green" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        <h2 id="credo-title" className={`credo mt-8 font-display leading-[0.95] ${lang === 'en' ? 'credo-en' : ''}`}>
          <span className="credo-line relative block w-fit font-extralight whitespace-nowrap">
            {t.credo1}
            <svg aria-hidden="true" viewBox="0 0 400 24" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-[0.06em] h-[0.12em] w-full overflow-visible">
              <path className="credo-pen" d="M398 14 C 300 6, 210 20, 120 12 S 20 10, 2 16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" />
            </svg>
          </span>
          <span className="relative mt-[0.12em] block w-fit whitespace-nowrap md:ms-[0.6em]">
            <span className="credo-color font-bold">{t.credo2}</span>
            {drops.map((d, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="credo-drop absolute rounded-full"
                style={{ left: d.x, top: d.y, width: `${d.s}em`, height: `${d.s}em`, background: `radial-gradient(circle at 35% 30%, color-mix(in srgb, ${d.c} 65%, white), ${d.c} 70%)` }}
              />
            ))}
          </span>
        </h2>

        <div className="mt-16 max-w-2xl md:ms-auto">
          <h3 className="font-display text-section leading-tight font-bold">{t.lineTitle}</h3>
          <p className="mt-5 text-sub text-paper/85">{t.lineP}</p>
        </div>
      </div>
    </section>
  )
}
