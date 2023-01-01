import { useState, useEffect } from 'react'
import './App.css'
import { Titulo } from './components/Titulo'
import { BotonADD } from './components/BotonADD'
import { BarraBusqueda } from './components/BarraBusqueda'

import { Spinner } from '@chakra-ui/react'
import { Button,Stack,Image } from '@chakra-ui/react'

import { BsList } from "react-icons/bs";
import { BsBoxArrowUpRight } from "react-icons/bs";

import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { ClearFix } from './components/ClearFix'

function App() {

  const [contadores, setContadores] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetchContadores();
  }, [])

  const fetchContadores = async () => {
    let url = "https://contador-manager-api.vercel.app/api/contador/listaContadores";
    let response = await fetch(url);
    let data = await response.json();
    setContadores(data.contadores);
    setCargando(false);
  };



    return (
      <div className="App">
        <header className="app-header">
          <Titulo />
        </header>
        <main>
          <section className='tools'>
            <BotonADD />
            <BarraBusqueda />
          </section>
          <section className='lista-contadores'>
            {cargando ? <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>
            
            : contadores.map((contador, index) => {
              return (
                <article className='contador' key={index}>
                  <Button className='opciones-contador' colorScheme='gray' variant='ghost'>
                     <BsList size={"2.5rem"} color={"gray"} />
                  </Button>
                  <ClearFix/>

                  <section className='datos-contador'>
                    <Stack direction='row' spacing="1rem" align='center'>
                    <Image boxSize='2rem' objectFit='cover' src={contador.emoji} />
                      <h3 className='titulo-contador'>{contador.nombre}</h3>
                    </Stack>
                  </section>

                  <section className='botones-contador'>
                    <Stack direction='row' spacing="2rem" align='center'>
                      <Button className='boton-incrementar'  colorScheme='purple' variant='ghost'>
                         <AiOutlineMinus stroke-width="100" size={"3.5rem"} color={"white"} />
                      </Button>
                      <p className='numero-contador'>{contador.valor}</p>
                      <Button  className='boton-incrementar' colorScheme='purple' variant='ghost'>
                         <AiOutlinePlus stroke-width="100" size={"3.5rem"} color={"white"} />
                      </Button>
                    </Stack>
                  </section>
                </article>
              )
            })}
                      
                      
            

          </section>
        </main>

      </div>
    )
  
}

export default App
