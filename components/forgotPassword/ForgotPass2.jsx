import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from "react-native-svg"
import ContrastingButton from '../contrastingButton/ContrastingButton';
import ButtonBack from '../buttonBack/ButtonBack';
import PinInput from '../pinInput/PinInput';


const ForgotPass2 = ({ dataForgotPassword }) => {
  const { dataPages, compStyles, setPagefp, pagefp, devMode } = dataForgotPassword;
  const { styles, mode, theme, consts, showDebugMenu, setShowDebugMenu, dataButtonBack, isInputFocus, setIsInputFocus, dataPinInput } = dataPages;
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [pinSelected, setPinSelected] = React.useState(0);
  const ncomponents = 5;

  useEffect(()=>{
    isInputFocus && pinSelected === 0 ? setIsKeyboardVisible(true) : null
  }, [isInputFocus])

  useEffect(()=>{
    !isKeyboardVisible ? setIsInputFocus(false) : null
  }, [isKeyboardVisible])

  return(
    <View style={ compStyles.container }>
      <Text style={ compStyles.header } >Forgot Password</Text>
      <ButtonBack 
        dataButtonBack={{ 
          ...dataButtonBack, 
          isInputFocus: true,
          onPress: ()=>{
            if(isInputFocus){
              setIsInputFocus(false)
              setIsKeyboardVisible(false)
            }else{
              setPagefp(pagefp-1)
            }
          }
        }} 
        styleview={{
          position: 'absolute',
          top: 115 * consts.px,
          left: 90 * consts.px,
        }} />

      <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        style={{ 
          width: 230*consts.px, 
          height: 230*consts.px,
          marginBottom: 50*consts.px,
        }}
        onPress={()=> setShowDebugMenu(!showDebugMenu) }
        viewBox="0 0 512 512"
      >
        <Path 
          fill={theme[mode].icons}
          d="M405.333 298.667H106.667C47.759 298.667 0 346.426 0 405.333S47.759 512 106.667 512h298.667C464.241 512 512 464.241 512 405.333s-47.759-106.666-106.667-106.666zm0 170.666H106.667c-35.343 0-64-28.657-64-64s28.657-64 64-64h298.667c35.343 0 64 28.657 64 64s-28.657 64-64.001 64zM170.667 277.335h170.667c11.782 0 21.333-9.551 21.333-21.333v-128c0-11.782-9.551-21.333-21.333-21.333V85.333C341.333 38.202 303.131 0 256 0s-85.333 38.202-85.333 85.333v21.336c-11.782 0-21.333 9.551-21.333 21.333v128c-.001 11.782 9.551 21.333 21.333 21.333zm42.666-192.002c0-23.567 19.099-42.667 42.667-42.667s42.667 19.099 42.667 42.667v21.333h-85.333V85.333zM320 234.669H192v-85.333h128v85.333z" />
        <Path 
          fill={theme[mode].icons}
          d="M128 362.667c-11.782 0-21.333 9.551-21.333 21.333v42.667c0 11.782 9.551 21.333 21.333 21.333 11.782 0 21.333-9.551 21.333-21.333V384c0-11.782-9.551-21.333-21.333-21.333zM213.333 362.667C201.551 362.667 192 372.218 192 384v42.667c0 11.782 9.551 21.333 21.333 21.333 11.782 0 21.333-9.551 21.333-21.333V384c.001-11.782-9.551-21.333-21.333-21.333zM298.667 362.667c-11.782 0-21.333 9.551-21.333 21.333v42.667c0 11.782 9.551 21.333 21.333 21.333 11.782 0 21.333-9.551 21.333-21.333V384c0-11.782-9.551-21.333-21.333-21.333zM405.333 405.333h-42.667c-11.782 0-21.333 9.551-21.333 21.333S350.885 448 362.667 448h42.667c11.782 0 21.333-9.551 21.333-21.333s-9.552-21.334-21.334-21.334z" />
      </Svg>

      <Text style={{
        ...compStyles.title,
        fontFamily: styles.fonts.mali.bold,
      }} >Enter verification code</Text>
      <Text style={ compStyles.text } >We have sent a verification code to your email.</Text>
      
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {
          Array.from({ length: ncomponents }).map((_, index) => (
            <PinInput
              key={index}
              dataPinInput={{
                ...dataPinInput,
                devMode: devMode,
                isPinInput: true,
                ncomponents: ncomponents,
                isKeyboardVisible: isKeyboardVisible,
                setIsKeyboardVisible: setIsKeyboardVisible,
                pinSelected: pinSelected,
                setPinSelected: setPinSelected,
                index: index,
              }} 
            />
          ))
        }
      </View>

      <ContrastingButton 
        text="Send" 
        theme={theme} 
        mode={mode} 
        styles={styles}
        consts={consts}
        onPress={()=>setPagefp(pagefp+1)} />
    </View>
  )
}

export default ForgotPass2;