import create from 'zustand'  

const useStore = create(set => ({
  route:null,
 
  ChangeRoute : (value)=>{
    set(state => ({route: value }) )
  }
}))

export default useStore;