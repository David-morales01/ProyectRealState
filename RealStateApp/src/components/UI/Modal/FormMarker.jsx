import React from 'react'
import MapStore from '../../../Store/MapStore'
import {Flex,useColorModeValue,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,FormControl,FormLabel,Input,Button,Text} from '@chakra-ui/react'
import {FastField, Form, Formik} from 'formik' 
import { Select } from '@chakra-ui/react'

export default function FormMarker() {
  
  // Store
  const ModalCoordinateClose = MapStore((state) => state.ModalCoordinateClose)
  const coordinate = MapStore(state => state.coordinate)

  // Theme
  const errorText = useColorModeValue('color.errorLight', 'color.errorDark')
 
  return (  
      <Modal closeOnOverlayClick={false} isOpen={true}  >
        {/* <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(4px) hue-rotate(30deg)' /> */}
        <ModalContent>
          <ModalHeader>Create new marker</ModalHeader>
          <ModalBody  px={10}>  
            <Formik
              initialValues={{ 
                title: '',
                description : '',
                room: 1,
                toilet:1,
                price:1, 
                long:coordinate.lng,
                lat:coordinate.lat
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
                }

                if(!values.lat){ 
                  validateErrors.lat='Latitude is required. '
                }

                  return validateErrors
                }}

              onSubmit={values =>{console.log(values)}}
              
              >
              {({errors,touched})=> (
              <Form>  
                 <FormControl h='100px' isInvalid={errors.title && touched.title}> 
                    <FormLabel>Title</FormLabel>
                    <FastField   name="title"> 
                      {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='text'  {...field} autoComplete='off'/>)}
                    </FastField>   
                    {touched.title && errors.title ? 
                      <Text my='2' fontSize="14px" color={errorText}>{errors.title} </Text> :''
                    }  
                  </FormControl>
                  <FormControl h='100px' isInvalid={errors.description && touched.description}> 
                    <FormLabel>Description</FormLabel>
                    <FastField   name="description"> 
                      {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='text'  {...field} autoComplete='off'/>)}
                    </FastField>   
                    {touched.description && errors.description ? 
                      <Text my='2' fontSize="14px" color={errorText}>{errors.description} </Text> :''
                    }  
                  </FormControl>
                  <FormControl h='100px' isInvalid={errors.price && touched.price}> 
                    <FormLabel>Price</FormLabel>
                    <FastField   name="price"> 
                      {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='number'  {...field} autoComplete='off'/>)}
                    </FastField>   
                    {touched.price && errors.price ? 
                      <Text my='2' fontSize="14px" color={errorText}>{errors.price} </Text> :''
                    }  
                  </FormControl> 
                  {/* <FormControl h='100px' isInvalid={errors.business_types_id && touched.business_types_id}> 
                    <FormLabel>Business type</FormLabel>
                    <FastField   name="business_types_id" > 
                      <Select placeholder='Select option'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                      </Select>
                    </FastField>   
                    {touched.business_types_id && errors.business_types_id ? 
                      <Text my='2' fontSize="14px" color={errorText}>{errors.business_types_id} </Text> :''
                    }  
                  </FormControl> */}
                  <Flex h='100px' justify='space-between'>
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
                  <Flex h='100px' justify='space-between'>
                    <FormControl w='45%' isInvalid={errors.long && touched.long}> 
                      <FormLabel>Longitude</FormLabel>
                      <FastField   name="long"> 
                        {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='number'  {...field} autoComplete='off'/>)}
                      </FastField>   
                      {touched.long && errors.long ? 
                        <Text my='2' fontSize="14px" color={errorText}>{errors.long} </Text> :''
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
                <Button onClick={ModalCoordinateClose}>colose</Button>
              </Form>
              )}
            </Formik>
            
          </ModalBody>
        </ModalContent>
      </Modal> 
  )

}