import React from 'react'
import {Flex,useColorModeValue} from'@chakra-ui/react'
import MenuOptions from '../MenuOptions/MenuOptions' 

export default function Sidebar(){

    const bgSidebar = useColorModeValue('bg.sidebarLight', 'bg.sidebarDark') 

    return ( 
        <Flex position='relative' h='100%' w='70px'  opacity='0.4' transition='1s' className='sidebarContent' overflow='hidden' bg={bgSidebar} flexDirection='column' _hover={{ transition : '2s', width:'400px', opacity:'1'}}> 
           <MenuOptions/> 
       </Flex>  
    )
}


