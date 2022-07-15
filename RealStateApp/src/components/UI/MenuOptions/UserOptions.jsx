import React from 'react'
import {MenuItem} from '@chakra-ui/react'  
import {Link} from 'react-router-dom'  

export default function MapBoxOptions(){  
 
    return(

        <> <MenuItem><Link to="/">Back to map</Link></MenuItem>            
        </>
    )
}