import React,{useEffect} from 'react';
import {Box,Checkbox,Flex,Text,Input,FormControl,FormHelperText,FormLabel,useColorModeValue,Button} from '@chakra-ui/react';
import {FastField, Form, Formik} from 'formik'; 
import {useNavigate, Link,Navigate} from 'react-router-dom';  
import authStore from '../../../Store/AuthStore' 

export default function Register() {
    // theme colors
    const bgContainer = useColorModeValue('bg.containerLight', 'bg.containerDark');
    const bgBody = useColorModeValue('bg.light', 'bg.dark');
    const errorText = useColorModeValue('color.errorLight', 'color.errorDark');
    const colorLink = useColorModeValue('color.linkLight', 'color.linkDark');
    const iconColor = useColorModeValue('color.logoLight', 'color.logoDark');
    const buttonColor = useColorModeValue('bg.buttonLight', 'bg.buttonDark');
    // store
    const auth = authStore()  
    const status = authStore(state => state.status) 
    const disable = authStore(state => state.disabled)  
    const error = authStore(state => state.error)   
    // navigate :)
    const navigate = useNavigate()  
    // session validation
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token_real_state') 
       if(accessToken){   
            navigate('/')
       } 
    }, [])  

    
    
    if (!status) {   
        return ( 
            <Flex textAlign="center" minH='630px' position = 'relative' justifyContent='center' alignItems='center' minW='390' w='100vw'   h ='100vh' bg={bgBody} fontSize="xl">
                 
                <Box px='4' w='90%' maxW='400px'> 
                    <Box bg={bgContainer} align='left' px='30px' pt='4' pb='8' w='100%'  borderRadius='20px'>
                        <Formik
                            initialValues={{ 
                            email:'',
                            password:'',
                            }}

                            validate={(valores)=>{

                            let errores ={}; 
                            if(!valores.email){ 
                            errores.email='Email is required. ';
                            }
                            if(!valores.password){ 
                            errores.password='Password is required. ';
                            }else if(valores.password.length <=9){
                                errores.password='The password must contain at least 10 characters. ';
                            }
                            return errores;
                            }}

                            onSubmit={handleSubmit}
                            
                            >
                            {({errors,touched})=> (
                            <Form>
                                <Text  fontSize='16px' mt='4'>Welcome back.</Text> 
                                <Text  fontSize='24px' mt='4'>Enter yours details below.</Text> 

                                <FormControl h='20' my='8'>
                                <FormLabel>Email address</FormLabel>
                                <FastField  name="email"> 
                                {({field,meta})=>(<Input variant='filled' type='email' {...field} autoComplete='off' />)}
                                </FastField>  
                                {touched.email && errors.email ? <Text my='2' fontSize="14px" color={errorText}>{errors.email} </Text> : <FormHelperText > We'll never share your email</FormHelperText>}
                                </FormControl>

                                <FormControl h='20' my='8'>
                                <FormLabel>Password</FormLabel>
                                <FastField   name="password"> 
                                {({field,meta})=>(<Input variant='filled' type='password'  {...field} autoComplete='off'/>)}
                                </FastField>   
                                {touched.password && errors.password ? 
                                    <Text my='2' fontSize="14px" color={errorText}>{errors.password} </Text> :''
                                }  
                                </FormControl>

                                <FormControl>
                                    <Checkbox name='remember' colorScheme='green' >
                                        Remember me
                                    </Checkbox>  
                                </FormControl>  
                                {disable ? 
                                    <Button  
                                        color='white' 
                                        bg={buttonColor} 
                                        isLoading
                                        disabled={true}
                                        w='100%' type='button' mt='2px'>
                                    </Button>: 
                                    
                                    <Button  
                                        color='white' 
                                        bg={buttonColor} 
                                        w='100%' type='submit' mt='2px'>
                                        Log in
                                    </Button>
                                   
                                } {error?  <Text my='2' fontSize="14px" color={errorText}>Email or password invalid</Text> :''}
                                
                            </Form>
                            )}
                        </Formik>
                    </Box> 
                    <Flex  mt='4px' justifyContent='center'gap='4px'> 
                        <Text>Don't have an account? </Text>
                        <Text color ={colorLink} > <Link to="/register" > Sign Up</Link></Text>

                    </Flex>
                </Box> 
                 
            </Flex> 
             
        );
        
        async function handleSubmit(values, formikBag) { 
            auth.login(values)
        }
    }else{
        return (
            <>
                <Spinner />
                <Navigate to="/"/> 
            </>
        );
    }
}
 