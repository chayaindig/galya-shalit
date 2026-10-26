import { categories, works, type CatId } from '../data'
import { cn } from '../lib/cn'
import Icon from './Icon'
import SectionDots from './SectionDots'

// Five doors into Galya's world. Each door shows a drawing from inside it.
export default function Categories({ onPick }: { onPick: (c: CatId) => void }) {
  const pick = (id: CatId) => {
    onPick(id)
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="series" className="relative scroll-mt-20 overflow-x-clip bg-paper-2 py-24 md:py-32">
      <SectionDots tone="orange" />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="mt-3 max-w-3xl font-display text-section font-bold">חמש דלתות לעולם שלי</h2>

        <ol className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {categories.map((c, i) => {
            const count = works.filter(w => w.cat === c.id).length + (c.id === 'digital' ? 11 : 0)
            const soon = c.id === 'photos'
            return (
              <li key={c.id} className={cn('min-w-0', i === 4 && 'col-span-2 md:col-span-1')}>
                <button type="button" onClick={() => pick(c.id)} className="group block w-full text-right">
                  <div
                    className={cn(
                      'relative overflow-hidden rounded-2xl transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5',
                      i === 4 ? 'aspect-[2/1] md:aspect-[3/4]' : 'aspect-[3/4]',
                      soon ? 'border-2 border-dashed border-ink/25 bg-paper' : 'bg-[#fdfbf7] shadow-[0_18px_40px_-28px_rgba(35,32,29,0.5)]',
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
                  <div className="mt-4 flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: c.color }} />
                    <h3 className="text-sub font-medium">{c.name}</h3>
                  </div>
                  <p className="mt-1 text-note text-ink-soft">{c.line}</p>
                  <span className="mt-2 inline-flex items-center gap-2 text-note font-medium text-blue-deep">
                    {soon ? 'בקרוב מאוד' : `${count} עבודות`}
                    {!soon && <Icon name="arrow" flip className="transition-transform group-hover:-translate-x-1" />}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
