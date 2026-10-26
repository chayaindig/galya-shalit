import { useEffect, useState } from 'react'
import { watchOrphans } from './lib/noOrphans'
import type { CatId } from './data'
import Header from './components/Header'
import Hero from './components/Hero'
import Story from './components/Story'
import Credo from './components/Credo'
import Categories from './components/Categories'
import SquirrelRun from './components/SquirrelRun'
import Gallery from './components/Gallery'
import About from './components/About'
import Prints from './components/Prints'
import Shop from './components/Shop'
import { Contact, Footer, WhatsAppFloat } from './components/Closing'

export default function App() {
  const [filter, setFilter] = useState<CatId>('inspiration')

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
        <Credo />
        <Categories onPick={setFilter} />
        <SquirrelRun />
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
