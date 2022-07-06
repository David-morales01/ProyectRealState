import React from 'react'
import MapStore from '../../../Store/MapStore'
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,Button} from '@chakra-ui/react'

export default function FormMarker() {
  
  // Store
  const mapStore = MapStore()
  const coordinate = MapStore(state => state.coordinate)

  return (  
      <Modal closeOnOverlayClick={false} isOpen={true}  >
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          
          <ModalBody pb={6}> 
          </ModalBody>
                {coordinate}
          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={close}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> 
  )
  
  function close(){
    mapStore.ModalCoordinateClose()
  }
}