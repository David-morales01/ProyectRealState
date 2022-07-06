import React,{useEffect,useState}from 'react'
import MapStore from '../../../Store/MapStore'
import {useColorModeValue,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,FormControl,FormLabel,Input,Button} from '@chakra-ui/react'
import {FastField, Form, Formik} from 'formik' 

export default function FormMarker() {
  
  // Store
  const mapStore = MapStore()
  const coordinate = MapStore(state => state.coordinate)
  const errorText = useColorModeValue('color.errorLight', 'color.errorDark')
 
  return (  
      <Modal closeOnOverlayClick={false} isOpen={true}  >
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(4px) hue-rotate(30deg)' />
        <ModalContent>
          <ModalHeader>Create new marker</ModalHeader>
          <ModalBody >  
          </ModalBody>
            <Formik
              initialValues={{ 
                
                long:coordinate.lng,
                lat:coordinate.lat,
              }}

              validate={(values)=>{
                
                let validateErrors ={}

                if(!values.long){ 
                  validateErrors.long='length is required. '
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
                <FormControl h='20' my='8' isInvalid={errors.long && touched.long}> 
                  <FastField   name="long"> 
                    {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='text'  {...field} autoComplete='off'/>)}
                  </FastField>   
                  {touched.long && errors.long ? 
                    <Text my='2' fontSize="14px" color={errorText}>{errors.long} </Text> :''
                  }  
                </FormControl>

                <FormControl h='20' my='8' isInvalid={errors.lat && touched.lat}> 
                  <FastField   name="lat"> 
                    {({field,meta})=>(<Input errorBorderColor='crimson' variant='filled' type='text'  {...field} autoComplete='off'/>)}
                  </FastField>   
                  {touched.lat && errors.lat ? 
                    <Text my='2' fontSize="14px" color={errorText}>{errors.lat} </Text> :''
                  }  
                </FormControl>
              </Form>
              )}
            </Formik>
        </ModalContent>
      </Modal> 
  )
  
  function close(){
    mapStore.ModalCoordinateClose()
  }
}