import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { contact, categories, catText, emotions, waLink, workText, works, type CatId, type Work } from '../data'
import { useLang } from '../i18n'
import { cn } from '../lib/cn'
import CardSpread from './CardSpread'
import Icon from './Icon'
import SectionDots from './SectionDots'
import SwipeCarousel from './SwipeCarousel'

/*
  Works by category. A card opens a full-window viewer: the art large, the story and buttons below,
  and arrows (or swipe, or the keyboard) to move between the works of the same category.
  The digital category opens with the emotion cards as a fanned deck (React Bits Pro "Card Spread").
*/
const emotionWorks: Work[] = emotions.map(e => ({
  id: `emo-${e.id}`,
  title: e.id[0].toUpperCase() + e.id.slice(1),
  cat: 'digital',
  art: e.src,
  note: '',
}))

const isPhoto = (w: Work) => !!w.cover || w.cat === 'photos' || w.art.includes('prod-') || w.art.includes('panda-model') || w.art.includes('-mock')

/** Photography hangs in a real gallery room: two photos per wall, each in its own frame. The viewer shows the photo alone. */
const galleryWalls = [
  {
    bg: 'art2/gallery-wall-wood.webp',
    top: '20%', h: '50%',
    frames: [
      { id: 'photo-ladybug', left: '27%', frame: 'border-[3px] md:border-[6px] border-[#1d1b19] bg-white', mat: 13 },
      { id: 'photo-snail', left: '52%', frame: 'border-[4px] md:border-[9px] border-[#b98a59] [border-style:ridge] bg-[#f8f4ec]', mat: 9 },
    ],
  },
  {
    bg: 'art2/gallery-wall-concrete.webp',
    top: '27%', h: '42%',
    frames: [
      { id: 'photo-kayak', left: '30%', frame: 'border-[4px] md:border-[8px] border-[#f4f2ee] outline outline-1 outline-black/10', mat: 0 },
      { id: 'photo-bicycle', left: '53%', frame: 'border-[5px] md:border-[10px] border-[#4a3426] [border-style:ridge] bg-[#c9a76a]', mat: 3 },
    ],
  },
]

