import React,{useEffect} from 'react'
import MapStore from '../../../../Store/MapStore'
import Marker from './Marker'
import './Marker.scss'

export default function ListMarker(){
    // Store
    const markers = MapStore(state => state.markers)  

    return (
        <>
         { 
                markers.map((marker)=>{  
                    return(
                        <Marker key={marker.id}   marker={marker}/>
                    )
                }) 
            }
        </>
    )
}