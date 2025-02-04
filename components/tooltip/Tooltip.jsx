import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Tooltip = ({ data, text, showingTime, styleview, styletext }) => {
  
  const { theme, mode, consts, isShow, setIsShow } = data;
  
  showingTime = showingTime ? showingTime : 2000;

  useEffect(()=>{
    if(isShow){
      setTimeout(()=>{
        setIsShow(false);
      }, showingTime)
    }
  },[isShow])

  return(
    isShow ? 
      <View
      style={{
        position: 'absolute',
        height: 50*consts.px,
        width: 160*consts.px,
        backgroundColor: theme[data.mode].icons,
        borderRadius: 30*consts.px,
        top: -60*consts.px,
        left: -25*consts.px,
        justifyContent: 'center',
        ...styleview,
      }}
    >
      <Text
        style={{
          color: theme[mode].noColor,
          fontSize: 24*consts.px,
          textAlign: 'center',
          ...styletext,
        }}
      >
        {text.replace(text[0], text[0].toUpperCase())}
      </Text>
    </View>
    : null
  )
}

export default Tooltip;