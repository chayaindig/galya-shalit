import { cn } from '../lib/cn'

// Two small paint dots in the top corner of a section: a quiet divider instead of numbering.
const pairs = {
  pink: ['#d6246e', '#f2c918'],
  green: ['#2f9a6a', '#3d8cb5'],
  orange: ['#e8762b', '#7b4fa8'],
  blue: ['#3d8cb5', '#d6246e'],
  yellow: ['#f2c918', '#2f9a6a'],
} as const

export default function SectionDots({ tone = 'pink', className }: { tone?: keyof typeof pairs; className?: string }) {
  const [a, b] = pairs[tone]
  return (
    <span aria-hidden="true" className={cn('pointer-events-none absolute top-8 right-4 flex items-center gap-1.5 md:top-10 md:right-8', className)}>
      <span className="size-3 rounded-full" style={{ background: a }} />
      <span className="size-2 rounded-full" style={{ background: b }} />
    </span>
  )
}
