import React from 'react'
import {Box} from '@chakra-ui/react'
import InputSearch from '../InputSearch/InputSearch'
import FilterButtonSet from './FilterButtonSet'
import FilterButtonBusiness from './FilterButtonBusiness'
import FilterPrice from './FilterPrice'

export default function MenuOptions(){ 
 
    return(

        <Box  position='absolute' insetInline='0' insetBlockStart='20px' w='100%' h='100%'  px='10px' py='10px' overflow='hidden' sx={{
            '.itemButtons>div':{
                justify:'center', minW:'45px' ,w:'40%' 
            },'.itemButtons>div>button':{
                bg:'none' 
            }
        }}> 
            <InputSearch/>

            <FilterButtonBusiness/>
            
            <FilterPrice/>

            <FilterButtonSet/>
        </Box>
    )
}