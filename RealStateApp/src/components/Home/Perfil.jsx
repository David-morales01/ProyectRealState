import React,{useEffect} from 'react' 
import {Box,Flex,Text,Input,FormControl,FormHelperText,FormLabel,Button,useColorModeValue} from '@chakra-ui/react'
import {FastField, Form, Formik} from 'formik' 
import Header from '../UI/Header/Header' 
import AuthStore from '../../Store/AuthStore' 
import RouteStore from '../../Store/RouteStore' 
import {useNavigate, Link,Navigate} from 'react-router-dom' 

export default function Perfil(){
    // Store 
    const user = AuthStore(state => state.user)
    const ChangeRoute = RouteStore(state => state.ChangeRoute) 
    const disable = false
    const status = AuthStore(state => state.status) 
    
    const navigate = useNavigate()  


    // Theme
    const errorText = useColorModeValue('color.errorLight', 'color.errorDark')
    const colorLink = useColorModeValue('color.linkLight', 'color.linkDark')
    const buttonColor = useColorModeValue('bg.buttonLight', 'bg.buttonDark') 
    const borderColor = useColorModeValue('color.borderLight', 'color.borderDark') 
    const shadowButton = useColorModeValue('#A0A0A0', '#0066cc') 
    const bgContainer = useColorModeValue('bg.containerLight', 'bg.containerDark')
    const bgborder = useColorModeValue('#f9cc1c,#eddc98,transparent 100%', '#facc14,#bb9f29,transparent 100%')

    useEffect(()=>{   
        ChangeRoute('perfil')
    },[])
    

    if(status == false){  
        return (
            <>
                <Navigate to="/"/> 
            </>
        )
    }
    
    if(user.id){
        return (
            <Flex w='100vw' h ='100vh' minW='360px' flexDirection='column'>
                <Header/> 
                <Flex h='100%'> 
                    <Flex align='center' w='400px'  >
                        <img src={`${import.meta.env.VITE_REACT_APP_ROUTE_IMAGE}/users/${user.img_user}`} />
                    </Flex>
                    <Box h='fit-content' border={`1px solid ${bgborder}`} mx='40px' mt='60px' px='40px' py='60px' bg={bgContainer}w='100%'>
                    <Formik
                        initialValues={{ 
                            name:user.name,
                            email:user.email,
                            password:user.password,
                        }}

                        validate={(values)=>{

                        let validateErrors ={}

                        if(!values.name){ 
                            validateErrors.name='Name is required. '
                        } 

                        if(!values.email){ 
                            validateErrors.email='Email is required. '
                        }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            validateErrors.email = 'Invalid email address';
                        }

                        if(!values.password){ 
                            validateErrors.password='Password is required. '
                        }else if(values.password.length <=9){
                            validateErrors.password='The password must contain at least 10 characters. '
                        }

                        return validateErrors
                        }}

                        onSubmit={values =>{console.log(values)}}
                        
                        >
                        {({errors,touched})=> (
                        <Form> 
                            <Text align='center' fontSize='24px'>Register</Text> 

                            <FormControl h='20' mb='8' isInvalid={errors.name && touched.name}> 
                                <FormLabel>Name</FormLabel>
                                <FastField  name="name"> 
                                {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='text' {...field}  autoComplete='off' />)}
                                </FastField>  
                                {touched.name && errors.name ? <Text my='2' fontSize="14px" color={errorText}>{errors.name} </Text> : ''}
                            </FormControl>

                            <FormControl h='20' my='8' isInvalid={errors.email && touched.email}> 
                                <FormLabel>Email address</FormLabel>
                                <FastField  name="email"> 
                                {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='email' {...field}  autoComplete='off' />)}
                                </FastField>  
                                {touched.email && errors.email ? <Text my='2' fontSize="14px" color={errorText}>{errors.email} </Text> : <FormHelperText > We'll never share your email</FormHelperText>}
                            </FormControl>

                            <FormControl h='20' my='8' isInvalid={errors.password && touched.password}>
                                <FormLabel>Password</FormLabel>
                                <FastField   name="password"> 
                                {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='password'  {...field} autoComplete='off'/>)}
                                </FastField>   
                                {touched.password && errors.password ? 
                                    <Text my='2' fontSize="14px" color={errorText}>{errors.password} </Text> :''
                                }  
                            </FormControl>    
                            {disable ? 
                                <Button  
                                    color='white' 
                                    bg={buttonColor} 
                                    isLoading
                                    _hover={{}}
                                    _active={{}}
                                    w='100%' type='button' mt='2px'>
                                </Button>: 
                                
                                <Button  
                                    color='white' 
                                    bg={buttonColor} 
                                    _hover={{ boxShadow:`0px 0px  10px ${shadowButton} `, }}
                                    _active={{}}
                                    w='100%' type='submit' mt='2px'>
                                    Register
                                </Button>
                                
                            } 
                            
                        </Form>
                        )}
                    </Formik> 
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