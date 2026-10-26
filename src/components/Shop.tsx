import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { contact, works } from '../data'
import Icon from './Icon'
import SectionDots from './SectionDots'

gsap.registerPlugin(ScrollTrigger)

/*
  "Want to wear it?" as a clothesline: one clean line across the page, and polaroids of
  Galya's shirts pinned to it. Scrolling pulls them along the line, and they swing with your speed.
*/
const shirts = [
  { title: 'השועל הכתום', src: 'art2/prod-fox-shirt.webp', href: contact.shopUrl },
  ...works.filter(w => w.cover && w.shop).map(w => ({ title: w.title, src: w.cover!, href: w.shop! })),
]

export default function Shop() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const track = root.current!.querySelector<HTMLElement>('.cl-track')!
      const swing = gsap.utils.toArray<HTMLElement>('.cl-pola')
      if (reduce) return
      // RTL: the row starts on the right and overflows to the left, so it slides right
      gsap.fromTo(track, { x: () => -window.innerWidth * 0.15 }, {
        x: () => track.scrollWidth - window.innerWidth * 0.85,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: self => {
            const v = gsap.utils.clamp(-14, 14, self.getVelocity() / 140)
            gsap.to(swing, { rotate: (i: number) => v * (0.7 + (i % 3) * 0.2), duration: 0.4, ease: 'power2.out', overwrite: true, stagger: 0.015 })
            gsap.to(swing, { rotate: 0, duration: 1.6, ease: 'elastic.out(1, 0.35)', delay: 0.45, overwrite: false })
          },
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="shop" className="relative scroll-mt-20 overflow-x-clip py-24 md:py-32">
      <SectionDots tone="orange" />
      <div className="mx-auto grid max-w-7xl items-end gap-8 px-4 md:px-8 lg:grid-cols-12">
        <h2 className="font-display text-hero leading-[0.9] font-bold lg:col-span-7">
          רוצים
          <br />
          <span className="font-extralight">ללבוש את זה?</span>
        </h2>
        <div className="lg:col-span-5">
          <p className="max-w-lg text-sub text-ink-soft">
            החולצות שלי נמכרות ב״{contact.shopName}״, חנות של אמנים ישראלים. בוחרים איור, בוחרים חולצה, והוא מגיע אליכם הביתה.
          </p>
          <a
            href={contact.shopUrl}
            target="_blank"
            rel="noopener"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-blue-deep px-6 py-3.5 font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            לחנות שלי ב״{contact.shopName}״
            <Icon name="arrow" flip />
          </a>
        </div>
      </div>

      {/* the clothesline */}
      <div className="relative mt-16 md:mt-24">
        <svg aria-hidden="true" viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-6 w-full">
          <path d="M-10 6 Q 500 34 1010 6" fill="none" stroke="var(--color-ink)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        </svg>
        <ul className="cl-track flex w-max gap-6 px-6 pt-3 md:gap-10">
          {shirts.map((s, i) => (
            <li key={s.src} className="cl-pola shrink-0" style={{ transformOrigin: '50% 0%', marginTop: `${Math.sin(i * 1.7) * 6 + 6}px` }}>
              {/* clothes peg */}
              <span aria-hidden="true" className="mx-auto mb-[-10px] block h-7 w-3.5 rounded-sm bg-[#c9a77a] shadow-[inset_0_-6px_0_rgba(0,0,0,0.12)]" />
              <a
                href={s.href}
                target="_blank"
                rel="noopener"
                className="block w-40 bg-[#fdfbf7] p-2 pb-3 shadow-[0_18px_30px_-18px_rgba(35,32,29,0.6)] transition-transform hover:-translate-y-1 md:w-56 md:p-2.5 md:pb-4"
                style={{ rotate: `${(i % 2 ? 1 : -1) * (1 + (i % 3))}deg` }}
              >
                <img src={s.src} alt={`${s.title} מודפס על חולצה`} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
                <span className="mt-2 block text-center font-display text-sub leading-tight font-bold">{s.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
