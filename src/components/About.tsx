import BlurHighlight from './BlurHighlight'
import Signature from './Signature'

const crafts = [
  { n: '01', name: 'צבעי מים', line: 'כתמים שזורמים לבד, וקו שעוצר אותם.' },
  { n: '02', name: 'עפרונות צבעוניים', line: 'שכבה על שכבה, עד שהצבע מתחיל לזהור.' },
  { n: '03', name: 'איור דיגיטלי', line: 'כדי שכל ציור יוכל לצאת מהדף ולהיות מודפס.' },
  { n: '04', name: 'צילום', line: 'העין שמחפשת את הפרט הקטן לפני שהוא נעלם.' },
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-paper-2 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Portrait on a sheet of watercolour paper, taped to the wall */}
        <figure className="relative mx-auto w-full max-w-sm lg:order-2 lg:col-span-5 lg:max-w-none">
          <div className="relative -rotate-2 rounded-sm bg-[#fdfbf7] p-3 shadow-[0_30px_60px_-30px_rgba(35,32,29,0.55)] md:p-4">
            <img
              src="hero/galya-portrait.webp"
              alt="גליה שליט, פורטרט בצבעי מים"
              loading="lazy"
              width={928}
              height={1152}
              className="aspect-[928/1152] w-full object-cover"
            />
            <span aria-hidden="true" className="absolute -top-3 right-1/2 h-7 w-28 translate-x-1/2 rotate-3 bg-[#e9dfc9]/85 shadow-sm" />
          </div>
        </figure>

        <div className="lg:col-span-7">
          <p className="text-note font-medium tracking-wide text-ink-soft">
            <span dir="ltr" className="tabular-nums">05</span> · נעים מאוד
          </p>
          <h2 className="mt-3 font-display text-section font-extrabold">אני גליה.</h2>
          <BlurHighlight
            className="mt-8 max-w-2xl text-sub"
            highlightedBits={['שוודיה', 'בישראל', 'שני העולמות']}
            highlightColor="color-mix(in srgb, var(--color-blue) 26%, transparent)"
            highlightDirection="right"
            viewportOptions={{ once: true, amount: 0.4 }}
          >
            אמנית, מאיירת ומצלמת. גדלתי בשוודיה ואני חיה בישראל, ומה שהכי מעניין אותי זה מה שקורה כששני העולמות נפגשים על דף אחד. אני אוהבת חיות, צמחים ופרטים קטנים שמתגלים רק למי שמסתכל מקרוב.
          </BlurHighlight>

          <ol className="mt-12 grid border-t border-line sm:grid-cols-2">
            {crafts.map(c => (
              <li key={c.n} className="flex gap-4 border-b border-line py-5 sm:odd:pl-6 sm:even:pr-6">
                <span dir="ltr" className="pt-1 text-note text-ink-soft tabular-nums">{c.n}</span>
                <div>
                  <h3 className="font-medium">{c.name}</h3>
                  <p className="text-ink-soft">{c.line}</p>
                </div>
              </li>
            ))}
          </ol>

          <Signature draw="view" className="mt-12 h-16 w-auto text-ink md:h-20" />
        </div>
      </div>
    </section>
  )
}
