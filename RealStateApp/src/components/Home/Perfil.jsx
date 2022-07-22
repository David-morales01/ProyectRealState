import React,{useEffect,useState} from 'react' 
import {Box,Flex,Text,Input,FormControl,FormHelperText,FormLabel,Button,useColorModeValue,useMediaQuery} from '@chakra-ui/react'
import {FastField, Form, Formik} from 'formik' 
import Header from '../UI/Header/Header' 
import AuthStore from '../../Store/AuthStore' 
import RouteStore from '../../Store/RouteStore' 
import {Navigate,useNavigate} from 'react-router-dom'
import * as Yup from 'yup' 

export default function Perfil(){
    // Store 
    const user = AuthStore(state => state.user)
    const ChangeRoute = RouteStore(state => state.ChangeRoute)  
    const disable = AuthStore(state => state.disabled) 
    const status = AuthStore(state => state.status) 
    const editPerfil = AuthStore((state) => state.editPerfil)

    // Other Hooks 
    const [userImage, setUserImage]= useState(`${import.meta.env.VITE_REACT_APP_ROUTE_IMAGE}/users/${user.img_user}`)

    // Theme
    const errorText = useColorModeValue('color.errorLight', 'color.errorDark') 
    const buttonColor = useColorModeValue('bg.buttonLight', 'bg.buttonDark') 
    const borderColor = useColorModeValue('color.borderLight', 'color.borderDark') 
    const shadowButton = useColorModeValue('#A0A0A0', '#0066cc') 
    const bgContainer = useColorModeValue('bg.containerLight', 'bg.containerDark') 
    const navigate = useNavigate()

    // Yup
    const validate  = Yup.object({
        name:Yup.string().required("Name is required."),
        email:Yup.string().email("Invalid email address.").required("Password is required."),
        password:Yup.string().min(10,'The password must contain at least 10 characters.'),
        image:Yup.string()
    })
    
    // media query
    const [desktopView] = useMediaQuery('(min-width: 800px)') 
    
    useEffect(()=>{   
        ChangeRoute('perfil') 
        
        if(!user.id){  
            navigate("/")  
        } 
    },[])
    
    function changeImage(file){
        const reader = new  FileReader()
        reader.readAsDataURL(file)
        reader.onload=()=>{
            setUserImage(reader.result)
        }
    }

    
    if(!user){
        return (
            <>
                <Navigate to="/login"/> 
            </>
        ); 
    }  
        return (
            <Flex w='100vw' minH ='100vh' minW='360px' flexDirection='column'>
                <Header/> 
                <Flex h='100%' flexWrap='wrap' my={desktopView?'10px':'30px'} justify='center'> 
                    <Flex align='center' mx='40px' w='400px'  >
                        <img src={userImage} />
                    </Flex>
                    <Box h='fit-content'  overflow='hidden' borderColor={borderColor} borderWidth= '1px' bg={bgContainer} mx='40px' mt='60px' px='40px' py='60px' maxW='700px' w='100%' borderRadius='20px'>
                    <Formik
                        initialValues={{ 
                            id:user.id,
                            name:user.name,
                            email:user.email,
                            password:'',
                            img_user:user.img_user,
                        }}

                        validationSchema={validate}

                        onSubmit={values =>{editPerfil(values)}}
                        
                        >
                        {({errors,touched,setFieldValue})=> (
                        <Form> 
                            <Text align='center' fontSize='24px'>My perfil</Text> 

                            <FormControl h='80px' mb='8' isInvalid={errors.name && touched.name}> 
                                <FormLabel>Name</FormLabel>
                                <FastField  name="name"> 
                                {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='text' {...field}  autoComplete='off' />)}
                                </FastField>  
                                {touched.name && errors.name ? <Text my='2' fontSize="14px" color={errorText}>{errors.name} </Text> : ''}
                            </FormControl>

                            <FormControl h='80px' my='8' isInvalid={errors.email && touched.email}> 
                                <FormLabel>Email address</FormLabel>
                                <FastField  name="email"> 
                                {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='email' {...field}  autoComplete='off' />)}
                                </FastField>  
                                {touched.email && errors.email ? <Text my='2' fontSize="14px" color={errorText}>{errors.email} </Text> : <FormHelperText > We'll never share your email</FormHelperText>}
                            </FormControl> 

                            <FormControl h='80px' my='8' isInvalid={errors.password && touched.password}>
                                <FormLabel>Password</FormLabel>
                                <FastField   name="password"> 
                                {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='password'  {...field} autoComplete='off'/>)}
                                </FastField>   
                                {touched.password && errors.password ? 
                                    <Text my='2' fontSize="14px" color={errorText}>{errors.password} </Text> :''
                                }  
                            </FormControl> 
                            <FormControl h='120px' isInvalid={errors.img_user && touched.img_user}> 
                            <FormLabel>Image</FormLabel> 
                                <input type='file' name="img_user" 
                                
                                onChange={(e) => {
                                setFieldValue("img_user", e.currentTarget.files[0])  
                                changeImage(e.currentTarget.files[0])
                                }}/>
                                
                                {touched.img_user && errors.img_user ? 
                                    <Text my='2' fontSize="14px" color={errorText}>{errors.img_user} </Text> :
                                    <FormHelperText >Select your favorite image</FormHelperText>
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
                                    Save
                                </Button>
                                
                            } 
                            
                        </Form>
                        )}
                    </Formik> 
                    </Box>
                </Flex>
            </Flex>
        ) 
}