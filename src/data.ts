// Everything that will change lives here: contact details, links, works.
// TODO from Galya: her photography.

export const contact = {
  whatsapp: '972545755511',
  phoneDisplay: '054-575-5511',
  phoneHref: 'tel:+972545755511',
  email: 'galyashalit@gmail.com',
  shopUrl: 'https://www.h-i-h.co.il/vendors/galya-shalit/',
  shopName: 'ההוא עם החולצות',
  shop2Url: 'https://www.t-shirt.co.il/category/art-%D7%92%D7%9C%D7%99%D7%94-%D7%A9%D7%9C%D7%99%D7%98',
}

export const waLink = (text: string) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`

export type CatId = 'inspiration' | 'products' | 'digital' | 'books' | 'logos' | 'photos'

// Five doors into Galya's world. Each category shows a drawing from inside it.
export const categories: { id: CatId; name: string; en: string; line: string; cover: string; color: string }[] = [
  { id: 'digital', name: 'פרויקטים', en: 'Projects', line: 'כרטיסיות הרגשות, השועל הכתום ועוד איורים שנולדו על המסך.', cover: 'art2/emo-calm.webp', color: '#3d8cb5' },
  { id: 'inspiration', name: 'רישומים', en: 'Sketches', line: 'איורים מהיומן ורישומים מהירים בעיפרון. מכאן הכל מתחיל.', cover: 'art2/ins-journal-frogs.webp', color: '#2f9a6a' },
  { id: 'books', name: 'איור ספרים', en: 'Books', line: 'איורים לספרי ילדים ופורטרטים בעיפרון שנולדו בתוך ספרים.', cover: 'art2/book-chameleons-branch.webp', color: '#7b4fa8' },
  { id: 'products', name: 'מוצרים', en: 'Prints', line: 'חולצות ותיקי בד. איורים שאפשר ללבוש ולקחת הביתה.', cover: 'art2/prod-fox-shirt.webp', color: '#e8762b' },
  { id: 'logos', name: 'לוגואים', en: 'Logos', line: 'סימן אחד קטן שמספר את כל הסיפור של עסק.', cover: 'art2/logo-barakbees.webp', color: '#d4a017' },
  { id: 'photos', name: 'צילומים', en: 'Photography', line: 'העין שמחפשת את הפרט הקטן: חיפושית על פרח, חילזון על עלה, אור של ערב על המים.', cover: 'art2/photo-ladybug.webp', color: '#5e5850' },
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
  { id: 'bag-seahorse', title: 'סוסון ים על תיק', cat: 'products', art: 'art2/prod-bag-1.webp', note: 'סוסון הים הכתום מהוויטראז׳, על תיק בד שאפשר לקחת לים.' },
  { id: 'bag-bubbles', title: 'בועות על תיק', cat: 'products', art: 'art2/prod-bag-2.webp', note: 'מאות בועות שזורמות מתוך חלון שחור, עכשיו על תיק בד.' },
  { id: 'bag-rain', title: 'גשם על תיק', cat: 'products', art: 'art2/prod-bag-3.webp', note: 'הילדה עם המטרייה מתחת לענן התלתלים, בקו אחד על תיק בד.' },
  { id: 'bag-fox', title: 'שועל בוויטראז׳ על תיק', cat: 'products', art: 'art2/prod-bag-4.webp', note: 'השועל הכתום, יושב בתוך חלון של זכוכית צבעונית.' },
  { id: 'bag-cat', title: 'חתול מתמתח על תיק', cat: 'products', art: 'art2/prod-bag-5.webp', note: 'חתול כתום שמתמתח בפינה של התיק, כאילו זה המקום שלו.' },
  { id: 'bag-whale', title: 'לוויתן על תיק', cat: 'products', art: 'art2/prod-bag-6.webp', note: 'זנב הלוויתן רגע לפני הצלילה, ים של קווים על תיק בד.' },
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
  { id: 'wall-run', title: 'סנאים על הקיר', cat: 'digital', art: 'art2/prod-wall-41.webp', note: 'מדבקות קיר לסטודיו תנועה: סנאי רץ, קופץ ונתלה בין המכשירים.' },
  { id: 'wall-wave', title: 'סנאי על מוט', cat: 'digital', art: 'art2/prod-wall-43.webp', note: 'עוד סנאי מסדרת מדבקות הקיר, מתאמן על מוט בדיוק כמו המתאמנים.' },
  { id: 'wall-sleep', title: 'סנאי במנוחה', cat: 'digital', art: 'art2/prod-wall-44.webp', note: 'גם סנאי צריך הפסקה. מדבקת קיר מעל ספסל.' },
  { id: 'logo-hamerchav', title: 'המרחב', en: 'אימון בתנועה', cat: 'logos', art: 'art2/logo-hamerchav.webp', note: 'סנאי בתנועה אחת לסטודיו אימון. ממנו נולדו גם מדבקות הקיר.' },
  { id: 'logo-barakbees', title: 'Barak Bees', cat: 'logos', art: 'art2/logo-barakbees.webp', note: 'דבורה, חלת דבש וטיפה אחת של דבש.' },
  { id: 'logo-arka', title: 'ארקא', en: 'לימוד מיומנויות חיים קדומות', cat: 'logos', art: 'art2/logo-arka.webp', note: 'עץ חיים מצויר ביד, וציפור אדומה אחת על הענף.' },
  { id: 'logo-magdala', title: 'המגדלה של מריאן', cat: 'logos', art: 'art2/logo-magdala.webp', note: 'ספל קפה בצל עצי ערבה, בצבעי עפרון רכים.' },
  { id: 'logo-yoga', title: 'יוגה', cat: 'logos', art: 'art2/logo-yoga.webp', note: 'דמות בישיבה מזרחית בקו אחד רציף.' },
  { id: 'logo-cat', title: 'חתול נמתח', cat: 'logos', art: 'art2/logo-cat.webp', note: 'מתיחה של חתול בשני קווים בלבד.' },
  { id: 'logo-dogwalker', title: 'Dog walker & Cat sitter', cat: 'logos', art: 'art2/logo-dogwalker.webp', note: 'מטיילת עם כלב וחתול שמצטרף, לעסק של טיולי כלבים.', wide: true },
  { id: 'book-branch', title: 'זיקיות על ענף', cat: 'books', art: 'art2/book-chameleons-branch.webp', note: 'מתוך ספר ילדים: שלוש זיקיות מתנדנדות על ענף, ואחת כבר תלויה הפוך.', wide: true },
  { id: 'book-rabbit', title: 'זיקיות וארנב', cat: 'books', art: 'art2/book-chameleons-rabbit.webp', note: 'מתוך ספר ילדים: הזיקיות מגלות שמישהו עוקב אחריהן מלמטה.', wide: true },
  { id: 'book-einstein', title: 'איינשטיין', cat: 'books', art: 'art2/book-einstein.webp', note: 'פורטרט בעיפרון שנולד כאיור לספר.' },
  { id: 'book-churchill', title: "צ'רצ'יל", cat: 'books', art: 'art2/book-churchill.webp', note: 'פורטרט בעיפרון שנולד כאיור לספר.' },
  { id: 'photo-ladybug', title: 'חיפושית על פרח', cat: 'photos', art: 'art2/photo-ladybug.webp', note: 'פרת משה רבנו מטפסת על גבעול, מתחת לכיפה סגולה של פרח.' },
  { id: 'photo-snail', title: 'חילזון בדשא', cat: 'photos', art: 'art2/photo-snail.webp', note: 'חילזון קטן שמטפס לאט בין עלי דשא ירוקים.' },
  { id: 'photo-kayak', title: 'קיאק בערב', cat: 'photos', art: 'art2/photo-kayak.webp', note: 'שמש נמוכה, מים שקטים, ושני קיאקים שגולשים לתוך הערב.' },
  { id: 'photo-bicycle', title: 'אופניים וחלון', cat: 'photos', art: 'art2/photo-bicycle.webp', note: 'רוכבת חולפת מתחת לחלון, ובזכוכית משתקפת שורה של בתים צבעוניים.' },
]

// The emotion card series, shown as a fanned deck in the digital category
export const emotions = ['calm', 'angry', 'surprised', 'moved', 'grateful', 'eager', 'worried', 'hopeful', 'ambivalent', 'proud', 'excited'].map(e => ({
  id: e,
  src: `art2/emo-${e}.webp`,
  alt: `כרטיסיית רגשות: ${e}`,
}))


export const printsOn = ['חולצות', 'תיקי בד', 'מדבקות קיר', 'סיכות', 'בקבוקים', 'ספלים', 'מחברות', 'גלויות', 'כריות', 'הדפסים לקיר']

// ---- English ----
export const catEn: Record<CatId, { name: string; line: string }> = {
  digital: { name: 'Projects', line: 'The emotion cards, the orange fox and more illustrations born on screen.' },
  inspiration: { name: 'Sketches', line: 'Illustrations from my journal and quick pencil drawings. This is where it all begins.' },
  products: { name: 'Products', line: 'Shirts and tote bags. Illustrations you can wear and take home.' },
  logos: { name: 'Logos', line: "One small mark that tells a business's whole story." },
  books: { name: 'Books', line: "Illustrations for children's books and pencil portraits born inside books." },
  photos: { name: 'Photography', line: 'The eye that finds the small detail: a beetle on a flower, a snail on a leaf, evening light on the water.' },
}

export const workEn: Record<string, { title: string; note: string; sub?: string }> = {
  'journal-frogs': { title: 'Frogs in the journal', note: "A spread from Galya's journal: frogs leaping between water lilies and reeds." },
  'journal-tea': { title: 'Tea bags on a walk', note: 'Tea bags that climbed out of the mug and went for a walk across the page.' },
  apples: { title: 'Two apples', note: 'Coloured pencil, layer upon layer, until you almost want to take a bite.' },
  shoe: { title: 'An old shoe', note: 'A pencil drawing of a shoe that has walked a long way.' },
  iris: { title: 'Iris', note: 'An iris in fine lines and dots, without a drop of colour.' },
  cyclamen: { title: 'Cyclamen', note: 'Cyclamen in coloured pencil, with their speckled leaves.' },
  blackbird: { title: 'Black bird', note: 'Black that turns out to be many shades, and one orange patch on the wing.' },
  plover: { title: 'Plover', note: 'A small shore bird on orange legs.' },
  bustard: { title: 'Houbara bustard', note: 'A delicate pencil drawing, feather by feather.' },
  'fox-sketch': { title: 'Fox in line', note: 'A sketch of a fox, before it turned orange.' },
  noplanetb: { title: 'There is no planet B', note: 'Mountains, waves and one clear message, in coloured pencil on brown paper.' },
  'fox-shirt': { title: 'The orange fox on a shirt', note: 'The digital fox, printed in white on an orange shirt.' },
  'bag-seahorse': { title: 'Seahorse tote', note: 'The orange stained glass seahorse, on a canvas bag you can take to the beach.' },
  'bag-bubbles': { title: 'Bubbles tote', note: 'Hundreds of bubbles flowing out of a black window, now on a canvas bag.' },
  'bag-rain': { title: 'Rain tote', note: 'The girl with the umbrella under a curly cloud, in one line on a canvas bag.' },
  'bag-fox': { title: 'Stained glass fox tote', note: 'The orange fox, sitting inside a window of coloured glass.' },
  'bag-cat': { title: 'Stretching cat tote', note: 'An orange cat stretching in the corner of the bag, as if it owns the place.' },
  'bag-whale': { title: 'Whale tote', note: 'The whale tail just before the dive, a sea of lines on a canvas bag.' },
  'wall-run': { title: 'Squirrels on the wall', note: 'Wall decals for a movement studio: a squirrel running, leaping and hanging between the machines.' },
  'wall-wave': { title: 'Squirrel on a bar', note: 'Another squirrel from the wall decal series, training on a bar just like the people there.' },
  'wall-sleep': { title: 'Squirrel at rest', note: 'Even a squirrel needs a break. A wall decal above a bench.' },
  macaw: { title: 'Pair of macaws', note: 'Two parrots mid dance, every feather a different colour.' },
  zenart: { title: 'Zen mushrooms', note: 'A small forest of patterned mushrooms, sinking into a cloud of colour.' },
  penguins: { title: 'Penguins', note: 'A whole family on one iceberg, each looking a different way.' },
  gchameleon: { title: 'Stained glass chameleon', note: 'The same beloved chameleon, this time broken into dozens of pieces of coloured glass.' },
  gseahorse: { title: 'Seahorse', note: 'An orange seahorse hiding in a sea of triangles.' },
  gmushrooms: { title: 'Geometric mushrooms', note: 'Mushroom caps that break the light, like stained glass in a forest.' },
  lizard: { title: 'Lizard', note: 'A lizard climbing a column of colour. Best on the back of a shirt.' },
  flamingo: { title: 'Flamingos', note: 'Four flamingos, one line. The pen never left the paper.' },
  cats: { title: 'Cats', note: 'A row of cats sitting exactly the way cats sit.' },
  birds: { title: 'Birds on a wire', note: 'Birds landing on the very line they are made of.' },
  snail: { title: 'Snails', note: 'An extra slow snail race, in one line.' },
  '4sheep': { title: 'Four sheep', note: 'A small flock of curly sheep, and one sheep looking right at you.' },
  sheep: { title: 'Sheep with a question', note: 'One line that tangles and tangles, until a sheep with a question mark appears.' },
  dottedtree: { title: 'Dotted tree', note: 'A tree and its roots, all built from dots of ink. Half winter, half spring.' },
  spiraltree: { title: 'Spiral tree', note: 'A tree whose leaves are all tiny spirals.' },
  bubbles: { title: 'Bubbles', note: 'Hundreds of bubbles flowing out of one black window.' },
  time: { title: 'Time', note: 'An hourglass where the word time flows instead of sand.' },
  whale: { title: 'Whale tail', note: 'One moment before the whale dives. The sea is made of lines only.' },
  rain: { title: 'Rain', note: 'A little girl with an umbrella, under a cloud of curls.' },
  panda: { title: 'Bamboo grove', note: 'Look closely. Somewhere between the bamboo, a panda is waiting.' },
  fox: { title: 'The orange fox', note: 'A digital illustration of a white fox on orange, which also became a shirt.' },
  wakeup: { title: 'Wake up!', note: 'A polar bear on a melting iceberg. A postcard with a call to wake up.' },
  zebra: { title: 'Zebra crossing', note: 'A zebra crossing, quite literally.' },
  beetles: { title: 'Beetles', note: 'Four beetles walking from light into dark, and turning over.' },
  questions: { title: '?!', note: 'Lots of questions on one side, lots of answers on the other.' },
  thinkglobal: { title: 'Think global, act local', note: 'Drops of one tree, and one message.' },
  'logo-hamerchav': { title: 'HaMerhav', sub: 'Movement training studio', note: 'A squirrel in one movement for a training studio. The wall decals were born from it too.' },
  'logo-barakbees': { title: 'Barak Bees', note: 'A bee, a honeycomb and one drop of honey.' },
  'logo-arka': { title: 'Arka', sub: 'Ancient life skills', note: 'A hand drawn tree of life, and one red bird on the branch.' },
  'logo-magdala': { title: "Marian's Magdala", note: 'A coffee cup in the shade of willow trees, in soft coloured pencil.' },
  'logo-yoga': { title: 'Yoga', note: 'A seated figure in one continuous line.' },
  'logo-cat': { title: 'Stretching cat', note: 'A cat stretching, in just two lines.' },
  'logo-dogwalker': { title: 'Dog walker & Cat sitter', note: 'A walker with a dog and a cat tagging along, for a dog walking business.' },
  'book-branch': { title: 'Chameleons on a branch', note: "From a children's book: three chameleons swinging on a branch, one already hanging upside down." },
  'book-rabbit': { title: 'Chameleons and a rabbit', note: "From a children's book: the chameleons find out someone is watching them from below." },
  'book-einstein': { title: 'Einstein', note: 'A pencil portrait, drawn as an illustration for a book.' },
  'book-churchill': { title: 'Churchill', note: 'A pencil portrait, drawn as an illustration for a book.' },
  'photo-ladybug': { title: 'Ladybird on a flower', note: 'A ladybird climbing a stem, under a purple dome of petals.' },
  'photo-snail': { title: 'Snail in the grass', note: 'A small snail slowly climbing between green blades of grass.' },
  'photo-kayak': { title: 'Kayak at dusk', note: 'Low sun, still water, and two kayaks gliding into the evening.' },
  'photo-bicycle': { title: 'Bicycle and window', note: 'A cyclist passes under a window, and a row of colourful houses is reflected in the glass.' },
}

/** Title, subtitle and note of a work in the current language */
export const workText = (w: Work, lang: 'he' | 'en') => {
  if (lang === 'he') return { title: w.title, sub: w.en, note: w.note }
  const e = workEn[w.id]
  return { title: e?.title ?? w.en ?? w.title, sub: e?.sub, note: e?.note ?? w.note }
}
export const catText = (c: (typeof categories)[number], lang: 'he' | 'en') => (lang === 'he' ? { name: c.name, line: c.line } : catEn[c.id])
