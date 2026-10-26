import BlurHighlight from './BlurHighlight'
import Signature from './Signature'
import Squirrel from './Squirrel'

const crafts = [
  { n: '01', name: 'צבעי עפרון', line: 'שכבה על שכבה, בכל פעם בטכניקה אחרת.' },
  { n: '02', name: 'איור דיגיטלי', line: 'המקום שבו קו נקי פוגש צבע בלי גבולות.' },
  { n: '03', name: 'לוגו ומיתוג', line: 'סימן אחד קטן שמספר את כל העסק.' },
  { n: '04', name: 'צילום', line: 'העין שמחפשת את הפרט הקטן לפני שהוא נעלם.' },
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-paper-2 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Colored-pencil portrait on a sheet of paper, taped to the wall. The squirrel climbed on top. */}
        <figure className="relative mx-auto w-full max-w-sm lg:order-2 lg:col-span-5 lg:max-w-none">
          <Squirrel pose="wave" className="absolute -top-[22%] left-[6%] z-10 w-[34%]" />
          <div className="relative -rotate-2 rounded-sm bg-[#fdfbf7] p-3 shadow-[0_30px_60px_-30px_rgba(35,32,29,0.55)] md:p-4">
            <img
              src="art2/galya-portrait.webp"
              alt="גליה שליט, פורטרט בצבעי עפרון"
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
          <h2 className="mt-3 font-display text-section font-bold">אני גליה.</h2>
          <BlurHighlight className="mt-8 max-w-2xl text-sub" viewportOptions={{ once: true, amount: 0.4 }}>
            אמנית ומאיירת. אני מציירת בעיקר בצבעי עפרון, בטכניקות שונות ומגוונות, ומשתמשת בכלים של איור דיגיטלי כדי לתת ליצירתיות שלי עוד מקום להתפרץ. ההשראה הכי גדולה שלי היא החיות: ציפורים, שועלים, צפרדעים, וסנאי אחד שלא מפסיק לטייל לי באתר.
          </BlurHighlight>
          <p className="mt-5 max-w-2xl text-ink-soft">גדלתי בשוודיה, ואני חיה ויוצרת בישראל.</p>

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

          <figure className="mt-12 flex flex-col gap-5 rounded-3xl bg-paper p-4 sm:flex-row sm:items-center md:p-5">
            <img src="art2/about-creativity.webp" alt="How Creativity Works: בשעה 1 בצהריים ענן שחור, בשעה 1 בלילה פיצוץ של צבע" loading="lazy" className="w-full rounded-2xl sm:w-48" />
            <figcaption className="text-ink-soft">
              <span className="block font-medium text-ink">ככה היצירתיות שלי עובדת</span>
              באחת בצהריים ענן שחור. באחת בלילה פיצוץ של צבע.
            </figcaption>
          </figure>

          <Signature draw="view" className="mt-12 h-16 w-auto text-ink md:h-20" />
        </div>
      </div>
    </section>
  )
}
