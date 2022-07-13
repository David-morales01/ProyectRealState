import React from 'react'
import {Box,Button,ButtonGroup,Text,useMediaQuery} from '@chakra-ui/react'
import MapStore from '../../../Store/MapStore'

export default function FilterButtonSet(){

    // media query
    const [desktopView] = useMediaQuery('(min-width: 800px)') 

    // store  
    const filterMap = MapStore((state) => state.filterMap) 
    const bedroom = MapStore(state => state.filterValues.room) 
    const bathroom = MapStore(state => state.filterValues.toilet)  
    return( 
        <Box opacity={desktopView?'0':'1'} transition='0.5s' my='20px' w='100%' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}>
            <Text fontSize='18px'>Property Room</Text>
            <Text my='14px' fontSize='14px'>Bedroom</Text>
            <ButtonGroup variant='outline' spacing='3'>
                <Button className={bedroom==1? 'active':''} onClick={()=>filterMap('room',1)} >1</Button>
                <Button className={bedroom==2? 'active':''} onClick={()=>filterMap('room',2)} >2</Button>
                <Button className={bedroom==3? 'active':''} onClick={()=>filterMap('room',3)} >3</Button>
                <Button className={bedroom==4? 'active':''} onClick={()=>filterMap('room',4)} >4</Button>
                <Button className={bedroom==5? 'active':''}  onClick={()=>filterMap('room',5)} px={2}>5+</Button>
            </ButtonGroup>
            <Text my='14px' fontSize='14px'>Bathroom</Text>
            <ButtonGroup variant='outline' spacing='3'>
                <Button className={bathroom==1? 'active':''} onClick={()=>filterMap('toilet',1)} >1</Button>
                <Button className={bathroom==2? 'active':''} onClick={()=>filterMap('toilet',2)} >2</Button>
                <Button className={bathroom==3? 'active':''} onClick={()=>filterMap('toilet',3)} >3</Button>
                <Button className={bathroom==4? 'active':''} onClick={()=>filterMap('toilet',4)} >4</Button>
                <Button className={bathroom==5? 'active':''} onClick={()=>filterMap('toilet',5)} px={2} >5+</Button>
            </ButtonGroup>
        </Box>  
    )
}