import React,{useEffect} from 'react' 
import {Flex,Box,useMediaQuery} from '@chakra-ui/react'
import {Navigate} from 'react-router-dom'
import Header from '../UI/Header/Header'
import Sidebar from '../UI/Sidebar/Sidebar' 
import MapBox from '../UI/MapBox/Map/MapBox'   
import MapBoxError from '../UI/Message/MapBoxError'
import AuthStore from '../../Store/AuthStore' 
import MapStore from '../../Store/MapStore' 
import RouteStore from '../../Store/RouteStore' 
import Spinner from '../UI/Spinner/Spinner'

export default function Home(){
    // Store
    const validateUser = AuthStore((state) => state.validateUser) 
    const status = AuthStore(state => state.status) 
    const errorHttp = MapStore(state => state.errorHttp) 
    const ChangeRoute = RouteStore(state => state.ChangeRoute) 
 
    useEffect(()=>{  
        validateUser()  
        ChangeRoute('home')
    },[])
    
    
    // media query
    const [desktopView] = useMediaQuery('(min-width: 800px)') 
 
    if(status== true){ 
        return (
            <Flex w='100vw' h ='100vh' minW='360px' flexDirection='column'>
                <Header/> 
                <Flex  h='100%'> 
                    {desktopView?<Sidebar/>:''}
                    <Box position='relative' h='100%' w='100%' > 
                        {errorHttp ? <MapBoxError/> :<MapBox/>}
                    </Box> 
                </Flex>
            </Flex>
        )
    }

    if(status == false){
        return (
            <>
                <Navigate to="/login"/> 
            </>
        ); 
    } 
    
    return(
        <Flex  w='100vw' h ='100vh' minW='360' poaition='relative'>
            <Spinner/>
        </Flex>
    )
}