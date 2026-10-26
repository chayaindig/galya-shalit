// Picks up exactly where the blue blot flooded the hero, then washes back to paper.
export default function Story() {
  return (
    <section
      id="story"
      className="relative scroll-mt-0 pb-[28svh] text-paper"
      style={{
        background:
          'linear-gradient(to bottom, var(--color-blue) 0%, var(--color-blue-night) 38%, var(--color-blue-night) 72%, var(--color-paper) 100%)',
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-[22svh] md:px-8 lg:grid-cols-12">
        <p className="text-note font-medium tracking-wide text-paper/75 lg:col-span-3">
          <span dir="ltr" className="tabular-nums">01</span> · ככה זה מתחיל
        </p>
        <div className="lg:col-span-9">
          <h2 className="font-display text-section font-bold">
            כל איור מתחיל
            <br />
            <span className="font-extralight">בקו אחד.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-sub text-paper/90">
            קו נקי ומדויק שמחזיק את הצורה, ואז הצבע מגיע ומתפרץ ממנו החוצה. אני עובדת בעיקר בצבעי עפרון, בהרבה טכניקות שונות, ובכלים של איור דיגיטלי שנותנים ליצירתיות שלי עוד מקום לשחק.
          </p>
        </div>
      </div>
    </section>
  )
}
