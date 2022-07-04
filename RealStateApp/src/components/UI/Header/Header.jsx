import React from 'react'
import {Flex,Box,Button,useColorModeValue,Text,useMediaQuery,Avatar,AvatarBadge,Menu,MenuButton,MenuList,MenuItem} from '@chakra-ui/react'
import MenuDrawer from '../MenuDrawer/MenuDrawer'
import AuthStore from '../../../Store/AuthStore'   
import { ChevronDownIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

export default function Header(){
    
    // Store
    const auth = AuthStore()
    const user = AuthStore(state => state.user)
    // Media Queri
    const [desktopView] = useMediaQuery('(min-width: 800px)') 
    // theme colors
    const bgHeader = useColorModeValue('bg.headerLight', 'bg.headerDark')
    return (
        <Flex color='white'  bg={bgHeader} w='100%' h='90px' justify='space-between' align='center' px='30px'>
            <Box h='40px' >
                <Text position='relative' insetBlock='-12px' fontSize='40px' fontWeight='bold'>
                    Real Estate
                </Text>
            </Box>  
            <Flex columnGap='6px' align='center'>
                 
                <Avatar  name={user.name} src={`${import.meta.env.VITE_REACT_APP_ROUTE_IMAGE}/users/${user.img_user}`} /> 
                 
                <Flex align='center' columnGap='4px'>
                    {user.name}
                    <Menu>
                        <MenuButton
                            px={0}
                            py={0}  
                        > <ChevronDownIcon />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>My perfil</MenuItem>
                            {desktopView? '':<MenuDrawer/> }
                            <MenuItem>New Marker</MenuItem>
                            <MenuItem onClick={auth.logOut}>Log Out</MenuItem> 
                        </MenuList>
                    </Menu> 
                </Flex>
            </Flex>
        </Flex>
    )
}