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
  error: false,
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
  ErrorClose : ()=>{
    set(state => ({error: false }) )
  },
  changeListMarkers: () => set(state => ({ listMarkers: !state.listMarkers })),
  changeStatusHttp: () => set(state => ({ statusHttp: false })),
  clickEventMap: () => set(state => ({ clickMap: !state.clickMap })),
  filterMap : (key,value)=>{
    //console.log('filtrando los ', key, ' iguales a ', value )
    let filterMarkers = get().allMarkers
    const filtervalues = get().filterValues

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
            filterMarkers =filterMarkers.filter(valueF => {
              let title = valueF[key]
              title =title.toLowerCase()
              const valueComp =value.toLowerCase()
              if(title.includes(valueComp)){
                return valueF
              }
            })
          break;
          case 'business_types_id':
            filterMarkers =filterMarkers.filter(valueF => valueF[key]== value)
          break;
          case 'price': 
            filterMarkers =filterMarkers.filter(valueF =>{  
              const price = valueF[key]
              const min =value[0]
              const max= value[1]
              if(price > min && price < max){
                return valueF
              } 
            })
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
    set({ listMarkers: true})

    set({ filterValues: filtervalues})
    set({ markers: filterMarkers})
  },
  saveCoordinate: async(values)=>{
    set({ listMarkers: true})
    set({ markers: []})
    console.log('guardando datos')
    console.log(values)
    let formData = new FormData();
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('room', values.room)
    formData.append('toilet', values.toilet)
    formData.append('price', values.price)
    formData.append('long', values.long)
    formData.append('lat', values.lat)
    formData.append('business_types_id', values.business_types_id)

    console.log(values.images) 

    for (var i = 0; i < values.images.length; i++) { 
      formData.append('images[]', values.images[i])
    }

    const listAllMarkers = get().allMarkers
    const accessToken = localStorage.getItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
     const resp = ky
     .post(`${import.meta.env.VITE_REACT_APP_API_URL}/markers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },body:  formData
     }).json()
     .then((resp)=>{

     listAllMarkers.push(resp.data)
      console.log(resp.data)
    })
    .finally(()=>{
       set({ markers: listAllMarkers})
      // console.log('despues')
      // set({ allMarkers: listAllMarkers})
      // set({ coordinate: null })
      // console.log(listAllMarkers)
    })
  }
}))

export default useStore;