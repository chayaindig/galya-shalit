import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { contact, categories, catText, emotions, projects, waLink, workText, works, type CatId, type Work } from '../data'
import { useLang } from '../i18n'
import { cn } from '../lib/cn'
import CardSpread from './CardSpread'
import Categories from './Categories'
import Icon from './Icon'
import SectionDots from './SectionDots'
import SwipeCarousel from './SwipeCarousel'

/*
  Works by category. A card opens a full-window viewer: the art large, the story and buttons below,
  and arrows (or swipe, or the keyboard) to move between the works of the same category.
  The Projects tab is shown project by project; each project shows one main image and opens all its works.
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

// Categories split into projects (Projects, Books): one block per project, its name on top. Desktop: a grid (the emotion cards as a fanned deck). Phone: a side carousel per project.
function ProjectGroups({ cat, onOpen }: { cat: CatId; onOpen: (list: Work[], index: number) => void }) {
  const { lang, t } = useLang()
  return (
    <div className="mt-10 space-y-16 md:space-y-24">
      {projects.filter(p => p.cat === cat).map(p => {
        const deck = p.id === 'ecocards'
        const all = deck ? emotionWorks : works.filter(w => w.project === p.id)
        const cover = all.find(w => w.id === p.cover) ?? all[0]
        const list = [cover, ...all.filter(w => w !== cover)]
        return (
          <section key={p.id} aria-labelledby={`proj-${p.id}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line pt-6">
              <h3 id={`proj-${p.id}`} className="font-display text-sub font-bold md:text-[2rem] md:leading-tight">{lang === 'he' ? p.name : p.en}</h3>
              <p className="text-note text-ink-soft">{t.works(list.length)}</p>
            </div>
            {deck ? (
              <CardSpread
                cards={emotions}
                cardWidth={260}
                cardHeight={183}
                cardRadius={10}
                radius={760}
                arc={58}
                shadow={0.22}
                lift={34}
                className="mt-6 hidden h-[360px] md:block"
                onSelect={i => onOpen(emotionWorks, i)}
              />
            ) : (
              <ul className="mt-8 hidden grid-flow-dense grid-cols-3 gap-x-6 gap-y-10 md:grid xl:grid-cols-4">
                {list.map((w, i) => (
                  <li key={w.id} className={cn('min-w-0', w.wide && 'col-span-2')}>
                    <Tile w={w} onClick={() => onOpen(list, i)} />
                  </li>
                ))}
              </ul>
            )}
            <SwipeCarousel className="mt-6 md:hidden" items={list} getKey={w => w.id} render={(w, i) => <Tile w={w} mobile onClick={() => onOpen(list, i)} />} />
          </section>
        )
      })}
    </div>
  )
}

function Tile({ w, onClick, mobile }: { w: Work; onClick: () => void; mobile?: boolean }) {
  const { lang, t } = useLang()
  const wt = w.id.startsWith('emo-') ? { title: w.title, sub: undefined } : workText(w, lang)
  return (
    <button type="button" onClick={onClick} className="group block w-full text-start" aria-label={t.open(wt.title)}>
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-[#fdfbf7] shadow-[0_1px_0_var(--color-line),0_18px_40px_-28px_rgba(35,32,29,0.45)]',
          w.wide && !mobile ? 'aspect-[2/1]' : 'aspect-[4/5]',
        )}
      >
        <img
          src={w.cover || w.art}
          alt={wt.title}
          loading="lazy"
          decoding="async"
          className={cn(
            'absolute inset-0 size-full transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]',
            isPhoto(w) ? 'object-cover' : 'object-contain p-[8%] mix-blend-multiply',
          )}
        />
      </div>
      <p className="mt-3 font-medium text-balance">{wt.title}</p>
      {wt.sub && <p className="truncate text-note text-ink-soft" dir="auto">{wt.sub}</p>}
    </button>
  )
}

// The six doors; a door opens its category in a full-window sheet, right here, without leaving the section
export default function Gallery() {
  const { t } = useLang()
  const [cat, setCat] = useState<CatId | null>(null)
  const [open, setOpen] = useState<Open>(null)

  return (
    <section id="works" className="relative scroll-mt-20 overflow-x-clip py-24 md:py-32">
      <SectionDots tone="blue" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="font-display text-section font-bold">{t.doorsTitle}</h2>
        <p className="mt-3 text-sub text-ink-soft">{t.worksSub}</p>
        <Categories onPick={setCat} />
      </div>
      <CategorySheet cat={cat} onClose={() => setCat(null)} setOpen={setOpen} />
      <Viewer open={open} setOpen={setOpen} />
    </section>
  )
}

function CategorySheet({ cat, onClose, setOpen }: { cat: CatId | null; onClose: () => void; setOpen: (o: Open) => void }) {
  const { lang, t } = useLang()
  const reduce = useReducedMotion()
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!cat) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      // the work viewer sits on top and handles its own Escape
      if (e.key === 'Escape' && !document.querySelector('[data-viewer]')) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [cat, onClose])

  const c = cat && categories.find(x => x.id === cat)!
  const shown = cat ? works.filter(w => w.cat === cat) : []
  const text = c && catText(c, lang)
  const grouped = !!cat && projects.some(p => p.cat === cat)

  return createPortal(
    <AnimatePresence>
      {c && text && (
        <motion.div
          key={c.id}
          role="dialog"
          aria-modal="true"
          aria-label={text.name}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[65] overflow-x-clip overflow-y-auto overscroll-contain bg-paper"
        >
          <div className="sticky top-0 z-10 border-b border-line bg-paper/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
              <div className="flex items-center gap-3">
                <span className="size-3 rounded-full" style={{ background: c.color }} />
                <h2 className="font-display text-sub font-bold md:text-[2rem]">{text.name}</h2>
              </div>
              <button ref={closeBtn} type="button" onClick={onClose} aria-label={t.close} className="grid size-11 place-items-center rounded-full bg-paper-2 transition-colors hover:bg-line md:size-12">
                <Icon name="close" />
              </button>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 pt-8 pb-24 md:px-8 md:pt-10">
            <p className="max-w-2xl text-ink-soft">{text.line}</p>

            {grouped && <ProjectGroups cat={cat} onOpen={(list, index) => setOpen({ list, index })} />}

            {cat === 'photos' && <GalleryWalls list={shown} onOpen={i => setOpen({ list: shown, index: i })} />}

            {cat !== 'photos' && !grouped && (
              <>
                <ul className="mt-12 hidden grid-flow-dense grid-cols-3 gap-x-6 gap-y-10 md:grid xl:grid-cols-4">
                  {shown.map((w, i) => (
                    <li key={w.id} className={cn('min-w-0', w.wide && 'col-span-2')}>
                      <Tile w={w} onClick={() => setOpen({ list: shown, index: i })} />
                    </li>
                  ))}
                </ul>
                <SwipeCarousel className="mt-10 md:hidden" items={shown} getKey={w => w.id} render={(w, i) => <Tile w={w} mobile onClick={() => setOpen({ list: shown, index: i })} />} />
              </>
            )}

            {cat === 'products' && (
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

            {/* end of the category: back to the six doors */}
            <div className="mt-20 flex justify-center border-t border-line pt-10">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  document.getElementById('works')?.scrollIntoView({ behavior: 'instant' })
                }}
                className="inline-flex items-center gap-2.5 rounded-full bg-blue-deep px-6 py-3.5 font-medium text-paper transition-transform hover:-translate-y-0.5"
              >
                <Icon name="arrow" back />
                {t.backToDoors}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
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
    // the category sheet may already lock the page; give back whatever was there
    const prev = document.body.style.overflow
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
      document.body.style.overflow = prev
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
          data-viewer
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
