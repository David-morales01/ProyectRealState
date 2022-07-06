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

    // MapBox
    const mapDiv =useRef(null)
    const map =useRef(null)
    // Token
    mapboxgl.accessToken = `${import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN}`

 

     useEffect(()=>{ 
        if(statusHttp){ 
            map.current = new Map({
                container: mapDiv.current,
                style: 'mapbox://styles/mapbox/streets-v11',
            //  center: [-85.28229,12.467416], zoom : 7
            center:[-86.25717043876647,12.126737986671706],
                zoom: 13  ,attributionControl: true
            })
                    //  map.addControl(new mapboxgl.NavigationControl(), "top-right");

                    //     map.addControl(new mapboxgl.AttributionControl({
                    //         customAttribution: 'Map design by me',<IconMarker fill='red'/>
                    //         }),"top-right");
                    //    }
            const nav = new mapboxgl.NavigationControl({
                visualizePitch: true
            }); 
                    
            map.current.addControl(nav, 'top-right'); 

            markers.map((marker)=>{  
                let imgMarker =''
                marker.images.forEach((img)=>{
                    imgMarker = imgMarker + `<img src='${import.meta.env.VITE_REACT_APP_ROUTE_IMAGE}/markers/${img.src_img}' class='img' /> `
                }
                )
                let markerColor = '#4671FF';
                if(user.id == marker.user_id){
                    markerColor ='#FF3333'
                }  //console.log(marker.images.length) 
                //const arrCoordinate = marker.coordinate.split(',');  
                const arrCoordinate = [marker.long,marker.lat]
                console.log(arrCoordinate)
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

            if(user.rol == 'admin'){
                map.current.on('click',function(e){ 
                    // setCoordinate(e.lngLat)    quede en hacer el modal :"(
                    // console.log(e.target)
                    // console.log(e.target.dataset.id)
                    mapStore.getCoordinate(e.lngLat)
                
                }) 
            }
        }   
        else{
            mapStore.getMarkers()
        }
    },[statusHttp])


    return (
        <>
             
            <Box w='100%' h='100%'  ref={mapDiv} position='relative' className='cursorRancio'></Box>

            {/* <Box position='absolute' pointerEvents='none' inset='0' h='50%' w='50%' transition='6s' bg={bgContainer} opacity={statusMap?'0':'1'}></Box> */}
             {statusMap? '':<Spinner backGround='rgba(0, 0, 0, 0.8)' />}
           {coordinate? <FormMarker /> :''}
        </>
    )
}