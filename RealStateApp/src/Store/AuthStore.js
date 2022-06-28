import create from 'zustand'
// import {devtools,persist} from 'zustand/middleware'
import ky from "ky";

const useStore = create(set => ({
  user_id:null,
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
        localStorage.setItem('access_token_real_state', resp.access_token)
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
        localStorage.setItem('access_token_real_state', resp.access_token)
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
  validateUser: async () => {
    console.log('validado')
    const accessToken = localStorage.getItem('access_token_real_state')
    const resp = ky.get(`${import.meta.env.VITE_REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },throwHttpErrors: false,
    })
    .json()
    .then((resp) => {
      // set({ user: resp })
      if(resp.message){
        localStorage.removeItem('access_token_real_state')
        set({ status: false })
        set({ error:  'Invalid Token, please try again later' }) 
      }else{ 
        set({ status: true })
      }
    })
    .catch((err) => {
      
      localStorage.removeItem('access_token_real_state')
      set({ status: false }) 
      console.log('error : ',err)
      set({ error:  'Server problems :( please try again later' })
    })
    .finally(()=>{
      set({ loading: true })
    })
  },
    logOut:  () => {
      localStorage.removeItem('access_token_real_state')
      set({ status: false })
  },
  ErrorClose : ()=>{
    set(state => ({error: false }) )

  }
}))

export default useStore;