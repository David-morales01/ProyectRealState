import create from 'zustand'
// import {devtools,persist} from 'zustand/middleware'
import ky from "ky";

const useStore = create(set => ({
  user:{},
  status:null,
  disabled:false,
  loading:false,
  error :false,
  login: async (values) => {
     set({ disabled: true })
     const resp = ky
     .post(`${import.meta.env.VITE_REACT_APP_API_URL}/login`, {
       json: values,throwHttpErrors: false,
     }).json()
     .then((resp) => {
      if(resp.access_token){
        localStorage.setItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`, resp.access_token)
         
      }
      else{
        if(resp.errors){
          set({ error:  'The provided credentials are incorrect.' })
        }else{

          set({ error:  'server problems :( please try again later' })
        }
      }
     })  .
      catch((err) => {

        set({ error:  'server problems :( please try again later' })
      })
      .finally(()=>{
        set({ disabled: false })
      })
  },
  register: async (values) => { 
     set({ disabled: true })
     const resp = ky
     .post(`${import.meta.env.VITE_REACT_APP_API_URL}/register`, {
       json: values,throwHttpErrors: false,
     }).json()
     .then((resp) => {
      if(resp.access_token){ 
        localStorage.setItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`, resp.access_token)
         
      }
      else{
        if(resp.errors){
          set({ error:  'The provided credentials are incorrect.' })
        }else{

          set({ error:  'Server problems :( please try again later' })
        }
      }
     })  .
      catch((err) => {

        set({ error:  'Server problems :( please try again later' })
      })
      .finally(()=>{
        set({ disabled: false })
      }) 
  },
  
  restartValues: async () => { 
    set({ status: null })
    set({ disabled: false }) 
    
  },
  validateUser: async () => {  
    const accessToken = localStorage.getItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
    
    if(accessToken){
      const resp = ky.get(`${import.meta.env.VITE_REACT_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },throwHttpErrors: false,
      })
      .json()
      .then((resp) => {
        if(resp.message){
          set({ error:  'invalid Token, please try again later' }) 
          localStorage.removeItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
          set({ status: false }) 
        }else{  
          set({ status: true }) 
          set({ user: resp })  
        }
      })
      .catch((err) => {
        set({ error:  'Server problems :( please try again later' }) 
        localStorage.removeItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
        set({ status: false }) 
        console.log('error : ',err)
      }) 
       
    }else{
       
      set({ error:  'Login to continue' })  
      set({ status: false })  
    } 
  },
    logOut:  () => {
      localStorage.removeItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
      set({ status: false })
      set({ user: null })
  },
  ErrorClose : ()=>{
    set(state => ({error: false }) )
  },
  editPerfil: async (values)=>{
    
    set({ disabled: true })
    const id = values.id 
    //  let formData = new FormData();
    //  formData.append('id', values.id)
    //  formData.append('nombre', values.nombre)
    //  formData.append('email', values.email)
    //  formData.append('password', values.password)
    //  formData.append('img_user', values.img_user[0])
    //  console.log(values)
    const accessToken = localStorage.getItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
     const resp = ky
     .put(`${import.meta.env.VITE_REACT_APP_API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
      ,json:  values
     })
      .json()
      .then((resp)=>{
        console.log(resp)
       set({ user: resp}) 
     })
     .finally(()=>{
       set({ disabled: false })
       
     })
    
  }
}))

export default useStore;