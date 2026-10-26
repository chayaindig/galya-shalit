import { useEffect, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
  Clean line against bursting colour, played out by Galya's squirrel:
  the line squirrel bounds across the page from one side to the other as you scroll,
  and four blots of paint chase it, each a little slower, like colour trying to catch the line.
*/
const blots = [
  { src: 'hero/blot-yellow.webp', size: 0.62, dy: '-8%', lag: 1.0 },
  { src: 'hero/blot-pink.webp', size: 0.5, dy: '18%', lag: 1.6 },
  { src: 'hero/blot-blue.webp', size: 0.42, dy: '-22%', lag: 2.2 },
  { src: 'hero/blot-green.webp', size: 0.34, dy: '24%', lag: 2.8 },
]

export default function SquirrelRun() {
  const band = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const runner = band.current!.querySelector<HTMLElement>('.sr-runner')!
      const hopper = band.current!.querySelector<HTMLElement>('.sr-hop')!
      const from = () => window.innerWidth + 40
      const to = () => -runner.offsetWidth * 1.25
      const st = { trigger: band.current, start: 'top bottom', end: 'bottom top', invalidateOnRefresh: true }

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
          },
        },
      })
      // the colour chases it, each blot a little more behind
      gsap.utils.toArray<HTMLElement>('.sr-blot').forEach((el, i) => {
        gsap.fromTo(el, { x: from, rotate: 0 }, { x: to, rotate: 120 + i * 40, ease: 'none', scrollTrigger: { ...st, scrub: blots[i].lag } })
      })
    }, band)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={band} className="relative h-[60svh] overflow-x-clip md:h-[80vh]" aria-hidden="true" style={{ '--sr-w': 'clamp(230px, 42vw, 640px)' } as CSSProperties}>
      <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[clamp(3rem,11vw,10rem)] leading-none font-extralight whitespace-nowrap text-ink/10">
        השראה מגיעה בקפיצות
      </p>

      {blots.map((b, i) => (
        <div key={b.src} className="sr-blot absolute top-1/2 left-0" style={{ width: `calc(var(--sr-w) * ${b.size})`, marginTop: `calc(var(--sr-w) * ${-b.size / 2})`, marginLeft: `calc(var(--sr-w) * ${(1 - b.size) / 2 + 0.14 + i * 0.12})`, translate: `0 ${b.dy}` }}>
          <img src={b.src} alt="" className="w-full mix-blend-multiply" style={{ opacity: 0.85 }} />
        </div>
      ))}

      <div className="sr-runner absolute top-1/2 left-0 -translate-y-1/2 motion-reduce:left-1/2 motion-reduce:-translate-x-1/2" style={{ width: 'var(--sr-w)' }}>
        <div className="sr-hop" style={{ transformOrigin: '50% 100%' }}>
          <img src="squirrels/run.svg" alt="" className="w-full" draggable={false} />
        </div>
      </div>
    </div>
  )
}
