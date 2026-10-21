import { useEffect, useState } from 'react'
import { watchOrphans } from './lib/noOrphans'
import type { SeriesId } from './data'
import Header from './components/Header'
import Hero from './components/Hero'
import Story from './components/Story'
import Smultron from './components/Smultron'
import Series from './components/Series'
import Gallery from './components/Gallery'
import About from './components/About'
import Prints from './components/Prints'
import { Contact, Footer, Shop, WhatsAppFloat } from './components/Closing'

export default function App() {
  const [filter, setFilter] = useState<SeriesId | 'all'>('all')

  useEffect(() => watchOrphans(), [])

  return (
    <>
      <a href="#works" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        דילוג לעבודות
      </a>
      <Header />
      <main>
        <Hero />
        <Story />
        <Smultron />
        <Series onPick={setFilter} />
        <Gallery filter={filter} setFilter={setFilter} />
        <About />
        <Prints />
        <Shop />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
