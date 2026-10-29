import { contact, waLink } from '../data'
import { useLang } from '../i18n'
import Icon from './Icon'
import Signature from './Signature'
import Squirrel from './Squirrel'
import SectionDots from './SectionDots'


export function Contact() {
  const { t } = useLang()
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-x-clip bg-paper-2 pt-24 pb-[clamp(13rem,34vw,22rem)] md:pt-32">
      <SectionDots tone="green" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="mt-3 max-w-3xl font-display text-section font-bold">{t.contactTitle}</h2>
        <p className="mt-6 max-w-xl text-sub text-ink-soft">
          {t.contactP}
        </p>

        <ul className="mt-12 grid border-t border-line lg:grid-cols-3">
          <li className="border-b border-line lg:border-l">
            <a href={waLink(t.waDefault)} target="_blank" rel="noopener" className="group flex items-center gap-3 py-6 lg:px-5">
              <Icon name="whatsapp-circle" className="-m-1 size-12 shrink-0 text-blue-deep transition-transform group-hover:scale-110" />
              <span>
                <span className="block text-note text-ink-soft">{t.whatsapp}</span>
                <span className="font-medium group-hover:text-blue-deep">{t.sendMsg}</span>
              </span>
            </a>
          </li>
          <li className="border-b border-line lg:border-l">
            <a href={contact.phoneHref} className="group flex items-center gap-3 py-6 lg:px-5">
              <Icon name="phone" className="size-10 shrink-0 text-blue-deep transition-transform group-hover:scale-110" />
              <span>
                <span className="block text-note text-ink-soft">{t.phone}</span>
                <bdi dir="ltr" className="font-medium group-hover:text-blue-deep">{contact.phoneDisplay}</bdi>
              </span>
            </a>
          </li>
          <li className="border-b border-line">
            <a href={`mailto:${contact.email}`} className="group flex items-center gap-3 py-6 lg:px-5">
              <Icon name="mail" className="size-10 shrink-0 text-blue-deep transition-transform group-hover:scale-110" />
              <span className="min-w-0">
                <span className="block text-note text-ink-soft">{t.email}</span>
                <bdi dir="ltr" className="block font-medium [overflow-wrap:anywhere] group-hover:text-blue-deep">{contact.email}</bdi>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="relative bg-blue-night py-16 text-paper">
      {/* end of the day: Galya's lizard sleeps on the edge of the footer, on a bed of splashes from the chameleon painting */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-full left-1/2 w-[min(84vw,34rem)] -translate-x-1/2 translate-y-[4%] md:left-[30%]">
        <img src="hero/splash-pink.webp" alt="" className="absolute bottom-[8%] -left-[4%] w-[30%] opacity-80 mix-blend-multiply" />
        <img src="hero/splash-green.webp" alt="" className="absolute bottom-[6%] left-[18%] w-[52%] opacity-85 mix-blend-multiply" />
        <img src="hero/splash-blue.webp" alt="" className="absolute bottom-[10%] -right-[4%] w-[32%] opacity-80 mix-blend-multiply" />
        <Squirrel pose="sleep" className="relative w-full" />
        <span className="zzz absolute -top-[6%] right-[6%] font-display text-sub font-bold text-ink-soft" dir="ltr">z</span>
        <span className="zzz zzz-2 absolute -top-[40%] right-[0%] font-display text-section font-bold text-ink-soft" dir="ltr">Z</span>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <Signature draw="view" className="h-20 w-auto md:h-28" title={t.name} />
          <p className="mt-4 text-note text-paper/70">
            {t.footerLine}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-note text-paper/70 md:items-end">
          <a href="#top" className="hover:text-paper">{t.backTop}</a>
          <p>{t.rights(new Date().getFullYear())}</p>
          <p>
            {t.builtBy}{' '}
            <a href="https://chaya.design" target="_blank" rel="noopener" className="border-b border-paper/40 hover:text-paper">First Impression</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export function WhatsAppFloat() {
  const { t } = useLang()
  // Floating WhatsApp, bottom right on every screen: Galya's WhatsApp bubble recoloured in the site's blues,
  // with a light rim so it stays visible on light paper and on the dark footer alike.
  return (
    <a
      href={waLink(t.waDefault)}
      target="_blank"
      rel="noopener"
      aria-label={t.floatLabel}
      className="wa-float fixed right-4 bottom-4 z-40 block size-16 rounded-full drop-shadow-[0_10px_18px_rgba(22,63,92,0.35)] transition-transform hover:scale-105 md:right-6 md:bottom-6 md:size-[4.5rem]"
    >
      <img src="icons/whatsapp-color.svg" alt="" className="size-full" />
    </a>
  )
}
