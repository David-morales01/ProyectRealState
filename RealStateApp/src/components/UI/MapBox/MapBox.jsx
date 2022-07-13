import React,{useEffect,useRef} from 'react' 
import {Box} from '@chakra-ui/react'
import mapboxgl,{Map} from 'mapbox-gl'
import MapStore from '../../../Store/MapStore'
import AuthStore from '../../../Store/AuthStore'
import 'mapbox-gl/dist/mapbox-gl.css'
import Spinner from '../Spinner/Spinner' 
import FormMarker from '../Modal/FormMarker'
import './marker.css'

export default function MapBox(){ 

    // Store
    const mapStore = MapStore()
    const user = AuthStore(state => state.user)
    const statusMap = MapStore(state => state.statusMap)
    const statusHttp = MapStore(state => state.statusHttp)
    const markers = MapStore(state => state.markers)
    const coordinate = MapStore(state => state.coordinate)
    const listMarkers = MapStore(state => state.listMarkers)
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
    },[]) 

useEffect(()=>{  
    if(statusHttp){ 
        console.log('loading map')
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
                console.log(e.lngLat)
            }) 
        }
        //listMarkers(markers,user,map)
        changeStatusHttp()
        changeListMarkers()
    }
},[statusHttp]) 

 useEffect(()=>{ 
    const removeMarker = document.querySelectorAll('.mapboxgl-marker')
    if(removeMarker){
        removeMarker.forEach(function(marker) {
            marker.remove();
        });
    }
console.log('cargando datos en el mapa')
        
    if(markers.length <1 && listMarkers ==true){
        console.log('no hay :n')
    }else if(listMarkers){ 
        markers.map((marker)=>{  
            let imgMarker =''
            marker.images.forEach((img)=>{
                imgMarker = imgMarker + `<img src='${import.meta.env.VITE_REACT_APP_ROUTE_IMAGE}/markers/${img.src_img}' class='img' /> `
            }
            )
            let markerColor = '#4671FF';
            if(user.id == marker.user_id){
                markerColor ='#FF3333'
            }
            const arrCoordinate = [marker.long,marker.lat]
            new mapboxgl.Marker({ color: markerColor,fontSize:'90px' }).setLngLat(arrCoordinate)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(
                    `<div class='marker'> 
                        <h1 class'title'> ${marker.title}</h1> 
                         <div class='imagesCarousel'>
                            <div class='imagesItems'>${imgMarker}</div>
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