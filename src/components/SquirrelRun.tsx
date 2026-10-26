import { useEffect, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
  Clean line against bursting colour, played out by Galya's squirrel:
  the line squirrel bounds across the page from one side to the other as you scroll,
  and four splashes from Galya's own chameleon painting chase it, each a little slower, like colour trying to catch the line.
*/
// Letters of the line underneath; each one jumps when the squirrel passes over it
const phrase = 'השראה מגיעה בקפיצות'
// the chameleon's own colours
const pops = ['#c8024a', '#ef7a06', '#0d6ea3', '#1f9a2a', '#78c21f']

const blots = [
  { src: 'hero/splash-yellow.webp', size: 0.62, dy: '-8%', lag: 1.0 },
  { src: 'hero/splash-pink.webp', size: 0.5, dy: '18%', lag: 1.6 },
  { src: 'hero/splash-blue.webp', size: 0.42, dy: '-22%', lag: 2.2 },
  { src: 'hero/splash-green.webp', size: 0.34, dy: '24%', lag: 2.8 },
]

export default function SquirrelRun() {
  const band = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let measure = () => {}
    const ctx = gsap.context(() => {
      const runner = band.current!.querySelector<HTMLElement>('.sr-runner')!
      const hopper = band.current!.querySelector<HTMLElement>('.sr-hop')!
      const from = () => window.innerWidth + 40
      const to = () => -runner.offsetWidth * 1.25
      const st = { trigger: band.current, start: 'top bottom', end: 'bottom top', invalidateOnRefresh: true }

      // Proximity effect (the idea behind React Bits "Variable Proximity"), driven by the squirrel
      // instead of the cursor: the closer it is to a letter, the higher that letter jumps.
      const letters = gsap.utils.toArray<HTMLElement>('.sr-letter')
      const lift = letters.map(el => gsap.quickTo(el, 'y', { duration: 0.45, ease: 'back.out(3)' }))
      const turn = letters.map(el => gsap.quickTo(el, 'rotate', { duration: 0.45, ease: 'back.out(3)' }))
      let centers: number[] = []
      measure = () => { centers = letters.map(el => { const r = el.getBoundingClientRect(); return r.left + r.width / 2 }) }
      measure()
      ScrollTrigger.addEventListener('refresh', measure)
      const kick = () => {
        const r = runner.getBoundingClientRect()
        const cx = r.left + r.width * 0.5
        const reach = r.width * 0.55
        const size = letters[0]?.offsetHeight ?? 60
        letters.forEach((el, i) => {
          const near = Math.max(0, 1 - Math.abs(centers[i] - cx) / reach)
          lift[i](-near * size * 0.55)
          turn[i]((i % 2 ? 1 : -1) * near * 14)
          el.style.color = near > 0.35 ? pops[i % pops.length] : ''
        })
      }

      // the squirrel bounds: five hops across the page
      const hop = gsap.quickSetter(hopper, 'y', 'px')
      const tilt = gsap.quickSetter(hopper, 'rotate', 'deg')
      gsap.fromTo(runner, { x: from }, {
        x: to, ease: 'none',
        scrollTrigger: {
          ...st, scrub: 0.4,
          onUpdate: self => {
            const t = self.progress * Math.PI * 5
            hop(-Math.abs(Math.sin(t)) * runner.offsetHeight * 0.35)
            tilt(Math.cos(t) * 6)
            kick()
          },
        },
      })
      // the colour chases it, each blot a little more behind
      gsap.utils.toArray<HTMLElement>('.sr-blot').forEach((el, i) => {
        gsap.fromTo(el, { x: from, rotate: 0 }, { x: to, rotate: 120 + i * 40, ease: 'none', scrollTrigger: { ...st, scrub: blots[i].lag } })
      })
    }, band)
    return () => {
      ScrollTrigger.removeEventListener('refresh', measure)
      ctx.revert()
    }
  }, [])

  return (
    <div ref={band} className="relative h-[60svh] overflow-x-clip md:h-[80vh]" aria-hidden="true" style={{ '--sr-w': 'clamp(230px, 42vw, 640px)' } as CSSProperties}>

      {blots.map((b, i) => (
        <div key={b.src} className="sr-blot absolute top-1/2 left-0" style={{ width: `calc(var(--sr-w) * ${b.size})`, marginTop: `calc(var(--sr-w) * ${-b.size / 2})`, marginLeft: `calc(var(--sr-w) * ${(1 - b.size) / 2 + 0.14 + i * 0.12})`, translate: `0 ${b.dy}` }}>
          <img src={b.src} alt="" className="w-full mix-blend-multiply" style={{ opacity: 0.85 }} />
        </div>
      ))}

      <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[clamp(2.4rem,10vw,10rem)] leading-none font-bold whitespace-nowrap text-ink/45">
        {phrase.split(' ').map((word, w) => (
          <span key={w} className="inline-block whitespace-nowrap">
            {[...word].map((ch, c) => (
              <span key={c} className="sr-letter inline-block transition-[color] duration-500">{ch}</span>
            ))}
            {w < 2 && '\u00a0'}
          </span>
        ))}
      </p>

      <div className="sr-runner absolute top-1/2 left-0 -translate-y-1/2 motion-reduce:left-1/2 motion-reduce:-translate-x-1/2" style={{ width: 'var(--sr-w)' }}>
        <div className="sr-hop" style={{ transformOrigin: '50% 100%' }}>
          <img src="squirrels/run.svg" alt="" className="w-full" draggable={false} />
        </div>
      </div>
    </div>
  )
}
