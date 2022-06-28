import React,{useLayoutEffect} from 'react'
import {Box} from '@chakra-ui/react' 
import mapboxgl from 'mapbox-gl'
import AuthStore from '../../../Store/AuthStore' 

import 'mapbox-gl/dist/mapbox-gl.css'

export default function MapBox(){

    const loading = AuthStore(state => state.loading) 

    mapboxgl.accessToken = 'pk.eyJ1IjoiZHJhY29lc2xheWVyIiwiYSI6ImNsNHVwMTNucTFtdnEzamxwYjBmYjc1NGUifQ.ZRHiSHQs3hkP08fxq7xcpg';

     useLayoutEffect(()=>{
     if(loading) {  
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-85.207229,12.465416], // starting position [lng, lat]
            zoom: 7 // starting zoom
            })}
     },[loading])

    return (
        <Box w='100%' id='map' bg='red'>mapa</Box>
    )
}