import React,{useEffect,useRef} from 'react'
import {Box} from '@chakra-ui/react'
import mapboxgl,{Map} from 'mapbox-gl'
import MapStore from '../../../../Store/MapStore'
import AuthStore from '../../../../Store/AuthStore'
import 'mapbox-gl/dist/mapbox-gl.css'
import Spinner from '../../Spinner/Spinner'
import FormMarker from '../../Modal/FormMarker'
import ErrorMarker from '../../Message/ErrorMarker' 
import ListMarker from '../Marker/ListMarker'

export default function MapBox(){

    // Store
    const mapStore = MapStore()
    const user = AuthStore(state => state.user)
    const statusMap = MapStore(state => state.statusMap)  
    const coordinate = MapStore(state => state.coordinate) 
    const error = MapStore(state => state.error) 
    const changeListMarkers = MapStore((state) => state.changeListMarkers)
    const changeMap = MapStore((state) => state.changeMap)
    const listMarkers = MapStore(state => state.listMarkers)

    // MapBox
    const mapDiv =useRef(null)
      
    // Token
    mapboxgl.accessToken = `${import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN}`

    useEffect(()=>{ 
        mapStore.getMarkers() 
        
        const mapb = new Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-85.28229,12.467416], zoom : 7,
            attributionControl: false
        }) 
        
         const nav = new mapboxgl.NavigationControl({
             visualizePitch: false
         });

         mapb.addControl(nav, 'top-right');

         if(user.rol == 'admin' || user.rol =='superAdmin'){
             mapb.on('click',function(e){
                 mapStore.getCoordinate(e.lngLat)
             })
         }
        changeMap(mapb)
        changeListMarkers()

        return ()=>{
            mapb.remove()
        }
    },[])

    useEffect(()=>{

        if(!listMarkers){
            const removeMarker = document.querySelectorAll('.mapboxgl-marker')
            if(removeMarker){
                removeMarker.forEach(function(marker) {
                    marker.remove();
                });
            }
        }
    },[listMarkers])

    return (
        <>
            <Box w='100%' h='100%'  ref={mapDiv} position='relative'></Box>
            {listMarkers?<ListMarker/>:<Spinner backGround='rgba(0, 0, 0, 0.4)' />}
            {statusMap? '':<Spinner backGround='rgba(0, 0, 0, 0.9)' />}
            {coordinate? <FormMarker /> :''}
            {error ? <ErrorMarker/>:''}
             
        </>
    )
}

/*

popup.on('open', () => {
console.log('popup was opened');
});

popup.on('close', () => {
console.log('popup was closed');
});
revisar :   https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup.event:close
            https://docs.mapbox.com/mapbox-gl-js/example/drag-a-marker/
            https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/

*/