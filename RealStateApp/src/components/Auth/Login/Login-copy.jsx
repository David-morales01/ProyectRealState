import React,{useEffect} from 'react'
import {Box,Checkbox,Flex,Text,Input,FormControl,FormHelperText,FormLabel,useColorModeValue,Button} from '@chakra-ui/react'
import {FastField, Form, Formik} from 'formik' 
import {useNavigate, Link,Navigate} from 'react-router-dom' 
import {ColorModeSwitcher} from '../../UI/ColorModeSwitcher/ColorModeSwitcher' 
import authStore from '../../../Store/AuthStore' 

export default function Register() {
    // theme colors
    const bgContainer = useColorModeValue('bg.containerLight', 'bg.containerDark')
    const bgBody = useColorModeValue('bg.bodyLight', 'bg.bodyDark')
    const errorText = useColorModeValue('color.errorLight', 'color.errorDark')
    const colorLink = useColorModeValue('color.linkLight', 'color.linkDark')
    const buttonColor = useColorModeValue('bg.buttonLight', 'bg.buttonDark')
    const shadow= useColorModeValue('#2069B2', '#5142FC')
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
            <Flex minH='630px' minW='360' w='100vw' h ='100vh' justifyContent='center' alignItems='center'  bg={bgBody} fontSize="xl">
                <ColorModeSwitcher position='absolute' insetInlineEnd='10px' insetBlockStart='10px'  />
                <Box w='90%' maxW='400px'> 
                    <Box bg={bgContainer}   px='30px' pt='4' pb='8' w='100%'  borderRadius='20px' boxShadow={`0px 0px 10px ${shadow}`}>
                        <Formik
                            initialValues={{ 
                            email:'',
                            password:'',
                            }}

                            validate={(valores)=>{

                            let errores ={} 
                            if(!valores.email){ 
                            errores.email='Email is required. '
                            }
                            if(!valores.password){ 
                            errores.password='Password is required. '
                            }else if(valores.password.length <=9){
                                errores.password='The password must contain at least 10 characters. '
                            }
                            return errores
                            }}

                            onSubmit={handleSubmit}
                            
                            >
                            {({errors,touched})=> (
                            <Form> 
                                <Text  fontSize='24px' mt='4'>Login</Text> 

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
                                    <Checkbox name='remember'>
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
                <Navigate to="/"/> 
            </>
        );
    }
}
 