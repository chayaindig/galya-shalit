import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { contact, workText, works } from '../data'
import { useLang } from '../i18n'
import Icon from './Icon'
import SectionDots from './SectionDots'

gsap.registerPlugin(ScrollTrigger)

/*
  "Want to wear it?" as a clothesline: one clean line across the page, and polaroids of
  Galya's shirts pinned to it. On desktop the line drifts endlessly (arrows push it, hover pauses it); on a phone you drag it.
*/

export default function Shop() {
  const { lang, t } = useLang()
  const rtl = lang === 'he'
  const shirts = [
    { title: t.foxShirt, src: 'art2/prod-fox-shirt.webp', href: contact.shopUrl },
    ...works.filter(w => w.cover && w.shop).map(w => ({ title: workText(w, lang).title, src: w.cover!, href: w.shop! })),
  ]
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const track = root.current!.querySelector<HTMLElement>('.cl-track')!
    const rail = root.current!.querySelector<HTMLElement>('.cl-rail')!
    const swing = gsap.utils.toArray<HTMLElement>('.cl-pola', root.current)
    const sway = (v: number) => {
      if (reduce) return
      gsap.to(swing, { rotate: (i: number) => v * (0.7 + (i % 3) * 0.2), duration: 0.4, ease: 'power2.out', overwrite: true, stagger: 0.015 })
      gsap.to(swing, { rotate: 0, duration: 1.6, ease: 'elastic.out(1, 0.35)', delay: 0.45, overwrite: false })
    }

    const mm = gsap.matchMedia()
    // desktop: an endless line that keeps drifting; the arrows push it one polaroid along, hovering pauses it
    mm.add('(min-width: 768px)', () => {
      const items = gsap.utils.toArray<HTMLElement>('.cl-pola', track)
      const n = shirts.length
      const sign = rtl ? 1 : -1
      const state = { auto: 0, manual: 0, speed: reduce ? 0 : 40 }
      let period = 1
      const measure = () => { period = Math.abs(items[n].offsetLeft - items[0].offsetLeft) || 1 }
      measure()
      const tick = (_t: number, dt: number) => {
        state.auto += (state.speed * dt) / 1000
        gsap.set(track, { x: sign * gsap.utils.wrap(0, period, state.auto + state.manual) })
      }
      gsap.ticker.add(tick)
      const step = () => period / n
      const nudge = (dir: number) => {
        gsap.to(state, { manual: state.manual + dir * step(), duration: 0.8, ease: 'power3.out', overwrite: true })
        sway(dir * sign * -10)
      }
      const prev = root.current!.querySelector<HTMLElement>('.cl-prev')!
      const next = root.current!.querySelector<HTMLElement>('.cl-next')!
      const onPrev = () => nudge(-1)
      const onNext = () => nudge(1)
      const pause = () => gsap.to(state, { speed: 0, duration: 0.5 })
      const resume = () => gsap.to(state, { speed: reduce ? 0 : 40, duration: 0.8 })
      prev.addEventListener('click', onPrev)
      next.addEventListener('click', onNext)
      rail.addEventListener('mouseenter', pause)
      rail.addEventListener('mouseleave', resume)
      window.addEventListener('resize', measure)
      return () => {
        gsap.ticker.remove(tick)
        prev.removeEventListener('click', onPrev)
        next.removeEventListener('click', onNext)
        rail.removeEventListener('mouseenter', pause)
        rail.removeEventListener('mouseleave', resume)
        window.removeEventListener('resize', measure)
        gsap.set(track, { x: 0 })
      }
    })
    // phone: drag the line with a finger; the polaroids swing with the swipe
    mm.add('(max-width: 767px)', () => {
      let last = rail.scrollLeft
      const onScroll = () => {
        const d = (rail.scrollLeft - last) * (rtl ? 1 : -1)
        last = rail.scrollLeft
        sway(gsap.utils.clamp(-12, 12, d * 0.6))
      }
      rail.addEventListener('scroll', onScroll, { passive: true })
      return () => rail.removeEventListener('scroll', onScroll)
    })
    return () => mm.revert()
  }, [rtl, shirts.length])

  return (
    <section ref={root} id="shop" className="relative scroll-mt-20 overflow-x-clip py-24 md:py-32">
      <SectionDots tone="orange" />
      <div className="mx-auto grid max-w-7xl items-end gap-8 px-4 md:px-8 lg:grid-cols-12">
        <h2 className="font-display text-hero leading-[0.9] font-bold lg:col-span-7">
          {t.shopH1}
          <br />
          <span className="font-extralight">{t.shopH2}</span>
        </h2>
        <div className="lg:col-span-5">
          <p className="max-w-lg text-sub text-ink-soft">
            {t.shopP(t.shopName, t.shop2Name)}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {[
              { href: contact.shopUrl, name: t.shopName },
              { href: contact.shop2Url, name: t.shop2Name },
            ].map(s => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 rounded-full bg-blue-deep px-6 py-3.5 font-medium whitespace-nowrap text-paper transition-transform hover:-translate-y-0.5"
              >
                {t.shopCta(s.name)}
                <Icon name="arrow" flip />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* the clothesline */}
      <div className="relative mt-16 md:mt-24">
        <svg aria-hidden="true" viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-6 w-full">
          <path d="M-10 6 Q 500 34 1010 6" fill="none" stroke="var(--color-ink)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="cl-rail snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-6 [scrollbar-width:none] md:snap-none md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
        <ul className="cl-track flex w-max gap-6 px-6 pt-3 md:gap-10">
          {[...shirts, ...shirts].map((s, i) => (
            <li key={i} aria-hidden={i >= shirts.length || undefined} className={`cl-pola shrink-0 snap-center ${i >= shirts.length ? 'hidden md:block' : ''}`} style={{ transformOrigin: '50% 0%', marginTop: `${Math.sin(i * 1.7) * 6 + 6}px` }}>
              {/* clothes peg */}
              <span aria-hidden="true" className="mx-auto mb-[-10px] block h-7 w-3.5 rounded-sm bg-[#c9a77a] shadow-[inset_0_-6px_0_rgba(0,0,0,0.12)]" />
              <a
                href={s.href}
                target="_blank"
                rel="noopener"
                tabIndex={i >= shirts.length ? -1 : undefined}
                className="block w-40 bg-[#fdfbf7] p-2 pb-3 shadow-[0_18px_30px_-18px_rgba(35,32,29,0.6)] transition-transform hover:-translate-y-1 md:w-56 md:p-2.5 md:pb-4"
                style={{ rotate: `${(i % 2 ? 1 : -1) * (1 + (i % 3))}deg` }}
              >
                <img src={s.src} alt={t.onShirtAlt(s.title)} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
                <span className="mt-2 block text-center font-display text-sub leading-tight font-bold">{s.title}</span>
              </a>
            </li>
          ))}
        </ul>
        </div>
        <p className="mt-2 text-center text-note text-ink-soft md:hidden">{t.shopSwipe}</p>
        <div className="mx-auto mt-10 hidden max-w-7xl justify-center gap-3 px-8 md:flex">
          <button type="button" aria-label={t.shopPrev} className="cl-prev grid size-14 place-items-center rounded-full border border-ink/20 bg-paper transition-colors hover:bg-paper-2">
            <Icon name="arrow" back />
          </button>
          <button type="button" aria-label={t.shopNext} className="cl-next grid size-14 place-items-center rounded-full border border-ink/20 bg-paper transition-colors hover:bg-paper-2">
            <Icon name="arrow" flip />
          </button>
        </div>
      </div>
    </section>
  )
}
