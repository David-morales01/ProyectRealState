import React from 'react'
import {Flex,Box,Button,useColorModeValue,Text,useMediaQuery,Avatar,AvatarBadge,Menu,MenuButton,MenuList,MenuItem} from '@chakra-ui/react'
import MenuDrawer from '../MenuDrawer/MenuDrawer'
import AuthStore from '../../../Store/AuthStore'  
import MapStore from '../../../Store/MapStore' 
import ColorModoText from '../ColorModeSwitcher/ColorModoText'  
import { ChevronDownIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

export default function Header(){
    
    // Store
    const logOut = AuthStore((state) => state.logOut) 
    const user = AuthStore(state => state.user)
    const clickMap = MapStore(state => state.clickMap)
    const clickEventMap = MapStore((state) => state.clickEventMap)

    // Media Query
    const [desktopView] = useMediaQuery('(min-width: 800px)') 
    // theme colors
    const colorText = useColorModeValue('color.colorTextLight', 'bg.colorTextDark')
    const bgHeader = useColorModeValue('bg.headerLight', 'bg.headerDark')
    return (
        <Flex color='white'  bg={bgHeader} w='100%' h='70px' justify='space-between' align='center' px='30px'>
            <Box h='40px' >
                <Text position='relative' insetBlock='-12px' fontSize='40px' fontWeight='bold'>
                    Real Estate
                </Text>
            </Box>  
            <Flex columnGap='6px' align='center'>
                 
                <Avatar  name={user.name} src={`${import.meta.env.VITE_REACT_APP_ROUTE_IMAGE}/users/${user.img_user}`} /> 
                 
                <Flex align='center'  columnGap='4px'>
                    {user.name}
                    <Menu >
                        <MenuButton px={0} py={0}> 
                            <ChevronDownIcon />
                        </MenuButton>
                        <MenuList color={colorText}>
                            <MenuItem>My perfil</MenuItem>
                            {desktopView? '':<MenuDrawer/> }
                            {user.rol == 'admin' ? <MenuItem onClick={clickEventMap}>{clickMap? 'Cancel add Marker' : 'New Marker'}</MenuItem> : ''}
                            <MenuItem onClick={logOut}>Log Out</MenuItem> 
                            <ColorModoText/>
                        </MenuList>
                    </Menu> 
                </Flex>
            </Flex>
        </Flex>
    )
}
