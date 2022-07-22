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
            <Link to="/perfil"><MenuItem >My perfil</MenuItem></Link>
            {user.rol =='superAdmin' ? <Link to='/userPermits'><MenuItem>User permits</MenuItem></Link> : ''}              
            {desktopView? '':<MenuDrawer/> }
            {user.rol == 'admin' || user.rol =='superAdmin' ? <MenuItem onClick={clickEventMap}>{clickMap? 'Cancel add Marker' : 'New Marker'}</MenuItem> : ''} 
        </>
    )
}