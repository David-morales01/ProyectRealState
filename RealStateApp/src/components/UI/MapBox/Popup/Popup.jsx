import React from 'react'
import {Flex,Box,Text,Img} from '@chakra-ui/react'
import {ToiletIcon,RoomIcon} from '../../Icons/Icons'  



export default function Popup({marker}){
    const imageLength =  marker.images.length 
    return(
        <Box color='black' textAlign='center'>
            <Text marginBlock = '10px'>{marker.title}</Text>
            <Box position='relative' w='220px' h='220px' overflow= 'hidden' borderRadius='10px'> 
                <Box position='absolute' color='white' py='5px' px='8px' borderRadius='6px' zIndex={10} bg='#001AFF' insetInlineStart='10px'  insetBlockStart='10px'>
                    {marker.price}
                </Box>
               {imageLength > 0 ?
                    <Box position='relative' w='220px' h='220px' display='flex' className={`carousel${imageLength}`}> 
                        
                        {marker.images.map((item)=>{
                            return(

                                <Img position='relative' w='220px' h='226px' key={item.id} objectFit='cover'
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
                <Flex gap='20px' align='center' px='10px'>
                    <Flex gap='10px' align='center'><RoomIcon/>{marker.room}</Flex>
                    <Flex gap='10px' align='center'><ToiletIcon/>{marker.toilet}</Flex>
                </Flex>
            </Box> 
    )
}