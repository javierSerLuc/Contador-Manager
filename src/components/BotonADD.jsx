import React from 'react'
import { HiOutlineDocumentPlus } from "react-icons/hi2";

export const BotonADD = () => {
  return (
    <button className='boton-add'>
      <HiOutlineDocumentPlus className='icono-add' size={"2.5rem"} />
      <h2 className='texto-add'>Nuevo Contador</h2>
    </button>
  )
}
