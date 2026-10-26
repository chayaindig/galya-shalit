import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../lib/cn'

/*
  Finger-swipe carousel for phones, coverflow style: native scroll-snap (so it feels like the phone),
  and each card scales and turns slightly in 3D by its distance from the centre.
*/
export default function SwipeCarousel<T>({
  items,
  render,
  getKey,
  className,
}: {
  items: T[]
  render: (item: T, index: number) => ReactNode
  getKey: (item: T) => string
  className?: string
}) {
  const rail = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = rail.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    const update = () => {
      frame = 0
      const box = el.getBoundingClientRect()
      const mid = box.left + box.width / 2
      let best = 0
      let bestD = Infinity
      Array.from(el.children).forEach((child, i) => {
        const c = child as HTMLElement
        const r = c.getBoundingClientRect()
        const d = (r.left + r.width / 2 - mid) / r.width
        if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = i }
        if (reduce) return
        const k = Math.min(1, Math.abs(d))
        const card = c.firstElementChild as HTMLElement
        card.style.transform = `perspective(900px) rotateY(${(-d * 16).toFixed(2)}deg) scale(${(1 - k * 0.12).toFixed(3)})`
        card.style.opacity = (1 - k * 0.45).toFixed(3)
      })
      setActive(best)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items])

  return (
    <div className={className}>
      <div
        ref={rail}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[11vw] pt-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div key={getKey(item)} className="w-[78vw] shrink-0 snap-center">
            <div className="origin-center transition-[opacity] duration-150 will-change-transform">{render(item, i)}</div>
          </div>
        ))}
      </div>
      {/* position: dots + counter */}
      <div className="mt-1 flex items-center justify-center gap-3">
        <div className="flex max-w-[60vw] items-center gap-1.5 overflow-hidden">
          {items.map((item, i) => (
            <span key={getKey(item)} className={cn('h-1.5 shrink-0 rounded-full transition-all duration-300', i === active ? 'w-5 bg-ink' : 'w-1.5 bg-ink/20')} />
          ))}
        </div>
        <span className="text-note text-ink-soft tabular-nums" dir="ltr">
          {active + 1} / {items.length}
        </span>
      </div>
    </div>
  )
}
