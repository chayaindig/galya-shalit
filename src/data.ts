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

export type CatId = 'inspiration' | 'products' | 'digital' | 'logos' | 'photos'

// Five doors into Galya's world. Each category shows a drawing from inside it.
export const categories: { id: CatId; name: string; en: string; line: string; cover: string; color: string }[] = [
  { id: 'inspiration', name: 'השראה', en: 'Sketchbook', line: 'איורים מהיומן ורישומים מהירים בעיפרון. מכאן הכל מתחיל.', cover: 'art2/ins-journal-frogs.webp', color: '#2f9a6a' },
  { id: 'products', name: 'מוצרים', en: 'Prints', line: 'חולצות, תיקים, מדבקות קיר. איורים שאפשר ללבוש ולקחת הביתה.', cover: 'art2/prod-fox-shirt.webp', color: '#e8762b' },
  { id: 'digital', name: 'דיגיטלי', en: 'Digital', line: 'כרטיסיות הרגשות, השועל הכתום ועוד איורים שנולדו על המסך.', cover: 'art2/emo-calm.webp', color: '#3d8cb5' },
  { id: 'logos', name: 'לוגואים', en: 'Logos', line: 'סימן אחד קטן שמספר את כל הסיפור של עסק.', cover: 'art2/logo-barakbees.webp', color: '#d4a017' },
  { id: 'photos', name: 'צילומים', en: 'Photography', line: 'העין שמחפשת את הפרט הקטן.', cover: '', color: '#5e5850' },
]

export type Work = {
  id: string
  title: string
  en?: string
  cat: CatId
  art: string
  /** Shown on the card instead of the art, e.g. the shirt photo */
  cover?: string
  shop?: string
  note: string
  wide?: boolean
}

const P = 'https://www.h-i-h.co.il/product/'

