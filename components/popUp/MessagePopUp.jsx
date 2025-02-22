import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { configFront } from '../../config/config';

const MessagePopUp = ({ data, text, style, isVisible, content, stylesViewContent }) => {

  const { styles, consts, setIsMessagePopUpVisible, theme, mode } = data;

  return(
    isVisible ?
      <View
        style={{
          ...styles.popUp.background,
          ...style,
        }}
      >
        {
          content === undefined ?
          <View
            style={{
              ...styles.popUp.container,
              height: 'auto',
              paddingBottom: 50*consts.px,
            }}
          >
            <Text style={{
              ...styles.popUp.title,
              fontSize: 28*consts.px,
              width: 350*consts.px,
            }}
            >{ text }</Text>

            <TouchableOpacity 
              activeOpacity={configFront.activeOpacity}
              style={{
                ...styles.popUp.button,
                marginTop: 20*consts.px,
                borderColor: theme[mode].noIcons,
                borderWidth: 5*consts.px,
              }}
              onPress={()=>setIsMessagePopUpVisible(false)}
            >
              <Text 
                style={{
                  ...styles.popUp.textButton,
                  fontFamily: styles.fonts.mali.bold,
                  top: -2*consts.px,
                  height: '310%',
                }}
              >OK</Text>
            </TouchableOpacity>
          </View>
          :
          <>
            { content }
          </>
        }
      </View>
    : null
  )
}

export default MessagePopUp;