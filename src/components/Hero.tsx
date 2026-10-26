import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { blooms, chameleonPaths, chameleonViewBox } from '../lib/art-paths'
import { waLink } from '../data'
import { cn } from '../lib/cn'
import Icon from './Icon'

gsap.registerPlugin(ScrollTrigger)

/*
  Galya's watercolor chameleon, oversize, told as a process on scroll:
  1. the black line draws itself (on load)
  2. watercolor blots bloom into the body (scroll)
  3. the tongue shoots out to the blue blot (scroll)
  4. the blue blot floods the screen and becomes the next section
*/

// The tongue, redrawn as one clean stroke over the original line
const TONGUE =
  'M 848 459 C 960 463, 1150 425, 1262 340 C 1300 310, 1342 270, 1340 236 C 1338 222, 1326 212, 1314 216'
// Centre of the blue blot the tongue catches
const TIP = { x: 1262, y: 252 }

// Blots behind the hero copy on desktop stay unpainted, so the text stays calm
const behindCopy = (b: { x: number; y: number }) => b.x > 1000 && b.y > 500
const isTip = (b: { x: number; y: number }) => b.x > 1150 && b.y < 420

const bodyBlooms = blooms.filter(b => !behindCopy(b) && !isTip(b)).sort((a, b) => a.x - b.x)
const tipBlooms = blooms.filter(isTip)

const stages = ['קו', 'צבע', 'לשון']

