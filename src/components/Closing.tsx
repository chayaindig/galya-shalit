import { contact, waLink } from '../data'
import Icon from './Icon'
import Signature from './Signature'
import Squirrel from './Squirrel'
import SectionDots from './SectionDots'


export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-x-clip bg-paper-2 pt-24 pb-[clamp(13rem,34vw,22rem)] md:pt-32">
      <SectionDots tone="green" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="mt-3 max-w-3xl font-display text-section font-bold">בואו נצייר משהו ביחד.</h2>
        <p className="mt-6 max-w-xl text-sub text-ink-soft">
          איור אישי, מתנה, שיתוף פעולה או סתם שאלה. הכי מהר לתפוס אותי בוואטסאפ.
        </p>

        <ul className="mt-12 grid border-t border-line md:grid-cols-3">
          <li className="border-b border-line md:border-l">
            <a href={waLink()} target="_blank" rel="noopener" className="group flex items-center gap-4 py-6 md:px-6">
              <span className="grid size-12 place-items-center rounded-full bg-blue-deep text-paper"><Icon name="whatsapp" className="size-5" /></span>
              <span>
                <span className="block text-note text-ink-soft">וואטסאפ</span>
                <span className="font-medium group-hover:text-blue-deep">שלחו לי הודעה</span>
              </span>
            </a>
          </li>
          <li className="border-b border-line md:border-l">
            <a href={contact.phoneHref} className="group flex items-center gap-4 py-6 md:px-6">
              <span className="grid size-12 place-items-center rounded-full border border-blue-deep/40 text-blue-deep"><Icon name="phone" className="size-5" /></span>
              <span>
                <span className="block text-note text-ink-soft">טלפון</span>
                <bdi dir="ltr" className="font-medium group-hover:text-blue-deep">{contact.phoneDisplay}</bdi>
              </span>
            </a>
          </li>
          <li className="border-b border-line">
            <a href={`mailto:${contact.email}`} className="group flex items-center gap-4 py-6 md:px-6">
              <span className="grid size-12 place-items-center rounded-full border border-blue-deep/40 text-blue-deep"><Icon name="mail" className="size-5" /></span>
              <span className="min-w-0">
                <span className="block text-note text-ink-soft">מייל</span>
                <bdi dir="ltr" className="block truncate font-medium group-hover:text-blue-deep">{contact.email}</bdi>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative bg-blue-night py-16 text-paper">
      {/* end of the day: the squirrel curls up on the edge of the footer, on splashes from the chameleon painting */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-full left-1/2 w-[min(78vw,30rem)] -translate-x-1/2 translate-y-[3%] md:left-[30%]">
        <img src="hero/splash-green.webp" alt="" className="absolute bottom-[4%] left-[8%] w-[50%] opacity-85 mix-blend-multiply" />
        <img src="hero/splash-blue.webp" alt="" className="absolute bottom-[30%] left-[42%] w-[26%] opacity-80 mix-blend-multiply" />
        <img src="hero/splash-pink.webp" alt="" className="absolute bottom-[8%] right-[6%] w-[32%] opacity-85 mix-blend-multiply" />
        <Squirrel pose="sleep" className="relative w-full" />
        <span className="zzz absolute top-[34%] left-[24%] font-display text-sub font-bold text-ink-soft">ז</span>
        <span className="zzz zzz-2 absolute top-[12%] left-[16%] font-display text-section font-bold text-ink-soft">ז</span>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <Signature draw="view" className="h-20 w-auto md:h-28" />
          <p className="mt-4 text-note text-paper/70">
            קו נקי, צבע מתפרץ. איור בצבעי עפרון ואיור דיגיטלי.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-note text-paper/70 md:items-end">
          <a href="#top" className="hover:text-paper">חזרה להתחלה</a>
          <p>© {new Date().getFullYear()} גליה שליט. כל הזכויות על האיורים שמורות.</p>
          <p>
            עיצוב ובנייה:{' '}
            <a href="https://chaya.design" target="_blank" rel="noopener" className="border-b border-paper/40 hover:text-paper">First Impression</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export function WhatsAppFloat() {
  // Floating WhatsApp, bottom right on every screen. WhatsApp green with a paper ring,
  // so it stays visible on light paper and on the dark footer alike.
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label="לכתוב לגליה בוואטסאפ"
      className="wa-float fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#1fa855] text-white ring-4 ring-paper shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)] transition-transform hover:scale-105 md:right-6 md:bottom-6 md:size-16"
    >
      <Icon name="whatsapp" className="size-7 md:size-8" />
    </a>
  )
}
