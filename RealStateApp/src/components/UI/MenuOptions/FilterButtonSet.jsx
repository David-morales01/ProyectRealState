import React from 'react'
import {Box,Button,ButtonGroup,Text,useMediaQuery} from '@chakra-ui/react'
import MapStore from '../../../Store/MapStore'

export default function FilterButtonSet(){

    // media query
    const [desktopView] = useMediaQuery('(min-width: 800px)') 

    // store  
    const filterMap = MapStore((state) => state.filterMap)  
    return( 
        <Box opacity={desktopView?'0':'1'} transition='0.5s' my='20px' w='100%' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}>
            <Text fontSize='18px'>Property Room</Text>
            <Text my='14px' fontSize='14px'>Bedroom</Text>
            <ButtonGroup variant='outline' spacing='3'>
                <Button onClick={()=>filterMap('room',1)} >1</Button>
                <Button onClick={()=>filterMap('room',2)} >2</Button>
                <Button onClick={()=>filterMap('room',3)} >3</Button>
                <Button onClick={()=>filterMap('room',4)} >4</Button>
                <Button px={2} onClick={()=>filterMap('room',5)} >5+</Button>
            </ButtonGroup>
            <Text my='14px' fontSize='14px'>Bathroom</Text>
            <ButtonGroup variant='outline' spacing='3'>
                <Button onClick={()=>filterMap('toilet',1)} >1</Button>
                <Button onClick={()=>filterMap('toilet',2)} >2</Button>
                <Button onClick={()=>filterMap('toilet',3)} >3</Button>
                <Button onClick={()=>filterMap('toilet',4)} >4</Button>
                <Button px={2} onClick={()=>filterMap('toilet',5)} >5+</Button>
            </ButtonGroup>
        </Box>  
    )
}