import React from 'react'
import {Box,Text,RangeSlider,RangeSliderTrack,RangeSliderFilledTrack,RangeSliderThumb,useMediaQuery} from '@chakra-ui/react'
import MapStore from '../../../Store/MapStore' 

export default function FilterPrice(){ 

    // media query
    const [desktopView] = useMediaQuery('(min-width: 800px)') 

    // store  
    const filterMap = MapStore((state) => state.filterMap)  
    return(

        <>
            
            <Box opacity={desktopView?'0':'1'} transition='0.5s' my='20px' w='120px' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}>
                <Text fontSize='18px'>Your Budget</Text>
            </Box>
            <Box opacity={desktopView?'0':'1'} transition='0.5s' my='20px' w='100%' pl='10px' pr='20px' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}>
                <RangeSlider aria-label={['min', 'max']} max='10000' defaultValue={[0, 0]} /*onChangeEnd={(val) => filterMap('price',val) }*/ >
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
        </>
    )
}