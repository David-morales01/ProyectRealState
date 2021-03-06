import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light'); 
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton    
    aria-label={`Switch to ${text} mode`}
    variant="ghost" 
    onClick={toggleColorMode}
    icon={<SwitchIcon />}
    {...props}
    w='40px'   
    fontSize='24px'
    _hover={{ bg: 'none' }}
    _active={{bg: 'none'}}
    />
  );
}; 