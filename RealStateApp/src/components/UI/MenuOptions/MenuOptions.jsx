import React,{useState,useEffect} from 'react'
import {Flex,Box,Button,ButtonGroup,Text,RangeSlider,RangeSliderTrack,RangeSliderFilledTrack,RangeSliderThumb,useColorModeValue,useMediaQuery} from '@chakra-ui/react'
import {HomeIcon,CommercialIcon,ApartmentIcon,VacantIcon} from '../Icons/Icons' 
import InputSearch from '../InputSearch/InputSearch' 
import MapStore from '../../../Store/MapStore'

export default function MenuOptions(){

    
    // media query
    const [desktopView] = useMediaQuery('(min-width: 800px)') 

    //Theme
    const iconColor= useColorModeValue('color.iconLight','color.iconDark')

    // store  
    const filterMap = MapStore((state) => state.filterMap)  
    return(

        <Box position='absolute' inset='0' w='100%' h='100%'  px='10px' py='10px' overflow='hidden' sx={{
            '.itemButtons>div':{
                justify:'center', minW:'45px' ,w:'40%' 
            },'.itemButtons>div>button':{
                bg:'none' 
            }
        }}> 
            <InputSearch/>

            <Box opacity={desktopView?'0':'1'} transition='0.5s' my='20px' w='120px' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}>
                <Text fontSize='18px'>Property Type</Text>
            </Box>
            <Flex w='100%' className='itemButtons' rowGap='20px' justify='space-between' flexWrap='wrap'>
                <Flex><Button onClick={()=>filterMap('business_types_id',1)}><HomeIcon fill={iconColor}/></Button></Flex> 
                <Flex><Button onClick={()=>filterMap('business_types_id',2)}><CommercialIcon fill={iconColor}/></Button></Flex> 
                <Flex><Button onClick={()=>filterMap('business_types_id',3)}><ApartmentIcon fill={iconColor}/></Button></Flex> 
                <Flex><Button onClick={()=>filterMap('business_types_id',4)}><VacantIcon fill={iconColor}/></Button></Flex> 
            </Flex>
            <Box opacity={desktopView?'0':'1'} transition='0.5s' my='20px' w='120px' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}>
                <Text fontSize='18px'>Your Budget</Text>
            </Box>
            <Box opacity={desktopView?'0':'1'} transition='0.5s' my='20px' w='100%' pl='10px' pr='20px' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}>
                <RangeSlider aria-label={['min', 'max']} max='10000' defaultValue={[0, 0]} onChangeEnd={(val) => filterMap('price',val) } >
                    <RangeSliderTrack bg='red.100'>
                        <RangeSliderFilledTrack bg='tomato' />
                    </RangeSliderTrack>
                    <RangeSliderThumb boxSize={6} index={0}>
                        <Box color='tomato' ></Box>
                    </RangeSliderThumb>
                    <RangeSliderThumb boxSize={6} index={1}>
                        <Box color='tomato' ></Box>
                    </RangeSliderThumb>
                </RangeSlider>
            </Box>
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
        </Box>
    )
}