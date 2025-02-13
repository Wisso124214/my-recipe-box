import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from "react-native-svg"
import Input from '../input/Input';
import ContrastingButton from '../contrastingButton/ContrastingButton';
import ButtonBack from '../buttonBack/ButtonBack';


const ForgotUsernames = ({ dataForgotPassword }) => {
  const { dataPages, compStyles, setPagefp } = dataForgotPassword;
  const { styles, mode, theme, consts, dataInput, showDebugMenu, setShowDebugMenu, dataButtonBack, isInputFocus, setIsInputFocus, setStrPage } = dataPages;

  return(
    <View style={ compStyles.container } >
      <Text style={ compStyles.header } >Forgot Usernames</Text>
      <ButtonBack 
        dataButtonBack={{ 
          ...dataButtonBack, 
          isInputFocus: true,
          setStrPage,
          onPress: ()=>{
            if(isInputFocus){
              setIsInputFocus(false)
            }
          },
          ifBreadCrumbEmpty: ()=>{
            if(!isInputFocus){
              setStrPage('login')
            }
          },
        }} 
        styleview={{
          position: 'absolute',
          top: 115 * consts.px,
          left: -20 * consts.px,
        }} />

      <Svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 32 32"
        style={{ 
          width: 230*consts.px, 
          height: 230*consts.px,
          marginBottom: 50*consts.px,
        }}
        onPress={()=> setShowDebugMenu(!showDebugMenu) }
        >
          <Path 
            fill={theme[mode].icons}
            d="M16.59 20.41 20.17 24l-3.59 3.59L18 29l5-5-5-5-1.41 1.41zM23.59 20.41 27.17 24l-3.59 3.59L25 29l5-5-5-5-1.41 1.41z" />
          <Path
            fill={theme[mode].icons}
            d="M14 23H4V7.91l11.43 7.91a1 1 0 0 0 1.14 0L28 7.91V17h2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10ZM25.8 7 16 13.78 6.2 7Z" />
          <Path
            d="M0 0h32v32H0z"
            data-name="&lt;Transparent Rectangle&gt;"
            style={{
              fill: 'none',
            }}
          />
      </Svg>

      <Text style={{
        ...compStyles.title,
        fontFamily: styles.fonts.mali.bold,
      }} >Enter email address</Text>
      <Text style={{
        ...compStyles.text,
        width: 560*consts.px,
        textAlign: 'center',
      }} >We will send you the usernames associated with your email.</Text>
      <Input 
        centered
        placeholder="example@example.com"
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
        styles={styles}
        onPress={()=> setPagefp(1)}
        consts={consts} />
    </View>
  )
}

export default ForgotUsernames;