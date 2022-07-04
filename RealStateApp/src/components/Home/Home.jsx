import React,{useEffect} from 'react' 
import {Flex,useMediaQuery} from '@chakra-ui/react'
import {Navigate} from 'react-router-dom'
import Header from '../UI/Header/Header'
import Sidebar from '../UI/Sidebar/Sidebar' 
import MapBox from '../UI/MapBox/MapBox' 
import AuthStore from '../../Store/AuthStore' 
import Spinner from '../UI/Spinner/Spinner'

export default function Home(){
    // Store
    const auth = AuthStore()
    const loading = AuthStore(state => state.loading) 
    const status = AuthStore(state => state.status) 
 
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
                         <MapBox/>
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