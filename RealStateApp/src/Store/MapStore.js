import create from 'zustand'
import ky from "ky";

const useStore = create((set,get) => ({
  loading:false,
  statusHttp:false, 
  statusMap:false, 
  markers:[], 
  coordinate:null,
  errorHttp:false,
  getMarkers: async () => {
    const accessToken = localStorage.getItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
     const resp = ky
     .get(`${import.meta.env.VITE_REACT_APP_API_URL}/markers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
     }).json()
     .then((resp) => { 
        set({ markers: resp }) 
        console.log(resp)
        set({ statusHttp: true }) 
         setTimeout(()=>{
          set({ statusMap: true })  
      }, 14000);
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
     //const cd = JSON.stringify(clickCoordinate)
    set({ coordinate: clickCoordinate})     

  },
  ModalCoordinateClose : ()=>{
    set({ coordinate: null })  

  }
}))

export default useStore;