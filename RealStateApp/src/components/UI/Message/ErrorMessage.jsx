import React,{useEffect} from 'react'
import {Alert, AlertIcon, AlertTitle,AlertDescription,useDisclosure,Box,Flex,useColorModeValue} from '@chakra-ui/react'
import AuthStore from '../../../Store/AuthStore'


export default function ErrorMessage({error}) {
    const {isOpen: isVisible,onClose,onOpen,} = useDisclosure({ defaultIsOpen: true })
    const ErrorClose = AuthStore(state => state.ErrorClose)
    const alert  = useColorModeValue('bg.alertLight', 'bg.alertDark') 
    useEffect(()=>{ 
        setTimeout (()=>{ 
            ErrorClose()
        },10000);
    },[])

    return isVisible ? (
        <Box position='absolute' inset='0'>
            <Alert status='error' bg={alert} >
                <Flex justifyContent='center' w='90%'>
                    <AlertIcon position='relative' />
                    
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Flex> 
            </Alert>
             
      </Box>
    ) : (
       ''
    )
    
  }