export const works: Work[] = [
  { id: 'journal-frogs', title: 'צפרדעים ביומן', cat: 'inspiration', art: 'art2/ins-journal-frogs.webp', note: 'כפולה מהיומן של גליה: צפרדעים שקופצות בין עלי מים וסוף.', wide: true },
  { id: 'journal-tea', title: 'שקיקי תה בטיול', cat: 'inspiration', art: 'art2/ins-journal-tea.webp', note: 'שקיקי תה שיצאו מהספל ויוצאים לטייל על הדף.', wide: true },
  { id: 'apples', title: 'שני תפוחים', cat: 'inspiration', art: 'art2/ins-apples.webp', note: 'צבעי עפרון, שכבה על שכבה, עד שהתפוח כמעט נגיס.' },
  { id: 'shoe', title: 'נעל ישנה', cat: 'inspiration', art: 'art2/ins-shoe.webp', note: 'רישום בעיפרון של נעל שעברה הרבה דרך.' },
  { id: 'iris', title: 'אירוס', cat: 'inspiration', art: 'art2/ins-iris.webp', note: 'אירוס בקווים דקים ונקודות, בלי טיפת צבע.' },
  { id: 'cyclamen', title: 'רקפות', cat: 'inspiration', art: 'art2/ins-cyclamen.webp', note: 'רקפות בצבעי עפרון, עם העלים המנומרים שלהן.' },
  { id: 'blackbird', title: 'ציפור שחורה', cat: 'inspiration', art: 'art2/ins-blackbird.webp', note: 'שחור שמתגלה כהרבה גוונים, וכתם כתום אחד בכנף.' },
  { id: 'plover', title: 'חופמי', cat: 'inspiration', art: 'art2/ins-plover.webp', note: 'ציפור חוף קטנה על רגליים כתומות.' },
  { id: 'bustard', title: 'חובארה', cat: 'inspiration', art: 'art2/ins-bustard.webp', note: 'רישום עיפרון עדין, נוצה אחרי נוצה.' },
  { id: 'fox-sketch', title: 'שועל בקו', cat: 'inspiration', art: 'art2/ins-fox-sketch.webp', note: 'סקיצה של שועל, לפני שהוא הפך לכתום.' },
  { id: 'noplanetb', title: 'There is no planet B', cat: 'inspiration', art: 'art2/dig-noplanetb.webp', note: 'הרים, גלים ומסר אחד ברור, בצבעי עפרון על נייר חום.' },
  { id: 'fox-shirt', title: 'השועל הכתום על חולצה', cat: 'products', art: 'art2/prod-fox-shirt.webp', note: 'השועל הדיגיטלי, מודפס בלבן על חולצה כתומה.' },
  { id: 'wall-run', title: 'סנאים על הקיר', cat: 'products', art: 'art2/prod-wall-41.webp', note: 'מדבקות קיר לסטודיו תנועה: סנאי רץ, קופץ ונתלה בין המכשירים.' },
  { id: 'wall-wave', title: 'סנאי על מוט', cat: 'products', art: 'art2/prod-wall-43.webp', note: 'עוד סנאי מסדרת מדבקות הקיר, מתאמן על מוט בדיוק כמו המתאמנים.' },
  { id: 'wall-sleep', title: 'סנאי במנוחה', cat: 'products', art: 'art2/prod-wall-44.webp', note: 'גם סנאי צריך הפסקה. מדבקת קיר מעל ספסל.' },
  { id: 'macaw', title: 'זוג מקאו', en: 'Macaw', cat: 'products', art: 'art/macaw-web.webp', cover: 'art/macaw-model.webp', shop: P + 'macaw/', note: 'שני תוכים באמצע ריקוד, כל נוצה בצבע אחר.' },
  { id: 'zenart', title: 'פטריות זן', en: 'Zenart Mushrooms', cat: 'products', art: 'art/zenart-web.webp', cover: 'art/zenart-model.webp', shop: P + 'zenart-mushrooms/', note: 'יער קטן של פטריות מצוירות בדוגמאות, שקועות בענן של צבע.' },
  { id: 'penguins', title: 'פינגווינים', en: 'Penguins', cat: 'products', art: 'art/penguins-web.webp', cover: 'art/penguins-model.webp', shop: P + 'penguins/', note: 'משפחה שלמה על קרחון אחד. כל אחד מסתכל לכיוון אחר.', wide: true },
  { id: 'gchameleon', title: 'זיקית בוויטראז׳', en: 'Geometric Chameleon', cat: 'products', art: 'art/gchameleon-web.webp', cover: 'art/gchameleon-model.webp', shop: P + 'geometric_chaemelon/', note: 'אותה זיקית אהובה, הפעם מפורקת לעשרות פיסות זכוכית צבעונית.' },
  { id: 'gseahorse', title: 'סוסון ים', en: 'Geometrical Sea', cat: 'products', art: 'art/gseahorse-web.webp', cover: 'art/gseahorse-model.webp', shop: P + 'geometrical_sea/', note: 'סוסון ים כתום שמתחבא בתוך ים של משולשים.' },
  { id: 'gmushrooms', title: 'פטריות גיאומטריות', en: 'Geometric Mushrooms', cat: 'products', art: 'art/gmushrooms-web.webp', cover: 'art/gmushrooms-model.webp', shop: P + 'geometric_mushrooms/', note: 'כובעי פטריות שנשברים לאור, כמו ויטראז׳ בתוך יער.' },
  { id: 'lizard', title: 'לטאה', en: 'Lizard', cat: 'products', art: 'art/lizard-web.webp', cover: 'art/lizard-model.webp', shop: P + 'lizard/', note: 'לטאה שמטפסת על עמוד של צבע. הכי טובה על הגב של חולצה.' },
  { id: 'flamingo', title: 'פלמינגו', en: 'Oneline Flamingo', cat: 'products', art: 'art/flamingo-web.webp', shop: P + 'oneline_flamingo/', note: 'ארבעה פלמינגו, קו אחד. העט לא התרומם מהדף אפילו פעם אחת.', wide: true },
  { id: 'cats', title: 'חתולים', en: 'Oneline Cats', cat: 'products', art: 'art/cats-web.webp', shop: P + 'oneline_cats/', note: 'שורה של חתולים שיושבים בדיוק כמו שחתולים יושבים.', wide: true },
  { id: 'birds', title: 'ציפורים על חוט', en: 'Oneline Birds', cat: 'products', art: 'art/birds-web.webp', shop: P + 'oneline_birds/', note: 'ציפורים שנחות על הקו שהן עצמן עשויות ממנו.', wide: true },
  { id: 'snail', title: 'חלזונות', en: 'Oneline Snail', cat: 'products', art: 'art/snail-web.webp', shop: P + 'oneline_snail/', note: 'מירוץ חלזונות איטי במיוחד, בקו אחד.', wide: true },
  { id: '4sheep', title: 'ארבע כבשים', en: 'Oneline 4 Sheep', cat: 'products', art: 'art/4sheep-web.webp', shop: P + 'oneline-4sheep/', note: 'עדר קטן של כבשים מתולתלות, וכבשה אחת שמסתכלת אלייך.', wide: true },
  { id: 'sheep', title: 'כבשה עם שאלה', en: 'Oneline Sheep', cat: 'products', art: 'art/sheep-web.webp', shop: P + 'oneline_sheep/', note: 'קו אחד שמסתבך ומסתבך, ובסוף מתגלה כבשה עם סימן שאלה.' },
  { id: 'dottedtree', title: 'עץ מנוקד', en: 'Dotted Tree', cat: 'products', art: 'art/dottedtree-web.webp', cover: 'art/dottedtree-model.webp', shop: P + 'dottedtree/', note: 'עץ ושורשיו, בנויים כולם מנקודות דיו. חצי חורף, חצי אביב.' },
  { id: 'spiraltree', title: 'עץ ספירלות', en: 'Spiral Tree', cat: 'products', art: 'art/spiraltree-web.webp', shop: P + 'spiraltree/', note: 'עץ שכל העלים שלו הם ספירלות קטנות.' },
  { id: 'bubbles', title: 'בועות', en: 'Bubbles', cat: 'products', art: 'art/bubbles-web.webp', cover: 'art/bubbles-model.webp', shop: P + 'bubbles/', note: 'מאות בועות שזורמות החוצה מתוך חלון אחד שחור.' },
  { id: 'time', title: 'זמן', en: 'Time', cat: 'products', art: 'art/time-web.webp', cover: 'art/time-model.webp', shop: P + 'time/', note: 'שעון חול שבמקום חול זורמת בו המילה time.' },
  { id: 'whale', title: 'זנב של לוויתן', en: 'Whale Tail', cat: 'products', art: 'art/whale-web.webp', cover: 'art/whale-model.webp', shop: P + '%d7%97%d7%95%d7%9c%d7%a6%d7%94-%d7%9e%d7%95%d7%93%d7%a4%d7%a1%d7%aa-whale_tail/', note: 'רגע אחד לפני שהלוויתן צולל. הים עשוי מקווים בלבד.' },
  { id: 'rain', title: 'גשם', en: 'Oneline Rain', cat: 'products', art: 'art/rain-web.webp', shop: P + 'oneline_rain/', note: 'ילדה קטנה עם מטרייה, מתחת לענן של תלתלים.' },
  { id: 'panda', title: 'יער במבוק', en: 'Panda Grove', cat: 'products', art: 'art/panda-model2.webp', cover: 'art/panda-model.webp', shop: P + '%d7%97%d7%95%d7%9c%d7%a6%d7%94-%d7%a2%d7%9d-%d7%94%d7%93%d7%a4%d7%a1%d7%94-%d7%a9%d7%9c-%d7%a4%d7%a0%d7%93%d7%94-panda_grove/', note: 'צריך להסתכל טוב. איפשהו בין הבמבוקים מחכה פנדה.' },
  { id: 'fox', title: 'השועל הכתום', cat: 'digital', art: 'art2/dig-fox.webp', note: 'איור דיגיטלי של שועל לבן על כתום, שהפך גם לחולצה.' },
  { id: 'wakeup', title: 'Wake up!', cat: 'digital', art: 'art2/dig-wakeup.webp', note: 'דוב קוטב על קרחון שנמס. גלויה עם קריאה להתעורר.' },
  { id: 'zebra', title: 'Zebra crossing', cat: 'digital', art: 'art2/dig-zebra.webp', note: 'מעבר חצייה, פשוטו כמשמעו.' },
  { id: 'beetles', title: 'חיפושיות', cat: 'digital', art: 'art2/dig-beetles.webp', note: 'ארבע חיפושיות שעוברות מהאור אל החושך ומתהפכות.' },
  { id: 'questions', title: '?!', cat: 'digital', art: 'art2/dig-questions.webp', note: 'הרבה שאלות בצד אחד, הרבה תשובות בצד השני.' },
  { id: 'thinkglobal', title: 'Think global, act local', cat: 'digital', art: 'art2/dig-thinkglobal.webp', note: 'טיפות של עץ אחד, ומסר אחד.' },
  { id: 'logo-hamerchav', title: 'המרחב', en: 'אימון בתנועה', cat: 'logos', art: 'art2/logo-hamerchav.webp', note: 'סנאי בתנועה אחת לסטודיו אימון. ממנו נולדו גם מדבקות הקיר.' },
  { id: 'logo-barakbees', title: 'Barak Bees', cat: 'logos', art: 'art2/logo-barakbees.webp', note: 'דבורה, חלת דבש וטיפה אחת של דבש.' },
  { id: 'logo-arka', title: 'ארקא', en: 'לימוד מיומנויות חיים קדומות', cat: 'logos', art: 'art2/logo-arka.webp', note: 'עץ חיים מצויר ביד, וציפור אדומה אחת על הענף.' },
  { id: 'logo-magdala', title: 'המגדלה של מריאן', cat: 'logos', art: 'art2/logo-magdala.webp', note: 'ספל קפה בצל עצי ערבה, בצבעי עפרון רכים.' },
  { id: 'logo-yoga', title: 'יוגה', cat: 'logos', art: 'art2/logo-yoga.webp', note: 'דמות בישיבה מזרחית בקו אחד רציף.' },
  { id: 'logo-cat', title: 'חתול נמתח', cat: 'logos', art: 'art2/logo-cat.webp', note: 'מתיחה של חתול בשני קווים בלבד.' },
  { id: 'logo-dogwalker', title: 'Dog walker & Cat sitter', cat: 'logos', art: 'art2/logo-dogwalker.webp', note: 'מטיילת עם כלב וחתול שמצטרף, לעסק של טיולי כלבים.', wide: true },
]

// The emotion card series, shown as a fanned deck in the digital category
export const emotions = ['calm', 'angry', 'surprised', 'moved', 'grateful', 'eager', 'worried', 'hopeful', 'ambivalent', 'proud', 'excited'].map(e => ({
  id: e,
  src: `art2/emo-${e}.webp`,
  alt: `כרטיסיית רגשות: ${e}`,
}))

// Placeholders for the photography category, until Galya's photos arrive
export const photoSlots = 6

export const printsOn = ['חולצות', 'תיקי בד', 'מדבקות קיר', 'סיכות', 'בקבוקים', 'ספלים', 'מחברות', 'גלויות', 'כריות', 'הדפסים לקיר']
