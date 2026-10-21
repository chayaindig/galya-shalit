// Everything that will change lives here: contact details, links, works.
// TODO from Galya: real phone / WhatsApp / email, a real portrait photo, and the rest of her works.

export const contact = {
  // PLACEHOLDER numbers: replace with Galya's real details
  whatsapp: '972500000000',
  phoneDisplay: '050-000-0000',
  phoneHref: 'tel:+972500000000',
  email: 'hello@galyaarts.co.il',
  shopUrl: 'https://www.h-i-h.co.il/vendors/galya-shalit/',
  shopName: 'ההוא עם החולצות',
}

export const waLink = (text = 'היי גליה, הגעתי מהאתר שלך ורציתי לשאול') =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`

export type SeriesId = 'water' | 'geo' | 'line' | 'ink'

export const series: { id: SeriesId; name: string; en: string; color: string; blurb: string }[] = [
  { id: 'water', name: 'צבעי מים', en: 'Watercolour', color: '#d6246e', blurb: 'צבע שזורם לאן שהוא רוצה, וקו שחור אחד שעוצר אותו בדיוק בזמן.' },
  { id: 'geo', name: 'ויטראז׳ גיאומטרי', en: 'Geometric', color: '#2f9a6a', blurb: 'חיות שמורכבות מעשרות פיסות צבע, כמו חלון של כנסייה ביום שמש.' },
  { id: 'line', name: 'קו אחד', en: 'Oneline', color: '#3d8cb5', blurb: 'עט שלא מתרומם מהדף. קו אחד רציף שהופך לחתולים, לציפורים ולפלמינגו.' },
  { id: 'ink', name: 'דיו ונקודות', en: 'Ink & dots', color: '#5e5850', blurb: 'אלפי נקודות, עיגולים וספירלות קטנות שנבנים לאט לעולם שלם.' },
]

export type Work = {
  id: string
  title: string
  en: string
  series: SeriesId
  art: string
  onShirt?: string
  shop: string
  note: string
  wide?: boolean
}

const P = 'https://www.h-i-h.co.il/product/'

export const works: Work[] = [
  { id: 'macaw', title: 'זוג מקאו', en: 'Macaw', series: 'water', art: 'art/macaw-web.webp', onShirt: 'art/macaw-model.webp', shop: P + 'macaw/', note: 'שני תוכים באמצע ריקוד, כל נוצה בצבע אחר.' },
  { id: 'zenart', title: 'פטריות זן', en: 'Zenart Mushrooms', series: 'water', art: 'art/zenart-web.webp', onShirt: 'art/zenart-model.webp', shop: P + 'zenart-mushrooms/', note: 'יער קטן של פטריות מצוירות בדוגמאות, שקועות בענן של צבע.' },
  { id: 'penguins', title: 'פינגווינים', en: 'Penguins', series: 'water', art: 'art/penguins-web.webp', onShirt: 'art/penguins-model.webp', shop: P + 'penguins/', note: 'משפחה שלמה על קרחון אחד. כל אחד מסתכל לכיוון אחר.', wide: true },
  { id: 'gchameleon', title: 'זיקית בוויטראז׳', en: 'Geometric Chameleon', series: 'geo', art: 'art/gchameleon-web.webp', onShirt: 'art/gchameleon-model.webp', shop: P + 'geometric_chaemelon/', note: 'אותה זיקית אהובה, הפעם מפורקת לעשרות פיסות זכוכית צבעונית.' },
  { id: 'gseahorse', title: 'סוסון ים', en: 'Geometrical Sea', series: 'geo', art: 'art/gseahorse-web.webp', onShirt: 'art/gseahorse-model.webp', shop: P + 'geometrical_sea/', note: 'סוסון ים כתום שמתחבא בתוך ים של משולשים.' },
  { id: 'gmushrooms', title: 'פטריות גיאומטריות', en: 'Geometric Mushrooms', series: 'geo', art: 'art/gmushrooms-web.webp', onShirt: 'art/gmushrooms-model.webp', shop: P + 'geometric_mushrooms/', note: 'כובעי פטריות שנשברים לאור, כמו ויטראז׳ בתוך יער.' },
  { id: 'lizard', title: 'לטאה', en: 'Lizard', series: 'geo', art: 'art/lizard-web.webp', onShirt: 'art/lizard-model.webp', shop: P + 'lizard/', note: 'לטאה שמטפסת על עמוד של צבע. הכי טובה על הגב של חולצה.' },
  { id: 'flamingo', title: 'פלמינגו', en: 'Oneline Flamingo', series: 'line', art: 'art/flamingo-web.webp', shop: P + 'oneline_flamingo/', note: 'ארבעה פלמינגו, קו אחד. העט לא התרומם מהדף אפילו פעם אחת.', wide: true },
  { id: 'cats', title: 'חתולים', en: 'Oneline Cats', series: 'line', art: 'art/cats-web.webp', shop: P + 'oneline_cats/', note: 'שורה של חתולים שיושבים בדיוק כמו שחתולים יושבים.', wide: true },
  { id: 'birds', title: 'ציפורים על חוט', en: 'Oneline Birds', series: 'line', art: 'art/birds-web.webp', shop: P + 'oneline_birds/', note: 'ציפורים שנחות על הקו שהן עצמן עשויות ממנו.', wide: true },
  { id: 'snail', title: 'חלזונות', en: 'Oneline Snail', series: 'line', art: 'art/snail-web.webp', shop: P + 'oneline_snail/', note: 'מירוץ חלזונות איטי במיוחד, בקו אחד.', wide: true },
  { id: '4sheep', title: 'ארבע כבשים', en: 'Oneline 4 Sheep', series: 'line', art: 'art/4sheep-web.webp', shop: P + 'oneline-4sheep/', note: 'עדר קטן של כבשים מתולתלות, וכבשה אחת שמסתכלת אלייך.', wide: true },
  { id: 'sheep', title: 'כבשה עם שאלה', en: 'Oneline Sheep', series: 'line', art: 'art/sheep-web.webp', shop: P + 'oneline_sheep/', note: 'קו אחד שמסתבך ומסתבך, ובסוף מתגלה כבשה עם סימן שאלה.' },
  { id: 'dottedtree', title: 'עץ מנוקד', en: 'Dotted Tree', series: 'ink', art: 'art/dottedtree-web.webp', onShirt: 'art/dottedtree-model.webp', shop: P + 'dottedtree/', note: 'עץ ושורשיו, בנויים כולם מנקודות דיו. חצי חורף, חצי אביב.' },
  { id: 'spiraltree', title: 'עץ ספירלות', en: 'Spiral Tree', series: 'ink', art: 'art/spiraltree-web.webp', shop: P + 'spiraltree/', note: 'עץ שכל העלים שלו הם ספירלות קטנות.' },
  { id: 'bubbles', title: 'בועות', en: 'Bubbles', series: 'ink', art: 'art/bubbles-web.webp', onShirt: 'art/bubbles-model.webp', shop: P + 'bubbles/', note: 'מאות בועות שזורמות החוצה מתוך חלון אחד שחור.' },
  { id: 'time', title: 'זמן', en: 'Time', series: 'ink', art: 'art/time-web.webp', onShirt: 'art/time-model.webp', shop: P + 'time/', note: 'שעון חול שבמקום חול זורמת בו המילה time.' },
  { id: 'whale', title: 'זנב של לוויתן', en: 'Whale Tail', series: 'ink', art: 'art/whale-web.webp', onShirt: 'art/whale-model.webp', shop: P + '%d7%97%d7%95%d7%9c%d7%a6%d7%94-%d7%9e%d7%95%d7%93%d7%a4%d7%a1%d7%aa-whale_tail/', note: 'רגע אחד לפני שהלוויתן צולל. הים עשוי מקווים בלבד.' },
  { id: 'rain', title: 'גשם', en: 'Oneline Rain', series: 'ink', art: 'art/rain-web.webp', shop: P + 'oneline_rain/', note: 'ילדה קטנה עם מטרייה, מתחת לענן של תלתלים.' },
  { id: 'panda', title: 'יער במבוק', en: 'Panda Grove', series: 'ink', art: 'art/panda-model2.webp', onShirt: 'art/panda-model.webp', shop: P + '%d7%97%d7%95%d7%9c%d7%a6%d7%94-%d7%a2%d7%9d-%d7%94%d7%93%d7%a4%d7%a1%d7%94-%d7%a9%d7%9c-%d7%a4%d7%a0%d7%93%d7%94-panda_grove/', note: 'צריך להסתכל טוב. איפשהו בין הבמבוקים מחכה פנדה.' },
]

export const printsOn = ['חולצות', 'סיכות', 'בקבוקים', 'תיקי בד', 'ספלים', 'מחברות', 'גלויות', 'כריות', 'מגנטים', 'הדפסים לקיר']
