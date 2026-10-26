import { printsOn, waLink } from '../data'
import { cn } from '../lib/cn'
import Icon from './Icon'
import Squirrel from './Squirrel'

const dots = ['#d6246e', '#f2c918', '#2f9a6a', '#3d8cb5', '#f08a24', '#7b4fa8']

export default function Prints() {
  const row = [...printsOn, ...printsOn]
  return (
    <section id="prints" className="relative overflow-x-clip py-24 md:py-32" aria-labelledby="prints-title">
      {/* the squirrel dives in head first, right onto the list of products */}
      <Squirrel pose="dive" className="absolute top-10 left-[6%] w-20 md:top-14 md:left-[10%] md:w-28" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="text-note font-medium tracking-wide text-ink-soft">
          <span dir="ltr" className="tabular-nums">06</span> · מהדף אל העולם
        </p>
        <h2 id="prints-title" className="mt-3 max-w-3xl font-display text-section font-bold">
          אין גבול למה שאפשר להדפיס
        </h2>
      </div>

      {/* Endless list of things her prints end up on */}
      <div dir="ltr" className="mt-12 border-y border-line py-6 md:py-8" aria-hidden="true">
        <div className="ticker flex w-max items-center gap-8 md:gap-12">
          {row.map((w, i) => (
            <span key={i} className="flex items-center gap-8 md:gap-12">
              <span dir="rtl" className={cn('font-display text-[clamp(2rem,5vw,4.2rem)] leading-none whitespace-nowrap', i % 2 ? 'font-extralight' : 'font-bold')}>
                {w}
              </span>
              <span className="size-4 rounded-full opacity-85 md:size-5" style={{ background: dots[i % dots.length] }} />
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">ההדפסים של גליה מגיעים על {printsOn.join(', ')}.</p>

      <div className="mx-auto mt-12 grid max-w-7xl gap-8 px-4 md:grid-cols-12 md:px-8">
        <p className="text-sub md:col-span-7">
          כל איור עובר הכנה דיגיטלית להדפסה, כך שהצבעים נשארים חיים גם על בד, מתכת וזכוכית.
        </p>
        <div className="md:col-span-5">
          <p className="text-ink-soft">
            עסק או מותג שמחפשים איור מקורי למוצר, לאריזה או למתנות לעובדים? ספרו לי מה בראש שלכם, ונמצא לזה צורה.
          </p>
          <a
            href={waLink('היי גליה, יש לי רעיון להדפסה ורציתי לדבר איתך')}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-blue-deep px-6 py-3.5 font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            <Icon name="whatsapp" />
            יש לי רעיון להדפסה
          </a>
        </div>
      </div>
    </section>
  )
}
