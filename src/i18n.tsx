import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// Hebrew first, English second. Every string on the site lives here, in both languages.
export type Lang = 'he' | 'en'

const strings = {
  he: {
    metaTitle: 'גליה שליט | איור בצבעי עפרון ודיגיטל',
    metaDesc: 'גליה שליט, אמנית ומאיירת. קו נקי וצבע מתפרץ: איורים בצבעי עפרון ובאיור דיגיטלי, לוגואים ומוצרים מודפסים.',
    name: 'גליה שליט',
    skip: 'דילוג לעבודות',
    navWorks: 'עבודות', navSeries: 'סדרות', navAbout: 'עליי', navShop: 'איפה קונים', navContact: 'צרו קשר',
    navLabel: 'ניווט ראשי', homeLabel: 'גליה שליט, חזרה להתחלה',
    messageMe: 'לכתוב לי', menu: 'תפריט', close: 'סגירה', switchLang: 'EN', switchLangLabel: 'English version',
    waDefault: 'היי גליה, הגעתי מהאתר שלך ורציתי לשאול',
    heroAria: 'פתיחה',
    heroText: 'אני מאיירת בצבעי עפרון ובכלים דיגיטליים, ומדפיסה את האיורים על חולצות, תיקים, קירות ומה שרק תרצו.',
    heroWa: 'לכתוב לי בוואטסאפ', heroWorks: 'לראות עבודות',
    stages: ['קו', 'צבע', 'לשון'], stagesLabel: 'שלבי הציור',
    scrollHint: 'גללו, והזיקית תתמלא בצבע', skipDrawing: 'לדלג על הציור',
    credo1: 'קו נקי.', credo2: 'צבע מתפרץ.',
    lineTitle: 'כל איור מתחיל בקו אחד.',
    lineP: 'מקו נקי ומינימליסטי עד צבע מתפרץ. אני מאיירת ידנית ודיגיטלית, מציירת, מצלמת, ומחפשת את הרגע שבו קו פשוט הופך למשהו חי.',
    doorsTitle: 'שש דלתות לעולם שלי', soon: 'בקרוב מאוד', works: (n: number) => `${n} עבודות`,
    leap: 'השראה מגיעה בקפיצות',
    worksTitle: 'עבודות', catsLabel: 'קטגוריות',
    emoTitle: 'כרטיסיות רגשות', emoHint: '11 קלפים. העבירו עכבר או הקישו על קלף כדי לראות אותו מקרוב.',
    emoNote: 'מתוך סדרת כרטיסיות הרגשות: אחת עשרה תחושות, ילד אחד והמון צבע. כל מילה מצוירת כמו הרגש שהיא מתארת.',
    photoSlot: 'כאן ייכנס צילום של גליה', open: (t: string) => `לפתוח את ${t}`,
    shirtsOrderA: 'את החולצות אפשר להזמין', shirtsOrderLink: (s: string) => `ב${s}`, shirtsOrderAnd: 'ו', shirtsOrderB: ', ועל כל מוצר אחר פשוט כתבו לי.',
    prev: 'העבודה הקודמת', next: 'העבודה הבאה', onShirt: 'ככה זה נראה מודפס על חולצה', onShirtAlt: (t: string) => `${t} מודפס על חולצה`,
    buyPrint: 'לקנות מודפס', askLogo: 'רוצה לוגו כזה לעסק שלי', askWork: 'לשאול את גליה על האיור',
    waWork: (t: string) => `היי גליה, ראיתי באתר את "${t}" ורציתי לשאול עליו`,
    portraitAlt: 'גליה שליט, פורטרט בצבעי עפרון', aboutTitle: 'אני גליה.',
    aboutLead: 'גדלתי בשוודיה, אני חיה ויוצרת בישראל.',
    aboutP: [
      'האהבה שלי לטבע, חיות ותנועה היא מקור ההשראה העיקרי לציורים.',
      'אני מציירת את העולם מסביבי, הפיזי והדמיוני, ועוקבת אחרי הרגעים המפתיעים והמצחיקים שבשניהם.',
      'הכל מתחיל ביומן הרישום, ולפעמים מתגלגל, קופץ וצומח לעבודות ומוצרים.',
      'אני מחפשת איזון, הרמוניה והומור, ודרכים לתפוס את הפרטים הקטנים שלרוב מתפספסים.',
    ],
    crafts: [
      { name: 'צבעי עפרון', line: 'שכבה על שכבה, בכל פעם בטכניקה אחרת.' },
      { name: 'איור דיגיטלי', line: 'המקום שבו קו נקי פוגש צבע בלי גבולות.' },
      { name: 'לוגו ומיתוג', line: 'סימן אחד קטן שמספר את כל העסק.' },
      { name: 'צילום', line: 'העין שמחפשת את הפרט הקטן לפני שהוא נעלם.' },
    ],
    printsTitle: 'אין גבול למה שאפשר להדפיס',
    printsOn: ['חולצות', 'תיקי בד', 'מדבקות קיר', 'סיכות', 'בקבוקים', 'ספלים', 'מחברות', 'גלויות', 'כריות', 'הדפסים לקיר'],
    printsSr: (l: string) => `ההדפסים של גליה מגיעים על ${l}.`,
    printsP: 'כל איור עובר הכנה דיגיטלית להדפסה, כך שהצבעים נשארים חיים גם על בד, מתכת וזכוכית.',
    printsBiz: 'עסק או מותג שמחפשים איור מקורי למוצר, לאריזה או למתנות לעובדים? ספרו לי מה בראש שלכם, ונמצא לזה צורה.',
    printsCta: 'יש לי רעיון להדפסה', printsWa: 'היי גליה, יש לי רעיון להדפסה ורציתי לדבר איתך',
    shopH1: 'רוצים', shopH2: 'ללבוש את זה?',
    shopP: (s: string, s2: string) => `החולצות שלי נמכרות בשתי חנויות: ״${s}״ ו״${s2}״. בוחרים איור, בוחרים חולצה, והוא מגיע אליכם הביתה.`,
    shopCta: (s: string) => `לחנות שלי ב״${s}״`, shopSwipe: 'החליקו הצידה כדי לראות עוד חולצות', foxShirt: 'השועל הכתום',
    contactTitle: 'בואו נצייר משהו ביחד.', contactP: 'איור אישי, מתנה, שיתוף פעולה או סתם שאלה. הכי מהר לתפוס אותי בוואטסאפ.',
    whatsapp: 'וואטסאפ', sendMsg: 'שלחו לי הודעה', phone: 'טלפון', email: 'מייל',
    footerLine: 'קו נקי, צבע מתפרץ. איור בצבעי עפרון ואיור דיגיטלי.', backTop: 'חזרה להתחלה',
    rights: (y: number) => `© ${y} גליה שליט. כל הזכויות על האיורים שמורות.`, builtBy: 'עיצוב ובנייה:',
    floatLabel: 'לכתוב לגליה בוואטסאפ', shopName: 'ההוא עם החולצות', shop2Name: 'בא לי חולצה',
  },
  en: {
    metaTitle: 'Galya Shalit | Coloured pencil & digital illustration',
    metaDesc: 'Galya Shalit, artist and illustrator. Clean line, bursting colour: coloured pencil and digital illustration, logos and printed products.',
    name: 'Galya Shalit',
    skip: 'Skip to works',
    navWorks: 'Works', navSeries: 'Collections', navAbout: 'About', navShop: 'Shop', navContact: 'Contact',
    navLabel: 'Main navigation', homeLabel: 'Galya Shalit, back to top',
    messageMe: 'Message me', menu: 'Menu', close: 'Close', switchLang: 'עב', switchLangLabel: 'גרסה בעברית',
    waDefault: 'Hi Galya, I found your website and wanted to ask',
    heroAria: 'Opening',
    heroText: 'I illustrate in coloured pencil and with digital tools, and print my illustrations on shirts, bags, walls and whatever you can imagine.',
    heroWa: 'WhatsApp me', heroWorks: 'See my work',
    stages: ['Line', 'Colour', 'Tongue'], stagesLabel: 'Drawing stages',
    scrollHint: 'Keep scrolling, and the chameleon fills with colour', skipDrawing: 'Skip the drawing',
    credo1: 'Clean line.', credo2: 'Bursting colour.',
    lineTitle: 'Every illustration starts with one line.',
    lineP: 'From a clean, minimal line to bursting colour. I illustrate by hand and digitally, draw, photograph, and look for the moment a simple line becomes something alive.',
    doorsTitle: 'Six doors into my world', soon: 'Coming soon', works: (n: number) => `${n} works`,
    leap: 'Inspiration comes in leaps',
    worksTitle: 'Works', catsLabel: 'Categories',
    emoTitle: 'Emotion cards', emoHint: '11 cards. Hover or tap a card to see it up close.',
    emoNote: 'From the emotion card series: eleven feelings, one boy and a lot of colour. Every word is drawn the way the feeling it names feels.',
    photoSlot: 'A photo by Galya goes here', open: (t: string) => `Open ${t}`,
    shirtsOrderA: 'You can order the shirts', shirtsOrderLink: (s: string) => `at ${s}`, shirtsOrderAnd: 'or ', shirtsOrderB: ', and for any other product, just message me.',
    prev: 'Previous work', next: 'Next work', onShirt: 'This is how it looks printed on a shirt', onShirtAlt: (t: string) => `${t} printed on a shirt`,
    buyPrint: 'Buy the print', askLogo: 'I want a logo like this', askWork: 'Ask Galya about this piece',
    waWork: (t: string) => `Hi Galya, I saw "${t}" on your website and wanted to ask about it`,
    portraitAlt: 'Galya Shalit, coloured pencil portrait', aboutTitle: "I'm Galya.",
    aboutLead: 'I grew up in Sweden, and I live and create in Israel.',
    aboutP: [
      'My love of nature, animals and movement is the main source of inspiration for my drawings.',
      'I draw the world around me, both the physical and the imagined, and follow the surprising and funny moments in both.',
      'It all begins in my sketchbook, and sometimes rolls, jumps and grows into artworks and products.',
      'I look for balance, harmony and humour, and for ways to catch the small details that usually get missed.',
    ],
    crafts: [
      { name: 'Coloured pencil', line: 'Layer upon layer, in a different technique every time.' },
      { name: 'Digital illustration', line: 'Where a clean line meets colour without limits.' },
      { name: 'Logo & branding', line: 'One small mark that tells a whole business.' },
      { name: 'Photography', line: 'The eye that finds the small detail before it disappears.' },
    ],
    printsTitle: "There's no limit to what you can print",
    printsOn: ['Shirts', 'Tote bags', 'Wall decals', 'Pins', 'Bottles', 'Mugs', 'Notebooks', 'Postcards', 'Cushions', 'Wall prints'],
    printsSr: (l: string) => `Galya's prints come on ${l}.`,
    printsP: 'Every illustration is prepared digitally for print, so the colours stay alive on fabric, metal and glass.',
    printsBiz: "A business or brand looking for an original illustration for a product, packaging or staff gifts? Tell me what you have in mind, and we'll find the right shape for it.",
    printsCta: 'I have a print idea', printsWa: 'Hi Galya, I have an idea for a print and wanted to talk',
    shopH1: 'Want to', shopH2: 'wear it?',
    shopP: (s: string, s2: string) => `My shirts are sold in two shops: ${s} and ${s2}. Pick an illustration, pick a shirt, and it arrives at your door.`,
    shopCta: (s: string) => `My shop on ${s}`, shopSwipe: 'Swipe sideways to see more shirts', foxShirt: 'The orange fox',
    contactTitle: "Let's draw something together.", contactP: 'A personal illustration, a gift, a collaboration or just a question. WhatsApp is the fastest way to reach me.',
    whatsapp: 'WhatsApp', sendMsg: 'Send me a message', phone: 'Phone', email: 'Email',
    footerLine: 'Clean line, bursting colour. Coloured pencil and digital illustration.', backTop: 'Back to top',
    rights: (y: number) => `© ${y} Galya Shalit. All rights to the illustrations reserved.`, builtBy: 'Design & build:',
    floatLabel: 'Message Galya on WhatsApp', shopName: 'Hahu Im Hahultzot', shop2Name: 'Ba Li Hultza',
  },
}

export type Strings = (typeof strings)['he']

const initial = (): Lang => {
  try {
    const q = new URLSearchParams(location.search).get('lang')
    if (q === 'en' || q === 'he') return q
    const saved = localStorage.getItem('galya-lang')
    if (saved === 'en' || saved === 'he') return saved
  } catch { /* storage may be blocked */ }
  return 'he'
}

const Ctx = createContext<{ lang: Lang; t: Strings; setLang: (l: Lang) => void }>({ lang: 'he', t: strings.he, setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial)

  useEffect(() => {
    const t = strings[lang]
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
    document.title = t.metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.metaDesc)
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('galya-lang', l) } catch { /* ignore */ }
    const url = new URL(location.href)
    if (l === 'en') url.searchParams.set('lang', 'en')
    else url.searchParams.delete('lang')
    history.replaceState(null, '', url)
  }

  return <Ctx.Provider value={{ lang, t: strings[lang] as Strings, setLang }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
