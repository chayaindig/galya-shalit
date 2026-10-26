import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { contact, categories, emotions, photoSlots, waLink, works, type CatId, type Work } from '../data'
import { cn } from '../lib/cn'
import CardSpread from './CardSpread'
import Icon from './Icon'
import Squirrel from './Squirrel'

/*
  Works by category. Each card opens to a full view (based on React Bits Pro "Modal Cards").
  The digital category opens with the emotion cards as a fanned deck (React Bits Pro "Card Spread").
*/
const spring = { type: 'spring' as const, stiffness: 260, damping: 30 }

const emotionWork = (i: number): Work => ({
  id: `emo-${emotions[i].id}`,
  title: emotions[i].id[0].toUpperCase() + emotions[i].id.slice(1),
  en: 'כרטיסיות רגשות',
  cat: 'digital',
  art: emotions[i].src,
  note: 'מתוך סדרת כרטיסיות הרגשות: אחת עשרה תחושות, ילד אחד והמון צבע. כל מילה מצוירת כמו הרגש שהיא מתארת.',
})

export default function Gallery({ filter, setFilter }: { filter: CatId; setFilter: (f: CatId) => void }) {
  const [open, setOpen] = useState<Work | null>(null)
  const shown = works.filter(w => w.cat === filter)
  const cat = categories.find(c => c.id === filter)!

  return (
    <section id="works" className="relative scroll-mt-20 overflow-x-clip py-24 md:py-32">
      {/* the squirrel runs in along the top of the gallery */}
      <Squirrel pose="run" className="absolute top-2 left-[34%] w-24 md:top-0 md:w-36" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-note font-medium tracking-wide text-ink-soft">
              <span dir="ltr" className="tabular-nums">04</span> · מהסטודיו
            </p>
            <h2 className="mt-3 font-display text-section font-bold">עבודות</h2>
          </div>
          <div role="tablist" aria-label="קטגוריות" className="-mx-4 flex max-w-[100vw] gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
            {categories.map(c => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={filter === c.id}
                onClick={() => setFilter(c.id)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-note font-medium whitespace-nowrap transition-colors',
                  filter === c.id ? 'border-ink bg-ink text-paper' : 'border-ink/20 hover:border-ink/50',
                )}
              >
                <span className="size-2 rounded-full" style={{ background: c.color }} />
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-ink-soft">{cat.line}</p>

        {filter === 'digital' && (
          <div className="mt-10 rounded-3xl bg-paper-2 px-4 pt-8 pb-4 md:px-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-sub font-medium">כרטיסיות רגשות</h3>
              <p className="text-note text-ink-soft">11 קלפים. העבירו עכבר או הקישו על קלף כדי לראות אותו מקרוב.</p>
            </div>
            <CardSpread
              cards={emotions}
              cardWidth={260}
              cardHeight={183}
              cardRadius={10}
              radius={760}
              arc={58}
              shadow={0.22}
              lift={34}
              className="h-[220px] md:h-[360px]"
              onSelect={i => setOpen(emotionWork(i))}
            />
          </div>
        )}

        {filter === 'photos' ? (
          <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {Array.from({ length: photoSlots }, (_, i) => (
              <li key={i} className={cn('grid place-items-center rounded-2xl border-2 border-dashed border-ink/20 text-center text-ink-soft', i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square')}>
                <span className="flex flex-col items-center gap-3 px-4">
                  <Icon name="camera" className="size-9" />
                  <span className="text-note">כאן ייכנס צילום של גליה</span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <LayoutGroup>
            <motion.ul layout className="mt-12 grid grid-flow-dense grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {shown.map(w => {
                  const photo = !!w.cover || w.art.includes('prod-') || w.art.includes('panda-model')
                  return (
                    <motion.li
                      key={w.id}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className={cn('min-w-0', w.wide && 'col-span-2')}
                    >
                      <button type="button" onClick={() => setOpen(w)} className="group block w-full text-right" aria-label={`לפתוח את ${w.title}`}>
                        <motion.div
                          layoutId={`card-${w.id}`}
                          transition={spring}
                          className={cn(
                            'relative overflow-hidden rounded-2xl bg-[#fdfbf7] shadow-[0_1px_0_var(--color-line),0_18px_40px_-28px_rgba(35,32,29,0.45)]',
                            w.wide ? 'aspect-[2/1]' : 'aspect-[4/5]',
                          )}
                        >
                          <motion.img
                            layoutId={`img-${w.id}`}
                            transition={spring}
                            src={w.cover || w.art}
                            alt={w.title}
                            loading="lazy"
                            decoding="async"
                            className={cn(
                              'absolute inset-0 size-full transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]',
                              photo ? 'object-cover' : 'object-contain p-[8%] mix-blend-multiply',
                            )}
                          />
                        </motion.div>
                        <div className="mt-3 flex items-baseline justify-between gap-3">
                          <span className="font-medium">{w.title}</span>
                          {w.en && <span className="truncate text-note text-ink-soft" dir="auto">{w.en}</span>}
                        </div>
                      </button>
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </motion.ul>
            <WorkModal work={open} onClose={() => setOpen(null)} />
          </LayoutGroup>
        )}

        {filter === 'products' && (
          <p className="mt-14 text-ink-soft">
            את החולצות אפשר להזמין{' '}
            <a href={contact.shopUrl} target="_blank" rel="noopener" className="border-b border-ink/40 font-medium whitespace-nowrap text-ink hover:border-ink">
              בחנות שלי ב{contact.shopName}
            </a>
            , ועל כל מוצר אחר פשוט כתבו לי.
          </p>
        )}
      </div>
    </section>
  )
}

function WorkModal({ work, onClose }: { work: Work | null; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!work) return
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [work, onClose])

  const s = work && categories.find(x => x.id === work.cat)!

  return createPortal(
    <AnimatePresence>
      {work && s && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="fixed inset-0 z-[70]"
            style={{ background: `radial-gradient(120% 120% at 50% 0%, rgba(247,243,236,0.96) 45%, color-mix(in srgb, ${s.color} 38%, rgba(247,243,236,0.96)) 100%)` }}
          />
          <div className="pointer-events-none fixed inset-0 z-[71] flex items-center justify-center p-3 md:p-8" role="dialog" aria-modal="true" aria-label={work.title}>
            <motion.div
              layoutId={`card-${work.id}`}
              transition={spring}
              className="pointer-events-auto relative grid max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-[#fdfbf7] shadow-2xl md:grid-cols-[1.35fr_1fr] md:overflow-hidden"
            >
              <div className={cn('relative bg-[#fdfbf7] md:min-h-[70svh]', work.wide ? 'aspect-[2/1] md:aspect-auto' : 'aspect-[4/5] max-h-[55svh] md:max-h-none md:aspect-auto')}>
                <motion.img layoutId={`img-${work.id}`} transition={spring} src={work.art} alt={work.title} className="absolute inset-0 size-full object-contain p-[6%] mix-blend-multiply" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.18, duration: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="flex flex-col gap-5 border-t border-line p-6 md:overflow-y-auto md:border-t-0 md:border-r md:p-9"
              >
                <p className="flex items-center gap-2 text-note font-medium text-ink-soft">
                  <span className="size-2 rounded-full" style={{ background: s.color }} />
                  {s.name}
                </p>
                <div>
                  <h3 className="font-display text-sub font-bold md:text-[2rem] md:leading-tight">{work.title}</h3>
                  {work.en && <p className="mt-1 text-note text-ink-soft" dir="auto" style={{ textAlign: 'right' }}>{work.en}</p>}
                </div>
                <p>{work.note}</p>

                {work.cover && (
                  <figure className="flex items-center gap-4 rounded-2xl bg-paper-2 p-3">
                    <img src={work.cover} alt={`${work.title} מודפס על חולצה`} loading="lazy" className="size-20 shrink-0 rounded-xl object-cover object-top" />
                    <figcaption className="text-note text-ink-soft">ככה זה נראה מודפס על חולצה</figcaption>
                  </figure>
                )}

                <div className="mt-auto flex flex-col gap-3 pt-2">
                  {work.shop && (
                    <a
                    href={work.shop}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-deep px-5 py-3.5 font-medium text-paper transition-transform hover:-translate-y-0.5"
                  >
                    לקנות מודפס
                    <Icon name="arrow" flip />
                  </a>
                  )}
                  <a
                    href={waLink(`היי גליה, ראיתי באתר את "${work.title}" ורציתי לשאול עליו`)}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-deep/40 px-5 py-3.5 font-medium text-blue-deep transition-colors hover:bg-blue-deep/5"
                  >
                    <Icon name="whatsapp" />
                    {work.cat === 'logos' ? 'רוצה לוגו כזה לעסק שלי' : 'לשאול את גליה על האיור'}
                  </a>
                </div>
              </motion.div>

              <button
                ref={closeBtn}
                type="button"
                onClick={onClose}
                aria-label="סגירה"
                className="absolute top-3 left-3 grid size-11 place-items-center rounded-full bg-paper/90 text-ink shadow-sm transition-transform hover:rotate-90"
              >
                <Icon name="close" />
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
