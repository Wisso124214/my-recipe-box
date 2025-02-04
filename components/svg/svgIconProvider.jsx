import React from 'react';
import SvgIcon from './SvgIcon';
import { View } from 'react-native';

const SvgIconProvider = (props) => {

  //src, strprops, d, styles
  //strprops: 'color, px, top, left'

  //creo la variable global styles para que la reconozca el eval
  window.styles = props.styles

  let obj = {}
  let arr = props.strprops ? props.strprops.split(',') : ['color', 'px', 'top', 'left']
  const src = props.src ? props.src : 'styles'

  arr.forEach((item) => {
    let str = item.replace(/\s/g, '');
    obj[str] = eval(src+'.'+str)
  })

  return(
    <View style={props.style}>
      <SvgIcon {...props} {...obj} d={props.d} />
    </View>
  )
}

export default SvgIconProvider;