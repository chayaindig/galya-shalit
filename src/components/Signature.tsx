import { useEffect, useRef, useState } from 'react'
import { signaturePaths, signatureViewBox } from '../lib/art-paths'
import { cn } from '../lib/cn'

// Galya's handwritten signature. Draws itself with a pen stroke, then fills in.
export default function Signature({
  className,
  draw = 'mount',
  delay = 0,
  title = 'גליה שליט',
}: {
  className?: string
  draw?: 'mount' | 'view' | false
  delay?: number
  title?: string
}) {
  const ref = useRef<SVGSVGElement>(null)
  const [on, setOn] = useState(draw === false || draw === 'mount')

  useEffect(() => {
    if (draw !== 'view' || !ref.current) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.6 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [draw])

  return (
    <svg ref={ref} viewBox={signatureViewBox} className={cn('sig', draw && 'sig-draw', on && 'is-on', className)} role="img" aria-label={title}>
      {signaturePaths.map((p, i) => (
        <path key={i} d={p.d} pathLength={1} style={{ animationDelay: `${delay + i * 0.5}s, ${delay + 1.3 + i * 0.3}s` }} />
      ))}
    </svg>
  )
}
