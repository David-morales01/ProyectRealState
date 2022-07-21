import React from 'react'
import {Box,Text} from '@chakra-ui/react'
import {ToiletIcon,RoomIcon} from '../Icons/Icons'  


export default function Popup({marker}){
    const imageLength =  marker.images.length 
    return(
        <Box>
            <Text marginBlock = '10px'>{marker.title}</Text>
            <Box w='200px' h='200px' overflow= 'hidden' borderRadius='10px'> 
               {imageLength > 0 ?
                    <Box position='relative' w='200px' h='200px' display='flex' className={`carousel${imageLength}`}> 
                        {marker.images.map((item)=>{
                            return(

                                <img   
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
                <Flex gap='10px' >
                    <Box><RoomIcon/>{marker.room}</Box>
                    <Box><ToiletIcon/>{marker.toilet}</Box>
                </Flex>
            </Box> 
    )
}