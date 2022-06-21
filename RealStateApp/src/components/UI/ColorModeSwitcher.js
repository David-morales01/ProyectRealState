import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const bgButton = useColorModeValue('bg.light', 'bg.dark');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton  
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      colorScheme={bgButton} 
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
      w='40px'
      fontSize='24px'
    />
  );
};