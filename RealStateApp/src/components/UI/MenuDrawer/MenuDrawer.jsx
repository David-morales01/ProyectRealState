import React from 'react'  
import {Drawer,DrawerBody,useDisclosure,DrawerOverlay,DrawerContent,MenuItem } from '@chakra-ui/react' 
import MenuOptions from '../MenuOptions/MenuOptions' 
// import {MenuIcon} from '../Icons/Icons' 

export default function MenuDrawer() {

  // cosas de chakra
  const { isOpen, onOpen, onClose } = useDisclosure() 

  return (
    <> 
      <Drawer placement='left' onClose={onClose}   isOpen={isOpen}  >
        <DrawerOverlay/>
        <DrawerContent> 
          <DrawerBody py='50px'>
            <MenuOptions/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <MenuItem onClick={onOpen}>
        {/* <MenuIcon fill='white'/> */} Filter Markers
      </MenuItem>
    </>
  )
} 