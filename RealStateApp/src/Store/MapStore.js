import create from 'zustand'
import ky from "ky";

const useStore = create((set,get) => ({
  loading:false,
  statusHttp:false,   
  statusMap:false, 
  listMarkers:false,
  markers:[], 
  allMarkers:[], 
  coordinate:null,
  errorHttp:false,
  clickMap:false,
  filterValues:{'title':null,'business_types_id': null,'price':null,'room':null,'toilet':null},
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
        console.log('no hay')
      } 
      set({ statusHttp: true }) 
      set({ listMarkers: true })   
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
  changeListMarkers: () => set(state => ({ listMarkers: !state.listMarkers })), 
  changeStatusHttp: () => set(state => ({ statusHttp: false })), 
  clickEventMap: () => set(state => ({ clickMap: !state.clickMap })), 
  filterMap : (key,value)=>{
    console.log('filtrando los ', key, ' iguales a ', value )
    set({ listMarkers: false}) 
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
      const key = f[0] 
      const value = f[1] 
      if(value != null){ 
        switch(key){
          case 'title':
            filterMarkers =filterMarkers.filter(valueF => valueF[key]== value)
          break;
          case 'business_types_id':
            filterMarkers =filterMarkers.filter(valueF => valueF[key]== value)
          break;
          case 'price':
            filterMarkers =filterMarkers.filter(valueF => valueF[key]> value[0] && valueF[key]< value[1])
          break;
          case 'room':
            if(value <=4){
              filterMarkers =filterMarkers.filter(valueF => valueF[key]== value) 
            }else{
              filterMarkers =filterMarkers.filter(valueF => valueF[key] >=5) 
            }
          break;
          case 'toilet':
            if(value <=4){
              filterMarkers =filterMarkers.filter(valueF => valueF[key]== value) 
            }else{
              filterMarkers =filterMarkers.filter(valueF => valueF[key] >=5) 
            }
          break;
        }
      } 
    })

    set({ filterValues: filtervalues}) 
    set({ markers: filterMarkers}) 
    console.log(filterMarkers) 
    set({ listMarkers: true}) 
  },
  saveCoordinate: async(values)=>{
    const accessToken = localStorage.getItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
     const resp = ky
     .post(`${import.meta.env.VITE_REACT_APP_API_URL}/markers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },json: values
     }).json()
     .then((resp)=>{ 
      
    const markers = get().allMarkers
    markers.push(resp.data) 
    set({ markers: markers}) 
    set({ allMarkers: markers})
    set({ coordinate: null })  
    console.log(markers)
    })
  }
}))

export default useStore;