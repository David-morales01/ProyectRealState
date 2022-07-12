import React from 'react'
import MapStore from '../../../Store/MapStore'
import {Flex,Select,useColorModeValue,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,FormControl,FormLabel,Input,Button,Text} from '@chakra-ui/react'
import {FastField, Form, Formik,Field} from 'formik' 

export default function FormMarker() {
  
  // Store
  const ModalCoordinateClose = MapStore((state) => state.modalCoordinateClose)
  const saveCoordinate = MapStore((state) => state.saveCoordinate)
  const coordinate = MapStore(state => state.coordinate)

  // Theme
  const errorText = useColorModeValue('color.errorLight', 'color.errorDark')
 
  return (  
      <Modal closeOnOverlayClick={false} isOpen={true} scrollBehavior='inside'>
        {/* <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(4px) hue-rotate(30deg)' /> */}
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
                  images:''
                }}

                validate={(values)=>{
                  
                  let validateErrors ={}
  

                  if(!values.title){ 
                    validateErrors.title='Title is required. '
                  }
                  if(!values.description){ 
                    validateErrors.description='Description is required. '
                  }
                  if(values.room<1){ 
                    validateErrors.room='The number of rooms must be greater than 0. '
                  }
                  if(values.toilet<1){ 
                    validateErrors.toilet='The number of toilet must be greater than 0. '
                  }
                  
                  if(values.price<1){ 
                    validateErrors.price='Price must be greater than 0. '
                  }

                  if(!values.long){ 
                    validateErrors.long='Longitude is required. '
                  }else if (values.long>90){
                    validateErrors.long='Longitude is invalid. '

                  }

                  if(!values.lat){ 
                    validateErrors.lat='Latitude is required. '
                  }else if (values.lat>90){
                    validateErrors.lat='latitude is invalid. '

                  }
                  if(values.business_types_id == 0){ 
                    validateErrors.business_types_id='Business Type is required. '
                  }
                    return validateErrors
                  }}

                onSubmit={values =>{saveCoordinate(values)}} >
                {({errors,touched})=> (
                <Form>  
                  <FormControl h='132px' isInvalid={errors.title && touched.title}> 
                      <FormLabel>Title</FormLabel>
                      <FastField   name="title"> 
                        {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='text'  {...field} autoComplete='off'/>)}
                      </FastField>   
                      {touched.title && errors.title ? 
                        <Text my='2' fontSize="14px" color={errorText}>{errors.title} </Text> :''
                      }  
                    </FormControl>
                    <FormControl h='132px' isInvalid={errors.description && touched.description}> 
                      <FormLabel>Description</FormLabel>
                      <FastField   name="description"> 
                        {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='text'  {...field} autoComplete='off'/>)}
                      </FastField>   
                      {touched.description && errors.description ? 
                        <Text my='2' fontSize="14px" color={errorText}>{errors.description} </Text> :''
                      }  
                    </FormControl>
                    <FormControl h='132px' isInvalid={errors.price && touched.price}> 
                      <FormLabel>Price</FormLabel>
                      <FastField   name="price"> 
                        {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='number'  {...field} autoComplete='off'/>)}
                      </FastField>   
                      {touched.price && errors.price ? 
                        <Text my='2' fontSize="14px" color={errorText}>{errors.price} </Text> :''
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
                        <Text my='2' fontSize="14px" color={errorText}>{errors.business_types_id} </Text> :''
                      } 
                    </FormControl>

                    <Flex h='132px' justify='space-between'>
                      <FormControl w='45%' isInvalid={errors.long && touched.long}> 
                        <FormLabel>Longitude</FormLabel>
                        <FastField   name="long"> 
                          {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='number'  {...field} autoComplete='off'/>)}
                        </FastField>   
                        {touched.long && errors.long ? 
                          <Text my='2' fontSize="14px" color={errorText}>{errors.long} </Text> :'xd'
                        }  
                      </FormControl>

                      <FormControl w='45%' isInvalid={errors.lat && touched.lat}> 
                        <FormLabel>Latitude</FormLabel>
                        <FastField   name="lat"> 
                          {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='number'  {...field} autoComplete='off'/>)}
                        </FastField>   
                        {touched.lat && errors.lat ? 
                          <Text my='2' fontSize="14px" color={errorText}>{errors.lat} </Text> :''
                        }  
                      </FormControl>
                    </Flex> 
                    <Flex h='132px' justify='space-between'>
                      <FormControl w='45%' isInvalid={errors.room && touched.room}> 
                        <FormLabel>Rooms</FormLabel>
                        <FastField   name="room"> 
                          {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='number'  {...field} autoComplete='off'/>)}
                        </FastField>   
                        {touched.room && errors.room ? 
                          <Text my='2' fontSize="14px" color={errorText}>{errors.room} </Text> :''
                        }  
                      </FormControl>

                      <FormControl w='45%' isInvalid={errors.toilet && touched.toilet}> 
                        <FormLabel>Toilet</FormLabel>
                        <FastField   name="toilet"> 
                          {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='number'  {...field} autoComplete='off'/>)}
                        </FastField>   
                        {touched.toilet && errors.toilet ? 
                          <Text my='2' fontSize="14px" color={errorText}>{errors.toilet} </Text> :''
                        }  
                      </FormControl>
                    </Flex> 
                    <FormControl isInvalid={errors.images && touched.images}> 
                        <FormLabel>images</FormLabel>
                        <FastField   name="images"> 
                          {({field,meta})=>(<Input type='file' multiple {...field} 
                          
                          // onChange={(event) => {
                          //   setFieldValue("images", event.currentTarget.files[0]);}}
                          
                          />)}
                        </FastField>   
                        {touched.images && errors.images ? 
                          <Text my='2' fontSize="14px" color={errorText}>{errors.images} </Text> :''
                        }  
                      </FormControl> 
                    <Flex mt='20px'> 
                        <Button colorScheme='blue' type='submit' mr={3}>Save</Button>
                        <Button onClick={ModalCoordinateClose}>Cancel</Button> 
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