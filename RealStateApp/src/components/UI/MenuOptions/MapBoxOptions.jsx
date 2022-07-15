import React from 'react'
import {useMediaQuery,MenuItem} from '@chakra-ui/react'
import MenuDrawer from '../MenuDrawer/MenuDrawer'
import AuthStore from '../../../Store/AuthStore'  
import MapStore from '../../../Store/MapStore'  
import {Link} from 'react-router-dom'  

export default function MapBoxOptions(){ 

    // Store
    const clickMap = MapStore(state => state.clickMap)
    const clickEventMap = MapStore((state) => state.clickEventMap)
    const user = AuthStore(state => state.user)

    // Media Query
    const [desktopView] = useMediaQuery('(min-width: 800px)') 
 
    return(

        <>
            <MenuItem><Link to="/perfil">My perfil</Link></MenuItem>
            {user.rol == 'admin' ? <MenuItem><Link to='/allUser'>Users</Link></MenuItem> : ''}              
            {desktopView? '':<MenuDrawer/> }
            {user.rol == 'admin' ? <MenuItem onClick={clickEventMap}>{clickMap? 'Cancel add Marker' : 'New Marker'}</MenuItem> : ''} 
              </>
    )
}