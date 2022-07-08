import React from 'react' 
import {Flex,useColorModeValue} from'@chakra-ui/react'
import {SearchIcon} from  '../Icons/Icons'

export default function InputSearch() {

    // theme colors
    const colorIcon = useColorModeValue('color.iconSearchLight', 'color.iconSearchDark')
         
    return ( 
        <Flex position='relative' w='100%'  alignItems='center' borderRadius='20px' h='30px' bg='#eff0f2'>
            <SearchIcon ml='16px' fill={colorIcon}/>
        </Flex>
    );
         
    
  }
 