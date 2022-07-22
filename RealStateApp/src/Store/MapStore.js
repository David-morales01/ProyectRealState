import create from 'zustand'
import ky from "ky";

const useStore = create((set,get) => ({
  map:null,
  disable:false, 
  statusMap:false,
  listMarkers:null,
  markers:[],
  allMarkers:[],
  coordinate:null,
  errorHttp:false,
  clickMap:false,
  error: false,
  filterValues:{'title':'','business_types_id': '','price':'','room':'','toilet':''},
  getMarkers: async () => {
    const accessToken = localStorage.getItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
     const resp = ky
     .get(`${import.meta.env.VITE_REACT_APP_API_URL}/markers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
     }).json()
     .then((resp) => {
      set({ allMarkers: resp })
      set({ markers: resp })
      if(resp.length <1){
        set({ error: true}) 
      }  
        setTimeout(()=>{
        set({ statusMap: true })
      }, 2000);
     })
      .catch((err) => {
        set({ errorHttp: true })
        set({ statusMap: true })
      })
  },
  reloadComponent: () => {
    set({ errorHttp: false })
    set({ statusMap: false })
  },

  getCoordinate : (clickCoordinate)=>{
    set({ disable: false })
    const clickMap = get().clickMap
     if(clickMap){
      set({ coordinate: clickCoordinate})
      set({ clickMap: null })
    }

  },
  modalCoordinateClose : ()=>{
    set({ coordinate: null })
    set({ clickMap: null })
  },
  ErrorClose : ()=>{
    set(state => ({error: false }) )
  },
  changeMap : (value)=>{
    set({ map: value }) 
  },
  changeListMarkers: () => set(state => ({ listMarkers: true})), 
  clickEventMap: () => set(state => ({ clickMap: !state.clickMap })),
  filterMap : (key,value)=>{
    
    set({ listMarkers: false })
    console.log('filtrando los ', key, ' iguales a ', value )
     let filterMarkers = get().allMarkers
     const filtervalues = get().filterValues
  // if(key ==business_types_id){
  //   if(filtervalues[key] != value){
  //     filtervalues[key]=value
  //    }else{
  //      filtervalues[key]=null
  //    }
  // }else 
  if(filtervalues[key] != value){
      filtervalues[key]=value
     }else{
       filtervalues[key]=''
     } 
     const accessToken = localStorage.getItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
     
     const resp = ky
   
     .get(`${import.meta.env.VITE_REACT_APP_API_URL}/filterMarkers`, {
      searchParams:filtervalues,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
     }).json()
     .then((resp) => { 
      set({ markers: resp.data}) 
      set({ listMarkers: true })
      if(resp.data<1){
          set({ error: true})
        }else{
          set({ error: false})
        }
     })
      .catch((err) => { 
        set({ error: true})
        console.log(err)
      })
      .finally(()=>{
        set({ listMarkers: true })
      })
  },
  saveCoordinate: async(values)=>{
    set({ disable: true }) 
    set({ listMarkers: false})  
    let formData = new FormData();
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('room', values.room)
    formData.append('toilet', values.toilet)
    formData.append('price', values.price)
    formData.append('long', values.long)
    formData.append('lat', values.lat)
    formData.append('business_types_id', values.business_types_id)

    for (var i = 0; i < values.images.length; i++) { 
      formData.append('images[]', values.images[i])
    }

    const listAllMarkers = get().markers
    const accessToken = localStorage.getItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
     const resp = ky
     .post(`${import.meta.env.VITE_REACT_APP_API_URL}/markers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },body:  formData
     }).json()
     .then((resp)=>{

     listAllMarkers.push(resp.data) 
    })
    .finally(()=>{ 
      set({ markers: listAllMarkers}) 
       set({ disable: false })
       set({ coordinate: null })
       set({ listMarkers: true})  
      // console.log(listAllMarkers)
    })
  }
}))

export default useStore;