import React, { useEffect, useRef, useState } from "react";
import { Button, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, TouchableHighlight } from "react-native";
import Logo from "../logo/Logo";
import Input from "../input/Input";
import ButtonBack from "../buttonBack/ButtonBack";
import ContrastingButton from "../contrastingButton/ContrastingButton";
import Message from "../message/Message";
import SvgIconProvider from "../svg/svgIconProvider";
import bcrypt from 'react-native-bcrypt';
import axios from 'axios';
import { SERVER_URL, configFront } from "../../config/config";
import { redirectPage } from "../../utils/logicSession";
import { err } from "react-native-svg";

const Login = ({ data }) => {
  
  const { theme, styles, mode, consts, dataInput, showDebugMenu, setShowDebugMenu, setStrPage, devMode, dataMssg, dataButtonBack, setIsInputFocus, isInputFocus, dataMessage, defaultValueUsernameLogin, setLoading } = data;
  const { isHiddenMssg, setIsHiddenMssg, textMssg, setTestMssg, colorMssg, setColorMssg } = dataMssg;
  
  const [isHiddenIconQuestion, setIsHiddenIconQuestion] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [textInput, setTextInput] = useState([defaultValueUsernameLogin, '']);
  const [lineNumbers, setLineNumbers] = useState(undefined);
  
  const handleLogin = async () => {
    
    if (textInput[0] === '' || textInput[1] === '') {
      setTestMssg('Please fill in all fields');
      setColorMssg(theme[mode].errorColor);
      setIsHiddenIconQuestion(false);
      setIsHiddenMssg(false);
      return;
    }

    setLoading(true);
    setIsKeyboardVisible(false);
    setIsInputFocus(false);

    //establecer un número de error, si es 100 no hay error. 
    //Solo reemplaza valor de la variable si aumenta, no si disminuye

    /**
     *   1 - Usuario o contraseña incorrectos
     *   2 - Error al iniciar sesión. Intente de nuevo
     * 100 - No hay error
     */

    let idRes = 0;
    await axios.get(`${SERVER_URL}/users`,
      { params: { username: textInput[0] } }
    ).then(async (res) => {

      setIsKeyboardVisible(false)
      res.data.forEach(async (objuser) => {

        if (objuser.username === textInput[0] && bcrypt.compareSync(textInput[1], objuser.password)) {

          const id_user = objuser._id;

          await axios.get(`${SERVER_URL}/sessions`,
            { params: { id_user: id_user } }
          ).then(async (res) => {
            let isFound = false;

            await res.data.forEach(async (objsession) => {
              if (objsession.id_user === id_user) {
                isFound = true;
                const id_session = objsession._id;
                const session = {
                  id_user: id_user,
                  state: 'open',
                  date: new Date(),
                }
                await axios.put(`${SERVER_URL}/session/${id_session}`, session)
                  .then((res) => {
                    
                    idRes = idRes < 100 ? 100 : idRes;
                    setIdMainSession(id_session);
                    redirectPage('detailsRecipy', 1000, setStrPage);
                  })
                  .catch((error) => {
                    idRes = idRes < 2 ? 2 : idRes;
                    console.log(JSON.stringify(error, null, 2));
                  })
              }
            })

            if (!isFound) {
              idRes = idRes < 1 ? 1 : idRes;
            }
          }).catch((error) => {
            console.log(JSON.stringify(error, null, 2))
          })
        } else {
          idRes = idRes < 1 ? 1 : idRes;
        }
      })

    }).then(() => {

      let errorMssg = '';
      let color = '';

      switch (idRes) {
        case 1:
          errorMssg = 'User or password are wrong';
          color = theme[mode].errorColor;
          setLineNumbers(1);
          break;
        case 2:
          errorMssg = 'Error logging in. Try again';
          color = theme[mode].errorColor;
          setLineNumbers(1);
          break;
        case 100:
          errorMssg = 'Login successful';
          color = theme[mode].successColor;
          setLineNumbers(1);
          break;
        default:
          errorMssg = 'Error logging in. Try again';
          color = theme[mode].errorColor;
          setLineNumbers(1);
          break;
      }
      console.log(errorMssg);
      setLoading(false);
      setTestMssg(errorMssg);
      setColorMssg(color);
      setIsHiddenIconQuestion(true);
      setIsHiddenMssg(false);
      
    }).catch((error) => {
      setLoading(false);
      setTestMssg('Internet connection error');
      setLineNumbers(1);
      setColorMssg(theme[mode].errorColor);
      setIsHiddenIconQuestion(true);
      setIsHiddenMssg(false);
      console.log(JSON.stringify(error, null, 2));
    })
  }

  const compStyles = {
    header: {
      fontSize: 65 * consts.px,
      fontWeight: 'bold',
      color: theme[mode].color,
      textShadowColor: theme[mode].shadowTitle,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
      marginTop: 20 * consts.px,
    },
    text: {
      fontSize: 33 * consts.px,
      color: theme[mode].color,
      marginTop: 10 * consts.px,
    },
    input: {
      marginBottom: 50 * consts.px,
    },
    footText: {
      fontSize: 35 * consts.px,
      fontWeight: 'bold',
      height: 60 * consts.px,
    },
    iconQuestion: {
      position: 'relative',
      top: 10,
      left: 10,
      color: theme[mode].icons,
      px: 18*consts.px,
    },
  }

  return (
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }} >
        <ButtonBack 
        dataButtonBack={{ 
          ...dataButtonBack, 
          onPress: ()=>{
            setIsInputFocus(false)
            setIsKeyboardVisible(false)
          }
        }} />

        <View 
          style={{ 
            position : 'absolute',
            flexGrow: 1, 
            alignItems: 'center',
            width: '100%',
            height: '90%',
            showsVerticalScrollIndicator: false, 
            showsHorizontalScrollIndicator: false
          }}>
        
          <View 
            style={{ 
              flex: 1,
              alignItems: 'center',
              top: 130 * consts.px,
              justifyContent: 'start',
          }} >
            
            <TouchableHighlight
                underlayColor={theme[mode].backgroundColor}
                onPress={() => devMode[devMode.power].debugMenuEnabled ? setShowDebugMenu(!showDebugMenu) : null}
              >
                <Logo logoSize={configFront.logoSize * consts.px} />
            </TouchableHighlight>
            <Text style={compStyles.header} >Welcome back!</Text>
            <Text style={compStyles.text} >Login to your account</Text>
            
            <View style={{
              marginTop: 150 * consts.px,
              alignItems: 'center',
              width: '100%',
              left: '2%',
            }} >
              <Input
                placeholder="Username"
                style={compStyles.input}
                inputMode="text"
                dCodeIcon="M7.5.875a3.625 3.625 0 0 0-1.006 7.109c-1.194.145-2.218.567-2.99 1.328-.982.967-1.479 2.408-1.479 4.288a.475.475 0 1 0 .95 0c0-1.72.453-2.88 1.196-3.612.744-.733 1.856-1.113 3.329-1.113s2.585.38 3.33 1.113c.742.733 1.195 1.892 1.195 3.612a.475.475 0 1 0 .95 0c0-1.88-.497-3.32-1.48-4.288-.77-.76-1.795-1.183-2.989-1.328A3.627 3.627 0 0 0 7.5.875ZM4.825 4.5a2.675 2.675 0 1 1 5.35 0 2.675 2.675 0 0 1-5.35 0Z"
                dataInput={{
                  ...dataInput,
                  defaultValue: defaultValueUsernameLogin,
                  stateValue: [textInput, setTextInput],
                  isKeyboardVisible: isKeyboardVisible,
                  index: 0,
                  isLoginInput: true,
                  textprops: {
                    maxLength: 20,
                    onFocus: () => {
                      setIsKeyboardVisible(true);
                      setIsInputFocus(true);
                    },
                    onBlur: () => {
                      setIsKeyboardVisible(false);
                    },
                    onChangeText: (text) => {
                      setTextInput((prev)=>[text, textInput[1]]);
                    }
                  }
                }} />

              <Input
                placeholder="Password"
                style={compStyles.input}
                secretWriting={true}
                inputMode="text"
                dCodeIcon="M5 4.636c0-.876.242-1.53.643-1.962.396-.427 1.003-.696 1.858-.696.856 0 1.462.269 1.857.694.4.431.642 1.085.642 1.961V6H5V4.636ZM4 6V4.636c0-1.055.293-1.978.91-2.643.623-.67 1.517-1.015 2.591-1.015 1.075 0 1.969.344 2.59 1.014.617.664.909 1.587.909 2.641V6h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1ZM3 7h9v6H3V7Z"
                dataInput={{
                  ...dataInput,
                  defaultValue: '',
                  stateValue: [textInput, setTextInput],
                  index: 1,
                  isLoginInput: true,
                  isKeyboardVisible: isKeyboardVisible,
                  textprops: {
                    maxLength: 25,
                    onFocus: () => {
                      setIsKeyboardVisible(true);
                      setIsInputFocus(true);
                    },
                    onBlur: () => {
                      setIsKeyboardVisible(false);
                    },
                    onChangeText: (text) => {
                      setTextInput((prev)=>[textInput[0], text]);
                    }
                  }
                }} />
            </View>

            <ContrastingButton 
              text="Log in" 
              theme={theme} 
              mode={mode} 
              consts={consts} 
              styles={{ marginTop: 50 * consts.px, marginBottom: 260 * consts.px }} 
              onPress={handleLogin}
              />

            {
              isHiddenIconQuestion ? 
              null :
              <TouchableHighlight
                style={{
                  position: 'absolute',
                  top: 721* consts.px,
                  left: -74 * consts.px,
                  width: 50*consts.px,
                  height: 50*consts.px,
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
                onPress={() => {
                  if (isHiddenIconQuestion === false){
                    setStrPage('forgotPassword');
                  }
                }}
                underlayColor={'transparent'}
              >
                <SvgIconProvider 
                  d="M5.075 4.1c0-1.189 1.182-2.175 2.425-2.175 1.243 0 2.425.986 2.425 2.175 0 1.099-.557 1.614-1.306 2.279l-.031.027C7.845 7.065 6.925 7.88 6.925 9.5a.575.575 0 1 0 1.15 0c0-1.085.554-1.594 1.307-2.26l.02-.02c.748-.662 1.673-1.482 1.673-3.12C11.075 2.128 9.219.775 7.5.775S3.925 2.128 3.925 4.1a.575.575 0 1 0 1.15 0ZM7.5 13.358a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75Z"
                  styles={ compStyles.iconQuestion }
                  src="styles"
                  strprops="px, color"
                  styleview={{
                    position: 'absolute',
                    backgroundColor: theme[mode].backgroundColor,
                    borderRadius: 20*consts.px,
                    borderColor: theme[mode].icons,
                    borderWidth: 3*consts.px,
                    padding: 2*consts.px,
                  }}
                  stylesvg={{
                    position: 'relative',
                    top: -0.5*consts.px,
                    left: -0.5*consts.px,

                  }}
                /> 
              </TouchableHighlight>
            }
             
            {
              !isInputFocus ? 
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  position: 'absolute',
                  bottom: 50 * consts.px,
                }} >
                <Text
                  style={{
                    color: theme[mode].color,
                    ...compStyles.footText,
                  }}>
                  Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => { setStrPage('register'); setIsHiddenMssg(true); }}
                >
                  <Text
                    style={{
                      color: theme[mode].noColor,
                      ...compStyles.footText,
                      textShadowColor: theme[mode].color,
                      textShadowOffset: { width: 2, height: 2 },
                      textShadowRadius: 6,
                    }}>
                    Sign up.
                  </Text>
                </TouchableOpacity>
              </View>
              : null
            }
            <Message 
              dataMessage={{
                ...dataMessage,
                style: {
                  top: -775 * consts.px,
                  left: -(460/2) * consts.px,
                  width: 460 * consts.px,
                },
                hidden: isHiddenMssg,
                theme: theme,
                consts: consts,
                mode: mode,
                text: textMssg,
                bgcolor: colorMssg,
                lineNumbers: lineNumbers,
              }}
            />
          </View>
        </View>
      </View>
    
  );
};

export default Login;