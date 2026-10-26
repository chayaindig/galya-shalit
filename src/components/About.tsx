import BlurHighlight from './BlurHighlight'
import Signature from './Signature'
import TiltedCard from './TiltedCard'
import Icon from './Icon'
import SectionDots from './SectionDots'

const crafts = [
  { name: 'צבעי עפרון', line: 'שכבה על שכבה, בכל פעם בטכניקה אחרת.', img: 'art2/ins-apples.webp', color: '#d6246e' },
  { name: 'איור דיגיטלי', line: 'המקום שבו קו נקי פוגש צבע בלי גבולות.', img: 'art2/dig-fox.webp', color: '#e8762b' },
  { name: 'לוגו ומיתוג', line: 'סימן אחד קטן שמספר את כל העסק.', img: 'art2/logo-barakbees.webp', color: '#d4a017' },
  { name: 'צילום', line: 'העין שמחפשת את הפרט הקטן לפני שהוא נעלם.', img: 'art2/paper.webp', color: '#3d8cb5', camera: true },
]

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 bg-paper-2 py-24 md:py-32">
      <SectionDots tone="yellow" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Colored-pencil portrait on a sheet of paper, taped to the wall. */}
        <figure className="relative mx-auto w-full max-w-sm lg:order-2 lg:col-span-5 lg:max-w-none">
          <div className="relative -rotate-2 rounded-sm bg-[#fdfbf7] p-3 shadow-[0_30px_60px_-30px_rgba(35,32,29,0.55)] md:p-4">
            <img
              src="art2/galya-portrait.webp"
              alt="גליה שליט, פורטרט בצבעי עפרון"
              loading="lazy"
              width={928}
              height={1152}
              className="aspect-[928/1152] w-full object-cover"
            />
            <span aria-hidden="true" className="tape absolute -top-4 right-[18%] h-9 w-32 rotate-[4deg]" />
            <span aria-hidden="true" className="tape absolute -bottom-4 left-[14%] h-9 w-28 -rotate-[8deg]" />
          </div>
        </figure>

        <div className="lg:col-span-7">
          <h2 className="mt-3 font-display text-section font-bold">אני גליה.</h2>
          <BlurHighlight className="mt-8 max-w-2xl text-sub" viewportOptions={{ once: true, amount: 0.4 }}>
            אני מאיירת, מציירת ומצלמת, ומחפשת כל הזמן את הרגע שבו קו פשוט הופך למשהו חי.
          </BlurHighlight>
          <div className="mt-6 max-w-2xl space-y-4 text-ink-soft">
            <p>
              גדלתי בשוודיה, חייתי במדינות שונות בעולם, והיום אני חיה ויוצרת בישראל. מכל מקום שגרתי בו ומכל טיול לקחתי איתי השראה: צבעים, נופים, חיות ואנשים. הכל נכנס קודם ליומן הרישום שלי, ומשם מתגלגל לאיורים.
            </p>
            <p>
              אני עובדת בעיקר בצבעי עפרון, בהרבה טכניקות שונות, ובאיור דיגיטלי שנותן לרעיונות עוד מקום לגדול. מה שמחבר את הכל הוא קו נקי שמחזיק את הצורה, וצבע שמתפרץ ממנו החוצה.
            </p>
            <p>
              ההשראה הכי גדולה שלי היא החיות: ציפורים, שועלים, צפרדעים, וסנאי אחד שלא מפסיק לטייל לי באתר.
            </p>
          </div>


          <Signature draw="view" className="mt-12 h-16 w-auto text-ink md:h-20" />
        </div>
      </div>
      {/* four ways she works, as cards that tilt toward the cursor (React Bits "Tilted Card") */}
      <ul className="mx-auto mt-20 grid max-w-7xl grid-cols-2 gap-x-4 gap-y-10 px-4 md:grid-cols-4 md:gap-x-8 md:px-8">
        {crafts.map(c => (
          <li key={c.name} className="min-w-0">
            <div className="aspect-[4/5] w-full">
              <TiltedCard
                imageSrc={c.img}
                altText={c.name}
                containerHeight="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.06}
                displayOverlayContent
                overlayContent={
                  <div className="flex h-full flex-col justify-between p-3">
                    {c.camera ? <Icon name="camera" className="mx-auto mt-[30%] size-10 text-ink-soft" /> : <span />}
                    <span className="flex w-fit items-center gap-2 rounded-full bg-paper/95 px-3 py-1.5 text-note font-medium shadow-sm">
                      <span className="size-2 rounded-full" style={{ background: c.color }} />
                      {c.name}
                    </span>
                  </div>
                }
              />
            </div>
            <p className="mt-3 text-note text-ink-soft">{c.line}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
