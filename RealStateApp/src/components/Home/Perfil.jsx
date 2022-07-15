import React,{useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {Flex,Box} from '@chakra-ui/react' 
import Header from '../UI/Header/Header' 
import AuthStore from '../../Store/AuthStore' 
import RouteStore from '../../Store/RouteStore' 

export default function Perfil(){
    // Store 
    const user = AuthStore(state => state.user)
    const ChangeRoute = RouteStore(state => state.ChangeRoute) 

    useEffect(()=>{   
        ChangeRoute('perfil')
    },[])
    
    if(user.id){
        return (
            <Flex w='100vw' h ='100vh' minW='360px' flexDirection='column'>
                <Header/> 
                <Box  h='100%'> 
                    {user.name}
                </Box>
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