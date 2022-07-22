import React from 'react'
import {Portal, useDisclosure} from '@chakra-ui/react'
import Popup from '../Popup/Popup'
import mapboxgl from 'mapbox-gl'
import {useEffect, useRef} from 'react'
import MapStore from '../../../../Store/MapStore'
import AuthStore from '../../../../Store/AuthStore'
 

export default function Marker({marker}) {
  const elRef = useRef(document.createElement('div'))
  const {isOpen, onClose, onOpen} = useDisclosure()
  const user = AuthStore(state => state.user)
  const map = MapStore(state => state.map)
  
  useEffect(() => {  
    let markerColor = '#4671FF'
    if(user.id == marker.user_id){
        markerColor ='#FF3333'
    }
    const newMarker = new mapboxgl.Marker({ color: markerColor,fontSize:'90px'})
      .setLngLat([marker.long,marker.lat])
      .setPopup(
        new mapboxgl.Popup()
          .setDOMContent(elRef.current)
          .on('open', onOpen)
          .on('close', onClose)
      )
      .addTo(map)
      
      return ()=>{
        newMarker.remove()
      }
  }, [map, onClose, onOpen])

  if (!isOpen) {
    return null
  }

  return (
    <Portal containerRef={elRef} key={`portal${marker.id}`}>
      <Popup  marker={marker} key={`popup${marker.id}`} /> 
      
    </Portal>
  )
}
