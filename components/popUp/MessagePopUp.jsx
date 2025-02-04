import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MessagePopUp = ({ data, text, style, isVisible }) => {

  const { styles, consts, setIsMessagePopUpVisible } = data;

  return(
    isVisible ?
      <View
        style={{
          ...styles.popUp.background,
          ...style,
        }}
      >
        <View
          style={{
            ...styles.popUp.container,
            height: 'auto',
            paddingBottom: 50*consts.px,
          }}
        >
          <Text style={{
            ...styles.popUp.title,
            fontSize: 30*consts.px,
            width: 350*consts.px,
          }}
          >{ text }</Text>

          <TouchableOpacity 
            style={{
              ...styles.popUp.button,
              marginTop: 20*consts.px,
              borderColor: data.theme[data.mode].noIcons,
              borderWidth: 5*consts.px,
            }}
            onPress={()=>setIsMessagePopUpVisible(false)}
          >
            <Text 
              style={{
                ...styles.popUp.textButton,
                height: '200%',
              }}
            >OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    : null
  )
}

export default MessagePopUp;