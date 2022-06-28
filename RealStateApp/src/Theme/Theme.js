import {extendTheme} from '@chakra-ui/react';

const Theme = extendTheme({
  colors:{
    bg : { 
      containerLight:'rgba(255, 255, 254,.5)',
      containerDark:'rgba(17,24,39,.5)', 
      buttonLight : '#0080FF',
      buttonDark : '#0066CC',  
      linkLight :'#373488',
      linkDark :'#3C3295',   
      alertLight :'rgba(254, 178, 178, 0.16)',
      alertDark :'rgba(254, 178, 178, 0.16)', 
      headerLight :'#3347d3',
      headerDark :'#3347d3',  
    },
    color:{ 
      linkLight:'#5a5fdf',
      linkDark:'#5D62FF', 
      errorLight:'#FF655D',
      errorDark:'#F1291F',
      borderLight:'rgb(229 231 235 / 1)',
      borderDark:'rgb(55 65 81 / 1)', 
    }, 
  },

})
export default Theme ;

/*  
  _after={{ position:'absolute', content:'""', background:'transparent', widht:'100%', height:'80%', boxShadow:'0px 0px 20px RGB(224, 224, 224)', insetInline:'0' ,insetBlock:'20%'}}

*/