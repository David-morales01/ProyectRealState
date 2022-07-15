import React,{useEffect} from 'react'
import {Alert, AlertIcon, AlertTitle,AlertDescription,useDisclosure,Box,Flex,useColorModeValue} from '@chakra-ui/react'
import MapStore from '../../../Store/MapStore'


export default function ErrorMessage({error}) {
    const {isOpen: isVisible,onClose,onOpen,} = useDisclosure({ defaultIsOpen: true })
    const ErrorClose = MapStore(state => state.ErrorClose)
    const alert  = useColorModeValue('bg.alertLight', 'bg.alertDark') 
    useEffect(()=>{ 
        setTimeout (()=>{ 
            ErrorClose()
        },6000);
    },[])

    return isVisible ? (
        <Box position='absolute' inset='0'>
            <Alert status='warning' bg={alert} >
                <Flex justifyContent='center' w='90%'>
                    <AlertIcon position='relative' />
                    
                    <AlertTitle> No markers Available</AlertTitle>
                    <AlertDescription>
                       
                    </AlertDescription>
                </Flex> 
            </Alert>
             
      </Box>
    ) : (
       ''
    )
    
  }