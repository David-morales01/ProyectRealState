import create from 'zustand' 
// import {devtools,persist} from 'zustand/middleware' 
import ky from "ky"; 
 
const useStore = create(set => ({ 
  user_id:null,
  status:null,
  disabled:false, 
  loading:false, 
  error :false, 
  errorRegister:false,
  login: async (values) => {  
    // set({ disabled: true })  
    // const resp = ky
    // .post(`${process.env.REACT_APP_API_URL}/login`, {
    //   json: values,  
    // }).json()
    // .then((resp) => {  
    //   localStorage.setItem('access_token_route_shortener', resp.access_token)
    //   set({ status: true })
    //   set({ error: false })       
    // })
    //  .catch((err) => {   
    //    set({ error: true })  
    //    console.log('error: ')
    //    console.log(err)   
    //  })  
    //  .finally(()=>{
    //   set({ disabled: false })  
    //   })
    console.log(values)
  },
  register: async (values) => { 
    set({ disabled: true })   
    const resp = ky
    .post(`${process.env.REACT_APP_API_URL}/register`, {
      json: values
    })
    .json()
    .then((resp) => {  
      localStorage.setItem('access_token_route_shortener', resp.access_token)
      set({ status: true })     
      set({ errorRegister: false })  
    })
    .catch((err) => {   
       set({ errorRegister: true })  
       console.log('error: ')
       console.log(err)   
     })
     .finally(()=>{
     set({ disabled: false })  
     })
  },
  validateUser: async () => {  
    const accessToken = localStorage.getItem('access_token_route_shortener') 
    const resp = ky.get(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json()
    .then((resp) => {  
      set({ user_id: resp.id })  
      set({ status: true })   
      set({ loading: true })    
      // set({ user: resp })   
    })
    .catch((err) => {  
      set({ loading: false })   
      set({ status: false })   
      localStorage.removeItem('access_token_route_shortener')  
      console.log(err)  
    })  
  },
    logOut:  () => {
      localStorage.removeItem('access_token_route_shortener')  
      set({ loading: false })  
      set({ status: false })  
  },
}))

export default useStore;