import { contact, waLink } from '../data'
import Icon from './Icon'
import Signature from './Signature'

const shirts = [
  { src: 'art/time-model.webp', alt: 'האיור "זמן" מודפס על חולצה', r: '-rotate-6 translate-y-4' },
  { src: 'art/gseahorse-model.webp', alt: 'סוסון הים הגיאומטרי מודפס על חולצה', r: 'rotate-0 z-10' },
  { src: 'art/whale-model.webp', alt: 'זנב הלוויתן מודפס על חולצה', r: 'rotate-6 translate-y-4' },
]

export function Shop() {
  return (
    <section id="shop" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:px-8 lg:grid-cols-2">
        <div>
          <p className="text-note font-medium tracking-wide text-ink-soft">
            <span dir="ltr" className="tabular-nums">07</span> · איפה קונים
          </p>
          <h2 className="mt-3 font-display text-section font-extrabold">רוצים ללבוש את זה?</h2>
          <p className="mt-6 max-w-lg text-sub text-ink-soft">
            ההדפסים שלי נמכרים ב״{contact.shopName}״, חנות של אמנים ישראלים. בוחרים איור, בוחרים חולצה, והוא מגיע אליכם הביתה.
          </p>
          <a
            href={contact.shopUrl}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-blue-deep px-6 py-3.5 font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            לחנות שלי ב״{contact.shopName}״
            <Icon name="arrow" flip />
          </a>
        </div>

        <a href={contact.shopUrl} target="_blank" rel="noopener" className="group flex justify-center" aria-label={`לחנות של גליה ב${contact.shopName}`}>
          {shirts.map(s => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              loading="lazy"
              className={`-mx-6 w-[38%] max-w-56 rounded-2xl object-cover shadow-[0_24px_50px_-28px_rgba(35,32,29,0.6)] transition-transform duration-500 group-hover:translate-y-0 group-hover:rotate-0 ${s.r}`}
            />
          ))}
        </a>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-paper-2 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="text-note font-medium tracking-wide text-ink-soft">
          <span dir="ltr" className="tabular-nums">08</span> · צרו קשר
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-section font-extrabold">בואו נצייר משהו ביחד.</h2>
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
    <footer className="bg-blue-night py-16 text-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <Signature draw="view" className="h-20 w-auto md:h-28" />
          <p className="mt-4 text-note text-paper/70">
            איור, צבעי מים ועפרונות צבעוניים. <span dir="ltr">Sverige</span> · ישראל
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
