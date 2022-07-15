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
            //center: [-85.28229,12.467416], zoom : 7,
            center:[-86.25717043876647,12.126737986671706],
            zoom: 13  ,
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
        
    if(markers.length <1 && listMarkers ==true){
        console.log('no hay :n')
    }else if(listMarkers){ 
        markers.map((marker)=>{  
            let imgMarker =''
            const lengthImage = marker.images.length
            
            marker.images.forEach((img)=>{
                imgMarker = imgMarker + `<div class='image'><img src='${import.meta.env.VITE_REACT_APP_ROUTE_STORAGE}/${img.src_img}'/ alt='img'></div>`
            }
            )
            let markerColor = '#4671FF';
            if(user.id == marker.user_id){
                markerColor ='#FF3333'
            }
            const arrCoordinate = [marker.long,marker.lat]
            new mapboxgl.Marker({ color: markerColor,fontSize:'90px' }).setLngLat(arrCoordinate)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) 
                .setHTML(
                    `<div class='marker'> 
                        <h1 class'title'> ${marker.title}</h1>  
                        <div class='carousel' carousel${lengthImage}>
                            <div class'carousel-items'>${imgMarker}</div>
                        </div>
                        <div class='details'>
                            <span>Bedroom: ${marker.room} </span> ${lengthImage} Bathroom : ${marker.toilet}
                        </div> 
                        <p class'description'> ${marker.description}</p> 
                    </div>`
                )
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