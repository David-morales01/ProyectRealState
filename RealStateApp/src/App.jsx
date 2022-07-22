import React from 'react'
import {Routes, Route,useRoutes} from 'react-router-dom' 
import { ChakraProvider} from '@chakra-ui/react' 
import Home from './components/Home/Home'   
import Perfil from './components/Home/Perfil' 
import UserPermits from './components/Home/UserPermits' 
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'    
 import Theme from './Theme/Theme.js'

 export default function App() {
  return ( 
  <ChakraProvider theme ={Theme}>
    <Routes>
      <Route element ={<Home/>} path="/" />
      <Route element ={<Perfil/>} path="perfil" /> 
      <Route element ={<UserPermits/>} path="userPermits" /> 
      <Route element ={<Login/>} path="login" />
      <Route element ={<Register/>} path="register" /> 
    </Routes>
    
  </ChakraProvider>  
  );
}

