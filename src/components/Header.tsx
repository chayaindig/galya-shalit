import { useEffect, useState } from 'react'
import { waLink } from '../data'
import { useLang } from '../i18n'
import { cn } from '../lib/cn'
import Icon from './Icon'
import Signature from './Signature'


export default function Header() {
  const { lang, t, setLang } = useLang()
  const nav = [
    { href: '#works', label: t.navWorks },
    { href: '#series', label: t.navSeries },
    { href: '#about', label: t.navAbout },
    { href: '#shop', label: t.navShop },
    { href: '#contact', label: t.navContact },
  ]
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300',
        solid || open ? 'bg-paper/92 shadow-[0_1px_0_var(--color-line)]' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <a href="#top" className="flex items-center gap-3 text-ink" aria-label={t.homeLabel}>
          <Signature className="h-9 w-auto md:h-11" delay={0.2} title={t.name} />
          <span className="hidden text-note font-medium tracking-[0.18em] text-ink-soft uppercase sm:inline" dir="ltr">
            GalyaArts
          </span>
        </a>

        <nav aria-label={t.navLabel} className="hidden lg:block">
          <ul className="flex items-center gap-8 text-note font-medium">
            {nav.map(n => (
              <li key={n.href}>
                <a href={n.href} className="relative py-2 text-ink-soft transition-colors hover:text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-ink after:transition-transform hover:after:scale-x-100">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink(t.waDefault)}
            target="_blank"
            rel="noopener"
            aria-label={t.messageMe}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-blue-deep px-4 py-2.5 text-note font-medium text-paper transition-transform hover:-translate-y-0.5 md:px-5"
          >
            <Icon name="whatsapp" />
            <span className="hidden sm:inline">{t.messageMe}</span>
          </a>
          <button
            type="button"
            onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
            aria-label={t.switchLangLabel}
            lang={lang === 'he' ? 'en' : 'he'}
            className="grid size-10 place-items-center rounded-full p-0.5 ring-1 ring-ink/15 transition-transform hover:scale-110"
          >
            {/* the flag of the language you switch to */}
            <img src={lang === 'he' ? 'icons/flag-us.svg' : 'icons/flag-il.svg'} alt="" className="size-full rounded-full" />
          </button>
          <button
            type="button"
            className="rounded-full border border-ink/25 px-4 py-2.5 text-note font-medium lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(o => !o)}
          >
            {open ? t.close : t.menu}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label={t.navLabel} className={cn('lg:hidden', open ? 'block' : 'hidden')}>
        <ul className="mx-4 mb-4 divide-y divide-line border-t border-line">
          {nav.map(n => (
            <li key={n.href}>
              <a href={n.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-4 text-sub">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
