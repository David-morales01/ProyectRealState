import React from 'react'
import {Flex,Box,useColorModeValue,Text} from '@chakra-ui/react'

export default function Header(){
    

    // theme colors
    const bgHeader = useColorModeValue('bg.headerLight', 'bg.headerDark')
    return (
        <Flex  bg={bgHeader} w='100%' h='90px' justifyContent='space-between' alignItems='center' px='30px'>
            <Box h='40px' >
                <Text position='relative' insetBlock='-12px' fontSize='40px' fontWeight='bold'>
                    Real Estate
                </Text>
            </Box> 
            <Box >Real Estate</Box>
        </Flex>
    )
}