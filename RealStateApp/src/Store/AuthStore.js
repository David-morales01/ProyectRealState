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
        set({ status: true })
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
        set({ status: true })
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
          console.log(resp)
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
      set({ status: null })
      set({ user: null })
  },
  ErrorClose : ()=>{
    set(state => ({error: false }) )
  }
}))

export default useStore;