import React from 'react'
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { useToast } from '@chakra-ui/react'

export const BotonADD = () => {

  const toast = useToast();

  const crearBoton = async () => {

    const opciones = {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: 'Contador-Prueba',
      })
    }

    try{
      const peticion = await fetch('https://contador-manager-api-javierserluc.vercel.app/api/contador/crear', opciones);
      return(
      toast({
        title: "Contador creado",
        description: "Se ha creado un nuevo contador",
        status: "success",
        duration: 5000,
        isClosable: true
      })
      )
    }
    catch(error){
      console.log('BotonADD: crearBoton: error: ', error);
      toast({
        title: "Error al crear contador",
        description: "No se ha podido crear el contador",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }

  }

  return (
    <button className='boton-add' onClick={crearBoton}>
      <HiOutlineDocumentPlus className='icono-add' size={"2.5rem"} />
      <h2 className='texto-add'>Nuevo Contador</h2>
    </button>
    
  )
}

