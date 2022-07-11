import React from 'react'  
import {Drawer,DrawerBody,useDisclosure,DrawerOverlay,DrawerContent,MenuItem,useColorModeValue } from '@chakra-ui/react' 
import MenuOptions from '../MenuOptions/MenuOptions' 
// import {MenuIcon} from '../Icons/Icons' 

export default function MenuDrawer() {

  // cosas de chakra
  const { isOpen, onOpen, onClose } = useDisclosure() 
  // Theme
  const bgMenu = useColorModeValue('bg.sidebarLight', 'bg.sidebarDark') 

  return (
    <> 
      <Drawer placement='left' onClose={onClose}    isOpen={isOpen} w='340px'  >
        <DrawerOverlay/>
        <DrawerContent w='340px'> 
          <DrawerBody overflow='hidden' bg={bgMenu} position='relative' w='340px'>
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