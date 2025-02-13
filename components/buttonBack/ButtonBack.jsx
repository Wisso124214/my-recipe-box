import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import SvgIconProvider from '../svg/svgIconProvider';
import { configFront } from "../../config/config";

const ButtonBack = ({ dataButtonBack, styleview }) => {

  const { theme, mode, consts, setIsInputFocus, isInputFocus, onPress, breadCrumb, setBreadCrumb, setStrPage, ifBreadCrumbEmpty } = dataButtonBack;
  let { showBack } = dataButtonBack;

  showBack = showBack === undefined ? isInputFocus : showBack

  const compStyles = {
    icon:
    {
      color: theme[mode].icons,
      px: 60 * consts.px,
    }
  }

  return (
    showBack ? 
    <View style={{
      position: 'absolute',
      top: 150 * consts.px,
      left: 100 * consts.px,
      ...styleview,
    }} >
      <TouchableOpacity 
        activeOpacity={configFront.activeOpacity}
        style={{ 
          position: 'absolute',
          borderRadius: 50 * consts.px,
          width: 60 * consts.px,
          height: 60 * consts.px,
          zIndex: 1,
        }}
        onPress={()=>{
          console.log(breadCrumb[breadCrumb.length - 2])
          if (breadCrumb[breadCrumb.length - 2] !== undefined) {
            setIsInputFocus(false)
          
            if (breadCrumb[breadCrumb.length - 2] !== 'keyboard') {
              setStrPage(breadCrumb[breadCrumb.length - 2])
            }
            onPress();
          } else {
            ifBreadCrumbEmpty();
          }
          setBreadCrumb(breadCrumb.slice(0, -1))
        }}
      >
        <SvgIconProvider
          src='styles.icon'
          strprops='color, px, top, left'
          d='M6.854 3.146a.5.5 0 0 1 0 .708L3.707 7H12.5a.5.5 0 0 1 0 1H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0Z'
          styles={compStyles}
        />
      </TouchableOpacity>
    </View> 
    : null
  );
};

export default ButtonBack;