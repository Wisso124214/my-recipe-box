import React, { useEffect, useRef, useState } from "react";
import { Button, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, TouchableHighlight, FlatList } from "react-native";
import Logo from "../logo/Logo";
import Input from "../input/Input";
import ButtonBack from "../buttonBack/ButtonBack";
import ContrastingButton from "../contrastingButton/ContrastingButton";
import Message from "../message/Message";
import CreatePassword from "../createPassword/CreatePassword";
import { saveDataRegister, getIdContact, getListUsernames, setMessage, redirectPage } from '../../utils/logicSession';
import { configFront } from '../../config/config';

const Register = ({ data }) => {

  const { 
    theme, mode, consts, dataInput, showDebugMenu, setShowDebugMenu, setStrPage, styles,
    devMode, dataMssg, dataButtonBack, setIsInputFocus, dataMessage, isInputFocus, setLoading,
  } = data;
  
  const { isHiddenMssg, setIsHiddenMssg, textMssg, setTestMssg, colorMssg, setColorMssg } = dataMssg;
  const [nInputSelected, setnInputSelected] = useState(-1);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const [listUsernames, setListUsernames] = useState([])

  //component styles
  const compStyles = {
    header: {
      fontFamily: styles.fonts.mali.bold,
      fontSize: 65 * consts.px,
      color: theme[mode].color,
      textShadowColor: theme[mode].shadowTitle,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
      marginTop: -35 * consts.px,
    },
    text: {
      fontFamily: styles.fonts.mali.medium,
      fontSize: 33 * consts.px,
      color: theme[mode].color,
      marginTop: -30 * consts.px,
    },
    input: {
      fontFamily: styles.fonts.mali.regular,
      marginBottom: 40 * consts.px,
    },
    footText: {
      fontFamily: styles.fonts.mali.bold,
      fontSize: 32 * consts.px,
      height: 60 * consts.px,
    },
  }
  
  const newDataMessage = {
    ...dataMessage,
    scale: 1.1,
    bgcolor: theme[mode].errorColor,
    hidden: false,
  }
  
  // Hidden on true it is "validation error", hidden on false it is "validation success"
  const objValidations = {
    username: {
      stateValue: useState(''),
      dataMessage: {
        dataValidation: useState({
          lineNumbers: 1,
          text: '',
          hidden: false,
        }),
      },
    },
    email: {
      stateValue: useState(''),
      dataMessage: {
        dataValidation: useState({
          lineNumbers: 1,
          text: '',
          hidden: false,
        }),
      },
    },
    password: {
      stateValue: useState(''),
      statePassword: useState(''),
      dataMessage: {
        dataValidation: useState({
          lineNumbers: 1,
          text: '',
          hidden: false,
        }),
      },
    },
    confirmPassword: {
      stateValue: useState(''),
      dataMessage: {
        dataValidation: useState({
          lineNumbers: 1,
          text: '',
          hidden: false,
        }),
      },
    },
  };



  useEffect(() => {
    SettingListUsernames(setListUsernames, objValidations.username.stateValue[0])
    
    //this is for debugging, it will fill the inputs with default values
    if (devMode[devMode.power].registerDebugging) {
      objValidations.username.dataMessage.dataValidation[0].hidden = true
      objValidations.email.dataMessage.dataValidation[0].hidden = true
      objValidations.password.dataMessage.dataValidation[0].hidden = true
      objValidations.confirmPassword.dataMessage.dataValidation[0].hidden = true

      objValidations.username.stateValue[1](devMode[devMode.power].usernameDefault)
      objValidations.email.stateValue[1](devMode[devMode.power].emailDefault)
      objValidations.password.stateValue[1](devMode[devMode.power].passwordDefault)
      objValidations.confirmPassword.stateValue[1](devMode[devMode.power].passwordDefault)
    }
  }, [])
  
  //set the list of usernames, this is for the validation of the username, to be unique
  const SettingListUsernames = async (setListUsernames, username) => {
    if (devMode[devMode.power].isFetchingDB) {
      setLoading(true)
      await getListUsernames(setListUsernames, username)
      setLoading(false)
    }
  }

  const handleRegister = async (objValidations) => {

    //check all fields are filled
    const allFilled = 
      objValidations.username.stateValue[0] !== '' &&
      objValidations.email.stateValue[0] !== '' &&
      objValidations.password.stateValue[0] !== '' &&
      objValidations.confirmPassword.stateValue[0] !== '' 

    if (!allFilled) {
      setTestMssg('Please fill in all fields');
      setColorMssg(theme[mode].errorColor);
      setIsHiddenMssg(false);
      
    } else {
      //check all error validations are hidden, i mean within errors
      const validation = 
        objValidations.username.dataMessage.dataValidation[0].hidden &&
        objValidations.email.dataMessage.dataValidation[0].hidden &&
        objValidations.password.dataMessage.dataValidation[0].hidden &&
        objValidations.confirmPassword.dataMessage.dataValidation[0].hidden

      if (validation) {

        //set the component loading over the screen
        setLoading(true)
        const id_contact = await getIdContact(objValidations.email.stateValue[0]);

        //the methods and props to be passed to the function
        const dataLogic = { 
          setIsKeyboardVisible, 
          setListUsernames, 
          listUsernames, 
          setLoading, 
          mode, 
          theme,
          methods: {
            setTestMssg,
            setColorMssg,
            setIsHiddenMssg,
            setLoading,
          }
        }

        console.log('validation true');
        saveDataRegister(id_contact, objValidations.username.stateValue[0], objValidations.password.stateValue[0], dataLogic, setIdMainSession)
        .then(() => {
          setLoading(false);
          cleanInputs(objValidations);
          redirectPage('detailsRecipy', 1000, setStrPage);
        })
        .catch((error) => {
          setLoading(false);
          setTestMssg('Error registering. Try again later');
          setColorMssg(theme[mode].errorColor);
          setIsHiddenMssg(false);
          console.log(JSON.stringify(error, null, 2));
        });
        
      } else {
        setTestMssg('Please correct the errors');
        setColorMssg(theme[mode].errorColor);
        setIsHiddenMssg(false);
      }
    }
  };

  const cleanInputs = (objValidations) => {
    objValidations.username.stateValue[1]('');
    objValidations.email.stateValue[1]('');
    objValidations.password.stateValue[1]('');
    objValidations.confirmPassword.stateValue[1]('');
  }

  useEffect(()=>{
    if (nInputSelected >= 0 && nInputSelected < 4)
      setIsInputFocus(true)
    
  },[nInputSelected])

  useEffect(()=>{
    !isKeyboardVisible ? setIsInputFocus(false) : null
  }, [isKeyboardVisible])

  useEffect(()=>{
    if(!isHiddenMssg){
      setTimeout(() => {
        setIsHiddenMssg(true)
      }, 3000);
    }
  },[isHiddenMssg])

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}
    >
      <ButtonBack 
        dataButtonBack={{ 
          ...dataButtonBack, 
          showBack: isKeyboardVisible,
          onPress: ()=>{
            setIsInputFocus(false)
            setIsKeyboardVisible(false)
          }
        }} />

      <View style={{
        position: 'absolute',
        top: isKeyboardVisible ? -295 *consts.px : 0,
        width: '100%',
        height: '100%',
      }} >
        <View 
          style={{ 
            position : 'absolute',
            width: '100%',
            height: '100%',
            top: -15 * consts.px,
            flexGrow: 1,
            width: 730*consts.px, 
            showsVerticalScrollIndicator: false, 
            showsHorizontalScrollIndicator: false
          }}>
        
          <View 
            style={{ 
              flex: 1,
              alignItems: 'center',
              justifyContent: 'start',
              top: 140 * consts.px,
          }} >
            
            <TouchableHighlight
                underlayColor={theme[mode].backgroundColor}
                onPress={() => devMode[devMode.power].debugMenuEnabled ? setShowDebugMenu(!showDebugMenu) : null}
              >
                <Logo logoSize={configFront.logoSize * consts.px} />
            </TouchableHighlight>
            <Text style={compStyles.header} >Welcome!</Text>
            <Text style={compStyles.text} >Create your account</Text>
            
              <View style={{
                marginTop: 50 * consts.px,
                alignItems: 'center',
              }} >
                <Input
                  placeholder="Username"
                  style={compStyles.input}
                  inputMode="text"
                  dCodeIcon="M7.5.875a3.625 3.625 0 0 0-1.006 7.109c-1.194.145-2.218.567-2.99 1.328-.982.967-1.479 2.408-1.479 4.288a.475.475 0 1 0 .95 0c0-1.72.453-2.88 1.196-3.612.744-.733 1.856-1.113 3.329-1.113s2.585.38 3.33 1.113c.742.733 1.195 1.892 1.195 3.612a.475.475 0 1 0 .95 0c0-1.88-.497-3.32-1.48-4.288-.77-.76-1.795-1.183-2.989-1.328A3.627 3.627 0 0 0 7.5.875ZM4.825 4.5a2.675 2.675 0 1 1 5.35 0 2.675 2.675 0 0 1-5.35 0Z"
                  dataInput={{
                    ...dataInput,
                    stateValue: objValidations.username.stateValue,
                    dataMessage: {
                      ...newDataMessage,
                      lineNumbers: objValidations.username.dataMessage.dataValidation[0].lineNumbers,
                      text: objValidations.username.dataMessage.dataValidation[0].text,
                      hidden: objValidations.username.dataMessage.dataValidation[0].hidden,
                    },
                    nInputSelected: nInputSelected,
                    isKeyboardVisible: isKeyboardVisible,
                    isRegisterInput: true,
                    index: 0,
                    textprops: {
                      maxLength: 20,
                      onFocus: () => {
                        setIsInputFocus(true)
                        setIsKeyboardVisible(true)
                        setnInputSelected(0)
                      },
                      onEndEditing: () => {
                        if(isKeyboardVisible){
                          setnInputSelected(1)
                        }
                      },
                      onBlur: () => {
                        setIsInputFocus(false)
                      },
                      onChangeText: (text) => {
                        objValidations.username.stateValue[1](text);

                        if (text.length < 6 && text.length > 0) {
                          objValidations.username.dataMessage.dataValidation[1]({
                            hidden: false,
                            lineNumbers: 1,
                            text: 'Must have at least 6 characters',
                          });
                        } else if (listUsernames.length > 0 && listUsernames.includes(text)) {
                          objValidations.username.dataMessage.dataValidation[1]({
                            hidden: false,
                            lineNumbers: 1,
                            text: 'This username is already taken',
                          });
                        } else {
                          objValidations.username.dataMessage.dataValidation[1]({
                            hidden: true,
                            lineNumbers: 1,
                            text: '',
                          });
                        }
                      },
                    }
                  }}
                  />

                <Input
                  placeholder="Email"
                  style={compStyles.input}
                  inputMode="email"
                  dCodeIcon="M1 2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H1Zm0 1h13v.925a.448.448 0 0 0-.241.07L7.5 7.967 1.241 3.995A.448.448 0 0 0 1 3.925V3Zm0 1.908V12h13V4.908L7.741 8.88a.45.45 0 0 1-.482 0L1 4.908Z"
                  dataInput={{
                    ...dataInput,
                    stateValue: objValidations.email.stateValue,
                    dataMessage: {
                      ...newDataMessage,
                      lineNumbers: objValidations.email.dataMessage.dataValidation[0].lineNumbers,
                      text: objValidations.email.dataMessage.dataValidation[0].text,
                      hidden: objValidations.email.dataMessage.dataValidation[0].hidden,
                    },
                    nInputSelected: nInputSelected,
                    isKeyboardVisible: isKeyboardVisible,
                    isRegisterInput: true,
                    index: 1,
                    textprops: {
                      maxLength: 50,
                      onFocus: () => {
                        setIsInputFocus(true)
                        setIsKeyboardVisible(true)
                        setnInputSelected(1)
                      },
                      onEndEditing: () => {
                        if(isKeyboardVisible){
                          setnInputSelected(2)
                        }
                      },
                      onBlur: () => {
                        setIsInputFocus(false)
                      },
                      onChangeText: (text) => {
                        objValidations.email.stateValue[1](text);
                        const emailRegex = new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}');
                        
                        if (text.length > 0 && !emailRegex.test(text)) {
                          objValidations.email.dataMessage.dataValidation[1]({
                            hidden: false,
                            lineNumbers: 1,
                            text: 'Please enter a valid email',
                          });
                        } else {
                          objValidations.email.dataMessage.dataValidation[1]({
                            hidden: true,
                            lineNumbers: 1,
                            text: '',
                          });
                        }
                      }
                    }
                  }}
                  />
                <CreatePassword 
                  data={{
                    ...data,
                    objValidations,
                    compStyles,
                    setIsKeyboardVisible,
                    nInputSelected,
                    setnInputSelected,
                    dataInput,
                    newDataMessage,
                    isInputFocus,
                    setIsInputFocus,
                    isKeyboardVisible,
                    showPassword: devMode[devMode.power].registerDebugging,
                  }}
                />
              </View>

              <ContrastingButton 
                text="Sign up" 
                theme={theme} 
                mode={mode} 
                consts={consts} 
                styles={styles}
                style={{ marginTop: 50 * consts.px }} 
                onPress={() => handleRegister(objValidations)}
                />
              
            <Message 
              dataMessage={{
                ...dataMessage,
                style: {
                  top: -755 * consts.px,
                  left: -(460/2) * consts.px,
                  width: 460 * consts.px,
                  zIndex: 3,
                  borderWidth: 1 * consts.px,
                  borderColor: theme[mode].noColor,
                },
                hidden: isHiddenMssg,
                theme,
                consts,
                mode,
                text: textMssg,
                bgcolor: colorMssg,
                styles,
              }}
            />
          </View>
        </View>

      </View>
      {
        !isKeyboardVisible ? 
        <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 40 * consts.px,
        }} >
        <Text
          style={{
            color: theme[mode].color,
            ...compStyles.footText,
          }}>
          Already have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            setStrPage('login');
            setIsHiddenMssg(true);
          }}
        >
          <Text
            style={{
              color: theme[mode].noColor,
              ...compStyles.footText,
              textShadowColor: theme[mode].color,
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 6,
              
            }}>
            Log in.
          </Text>
        </TouchableOpacity>
      </View>
      : null
      }
    </View>
    
  );
};

export default Register;