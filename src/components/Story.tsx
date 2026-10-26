import SectionDots from './SectionDots'
import { useLang } from '../i18n'
// Picks up exactly where the blue blot flooded the hero, then washes back to paper.
export default function Story() {
  const { t } = useLang()
  return (
    <section
      id="story"
      className="relative scroll-mt-0 pb-[28svh] text-paper"
      style={{
        background:
          'linear-gradient(to bottom, var(--color-blue) 0%, var(--color-blue-night) 38%, var(--color-blue-night) 72%, var(--color-paper) 100%)',
      }}
    >
      <SectionDots tone="pink" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-[22svh] md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-9 lg:col-start-4">
          <h2 className="font-display text-section font-bold">
            {t.storyH1}
            <br />
            <span className="font-extralight">{t.storyH2}</span>
          </h2>
          <p className="mt-8 max-w-2xl text-sub text-paper/90">
            {t.storyP}
          </p>
        </div>
      </div>
    </section>
  )
}
