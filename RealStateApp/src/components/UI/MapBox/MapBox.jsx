import React,{useLayoutEffect,useEffect,useRef,useState} from 'react'
import * as ReactDOM from 'react-dom/client'
import {Box,useColorModeValue} from '@chakra-ui/react'
import mapboxgl,{Map} from 'mapbox-gl'
import MapStore from '../../../Store/MapStore'
import 'mapbox-gl/dist/mapbox-gl.css'
import Spinner from '../Spinner/Spinner' 
import FormMarker from '../Modal/FormMarker' 

export default function MapBox(){

    // State
    const [coordinate,setCoordinate] = useState('')
    //Theme
    const bgContainer = useColorModeValue('bg.containerLight', 'bg.containerDark') 


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
        //   setCoordinate(marker.description);
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
                  //  console.log(marker);
                    // Create a React ref
                    const ref = React.createRef();
                    // Create a new DOM node and save it to the React ref
                    ref.current = document.createElement("div");
                    // Render a Marker Component on our new DOM node
                    // ReactDOM.render(
                    //     <Marker onClick={markerClicked} marker={marker} />,
                    //     ref.current
                    // ); 
                    let arr = marker.coordinate.split(','); 
                        console.log(arr)
                        let marker2 = new mapboxgl.Marker({ color: 'blue',fontSize:'90px' })
                .setLngLat(arr)
                .addTo(map);/* */
                    // Create a Mapbox Marker at our new DOM node
                    //  new mapboxgl.Marker(ref.current)
                    //      .setLngLat([marker.coordinates[0],marker.coordinates[1]])
                    //      .addTo(map);
                })

                map.on('click',function(e){ 
                    // setCoordinate(e.lngLat)    quede en hacer el modal :"(
                    // console.log(e.lngLat)
                })
        }
    },[statusHttp])

    return (
        <Box position='relative' inset='0' h='100%' w='100%' >
             
            <Box w='100%' h='100%' ref={mapDiv} position='relative'></Box>

            {/* <Box position='absolute' pointerEvents='none' inset='0' h='50%' w='50%' transition='6s' bg={bgContainer} opacity={statusMap?'0':'1'}></Box> */}
             {statusMap? '' : <Spinner/> }
            {/* <FormMarker isOpen={coordinate} coordinate={coordinate}/>  */}
        </Box>
    )
}