import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from "react-native-svg"
import Input from '../input/Input';
import ContrastingButton from '../contrastingButton/ContrastingButton';
import ButtonBack from '../buttonBack/ButtonBack';
import { configFront } from '../../config/config';


const ForgotPass1 = ({ dataForgotPassword }) => {
  const { dataPages, compStyles, setPagefp } = dataForgotPassword;
  const { styles, mode, theme, consts, dataInput, showDebugMenu, setShowDebugMenu, 
    dataButtonBack, isInputFocus, setIsInputFocus, setStrPage,
  } = dataPages;

  const delay = 100;
  const [isDelay, setIsDelay] = React.useState(false);

  useEffect(()=>{
    if (!isInputFocus) {
      setTimeout(() => {
        setIsDelay(true);
      }, delay);
    }
  }, [isInputFocus])

  return(
    <View style={ compStyles.container } >
      <Text style={ compStyles.header } >Forgot Password</Text>
      <ButtonBack 
        dataButtonBack={{ 
          ...dataButtonBack, 
          isInputFocus: true,
          setStrPage,
          onPress: () => {
            if(isInputFocus){
              setIsInputFocus(false);
            }
          },
          ifBreadCrumbEmpty: () => {
            if(!isInputFocus){
              setStrPage('login')
              setIsInputFocus(false);
            }
          },
        }} 
        styleview={{
          position: 'absolute',
          width: '100%',
          top: 115 * consts.px,
          left: 90 * consts.px,
        }} />

      <Svg
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 15 15 "
        style={{ 
          width: 230*consts.px, 
          height: 230*consts.px,
          marginBottom: 30*consts.px,
        }}
        onPress={()=> setShowDebugMenu(!showDebugMenu) }
      >
        <Path
          fill={theme[mode].icons}
          fillRule="evenodd"
          d="M7.5.875a3.625 3.625 0 0 0-1.006 7.109c-1.194.145-2.218.567-2.99 1.328-.982.967-1.479 2.408-1.479 4.288a.475.475 0 1 0 .95 0c0-1.72.453-2.88 1.196-3.612.744-.733 1.856-1.113 3.329-1.113s2.585.38 3.33 1.113c.742.733 1.195 1.892 1.195 3.612a.475.475 0 1 0 .95 0c0-1.88-.497-3.32-1.48-4.288-.77-.76-1.795-1.183-2.989-1.328A3.627 3.627 0 0 0 7.5.875ZM4.825 4.5a2.675 2.675 0 1 1 5.35 0 2.675 2.675 0 0 1-5.35 0Z"
          clipRule="evenodd"
        />
      </Svg>

      <Text style={{
        ...compStyles.title,
        fontFamily: styles.fonts.mali.bold,
      }} >Enter username</Text>
      <Text style={ compStyles.text } >We will send a code to the associated email.</Text>
      <Input 
        centered
        placeholder="Username"
        style={{ marginBottom: 150*consts.px }}
        mode={mode}
        theme={theme}
        consts={consts}
        styles={styles}
        dataInput={{
          ...dataInput,
          maxLength: 50,
        }} />
      <ContrastingButton 
        text="Send" 
        theme={theme} 
        mode={mode} 
        onPress={()=> setPagefp(1)}
        consts={consts} 
        styles={styles} />
      
      {
        !isInputFocus && isDelay ?
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            bottom: 50 * consts.px,
          }} >
          <TouchableOpacity
            activeOpacity={configFront.activeOpacity}
            onPress={() => { setStrPage('login'); }}
          >
            <Text
              style={{
                fontFamily: styles.fonts.mali.bold,
                color: theme[mode].color,
                fontSize: 35 * consts.px,
                height: 60 * consts.px,
                textShadowColor: theme[mode].shadowTitle,
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 6,
                textDecorationLine: 'underline',
              }}>
              Forgot usernames?
            </Text>
          </TouchableOpacity>
        </View>
        : null
      }
    </View>
  )
}

export default ForgotPass1;