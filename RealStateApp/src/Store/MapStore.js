import create from 'zustand'
import ky from "ky";

const useStore = create(set => ({
  loading:false,
  statusHttp:false, 
  statusMap:false, 
  markers:[], 
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
        set({ statusHttp: true }) 
     })  
      .catch((err) => {
          console.log('error')
      })
      .finally(()=>{ 
        console.log('antes del mapa')
        setTimeout(()=>{
          set({ statusMap: true }) 
          console.log('set del mapa ')
      }, 8000);
      })
  },

}))

export default useStore;