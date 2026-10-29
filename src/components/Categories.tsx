import { categories, catText, works, type CatId } from '../data'
import { useLang } from '../i18n'
import { cn } from '../lib/cn'
import Icon from './Icon'
import ScrollStack, { ScrollStackItem } from './ScrollStack'
import SectionDots from './SectionDots'

type Cat = (typeof categories)[number]

const countOf = (c: Cat) => works.filter(w => w.cat === c.id).length + (c.id === 'digital' ? 11 : 0)
const isSoon = (c: Cat) => !c.cover

function Cover({ c, className }: { c: Cat; className?: string }) {
  const soon = isSoon(c)
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        soon ? 'border-2 border-dashed border-ink/25 bg-paper' : 'bg-[#fdfbf7] shadow-[0_18px_40px_-28px_rgba(35,32,29,0.5)]',
        className,
      )}
    >
      {soon ? (
        <div className="absolute inset-0 grid place-items-center text-ink-soft">
          <Icon name="camera" className="size-14" />
        </div>
      ) : (
        <img
          src={c.cover}
          alt=""
          loading="lazy"
          className={cn(
            'absolute inset-0 size-full transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105',
            c.id === 'logos' ? 'object-contain p-[14%] mix-blend-multiply' : 'object-cover',
          )}
        />
      )}
    </div>
  )
}

function Caption({ c }: { c: Cat }) {
  const { lang, t } = useLang()
  const ct = catText(c, lang)
  const soon = isSoon(c)
  return (
    <>
      <div className="mt-4 flex items-center gap-2">
        <span className="size-2.5 rounded-full" style={{ background: c.color }} />
        <h3 className="text-sub font-medium">{ct.name}</h3>
      </div>
      <p className="mt-1 text-note text-ink-soft">{ct.line}</p>
      <span className="mt-2 inline-flex items-center gap-2 text-note font-medium text-blue-deep">
        {soon ? t.soon : t.works(countOf(c))}
        {!soon && <Icon name="arrow" flip className="transition-transform group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />}
      </span>
    </>
  )
}

// Five doors into Galya's world. Each door shows a drawing from inside it.
// Desktop: a row of six. Phone: full-width cards that stack on each other as you scroll (React Bits "Scroll Stack").
export default function Categories({ onPick }: { onPick: (c: CatId) => void }) {
  const { t } = useLang()
  const pick = (id: CatId) => {
    onPick(id)
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="series" className="relative scroll-mt-20 overflow-x-clip bg-paper-2 py-24 md:py-32">
      <SectionDots tone="orange" />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="mt-3 max-w-3xl font-display text-section font-bold">{t.doorsTitle}</h2>

        <ol className="mt-12 hidden gap-5 md:grid md:grid-cols-3 xl:grid-cols-6">
          {categories.map(c => (
            <li key={c.id} className="min-w-0">
              <button type="button" onClick={() => pick(c.id)} className="group block w-full text-start">
                <Cover c={c} className="aspect-[3/4] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5" />
                <Caption c={c} />
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-10 md:hidden">
          <ScrollStack useWindowScroll smoothScroll={false} stackPosition="12%" itemDistance={36} itemStackDistance={16} itemScale={0.04} baseScale={0.86} dimAmount={0.12} holdDistance={40}>
            {categories.map(c => (
              <ScrollStackItem key={c.id} itemClassName="p-3 pb-5">
                <button type="button" onClick={() => pick(c.id)} className="group block w-full text-start">
                  <Cover c={c} className="aspect-[4/3]" />
                  <div className="px-1">
                    <Caption c={c} />
                  </div>
                </button>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  )
}
