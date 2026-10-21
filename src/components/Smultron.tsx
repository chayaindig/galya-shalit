import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
  The one big typographic moment of the page: a Swedish word with no translation,
  filled with Galya's own watercolour. The two dots of the ä are two drops of paint
  that fall into place as you scroll.
*/
export default function Smultron() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.smu-word > span',
        { backgroundPosition: '50% 0%' },
        { backgroundPosition: '50% 100%', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
      gsap.fromTo(
        '.smu-drop',
        { y: '-1.6em', scaleY: 1.5, autoAlpha: 0 },
        {
          y: 0,
          scaleY: 1,
          autoAlpha: 1,
          ease: 'bounce.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.smu-word', start: 'top 85%', end: 'top 45%', scrub: 0.6 },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-x-clip py-24 md:py-36" aria-labelledby="smu-title">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="text-note font-medium tracking-wide text-ink-soft">
          <span dir="ltr" className="tabular-nums">02</span> · מילה אחת בשוודית
        </p>
      </div>

      <h2
        id="smu-title"
        dir="ltr"
        lang="sv"
        aria-label="Smultronställe"
        className="smu-word mt-6 px-[2vw] text-center font-display leading-[1.05] font-extrabold whitespace-nowrap"
      >
        <span aria-hidden="true">
          Smultronst
          <span className="relative inline-block">
            a
            <span className="smu-drop absolute top-[0.06em] left-[0.07em] size-[0.17em] rounded-full" style={{ background: 'radial-gradient(circle at 40% 35%, #5aa6cf, #1f5f86 70%)' }} />
            <span className="smu-drop absolute top-[0.06em] left-[0.32em] size-[0.17em] rounded-full" style={{ background: 'radial-gradient(circle at 40% 35%, #ef5d93, #b0174f 70%)' }} />
          </span>
          lle
        </span>
      </h2>

      <div className="mx-auto mt-10 grid max-w-7xl gap-8 px-4 md:mt-14 md:grid-cols-12 md:px-8">
        <p className="text-note text-ink-soft md:col-span-3">
          סְמוּלְטְרוֹן־סְטֶלֶה
          <br />
          מילולית: מקום של תותי בר
        </p>
        <div className="md:col-span-8 md:col-start-5">
          <p className="text-sub">
            בשוודית יש מילה שאין לה תרגום. היא מתארת את המקום הסודי שלך, זה שרק את מכירה, שחוזרים אליו כדי להיות שקטים ומאושרים.
          </p>
          <p className="mt-5 text-ink-soft">
            הציור הוא ה־smultronställe שלי. כל איור כאן הוא הזמנה קטנה להיכנס פנימה.
          </p>
        </div>
      </div>
    </section>
  )
}
