import React from 'react' 
import {Flex,useColorModeValue,Input,useMediaQuery} from'@chakra-ui/react'
import {SearchIcon} from  '../Icons/Icons'
 import MapStore from '../../../Store/MapStore' 

export default function InputSearch() {

    // media query
    const [desktopView] = useMediaQuery('(min-width: 800px)') 
    // theme colors
    const colorIcon = useColorModeValue('color.iconSearchLight', 'color.iconSearchDark')
    // store  
    const filterMap = MapStore((state) => state.filterMap)  
         
    return ( 
        <Flex position='relative' w='100%'  alignItems='center' borderRadius='20px' h='30px' bg='#eff0f2'>
            <SearchIcon mx='16px' fill={colorIcon}/> 
            <Input type='text' color='black' border='0px' variant='unstyled'  position='relative' autoComplete='off' onChange={ev=> filterMap('title',ev.target.value)} opacity={desktopView?'0':'1'} transition='0.5s' my='20px' w='90%' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}/>
        </Flex>
    );
  }
 