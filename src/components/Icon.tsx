import type { CSSProperties } from 'react'
import { cn } from '../lib/cn'

// Icons from Galya's Magnific/Flaticon library (public/icons), tinted with currentColor.
type Name = 'whatsapp' | 'phone' | 'mail' | 'arrow' | 'close' | 'camera'

export default function Icon({ name, className, flip }: { name: Name; className?: string; flip?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn('icon', flip && '-scale-x-100', className)}
      style={{ '--icon': `url(${import.meta.env.BASE_URL}icons/${name}.svg)` } as CSSProperties}
    />
  )
}
