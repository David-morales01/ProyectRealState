import create from 'zustand'
import ky from "ky";

const useStore = create((set,get) => ({
  loading:false,
  statusHttp:false, 
  statusMap:false, 
  markers:[], 
  allMarkers:[], 
  coordinate:null,
  errorHttp:false,
  clickMap:false,
  filterValues:{'business_types_id': null,'price':null,'room':null,'toilet':null},
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
    const clickMap = get().clickMap 
     if(clickMap){ 
      set({ coordinate: clickCoordinate})   
      set({ clickMap: null })  
    }   

  },
  ModalCoordinateClose : ()=>{
    set({ coordinate: null })  
    set({ clickMap: null })  
  },
  clickEventMap: () => set(state => ({ clickMap: !state.clickMap })), 
  filterMap : (key,value)=>{
    let filterMarkers = get().allMarkers
    const filtervalues = get().filterValues 
    if(key == 'price'){
      console.log('denegado')
      return ;
    } 
    if(filtervalues[key] != value){
      filtervalues[key]=value
    }else{
      filtervalues[key]=null
    }
    // f de filter :V
    // valueF de value filtrada :V
    Object.entries(filtervalues).forEach(f=>{
      const value = f[1] 
      const key = f[0] 
      if(value != null){ 
        if(key == 'business_types_id'){
          filterMarkers =filterMarkers.filter(valueF => valueF[key]== x)
        }
        if(key == 'price'){ 
          filterMarkers =filterMarkers.filter(valueF => valueF[key]> x[0] && valueF[key]< x[1])
        }
        if(key == 'room' || key == 'toilet'){ 
          console.log(x) 
          if(value <=4){
            filterMarkers =filterMarkers.filter(valueF => valueF[key]== x) 
          }else{
            filterMarkers =filterMarkers.filter(valueF => valueF[key] >=5) 
          }
        }
      } 
    })
    set({ filterValues: filtervalues}) 
    set({ markers: filterMarkers}) 
    console.log(filterMarkers) 
  },

}))

export default useStore;