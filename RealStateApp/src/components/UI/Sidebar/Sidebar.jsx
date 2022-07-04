import React from 'react'
import {Flex,useColorModeValue} from'@chakra-ui/react'
import MenuOptions from '../MenuOptions/MenuOptions' 

export default function Sidebar(){

    const bgSidebar = useColorModeValue('bg.sidebarLight', 'bg.iconDark') 

    return ( 
        <Flex w='70px' px='10px' opacity='0.4' transition='1s' className='sidebarContent' overflow='hidden' py='10px' bg={bgSidebar} flexDirection='column' flexWrap='no-wrap' _hover={{ transition : '2s', width:'400px', opacity:'1'}}> 
           
           <MenuOptions/>
       </Flex>  
    )
}


