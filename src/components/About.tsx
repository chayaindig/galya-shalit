import BlurHighlight from './BlurHighlight'
import Signature from './Signature'
import { useLang } from '../i18n'
import SectionDots from './SectionDots'

export default function About() {
  const { t } = useLang()
  return (
    <section id="about" className="relative scroll-mt-20 bg-paper-2 py-24 md:py-32">
      <SectionDots tone="yellow" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Colored-pencil portrait on a sheet of paper, taped to the wall. */}
        <figure className="relative mx-auto w-full max-w-sm lg:order-2 lg:col-span-5 lg:max-w-none">
          <div className="relative -rotate-2 rounded-sm bg-[#fdfbf7] p-3 shadow-[0_30px_60px_-30px_rgba(35,32,29,0.55)] md:p-4">
            <img
              src="art2/galya-portrait.webp"
              alt={t.portraitAlt}
              loading="lazy"
              width={928}
              height={1152}
              className="aspect-[928/1152] w-full object-cover"
            />
            <span aria-hidden="true" className="tape absolute -top-4 right-[18%] h-9 w-32 rotate-[4deg]" />
            <span aria-hidden="true" className="tape absolute -bottom-4 left-[14%] h-9 w-28 -rotate-[8deg]" />
          </div>
        </figure>

        <div className="lg:col-span-7">
          <h2 className="mt-3 font-display text-section font-bold">{t.aboutTitle}</h2>
          <BlurHighlight className="mt-8 max-w-2xl text-sub" viewportOptions={{ once: true, amount: 0.4 }}>
            {t.aboutLead}
          </BlurHighlight>
          <div className="mt-6 max-w-2xl space-y-4 text-ink-soft">
            {t.aboutP.map(p => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <Signature draw="view" className="mt-12 h-16 w-auto text-ink md:h-20" title={t.name} />
        </div>
      </div>
    </section>
  )
}
