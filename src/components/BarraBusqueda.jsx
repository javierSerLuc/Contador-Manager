import React from 'react'
import { HiOutlineSearch } from "react-icons/hi";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"

export const BarraBusqueda = () => {
    return (
        <article className='container-busqueda'>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<HiOutlineSearch className='icono-lupa' size={"2.5rem"} />}
                />
                <Input type='tel' placeholder='Busca por nombre, categoría...' className='barra-busqueda' />
            </InputGroup>


            
        </article>
    )
}
