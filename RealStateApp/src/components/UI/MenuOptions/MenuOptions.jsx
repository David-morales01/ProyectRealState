import React from 'react'
import {Box} from '@chakra-ui/react'
import InputSearch from '../FilterOptions/InputSearch'
import FilterButtonSet from '../FilterOptions/FilterButtonSet'
import FilterButtonBusiness from '../FilterOptions/FilterButtonBusiness'
import FilterPrice from '../FilterOptions/FilterPrice'

export default function MenuOptions(){ 
 
    return(

        <Box  position='absolute' insetInline='0' insetBlockStart='20px' w='100%' h='100%'  px='10px' py='10px' overflow='hidden' sx={{
            '.itemButtons>div':{
                justify:'center', minW:'45px' ,w:'40%' 
            },
            '.itemButtons>div>button':{
                w:'100%',
                h:'60px', 
            },
            '.itemButtons>div>button:hover':{
                bg:'#3347D2',
                color:'#ffffff',
            }, 
            '.active':{
                bg:'#3347D2',
                color:'#ffffff',
            },
            '.active>svg':{
                fill:'#ffffff',
            },
            '.ButtonGroup button:hover':{
                bg:'#3347D2',
                color:'#ffffff',

            }

                
        }}> 
            <InputSearch/>

            <FilterButtonBusiness/>
            
            <FilterPrice/>

            <FilterButtonSet/>
        </Box>
    )
}