import React from 'react'
import {Flex,Box,Button,Text,useColorModeValue,useMediaQuery} from '@chakra-ui/react'
import {HomeIcon,CommercialIcon,ApartmentIcon,VacantIcon} from '../Icons/Icons'  
import MapStore from '../../../Store/MapStore' 

export default function FilterButtonBusiness(){ 
    
    // media query
    const [desktopView] = useMediaQuery('(min-width: 800px)') 

    //Theme
    const iconColor= useColorModeValue('color.iconLight','color.iconDark')

    // store  
    const filterMap = MapStore((state) => state.filterMap) 
    const business = MapStore(state => state.filterValues.business_types_id) 
    return( 
        <> 
            <Box opacity={desktopView?'0':'1'} transition='0.5s' my='20px' w='120px' sx={{'.sidebarContent:hover &':{transition : '4s', opacity:'1'}}}>
                <Text fontSize='18px'>Property Type</Text>
            </Box>
            <Flex w='100%' className='itemButtons' rowGap='20px' justify='space-between' flexWrap='wrap'>
                <Flex><Button className={business==1? 'active':''}  onClick={()=>filterMap('business_types_id',1)}><HomeIcon fill={iconColor}/></Button></Flex> 
                <Flex><Button className={business==2? 'active':''}  onClick={()=>filterMap('business_types_id',2)}><CommercialIcon fill={iconColor}/></Button></Flex> 
                <Flex><Button className={business==3? 'active':''}  onClick={()=>filterMap('business_types_id',3)}><ApartmentIcon fill={iconColor}/></Button></Flex> 
                <Flex><Button className={business==4? 'active':''}  onClick={()=>filterMap('business_types_id',4)}><VacantIcon fill={iconColor}/></Button></Flex> 
            </Flex> 
        </>
 
    )
}