export default function Hero() {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const flood = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(1)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<SVGPathElement>('.cham-line')
      const tongue = '.cham-tongue'
      const body = gsap.utils.toArray<SVGCircleElement>('.bloom-body')
      const tip = gsap.utils.toArray<SVGCircleElement>('.bloom-tip')
      const fullR = (_: number, el: Element) => (el as SVGCircleElement).dataset.r!

      if (reduce) {
        gsap.set(lines, { fillOpacity: 1, strokeWidth: 0, strokeDashoffset: 0 })
        gsap.set(tongue, { strokeDashoffset: 0 })
        gsap.set([...body, ...tip], { attr: { r: fullR } })
        setStep(3)
        return
      }

      // 1. The pen draws the line as soon as the page opens
      gsap.set(lines, { strokeDashoffset: 1, fillOpacity: 0 })
      gsap
        .timeline({ delay: 0.35 })
        .to(lines, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut', stagger: { each: 0.05, from: 'random' } })
        .to(lines, { fillOpacity: 1, strokeWidth: 0, duration: 0.9, ease: 'power1.out', stagger: 0.02 }, '-=1')

      // Where the flood starts, and how big it must grow to cover the stage
      const placeFlood = () => {
        const st = stage.current!.getBoundingClientRect()
        const m = svg.current!.querySelector<SVGCircleElement>('.tip-marker')!.getBoundingClientRect()
        const cx = m.left + m.width / 2 - st.left
        const cy = m.top + m.height / 2 - st.top
        const far = Math.max(Math.hypot(cx, cy), Math.hypot(st.width - cx, cy), Math.hypot(cx, st.height - cy), Math.hypot(st.width - cx, st.height - cy))
        gsap.set(flood.current, { left: cx - 50, top: cy - 50 })
        return (far / 42) * 1.15
      }
      let cover = placeFlood()
      ScrollTrigger.addEventListener('refreshInit', () => { cover = placeFlood() })

      // 2-4. Scroll tells the rest of the story
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: self => {
            const p = self.progress
            setStep(p < 0.04 ? 1 : p < 0.52 ? 2 : 3)
          },
        },
      })
      tl.to('.scroll-hint', { autoAlpha: 0, duration: 0.04 }, 0)
        .to(body, { attr: { r: fullR }, duration: 0.2, ease: 'power1.out', stagger: { amount: 0.32 } }, 0.02)
        .fromTo(tongue, { strokeDashoffset: 1.02 }, { strokeDashoffset: 0, duration: 0.11, ease: 'power3.out' }, 0.52)
        .to(tip, { attr: { r: fullR }, duration: 0.07, ease: 'power2.out', stagger: { amount: 0.03 } }, 0.6)
        .to(copy.current, { autoAlpha: 0, y: -30, duration: 0.07 }, 0.66)
        .to('.hero-bar', { autoAlpha: 0, duration: 0.05 }, 0.8)
        .fromTo(flood.current, { scale: 0, autoAlpha: 1 }, { scale: () => cover, duration: 0.27, ease: 'power2.in' }, 0.71)
        .to({}, { duration: 0.02 })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={section} className="relative h-[330svh] motion-reduce:h-auto lg:h-[380vh]" aria-label="פתיחה">
      <div ref={stage} className="sticky top-0 h-svh overflow-hidden motion-reduce:relative motion-reduce:min-h-svh">
        <svg
          ref={svg}
          viewBox={chameleonViewBox}
          className="cham absolute select-none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="soft">
              <stop offset="0.55" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="bloom-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="1282">
              <rect width="1600" height="1282" fill="#000" />
              {bodyBlooms.map((b, i) => (
                <circle key={i} className="bloom-body" cx={b.x} cy={b.y} r={0} data-r={b.r} fill="url(#soft)" />
              ))}
              {tipBlooms.map((b, i) => (
                <circle key={i} className="bloom-tip" cx={b.x} cy={b.y} r={0} data-r={b.r * 1.15} fill="url(#soft)" />
              ))}
            </mask>
          </defs>

          <image href="hero/chameleon-color.webp" width="1600" height="1282" mask="url(#bloom-mask)" />

          <g className="text-ink" fill="currentColor" stroke="currentColor">
            {chameleonPaths.map((p, i) => (
              <path key={i} className="cham-line" d={p.d} pathLength={1} />
            ))}
          </g>
          <path className="cham-tongue" d={TONGUE} pathLength={1} />
          <circle className="tip-marker" cx={TIP.x} cy={TIP.y} r="2" fill="none" />
        </svg>

        {/* The blue blot that floods the page. A pre-rendered image, not an SVG filter:
            iOS Safari drops filtered layers once they are scaled this large. */}
        <div ref={flood} aria-hidden="true" className="pointer-events-none invisible absolute size-[100px]">
          <img src="hero/flood-blot.webp" alt="" className="size-full" decoding="async" />
        </div>

        <div
          ref={copy}
          className="absolute inset-x-4 top-[17svh] max-w-xl sm:inset-x-8 lg:top-auto lg:right-[6vw] lg:bottom-[13vh] lg:left-auto lg:w-[min(36rem,40vw)]"
        >
          <p className="mb-4 text-note font-medium tracking-wide text-ink-soft">
            איור · צבעי עפרון · דיגיטל · לוגואים
          </p>
          <h1 className="font-display text-hero font-extralight tracking-tight">גליה שליט</h1>
          <p className="mt-5 max-w-md text-sub text-ink-soft">
            קו נקי, צבע מתפרץ. אני מאיירת בצבעי עפרון ובכלים דיגיטליים, ומדפיסה את האיורים על חולצות, תיקים, קירות ומה שרק תרצו.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 rounded-full bg-blue-deep px-6 py-3.5 font-medium text-paper shadow-[0_10px_30px_-12px_var(--color-blue-deep)] transition-transform hover:-translate-y-0.5"
            >
              <Icon name="whatsapp" />
              לכתוב לי בוואטסאפ
            </a>
            <a href="#works" className="border-b border-ink/40 pb-0.5 font-medium transition-colors hover:border-ink">
              לראות עבודות
            </a>
          </div>
        </div>

        {/* Process indicator + a visible way out */}
        <div className="hero-bar absolute inset-x-4 bottom-5 flex items-center justify-between gap-4 ps-16 sm:inset-x-8 md:ps-20 lg:bottom-7">
          <ol className="flex items-center gap-3 text-note" aria-label="שלבי הציור">
            {stages.map((s, i) => (
              <li key={s} className={cn('flex items-center gap-2 transition-colors duration-500', step > i ? 'text-ink' : 'text-ink-soft/60')}>
                <span className={cn('size-2 rounded-full transition-colors duration-500', step > i ? 'bg-blue' : 'bg-line')} />
                {s}
              </li>
            ))}
          </ol>
          <p className="scroll-hint hidden text-note text-ink-soft md:block motion-reduce:hidden">גללו, והזיקית תתמלא בצבע</p>
          <a href="#story" className="rounded-full border border-ink/25 bg-paper/80 px-4 py-2 text-note font-medium whitespace-nowrap transition-colors hover:bg-paper motion-reduce:hidden">
            לדלג על הציור
          </a>
        </div>
      </div>
    </section>
  )
}
