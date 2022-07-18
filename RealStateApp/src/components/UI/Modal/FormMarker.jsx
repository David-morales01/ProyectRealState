import React from 'react'
import MapStore from '../../../Store/MapStore'
import {Flex,Select,useColorModeValue,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,FormControl,FormLabel,Input,Button,Text,FormHelperText} from '@chakra-ui/react'
import {FastField, Form, Formik} from 'formik'
import * as Yup from 'yup'  

export default function FormMarker() {
  
  // Store
  const ModalCoordinateClose = MapStore((state) => state.modalCoordinateClose)
  const saveCoordinate = MapStore((state) => state.saveCoordinate)
  const coordinate = MapStore(state => state.coordinate) 
  const disable = MapStore(state => state.disable) 
  // Yup
  const validate  = Yup.object({
    title:Yup.string().required('Title is required.'),
    description:Yup.string().required('Description is required.'),
    room:Yup.number().required('The number of rooms must be greater than 0'),
    toilet:Yup.number().required('The number of toilet must be greater than 0'),
    price:Yup.number().required('Price must be greater than 0.'),
    long:Yup.number().required('Longitude is required. '),
    lat:Yup.number().required('Latitude is required. '),
    business_types_id:Yup.number().min(1,'Business Type is required.').required('Business Type is required.'),
    images:Yup.string().required('At least one image is required.'),
    
  })
  // Theme
  const errorText = useColorModeValue('color.errorLight', 'color.errorDark')
  const shadowButton = useColorModeValue('#A0A0A0', '#0066cc') 
    
  return (  
      <Modal closeOnOverlayClick={false} isOpen={true} scrollBehavior='inside'>
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(4px) hue-rotate(30deg)' /> 
        <ModalContent>
          <ModalHeader fontSize='26px' align='center'>Create new marker</ModalHeader>
            <ModalBody  px={10}> 
              <Formik
                initialValues={{ 
                  title: '',
                  description : '',
                  room: 1,
                  toilet:1,
                  price:1, 
                  long:coordinate.lng,
                  lat:coordinate.lat ,
                  business_types_id: 0,
                  images:[]
                }}

                validationSchema={validate}  

                onSubmit={values =>{saveCoordinate(values)}} >
                {({errors,touched,setFieldValue})=> (
                <Form>  
                  <FormControl h='132px' isInvalid={errors.title && touched.title}> 
                    <FormLabel>Title</FormLabel>
                    <FastField   name="title"> 
                      {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='text'  {...field} autoComplete='off'/>)}
                    </FastField>   
                    {touched.title && errors.title ? 
                      <Text my='2' fontSize="14px" color={errorText}>{errors.title} </Text> :
                        <FormHelperText > Enter a title</FormHelperText>
                    }  
                  </FormControl>
                  <FormControl h='132px' isInvalid={errors.description && touched.description}> 
                    <FormLabel>Description</FormLabel>
                    <FastField   name="description"> 
                      {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='text'  {...field} autoComplete='off'/>)}
                    </FastField>   
                    {touched.description && errors.description ? 
                      <Text my='2' fontSize="14px" color={errorText}>{errors.description} </Text> :
                      <FormHelperText > Enter a description</FormHelperText>
                    }  
                  </FormControl>
                  <FormControl h='132px' isInvalid={errors.price && touched.price}> 
                    <FormLabel>Price</FormLabel>
                    <FastField   name="price"> 
                      {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='number'  {...field} autoComplete='off'/>)}
                    </FastField>   
                    {touched.price && errors.price ? 
                      <Text my='2' fontSize="14px" color={errorText}>{errors.price} </Text> :
                      <FormHelperText > Enter a price</FormHelperText>
                    }  
                  </FormControl>  
                  <FormControl  h='132px' isInvalid={errors.business_types_id && touched.business_types_id}> 
                    <FormLabel>Type Business</FormLabel>
                    <FastField name='business_types_id'>
                    {({field,meta})=>(
                    <Select placeholder='Select option'  {...field}  variant='filled'>
                      <option value='1'>Home</option>
                      <option value='2'>Commercial</option>
                      <option value='3'>Apartment</option>
                      <option value='3'>Vacant</option>
                    </Select>
                    )}
                    </FastField>
                    {touched.business_types_id && errors.business_types_id ? 
                      <Text my='2' fontSize="14px" color={errorText}>{errors.business_types_id} </Text> :
                      <FormHelperText > Selec the type of business</FormHelperText>
                    } 
                  </FormControl>

                  <Flex h='132px' justify='space-between'>
                    <FormControl w='45%' isInvalid={errors.long && touched.long}> 
                      <FormLabel>Longitude</FormLabel>
                      <FastField   name="long"> 
                        {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='number'  {...field} autoComplete='off'/>)}
                      </FastField>   
                      {touched.long && errors.long ? 
                        <Text my='2' fontSize="14px" color={errorText}>{errors.long} </Text> : 
                        <FormHelperText > Maker longitude</FormHelperText>
                      }  
                    </FormControl>

                    <FormControl w='45%' isInvalid={errors.lat && touched.lat}> 
                      <FormLabel>Latitude</FormLabel>
                      <FastField   name="lat"> 
                        {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='number'  {...field} autoComplete='off'/>)}
                      </FastField>   
                      {touched.lat && errors.lat ? 
                        <Text my='2' fontSize="14px" color={errorText}>{errors.lat} </Text> :
                        <FormHelperText > Marker latitude</FormHelperText>
                      }  
                    </FormControl>
                  </Flex> 
                  <Flex h='140px' justify='space-between'>
                    <FormControl w='45%' isInvalid={errors.room && touched.room}> 
                      <FormLabel>Rooms</FormLabel>
                      <FastField   name="room"> 
                        {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='number'  {...field} autoComplete='off'/>)}
                      </FastField>   
                      {touched.room && errors.room ? 
                        <Text my='2' fontSize="14px" color={errorText}>{errors.room} </Text> :
                        <FormHelperText > Enter the number of rooms</FormHelperText>
                      }  
                    </FormControl>

                    <FormControl w='45%' isInvalid={errors.toilet && touched.toilet}> 
                      <FormLabel>Toilet</FormLabel>
                      <FastField   name="toilet"> 
                        {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='number'  {...field} autoComplete='off'/>)}
                      </FastField>   
                      {touched.toilet && errors.toilet ? 
                        <Text my='2' fontSize="14px" color={errorText}>{errors.toilet} </Text> :
                        <FormHelperText > Enter the number of bathrooms</FormHelperText>
                      }  
                    </FormControl>
                  </Flex> 
                  <FormControl h='120px' isInvalid={errors.images && touched.images}> 
                      <FormLabel>Images</FormLabel> 
                        <input type='file' multiple name="images"
                        
                          onChange={(e) => {
                          setFieldValue("images", e.currentTarget.files)  
                        
                        }}/>
                         
                      {touched.images && errors.images ? 
                        <Text my='2' fontSize="14px" color={errorText}>{errors.images} </Text> :
                        <FormHelperText >Select your favorite images</FormHelperText>
                      }  
                    </FormControl> 
                  <Flex mt='20px'> 
                    {disable ? 
                        <Button  
                              
                            colorScheme='blue' 
                            isLoading
                            _hover={{}}
                            _active={{}}
                             type='button' mt='2px' w='80px' mr={3}>
                        </Button>: 
                        
                        <Button  
                            
                            colorScheme='blue'  
                            _active={{}}
                             type='submit' mt='2px' w='80px' mr={3}>
                            Save
                        </Button>
                        
                    }   
                      <Button w='80px' onClick={ModalCoordinateClose}>Cancel</Button> 
                  </Flex>
                </Form>
                )}
              </Formik>
            </ModalBody>
            <ModalFooter>  
            </ModalFooter>
            
        </ModalContent>
      </Modal> 
  )

}