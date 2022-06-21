import {extendTheme} from '@chakra-ui/react';

const Theme = extendTheme({
  colors:{
    bg : {
      light:'#f6f7f8',
      dark: '#1a202c',
      containerLight:'#ffffff',
      containerDark:'#1a365d',
      buttonLight : '#0080FF',
      buttonDark : '#0066CC', 
      sidebarLight:'#201b4e',
      sidebarDark:'#201b4e',
      linkLight :'#373488',
      linkDark :'#3C3295',
      containerHeaderLight:'#F6F6F9',
      containerHeaderDark:'#3B5C8E', 
    },
    color:{
      logoLight: '#dedfe4',
      logoDark:'#1a365d',
      linkLight:'#5a5fdf',
      linkDark:'#5D62FF',
      errorLight:'#FF655D',
      errorDark:'#F1291F',
      iconLight :'#fefefe',
      iconDark:'#a19cb2',
    },
    icon:{
      iconLight :'#a09fa7',
      iconDark:'#fefefe',
    }
  },

})
export default Theme ;