function GalleryWalls({ list, onOpen }: { list: Work[]; onOpen: (index: number) => void }) {
  const { lang, t } = useLang()
  return (
    <div className="mt-12 grid gap-6 md:gap-10">
      {galleryWalls.map(wall => (
        <div key={wall.bg} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_1px_0_var(--color-line),0_18px_40px_-28px_rgba(35,32,29,0.45)] md:aspect-[16/9]">
          {/* the scene is always 16:9; on phones it is cropped at the sides */}
          <div className="absolute inset-y-0 -left-[16.667%] w-[133.333%] md:left-0 md:w-full">
            <img src={wall.bg} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
            {wall.frames.map(f => {
              const i = list.findIndex(w => w.id === f.id)
              if (i < 0) return null
              const w = list[i]
              const title = workText(w, lang).title
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onOpen(i)}
                  aria-label={t.open(title)}
                  style={{ left: f.left, top: wall.top, height: wall.h }}
                  className={cn(
                    'absolute aspect-[3/4] shadow-[8px_14px_18px_-8px_rgba(20,18,16,0.45),2px_3px_5px_-2px_rgba(20,18,16,0.4)] transition-transform duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1',
                    f.frame,
                  )}
                >
                  {/* mat: same visual width on all sides (the frame is 3:4) */}
                  <img
                    src={w.art}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    style={{ left: `${f.mat}%`, top: `${f.mat * 0.75}%`, width: `${100 - 2 * f.mat}%`, height: `${100 - 1.5 * f.mat}%` }}
                    className="absolute object-cover"
                  />
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

type Open = { list: Work[]; index: number } | null

export default function Gallery({ filter, setFilter }: { filter: CatId; setFilter: (f: CatId) => void }) {
  const { lang, t } = useLang()
  const [open, setOpen] = useState<Open>(null)
  const shown = works.filter(w => w.cat === filter)
  const cat = catText(categories.find(c => c.id === filter)!, lang)

  return (
    <section id="works" className="relative scroll-mt-20 overflow-x-clip py-24 md:py-32">
      <SectionDots tone="blue" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-section font-bold">{t.worksTitle}</h2>
          <div role="tablist" aria-label={t.catsLabel} className="-mx-4 flex max-w-[100vw] gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
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
                {catText(c, lang).name}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-ink-soft">{cat.line}</p>

        {filter === 'digital' && (
          <div className="mt-10 rounded-3xl bg-paper-2 px-4 pt-8 pb-4 md:px-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-sub font-medium">{t.emoTitle}</h3>
              <p className="text-note text-ink-soft">{t.emoHint}</p>
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
              onSelect={i => setOpen({ list: emotionWorks, index: i })}
            />
          </div>
        )}

        {filter === 'photos' && <GalleryWalls list={shown} onOpen={i => setOpen({ list: shown, index: i })} />}

          <ul className={cn('mt-12 hidden grid-flow-dense grid-cols-3 gap-x-6 gap-y-10 xl:grid-cols-4', filter !== 'photos' && 'md:grid')}>
            <AnimatePresence mode="popLayout">
              {shown.map((w, i) => (
                <motion.li
                  key={w.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={cn('min-w-0', w.wide && 'col-span-2')}
                >
                  <button type="button" onClick={() => setOpen({ list: shown, index: i })} className="group block w-full text-start" aria-label={t.open(workText(w, lang).title)}>
                    <div
                      className={cn(
                        'relative overflow-hidden rounded-2xl bg-[#fdfbf7] shadow-[0_1px_0_var(--color-line),0_18px_40px_-28px_rgba(35,32,29,0.45)]',
                        w.wide ? 'aspect-[2/1]' : 'aspect-[4/5]',
                      )}
                    >
                      <img
                        src={w.cover || w.art}
                        alt={workText(w, lang).title}
                        loading="lazy"
                        decoding="async"
                        className={cn(
                          'absolute inset-0 size-full transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]',
                          isPhoto(w) ? 'object-cover' : 'object-contain p-[8%] mix-blend-multiply',
                        )}
                      />
                    </div>
                    <p className="mt-3 font-medium text-balance">{workText(w, lang).title}</p>
                    {workText(w, lang).sub && <p className="truncate text-note text-ink-soft" dir="auto">{workText(w, lang).sub}</p>}
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

        {filter !== 'photos' && (
          <SwipeCarousel
            key={filter}
            className="mt-10 md:hidden"
            items={shown}
            getKey={w => w.id}
            render={(w, i) => (
              <button type="button" onClick={() => setOpen({ list: shown, index: i })} className="block w-full text-start" aria-label={t.open(workText(w, lang).title)}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#fdfbf7] shadow-[0_1px_0_var(--color-line),0_18px_40px_-24px_rgba(35,32,29,0.5)]">
                  <img
                    src={w.cover || w.art}
                    alt={workText(w, lang).title}
                    loading="lazy"
                    decoding="async"
                    className={cn('absolute inset-0 size-full', isPhoto(w) ? 'object-cover' : 'object-contain p-[7%] mix-blend-multiply')}
                  />
                </div>
                <p className="mt-3 font-medium text-balance">{workText(w, lang).title}</p>
              </button>
            )}
          />
        )}

        {filter === 'products' && (
          <p className="mt-14 text-ink-soft">
            {t.shirtsOrderA}{' '}
            <a href={contact.shopUrl} target="_blank" rel="noopener" className="border-b border-ink/40 font-medium whitespace-nowrap text-ink hover:border-ink">
              {t.shirtsOrderLink(t.shopName)}
            </a>{' '}
            {t.shirtsOrderAnd}
            <a href={contact.shop2Url} target="_blank" rel="noopener" className="border-b border-ink/40 font-medium whitespace-nowrap text-ink hover:border-ink">
              {t.shirtsOrderLink(t.shop2Name)}
            </a>
            {t.shirtsOrderB}
          </p>
        )}
      </div>

      <Viewer open={open} setOpen={setOpen} />
    </section>
  )
}

function Viewer({ open, setOpen }: { open: Open; setOpen: (o: Open) => void }) {
  const { lang, t } = useLang()
  const rtl = lang === 'he'
  const closeBtn = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()
  const [dir, setDir] = useState(0)
  const count = open?.list.length ?? 0

  const go = useCallback(
    (step: number) => {
      if (!open) return
      setDir(step)
      setOpen({ list: open.list, index: (open.index + step + count) % count })
    },
    [open, count, setOpen],
  )
  const close = useCallback(() => setOpen(null), [setOpen])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      // the arrow pointing in reading direction moves forward
      if (e.key === 'ArrowLeft') go(rtl ? 1 : -1)
      if (e.key === 'ArrowRight') go(rtl ? -1 : 1)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close, go, rtl])

  const work = open?.list[open.index]
  const catObj = work && categories.find(c => c.id === work.cat)!
  const cat = catObj && { ...catText(catObj, lang), color: catObj.color }
  const wt = work && (work.id.startsWith('emo-') ? { title: work.title, sub: t.emoTitle, note: t.emoNote } : workText(work, lang))

  return createPortal(
    <AnimatePresence>
      {open && work && cat && wt && (
        <motion.div
          key="viewer"
          role="dialog"
          aria-modal="true"
          aria-label={wt.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-paper"
        >
          {/* top bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-paper/95 px-4 py-3 md:px-8 md:py-4">
            <p className="flex items-center gap-2 text-note font-medium text-ink-soft">
              <span className="size-2.5 rounded-full" style={{ background: cat.color }} />
              {cat.name}
              <span className="text-ink-soft/70 tabular-nums" dir="ltr">
                {open.index + 1} / {count}
              </span>
            </p>
            <button ref={closeBtn} type="button" onClick={close} aria-label={t.close} className="grid size-11 place-items-center rounded-full border border-ink/15 bg-paper transition-transform hover:rotate-90">
              <Icon name="close" />
            </button>
          </div>

          {/* the art, large, with arrows on both sides */}
          <div className="relative flex min-h-[58svh] flex-1 items-center justify-center px-14 md:min-h-[66svh] md:px-24">
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.img
                key={work.id}
                src={work.art}
                alt={wt.title}
                custom={dir}
                initial={reduce ? false : { opacity: 0, x: dir * -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: dir * 60 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                drag={count > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  const fwd = rtl ? info.offset.x > 70 : info.offset.x < -70
                  const bwd = rtl ? info.offset.x < -70 : info.offset.x > 70
                  if (fwd) go(1)
                  else if (bwd) go(-1)
                }}
                className="max-h-[56svh] w-auto max-w-full cursor-grab touch-pan-y rounded-xl object-contain active:cursor-grabbing md:max-h-[64svh]"
                draggable={false}
              />
            </AnimatePresence>
            {count > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label={t.prev} className="absolute start-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-paper-2 transition-colors hover:bg-line md:start-6 md:size-14">
                  <Icon name="arrow" back />
                </button>
                <button type="button" onClick={() => go(1)} aria-label={t.next} className="absolute end-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-paper-2 transition-colors hover:bg-line md:end-6 md:size-14">
                  <Icon name="arrow" flip />
                </button>
              </>
            )}
          </div>

          {/* description and buttons, under the art */}
          <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-10 md:px-8 md:pb-14">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="font-display text-section leading-tight font-bold">{wt.title}</h3>
              {wt.sub && <p className="text-note text-ink-soft" dir="auto">{wt.sub}</p>}
            </div>
            <p className="mt-3 text-sub text-ink-soft">{wt.note}</p>

            {work.cover && (
              <figure className="mt-6 flex items-center gap-4 rounded-2xl bg-paper-2 p-3">
                <img src={work.cover} alt={t.onShirtAlt(wt.title)} loading="lazy" className="size-20 shrink-0 rounded-xl object-cover object-top" />
                <figcaption className="text-note text-ink-soft">{t.onShirt}</figcaption>
              </figure>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {work.shop && (
                <a href={work.shop} target="_blank" rel="noopener" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-deep px-5 py-3.5 font-medium text-paper transition-transform hover:-translate-y-0.5">
                  {t.buyPrint}
                  <Icon name="arrow" flip />
                </a>
              )}
              <a
                href={waLink(t.waWork(wt.title))}
                target="_blank"
                rel="noopener"
                className={cn(
                  'inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 font-medium transition-colors',
                  work.shop ? 'border border-blue-deep/40 text-blue-deep hover:bg-blue-deep/5' : 'bg-blue-deep text-paper',
                )}
              >
                <Icon name="whatsapp" />
                {work.cat === 'logos' ? t.askLogo : t.askWork}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
