import React,{useEffect} from 'react'
import {Flex} from '@chakra-ui/react'
import {useNavigate,Navigate} from 'react-router-dom'
import Header from '../UI/Header/Header'
import Sidebar from '../UI/Sidebar/Sidebar' 
import MapBox from '../UI/MapBox/MapBox' 
import AuthStore from '../../Store/AuthStore' 

export default function Home(){
    const auth = AuthStore()

    useEffect(()=>{
        auth.validateUser()
    },[])
    
    const loading = AuthStore(state => state.loading) 
    const status = AuthStore(state => state.status) 
    
    if(loading){  

        if(status){ 
            return (
                <Flex  w='100vw' h ='100vh' minW='360' flexDirection='column'>
                    <Header/> 
                    <Flex w='100%' h='100%'> 
                        <Sidebar/>
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
    }else{
        
        return(
            <>Cargando</>
        )

    }
}