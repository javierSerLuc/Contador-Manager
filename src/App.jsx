import { useState, useEffect } from 'react'
import './App.css'
import { Titulo } from './components/Titulo'
import { BotonADD } from './components/BotonADD'
import { BarraBusqueda } from './components/BarraBusqueda'

import { Spinner } from '@chakra-ui/react'
import { Button,Stack,Image } from '@chakra-ui/react'
import { MenuButton,Menu,MenuList,MenuItem,IconButton  } from '@chakra-ui/react'

import { BsList,BsTrash } from "react-icons/bs";
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

    setCargando(true);
    
    let url = "https://contador-manager-api.vercel.app/api/contador/listaContadores";
    let response = await fetch(url);
    let data = await response.json();
    setContadores(data.contadores.reverse());
    setCargando(false);
  };

  const incrementarContador = async (i,tipo) => {
    let url = "https://contador-manager-api.vercel.app/api/contador/";
    const opciones = {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      }
    }
    
    
    let contadoresTemp = [...contadores];
    

    if(tipo ==="decrementar" && i >= 0 && i < contadores.length){
      if(contadores[i].valor > 0){

        contadoresTemp[i].valor--;
        setContadores(contadoresTemp);

        url = url + "decrementar/" + contadores[i]._id;
        
      }
    

    }
    else{
        contadoresTemp[i].valor++;
        setContadores(contadoresTemp);

        url = url + "incrementar/" + contadores[i]._id;
        

    }
    let response = await fetch(url, opciones);

  }

  const borrarContador = async (i) => {
    

    let contadoresTemp = [...contadores];
    contadoresTemp.splice(i,1);
    
    

    let url = "https://contador-manager-api.vercel.app/api/contador/eliminar/" + contadores[i]._id;
    const opciones = {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }
    }
    setContadores(contadoresTemp);
    let response = await fetch(url, opciones);
    
  };



    return (
      <div className="App">
        <header className="app-header">
          <Titulo />
        </header>
        <main>
          <section className='tools'>
            <BotonADD fetchContadores={fetchContadores} />
            <BarraBusqueda />
          </section>
          <section className='lista-contadores'>
            {cargando ? <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>
            
            : contadores.map((contador, index) => {
              return (
                <article className='contador' key={index}>
                  <Menu className='opciones-contador'>
                    {/* <MenuButton className='opciones-contador' colorScheme='gray' variant='ghost'>
                       <BsList size={"2.5rem"} color={"gray"} />
                    </MenuButton> */}
                    <MenuButton className='opciones-contador' as={IconButton} aria-label='Options' icon={<BsList size={"2.5rem"} color={"gray"} />} variant='ghost'/>
                    <MenuList>
                      <MenuItem icon={<BsList color={"gray"}  />}><span className="item-opcion">Editar nombre</span></MenuItem>
                      <MenuItem onClick={() => borrarContador(index)} icon={<BsTrash color={"red"}   />}><span className="item-opcion">Borrar</span></MenuItem>
                      
                    </MenuList>
                  </Menu>
                  <ClearFix/>

                  <section className='datos-contador'>
                    <Stack direction='row' spacing="1rem" align='center'>
                    <Image boxSize='2rem' objectFit='cover' src={contador.emoji} />
                      <h3 className='titulo-contador'>{contador.nombre}</h3>
                    </Stack>
                  </section>

                  <section className='botones-contador'>
                    <Stack direction='row' spacing="2rem" align='center'>
                      <Button className='boton-incrementar'  colorScheme='purple' variant='ghost' onClick={()=>incrementarContador(index,"decrementar")}>
                         <AiOutlineMinus strokeWidth="100" size={"3.5rem"} color={"white"} />
                      </Button>
                      <p className='numero-contador'>{contador.valor}</p>
                      <Button  className='boton-incrementar' colorScheme='purple' variant='ghost' onClick={() => incrementarContador(index,"incrementar")}>
                         <AiOutlinePlus strokeWidth="100" size={"3.5rem"} color={"white"} />
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
