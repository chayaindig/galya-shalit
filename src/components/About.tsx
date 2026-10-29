import BlurHighlight from './BlurHighlight'
import Signature from './Signature'
import TiltedCard from './TiltedCard'
import { useLang } from '../i18n'
import ScrollStack, { ScrollStackItem } from './ScrollStack'
import Icon from './Icon'
import SectionDots from './SectionDots'

const craftLook: { img: string; color: string; camera?: boolean }[] = [
  { img: 'art2/ins-apples.webp', color: '#d6246e' },
  { img: 'art2/dig-fox.webp', color: '#e8762b' },
  { img: 'art2/logo-hamerchav.webp', color: '#d4a017' },
  { img: 'art2/photo-ladybug.webp', color: '#3d8cb5' },
]

export default function About() {
  const { t } = useLang()
  const crafts = t.crafts.map((c, i) => ({ ...c, ...craftLook[i] }))
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
      {/* four ways she works, as cards that tilt toward the cursor (React Bits "Tilted Card") */}
      <ul className="mx-auto mt-20 hidden max-w-7xl grid-cols-4 gap-x-8 px-8 md:grid">
        {crafts.map(c => (
          <li key={c.name} className="min-w-0">
            <div className="aspect-[4/5] w-full">
              <TiltedCard
                imageSrc={c.img}
                altText={c.name}
                containerHeight="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.06}
                displayOverlayContent
                overlayContent={
                  <div className="flex h-full flex-col justify-between p-3">
                    {c.camera ? <Icon name="camera" className="mx-auto mt-[30%] size-10 text-ink-soft" /> : <span />}
                    <span className="flex w-fit items-center gap-2 rounded-full bg-paper/95 px-3 py-1.5 text-note font-medium shadow-sm">
                      <span className="size-2 rounded-full" style={{ background: c.color }} />
                      {c.name}
                    </span>
                  </div>
                }
              />
            </div>
            <p className="mt-3 text-note text-ink-soft">{c.line}</p>
          </li>
        ))}
      </ul>
      {/* phone: the four crafts stack on each other as you scroll (React Bits "Scroll Stack") */}
      <div className="mt-16 px-4 md:hidden">
        <ScrollStack useWindowScroll smoothScroll={false} stackPosition="14%" itemDistance={36} itemStackDistance={16} itemScale={0.04} baseScale={0.86} dimAmount={0.12} holdDistance={40}>
          {crafts.map(c => (
            <ScrollStackItem key={c.name} itemClassName="p-3 pb-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper">
                <img src={c.img} alt={c.name} loading="lazy" className={c.camera ? 'hidden' : 'absolute inset-0 size-full object-cover'} />
                {c.camera && <Icon name="camera" className="absolute inset-0 m-auto size-12 text-ink-soft" />}
              </div>
              <div className="mt-4 flex items-center gap-2 px-1">
                <span className="size-2.5 rounded-full" style={{ background: c.color }} />
                <h3 className="text-sub font-medium">{c.name}</h3>
              </div>
              <p className="mt-1 px-1 text-note text-ink-soft">{c.line}</p>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  )
}
