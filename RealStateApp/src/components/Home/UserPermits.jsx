import React,{useEffect}  from 'react'  
import AuthStore from '../../Store/AuthStore' 
import {useNavigate} from 'react-router-dom'
import RouteStore from '../../Store/RouteStore'  
import Header from '../UI/Header/Header' 
import {Flex} from '@chakra-ui/react'

export default function UserPermits(){ 
    // Store 
    const user = AuthStore(state => state.user)
    const ChangeRoute = RouteStore(state => state.ChangeRoute)  
    const navigate = useNavigate()
    useEffect(()=>{   
        ChangeRoute('perfil') 
        
        if(user.rol != 'superAdmin'){  
            navigate("/")  
        } 
    },[])
    
    
   
     
    return (
        <Flex w='100vw' minH ='100vh' minW='360px' flexDirection='column'>
            <Header/> 
            
        </Flex>
    )

    
}