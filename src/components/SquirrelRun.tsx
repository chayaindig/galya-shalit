import { useEffect, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

/*
  Clean line against bursting colour, played out by Galya's lizard:
  the line lizard Galya drew for the site scurries across the page from one side to the other as you scroll.
  Every letter it leaps over leaps up and fills with Galya's colour, the same paint
  that fills "צבע מתפרץ", so by the time it leaves, the whole line is coloured.
*/

export default function SquirrelRun() {
  const { lang, t } = useLang()
  const phrase = t.leap
  const band = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const letters = Array.from(band.current!.querySelectorAll<HTMLElement>('.sr-letter'))
    const phraseEl = band.current!.querySelector<HTMLElement>('.sr-phrase')!
    let centers: number[] = []

    // one continuous painting across the whole line: each letter shows its own slice of it
    const measure = () => {
      const p = phraseEl.getBoundingClientRect()
      centers = letters.map(el => {
        const r = el.getBoundingClientRect()
        el.style.backgroundSize = `${p.width}px auto`
        el.style.backgroundPosition = `${p.left - r.left}px 45%`
        return r.left + r.width / 2
      })
    }
    measure()
    document.fonts?.ready.then(measure)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      letters.forEach(el => el.classList.add('is-wet'))
      return
    }

    const ctx = gsap.context(() => {
      const runner = band.current!.querySelector<HTMLElement>('.sr-runner')!
      const hopper = band.current!.querySelector<HTMLElement>('.sr-hop')!

      // Proximity effect (the idea behind React Bits "Variable Proximity"), driven by the squirrel
      // instead of the cursor: the closer it is to a letter, the higher that letter jumps.
      const lift = letters.map(el => gsap.quickTo(el, 'y', { duration: 0.45, ease: 'back.out(3)' }))
      const turn = letters.map(el => gsap.quickTo(el, 'rotate', { duration: 0.45, ease: 'back.out(3)' }))
      const kick = () => {
        const r = runner.getBoundingClientRect()
        const cx = r.left + r.width * 0.5
        const reach = r.width * 0.55
        const size = letters[0]?.offsetHeight ?? 60
        letters.forEach((el, i) => {
          const near = Math.max(0, 1 - Math.abs(centers[i] - cx) / reach)
          lift[i](-near * size * 0.55)
          turn[i]((i % 2 ? 1 : -1) * near * 14)
          // it runs right to left: once it has reached a letter, that letter stays painted
          el.classList.toggle('is-wet', centers[i] - cx > -reach * 0.2)
        })
      }

      // the lizard scurries: five hops across the page
      const hop = gsap.quickSetter(hopper, 'y', 'px')
      const tilt = gsap.quickSetter(hopper, 'rotate', 'deg')
      gsap.fromTo(runner, { x: () => window.innerWidth + 40 }, {
        x: () => -runner.offsetWidth * 1.25,
        ease: 'none',
        scrollTrigger: {
          trigger: band.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.4,
          invalidateOnRefresh: true,
          onRefresh: measure,
          onUpdate: self => {
            const t = self.progress * Math.PI * 5
            hop(-Math.abs(Math.sin(t)) * runner.offsetHeight * 0.22)
            // a lizard scurries: small quick wiggle as it runs
            tilt(Math.sin(t * 3) * 5)
            kick()
          },
        },
      })
    }, band)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={band} className="relative h-[36svh] overflow-x-clip md:h-[80vh]" aria-hidden="true" style={{ '--sr-w': 'clamp(280px, 56vw, 820px)' } as CSSProperties}>
      <p className={`sr-phrase absolute inset-x-0 top-1/2 mx-auto w-fit -translate-y-1/2 font-display leading-none ${lang === 'en' ? 'text-[clamp(1.9rem,8vw,8.5rem)]' : 'text-[clamp(2.4rem,10vw,10rem)]'} font-bold whitespace-nowrap`}>
        {phrase.split(' ').map((word, w) => (
          <span key={w} className="inline-block whitespace-nowrap">
            {[...word].map((ch, c) => (
              <span key={c} className="sr-letter inline-block">{ch}</span>
            ))}
            {w < phrase.split(' ').length - 1 && '\u00a0'}
          </span>
        ))}
      </p>

      <div className="sr-runner absolute top-1/2 left-0 -translate-y-1/2 motion-reduce:left-1/2 motion-reduce:-translate-x-1/2" style={{ width: 'var(--sr-w)' }}>
        <div className="sr-hop" style={{ transformOrigin: '50% 100%' }}>
          <img src="lizard/run.svg" alt="" className="w-full" draggable={false} />
        </div>
      </div>
    </div>
  )
}
