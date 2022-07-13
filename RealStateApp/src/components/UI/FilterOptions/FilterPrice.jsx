import React,{useState,useRef} from 'react'
import {Flex,Box,Text,RangeSlider,RangeSliderTrack,RangeSliderFilledTrack,RangeSliderThumb,useMediaQuery,useColorModeValue} from '@chakra-ui/react'
import MapStore from '../../../Store/MapStore' 

export default function FilterPrice(){ 

    // media query
    const [desktopView] = useMediaQuery('(min-width: 800px)')
    
    // Ref
    const minPrice = useRef(0)
    const maxPrice = useRef(0)
    const [values,SetValues]= useState(null)
    const bgSlider = useColorModeValue('bg.SliderLight','bg.SliderDark')
    const bgRangeSlider= useColorModeValue('bg.RangeSliderLight','bg.RangeSliderDark')
    const bgRangeSliderThumb= useColorModeValue('bg.RangeSliderThumbLight','bg.RangeSliderThumbDark')

    // store  
    const filterMap = MapStore((state) => state.filterMap)  
    return(

        <>
            
            <Box opacity={desktopView?'0':'1'} transition='0.5s' my='20px' w='120px' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}>
                <Text fontSize='18px'>Your Budget</Text>
            </Box>
            <Box h='70px' opacity={desktopView?'0':'1'} transition='0.5s' my='20px' w='100%' pl='10px' pr='20px' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}>
                <RangeSlider aria-label={['min', 'max']} max='10000' defaultValue={[0, 0]} onChangeEnd={(val) => sendValue(val) } >
                    <RangeSliderTrack bg={bgSlider}>
                        <RangeSliderFilledTrack bg={bgRangeSlider} />
                    </RangeSliderTrack>
                    <RangeSliderThumb boxSize={6} bg={bgRangeSliderThumb} index={0}>
                        <Box></Box>
                    </RangeSliderThumb>
                    <RangeSliderThumb boxSize={6} bg={bgRangeSliderThumb} index={1}>
                        <Box></Box>
                    </RangeSliderThumb>
                </RangeSlider>
                {values? <Flex justify='center' my='10px'><Box mr='10px'>MIN : ${values[0]}</Box>,<Box ml='10px'>MAX : ${values[1]}</Box></Flex> :''}
            </Box> 
        </>
    )
    function sendValue(val){ 
        if(val[0] != minPrice.current || val[1] != maxPrice.current){
            
            minPrice.current=val[0]
            maxPrice.current=val[1]
            SetValues(val)
            
            if(val[0] == 0 && val[0]==0){
                filterMap('price',[null,null])

            }else{
                filterMap('price',val)
            }

        } 
    }
}