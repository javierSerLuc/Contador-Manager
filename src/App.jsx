import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Titulo } from './components/Titulo'
import { BotonADD } from './components/BotonADD'
import { BarraBusqueda } from './components/BarraBusqueda'

function App() {

  return (
    <div className="App">
      <header className="app-header">
        <Titulo />
      </header>
      <main>
        <section className='tools'>
            <BotonADD/>
            <BarraBusqueda/>
        </section>
      </main>

    </div>
  )
}

export default App
