import { motion, useReducedMotion, type TargetAndTransition, type Transition } from 'motion/react'
import { cn } from '../lib/cn'

/*
  Galya's lizard (drawn by her for the site, in her calligraphic line) lives on the site.
  Each pose has its own little bit of life when it scrolls into view.
*/
export type Pose = 'hang' | 'run' | 'dive' | 'wave' | 'sleep' | 'stretch'

const life: Record<Pose, { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition; origin: string }> = {
  // swings from its tail like a pendulum
  hang: { initial: { rotate: 18, y: -40, opacity: 0 }, animate: { rotate: [18, -10, 6, -3, 0], y: 0, opacity: 1 }, transition: { duration: 2.2, ease: 'easeOut' }, origin: '50% 0%' },
  run: { initial: { x: 80, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { type: 'spring', stiffness: 90, damping: 14 }, origin: '50% 100%' },
  // drops in head first and bounces
  dive: { initial: { y: -120, rotate: -20, opacity: 0 }, animate: { y: 0, rotate: 0, opacity: 1 }, transition: { type: 'spring', stiffness: 160, damping: 9 }, origin: '50% 50%' },
  // pops up from behind the frame and waves
  wave: { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1, rotate: [0, -4, 4, -2, 0] }, transition: { duration: 1.4, ease: 'easeOut' }, origin: '50% 100%' },
  // slowly breathing
  sleep: { initial: { opacity: 0 }, animate: { opacity: 1, scaleY: [1, 1.04, 1] }, transition: { scaleY: { duration: 3, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.8 } }, origin: '50% 100%' },
  stretch: { initial: { scaleX: 0.7, opacity: 0 }, animate: { scaleX: [0.7, 1.08, 1], opacity: 1 }, transition: { duration: 1.2, ease: 'easeOut' }, origin: '100% 100%' },
}

export default function Squirrel({ pose, className, flip, src }: { pose: Pose; className?: string; flip?: boolean; src?: string }) {
  const reduce = useReducedMotion()
  const l = life[pose]
  return (
    <motion.img
      src={src ?? `lizard/${pose}.svg`}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={cn('pointer-events-none select-none', flip && '-scale-x-100', className)}
      style={{ transformOrigin: l.origin }}
      initial={reduce ? false : l.initial}
      whileInView={reduce ? undefined : l.animate}
      viewport={{ once: true, amount: 0.6 }}
      transition={l.transition}
    />
  )
}
