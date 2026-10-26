import { contact, waLink } from '../data'
import Icon from './Icon'
import Signature from './Signature'
import Squirrel from './Squirrel'
import SectionDots from './SectionDots'


export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-x-clip bg-paper-2 py-24 md:py-32">
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
      {/* end of the day: the squirrel falls asleep on the edge of the footer */}
      <div aria-hidden="true" className="absolute -top-[58px] left-[8%] md:-top-[78px] md:left-[14%]">
        <Squirrel pose="sleep" className="w-28 md:w-40" />
        <span className="zzz absolute -top-4 left-2 font-display text-sub text-ink-soft">ז ז ז</span>
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
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label="לכתוב לגליה בוואטסאפ"
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-blue-deep text-paper shadow-[0_12px_30px_-10px_var(--color-blue-deep)] transition-transform hover:scale-105 md:right-6 md:bottom-6"
    >
      <Icon name="whatsapp" className="size-6" />
    </a>
  )
}
