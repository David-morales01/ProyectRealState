import React from 'react'
import {Flex,Box,Text,Img} from '@chakra-ui/react'
import {ToiletIcon,RoomIcon} from '../../Icons/Icons'  



export default function Popup({marker}){
    const imageLength =  marker.images.length 
    return(
        <Box color='black' textAlign='center'>
            <Text marginBlock = '10px'>{marker.title}</Text>
            <Box w='220px' h='200px' overflow= 'hidden' borderRadius='10px'> 
               {imageLength > 0 ?
                    <Box position='relative' w='100%' h='100%' display='flex' className={`carousel${imageLength}`}> 
                        {marker.images.map((item)=>{
                            return(

                                <Img position='relative' w='100%' h='100%' key={item.id}
                                src={`${import.meta.env.VITE_REACT_APP_ROUTE_STORAGE}/${item.src_img}`}/>
                            )
                        })}
                    </Box>:
                <Box className='defaultImage'></Box>
                }
                </Box>
                <Box my='10px'>
                {marker.description} 
                </Box>
                <Flex gap='20px' align='center' >
                    <Flex gap='10px' align='center'><RoomIcon/>{marker.room}</Flex>
                    <Flex gap='10px' align='center'><ToiletIcon/>{marker.toilet}</Flex>
                </Flex>
            </Box> 
    )
}