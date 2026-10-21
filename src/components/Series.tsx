import { series, works, type SeriesId } from '../data'
import HoverPreview from './HoverPreview'
import Icon from './Icon'

// Four ways Galya tells a story. Hover a word to see it printed; tap or click to open that series below.
const previews: Record<SeriesId, string> = {
  water: 'art/macaw-model.webp',
  geo: 'art/gseahorse-model.webp',
  line: 'art/flamingo-art.webp',
  ink: 'art/dottedtree-model.webp',
}

export default function Series({ onPick }: { onPick: (s: SeriesId) => void }) {
  const pick = (id: SeriesId) => {
    onPick(id)
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
  }
  const word = (id: SeriesId, text: string) => {
    const s = series.find(x => x.id === id)!
    return {
      text,
      imageUrl: previews[id],
      altText: `${s.name}, דוגמה מודפסת`,
      className: 'font-medium underline decoration-2 underline-offset-[0.22em]',
    }
  }

  return (
    <section id="series" className="scroll-mt-20 bg-paper-2 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="text-note font-medium tracking-wide text-ink-soft">
          <span dir="ltr" className="tabular-nums">03</span> · ארבע שפות
        </p>

        <HoverPreview
          className="mt-6 max-w-5xl text-sub md:text-[clamp(1.6rem,2.6vw,2.4rem)] md:leading-[1.45]"
          content="אני מציירת {0}, מרכיבה חיות {1}, מותחת {2} עד שהוא הופך לפלמינגו, ובונה עולמות שלמים {3}."
          targets={[
            word('water', 'בצבעי מים'),
            word('geo', 'כמו ויטראז׳'),
            word('line', 'קו אחד'),
            word('ink', 'מדיו ונקודות'),
          ]}
          onTargetClick={(_, i) => pick(series[i].id)}
          imagePosition="above"
          imageWidth={220}
          imageHeight={260}
          imageBorderRadius="1rem"
          targetClassName="decoration-blue hover:text-blue-deep"
        />
        <p className="mt-4 text-note text-ink-soft">
          <span className="hidden [@media(hover:hover)]:inline">העבירו את העכבר על המילים המסומנות, ולחצו כדי לפתוח סדרה.</span>
          <span className="[@media(hover:hover)]:hidden">הקישו על מילה מסומנת כדי לפתוח את הסדרה.</span>
        </p>

        <ol className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {series.map((s, i) => (
            <li key={s.id} className="border-b border-line sm:odd:border-l lg:border-l lg:last:border-l-0">
              <button
                type="button"
                onClick={() => pick(s.id)}
                className="group flex h-full w-full flex-col items-start gap-3 p-6 text-right transition-colors hover:bg-paper lg:p-8"
              >
                <span className="flex w-full items-center justify-between text-note text-ink-soft">
                  <span dir="ltr" className="tabular-nums">0{i + 1}</span>
                  <span className="size-3 rounded-full" style={{ background: s.color }} />
                </span>
                <span className="text-sub font-medium">{s.name}</span>
                <span className="text-ink-soft">{s.blurb}</span>
                <span className="mt-auto pt-2 text-note font-medium text-blue-deep">
                  {works.filter(w => w.series === s.id).length} עבודות בסדרה
                  <Icon name="arrow" flip className="ms-2 align-middle transition-transform group-hover:-translate-x-1" />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
