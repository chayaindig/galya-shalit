import { waLink } from '../data'
import { useLang } from '../i18n'
import { cn } from '../lib/cn'
import Icon from './Icon'
import SectionDots from './SectionDots'

const dots = ['#d6246e', '#f2c918', '#2f9a6a', '#3d8cb5', '#f08a24', '#7b4fa8']

export default function Prints() {
  const { t } = useLang()
  const printsOn = t.printsOn
  const row = [...printsOn, ...printsOn]
  return (
    <section id="prints" className="relative overflow-x-clip py-24 md:py-32" aria-labelledby="prints-title">
      <SectionDots tone="pink" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 id="prints-title" className="mt-3 max-w-3xl font-display text-section font-bold">
          {t.printsTitle}
        </h2>
      </div>

      {/* Endless list of things her prints end up on */}
      <div dir="ltr" className="mt-12 border-y border-line py-6 md:py-8" aria-hidden="true">
        <div className="ticker flex w-max items-center gap-8 md:gap-12">
          {row.map((w, i) => (
            <span key={i} className="flex items-center gap-8 md:gap-12">
              <span dir="auto" className={cn('font-display text-[clamp(2rem,5vw,4.2rem)] leading-none whitespace-nowrap', i % 2 ? 'font-extralight' : 'font-bold')}>
                {w}
              </span>
              <span className="size-4 rounded-full opacity-85 md:size-5" style={{ background: dots[i % dots.length] }} />
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">{t.printsSr(printsOn.join(', '))}</p>

      <div className="mx-auto mt-12 grid max-w-7xl gap-8 px-4 md:grid-cols-12 md:px-8">
        <p className="text-sub md:col-span-7">
          {t.printsP}
        </p>
        <div className="md:col-span-5">
          <p className="text-ink-soft">
            {t.printsBiz}
          </p>
          <a
            href={waLink(t.printsWa)}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-blue-deep px-6 py-3.5 font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            <Icon name="whatsapp" />
            {t.printsCta}
          </a>
        </div>
      </div>
    </section>
  )
}
