import React,{useEffect} from 'react' 
import {Flex,Box,useMediaQuery} from '@chakra-ui/react'
import {Navigate} from 'react-router-dom'
import Header from '../UI/Header/Header'
import Sidebar from '../UI/Sidebar/Sidebar' 
import MapBox from '../UI/MapBox/MapBox'   
import MapBoxError from '../UI/MapBox/MapBoxError'
import AuthStore from '../../Store/AuthStore' 
import MapStore from '../../Store/MapStore' 
import Spinner from '../UI/Spinner/Spinner'

export default function Home(){
    // Store
    const auth = AuthStore()
    const loading = AuthStore(state => state.loading) 
    const status = AuthStore(state => state.status) 
    const errorHttp = MapStore(state => state.errorHttp)
 
    useEffect(()=>{
        if(!loading){
            auth.validateUser()  
        }
    },[])
    
    
    // media query
    const [desktopView] = useMediaQuery('(min-width: 800px)') 

    
    if(!loading){
        return(
            <Flex  w='100vw' h ='100vh' minW='360' poaition='relative'>
                <Spinner/>
            </Flex>
        )
    }

    if(loading){  

        if(status){ 
            return (
                <Flex  w='100vw' h ='100vh' minW='360px' flexDirection='column'>
                    <Header/> 
                    <Flex w='100%' h='100%'> 
                        {desktopView?<Sidebar/>:''}
                        <Box position='relative' h='100%' w='100%' > 
                         {errorHttp ? <MapBoxError/> :<MapBox/>}
                        </Box>
                    </Flex>
                </Flex>
            )
        }else{
            
            return (
                <>
                    <Navigate to="/login"/> 
                </>
            ); 
        }
    }
}