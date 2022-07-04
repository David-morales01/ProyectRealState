import React,{useLayoutEffect,useEffect,useRef } from 'react'
import * as ReactDOM from 'react-dom/client'
import {Box} from '@chakra-ui/react'
import mapboxgl,{Map} from 'mapbox-gl'
import MapStore from '../../../Store/MapStore'
import 'mapbox-gl/dist/mapbox-gl.css'
import Spinner from '../Spinner/Spinner'

export default function MapBox(){

    // Store
    const mapStore = MapStore()
    const statusMap = MapStore(state => state.statusMap)
    const statusHttp = MapStore(state => state.statusHttp)
    const markers = MapStore(state => state.markers)

    // MapBox
    const mapDiv =useRef(null)
    mapboxgl.accessToken = `${import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN}`

    // Marker
    const Marker = ({ onClick, children, marker }) => {
        const _onClick = () => {
          onClick(marker.description);
        };

        return (
          <button onClick={_onClick} className="marker">
            {children}
          </button>
        );
    }

    const markerClicked = (title) => {
        window.alert(title);
      };

    useEffect(()=>{
        mapStore.getMarkers()
    },[])

    useLayoutEffect(()=>{

           if(statusHttp){
                console.log('cargando mapa')
                const map = new Map({
                    container: mapDiv.current,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [-85.28229,12.467416],
                    zoom: 7  ,attributionControl: false
                })
            //  map.addControl(new mapboxgl.NavigationControl(), "top-right");

            //     map.addControl(new mapboxgl.AttributionControl({
            //         customAttribution: 'Map design by me'
            //         }),"top-right");
            //    }
                const nav = new mapboxgl.NavigationControl({
                    visualizePitch: true
                });
                map.addControl(nav, 'top-right');

                markers.map((marker)=>{
               /*     // console.log(marker);
                     // Create a React ref
                    const ref = React.createRef();
                    // Create a new DOM node and save it to the React ref
           //         ref.current = document.createElement("div");
                    // Render a Marker Component on our new DOM node
                    ReactDOM.render(
                        <Marker onClick={markerClicked} marker={marker} />,
                        ref.current
                    );

                    // Create a Mapbox Marker at our new DOM node
               //     new mapboxgl.Marker(ref.current)
                        .setLngLat(marker.coordinates)
                        .addTo(map);*/
                })

                map.on('click',function(e){
                    console.log(e)
                })
        }
    },[statusHttp])

    return (

        <Box position='relative' inset='0' h='100%' w='100%' >
            <Box w='100%' h='100%' ref={mapDiv} position='relative'></Box>

            <Box position='absolute' inset='0' h='100%' w='100%' transition='14s' bg ='red' opacity={statusMap?'0':'1'}></Box>
             {statusMap? '' : <Spinner/> }
        </Box>
    )
}