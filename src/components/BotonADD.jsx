import React, { useState } from 'react'
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { useToast } from '@chakra-ui/react'

/* */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react"
import { FormControl,FormLabel,Input } from '@chakra-ui/react';
import { NumberIncrementStepper,NumberDecrementStepper,NumberInputStepper,NumberInputField,NumberInput } from '@chakra-ui/react';
import { useDisclosure} from '@chakra-ui/react'

/* */

export const BotonADD = ({fetchContadores}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [nombreContador, setNombreContador] = useState("");
  const [valorInicial, setValorInicial] = useState(0);

  const toast = useToast();



  const crearBoton = async () => {
    
    
    onClose();
    let vl = valorInicial;
    if(valorInicial < 0){
      vl = 0;
    }

    const opciones = {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: nombreContador,
        valor:vl
      })
    }

    try{
      const peticion = await fetch('https://contador-manager-api-javierserluc.vercel.app/api/contador/crear', opciones);
      fetchContadores();
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

    setNombreContador("");
    setValorInicial(0);

  }

  return (
    <>
    <Button className='boton-add' onClick={onOpen}>
      <HiOutlineDocumentPlus className='icono-add' size={"2.5rem"} />
      <h2 className='texto-add'>Nuevo Contador</h2>
    </Button>

    <Modal
        className='fuente-letra'
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='fuente-letra negrita'>Crear Contador</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel className='fuente-letra negrita-suave'>Nombre del contador</FormLabel>
              <Input className='fuente-letra' ref={initialRef} placeholder='Nombre' onChange={e => setNombreContador(e.currentTarget.value)} />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel className='fuente-letra negrita-suave'>Valor Inicial</FormLabel>
                <NumberInput className='fuente-letra' value={valorInicial} defaultValue={0} min={0} onChange={setValorInicial}>
                    <NumberInputField  />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                         </NumberInputStepper>
                </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' className='morado' onClick={crearBoton} mr={3}>
              Crear Contador
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

    
    
  )
}

