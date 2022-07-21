import React,{useEffect,useRef} from 'react'
import {Box} from '@chakra-ui/react'
import mapboxgl,{Map} from 'mapbox-gl'
import MapStore from '../../../Store/MapStore'
import AuthStore from '../../../Store/AuthStore'
import 'mapbox-gl/dist/mapbox-gl.css'
import Spinner from '../Spinner/Spinner'
import FormMarker from '../Modal/FormMarker'
import ErrorMarker from '../Message/ErrorMarker'
import './marker.scss'
import * as ReactDOM from 'react-dom/client'
import Popup from './Popup'

export default function MapBox(){

    // Store
    const mapStore = MapStore()
    const user = AuthStore(state => state.user)
    const statusMap = MapStore(state => state.statusMap)
    const statusHttp = MapStore(state => state.statusHttp)
    const markers = MapStore(state => state.markers)
    const coordinate = MapStore(state => state.coordinate)
    const listMarkers = MapStore(state => state.listMarkers)
    const error = MapStore(state => state.error)
    const changeStatusHttp = MapStore((state) => state.changeStatusHttp)
    const changeListMarkers = MapStore((state) => state.changeListMarkers)

    // MapBox
    const mapDiv =useRef(null)
    const map =useRef(null)
    // Token
    mapboxgl.accessToken = `${import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN}`

    useEffect(()=>{
        if(markers.length<1){
            console.log('getMarkers')
            mapStore.getMarkers()
        }
        map.current = new Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-85.28229,12.467416], zoom : 7,
            attributionControl: false
        })
        const nav = new mapboxgl.NavigationControl({
            visualizePitch: false
        });

        map.current.addControl(nav, 'top-right');

        if(user.rol == 'admin'){
            map.current.on('click',function(e){
                mapStore.getCoordinate(e.lngLat)
            })
        }
        changeListMarkers()
    },[])

    useEffect(()=>{
        const removeMarker = document.querySelectorAll('.mapboxgl-marker')
        if(removeMarker){
            removeMarker.forEach(function(marker) {
                marker.remove();
            });
        }

        if(markers.length >1 && listMarkers ==true){
            markers.map((marker)=>{
                // let imgMarker =''
                // const lengthImage = marker.images.length
                // if(lengthImage>0){
                //     marker.images.forEach((img)=>{
                //         imgMarker = imgMarker + `<img src='${import.meta.env.VITE_REACT_APP_ROUTE_STORAGE}/${img.src_img}'/ alt='Image Marker'>`
                //     })

                // }else{
                //     imgMarker = '<div class="defaultImage">No image available</div>'
                // }
                let markerColor = '#4671FF';
                if(user.id == marker.user_id){
                    markerColor ='#FF3333'
                }
                const popup =    new mapboxgl.Popup({ offset: 25 })
                .setHTML(

                    `<div  class='divMarker'><div>`
                ) 
                popup.on('open', () => {

                    const container = document.querySelector('.divMarker')
                    const root = ReactDOM.createRoot(container)
                    root.render(
                        <>
                            <Popup marker={marker}/>
                        </>
                    )
                    console.log('popup aierto');
                })
                // popup.on('close', () => {
                //     const container = document.querySelector('.mapboxgl-popup-content')
                //     if(container){

                //     container.remove()
                //     console.log('popup was closed');
                //     }
                //     console.log('popup was 1 closed');
                //     });
                const arrCoordinate = [marker.long,marker.lat]
                new mapboxgl.Marker({ color: markerColor,fontSize:'90px' }).setLngLat(arrCoordinate)
                .setPopup(
                    popup
                ).addTo(map.current);
            })

        }
    },[markers])

    return (
        <>
            <Box w='100%' h='100%'  ref={mapDiv} position='relative'></Box>
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