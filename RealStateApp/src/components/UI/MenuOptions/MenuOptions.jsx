import React from 'react'
import {Flex,Box,Text,RangeSlider,RangeSliderTrack,RangeSliderFilledTrack,RangeSliderThumb,useColorModeValue,useMediaQuery} from '@chakra-ui/react'
import {HomeIcon,CommercialIcon,ApartmentIcon,VacantIcon} from '../Icons/Icons' 
import InputSearch from '../InputSearch/InputSearch'
import {ColorModeSwitcher} from '../ColorModeSwitcher/ColorModeSwitcher'

export default function MenuOptions(){

    
    // media query
    const [desktopView] = useMediaQuery('(min-width: 800px)') 

    //Theme
    const iconColor= useColorModeValue('color.iconLight','color.iconDark')

    return(
        <Box> 
            <InputSearch/>

            <Box opacity={desktopView?'0':'1'} transition='1s' my='20px' w='120px' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}>
                <Text fontSize='18px'>Property Type</Text>
            </Box>
            <Flex w='100%' rowGap='20px' justify='space-between' flexWrap='wrap'>
                <Flex justify='center' minW='45px' w='40%'><HomeIcon fill={iconColor}/></Flex> 
                <Flex justify='center' minW='45px' w='40%'><CommercialIcon fill={iconColor}/></Flex> 
                <Flex justify='center' minW='45px' w='40%'><ApartmentIcon fill={iconColor}/></Flex> 
                <Flex justify='center' minW='45px' w='40%'><VacantIcon fill={iconColor}/></Flex> 
            </Flex>
            <Box opacity={desktopView?'0':'1'} transition='1s' my='20px' w='120px' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}>
                <Text fontSize='18px'>Your Budget</Text>
            </Box>
            <Box opacity={desktopView?'0':'1'} transition='1s' my='20px' w='100%' px='10px' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}>
                <RangeSlider aria-label={['min', 'max']} max='10000' defaultValue={[0, 10000]} onChangeEnd={(val) => console.log(val)} >
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
            <Box opacity={desktopView?'0':'1'} transition='1s' my='20px' w='120px' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}>
                <Text fontSize='18px'>Property Room</Text>
            </Box>
            <ColorModeSwitcher/>
        </Box>
    )
}