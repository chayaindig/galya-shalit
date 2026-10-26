import type { CSSProperties } from 'react'
import { cn } from '../lib/cn'

// Icons from Galya's Magnific/Flaticon library (public/icons), tinted with currentColor.
type Name = 'whatsapp' | 'phone' | 'mail' | 'arrow' | 'close' | 'camera'

// flip: points "forward" in reading direction (left in Hebrew, right in English).
// back: points "backward" (right in Hebrew, left in English).
export default function Icon({ name, className, flip, back }: { name: Name; className?: string; flip?: boolean; back?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn('icon', flip && 'rtl:-scale-x-100', back && 'ltr:-scale-x-100', className)}
      style={{ '--icon': `url(${import.meta.env.BASE_URL}icons/${name}.svg)` } as CSSProperties}
    />
  )
}
