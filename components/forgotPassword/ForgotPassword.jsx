import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ForgotPass1 from './ForgotPass1';
import ForgotPass2 from './ForgotPass2';
import ForgotPass3 from './ForgotPass3';

const ForgotPassword = ({ data }) => {
  
  const { theme, mode, consts, devMode, dataPinInput, styles } = data;
  const [pagefp, setPagefp] = useState(devMode[devMode.power].pagefp);

  const compStyles = {
    container: {
      flex: 1,
      justifyContent: 'start',
      alignItems: 'center',
      width: 709 * consts.px,      
      height: '100%',
      fontFamily: styles.fonts.mali.regular,
    },
    header: {
      fontFamily: styles.fonts.mali.bold,
      fontSize: 35 * consts.px,
      color: theme[mode].icons,
      marginTop: 100 * consts.px,
      marginBottom: 40 * consts.px,
    },
    title: {
      fontFamily: styles.fonts.mali.bold,
      fontSize: 45 * consts.px,
      color: theme[mode].color,
      marginBottom: 30 * consts.px,
    },
    text: {
      fontFamily: styles.fonts.mali.medium,
      fontSize: 25 * consts.px,
      color: theme[mode].color,
      marginBottom: 30 * consts.px,
      top: -30 * consts.px,
    },
    input: {
      fontFamily: styles.fonts.mali.regular,
      marginBottom: 50 * consts.px,
      fontFamily: styles.fonts.mali.medium,
    },
  }

  const dataForgotPassword = {
    dataPages: data,
    compStyles: compStyles,
    pagefp: pagefp,
    setPagefp: setPagefp,
    dataPinInput: dataPinInput,
    devMode: devMode,
  }
  
  const forgotpassword = [
    <ForgotPass1 dataForgotPassword={dataForgotPassword} />,
    <ForgotPass2 dataForgotPassword={dataForgotPassword} />,
    <ForgotPass3 dataForgotPassword={dataForgotPassword} />,
  ]

  return (
    <View>
      {forgotpassword[pagefp]}
    </View>
  )
}

export default ForgotPassword;