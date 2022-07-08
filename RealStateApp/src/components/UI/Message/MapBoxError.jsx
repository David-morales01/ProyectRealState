import React,{useEffect} from 'react'
import {Flex,Text} from '@chakra-ui/react' 
import MapStore from '../../../Store/MapStore'

export default function MapBoxError(){
    const mStore = MapStore()

    useEffect(()=>{
        setTimeout(()=>{ 
            mStore.reloadComponent()
            console.log('reload')
        }, 6000);
    },[])
    return(
        <Flex align='center' justify='center' position='absolute' inset='0' w='100%' h='100%' bg='rgba(0, 0, 0, 0.35)'>
            <Text> loading error, please wait</Text>
        </Flex>
    )
}