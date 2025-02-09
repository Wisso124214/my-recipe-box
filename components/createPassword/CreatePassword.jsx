import { View, Text } from "react-native";
import Input from "../input/Input";
import { useEffect, useState } from "react";

const CreatePassword = ({ data, style }) => {

  const { theme, mode, consts, objValidations, dataInput, newDataMessage, isInputFocus,
    setIsInputFocus, isKeyboardVisible, setIsKeyboardVisible, nInputSelected, styles,
    setnInputSelected, compStyles, showPassword } = data;
  
  const isSecretWriting = (showPassword === undefined || showPassword === false) ? true : showPassword;
  const [passwordState, setPasswordState] = useState('high');

  useEffect(() => {
    if (objValidations.confirmPassword.stateValue[0] && objValidations.password.stateValue[0]) {
      if (objValidations.confirmPassword.stateValue[0].length > 0 && objValidations.confirmPassword.stateValue[0] !== objValidations.password.stateValue[0]) {
        objValidations.confirmPassword.dataMessage.dataValidation[1]({
          hidden: false,
          lineNumbers: 1,
          text: 'Passwords do not match',
        });
      } else {
        objValidations.confirmPassword.dataMessage.dataValidation[1]({
          hidden: true,
          lineNumbers: 1,
          text: '',
        });
      }
    }
  },[objValidations.confirmPassword.stateValue[0], objValidations.password.stateValue[0]])

  return(
    <View
      style={{
        alignItems: 'center',
        ...style,
      }}
    >
      <Input
        placeholder="Enter password"
        secretWriting={isSecretWriting}
        style={objValidations.password.stateValue[0].length <= 0 ? compStyles.input : null}
        inputMode="text"
        dCodeIcon="M5 4.636c0-.876.242-1.53.643-1.962.396-.427 1.003-.696 1.858-.696.856 0 1.462.269 1.857.694.4.431.642 1.085.642 1.961V6H5V4.636ZM4 6V4.636c0-1.055.293-1.978.91-2.643.623-.67 1.517-1.015 2.591-1.015 1.075 0 1.969.344 2.59 1.014.617.664.909 1.587.909 2.641V6h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1ZM3 7h9v6H3V7Z"
        dataInput={{
          ...dataInput,
          stateValue: objValidations.password.stateValue,
          statePassword: objValidations.password.statePassword,
          dataMessage: {
            ...newDataMessage,
            lineNumbers: objValidations.password.dataMessage.dataValidation[0].lineNumbers,
            text: objValidations.password.dataMessage.dataValidation[0].text,
            hidden: objValidations.password.dataMessage.dataValidation[0].hidden,
          },
          nInputSelected: nInputSelected,
          isKeyboardVisible: isKeyboardVisible,
          isRegisterInput: true,
          index: 2,
          textprops: {
            maxLength: 25,
            onFocus: () => {
              setIsInputFocus(true)
              setIsKeyboardVisible(true)
              setnInputSelected(2)
            },
            onEndEditing: () => {
              if(isKeyboardVisible){
                setnInputSelected(3)
              }
            },
            onBlur: () => {
              setIsInputFocus(false)
            },
            onChangeText: (text) => {
              objValidations.password.stateValue[1](text);

              const length = text.length > 8;
              const numberRegex = new RegExp('[0-9]');
              const uppercaseRegex = new RegExp('[A-Z]');
              const lowercaseRegex = new RegExp('[a-z]');
              const symbolRegex = /[-:+_º·$/\[\]}{|~€|@#~€¬\`«»%()?¿¡;.'"!@#\\$//%\\^,&\\*]/;

              //Regex to number (rtn)
              const rtn = (regex) => regex.test(text) ? 1 : 0;

              const safety = rtn(symbolRegex) + rtn(lowercaseRegex) + rtn(uppercaseRegex) + rtn(numberRegex) + length;
              safety <= 3 ? setPasswordState('low') : safety < 5 ? setPasswordState('medium') : setPasswordState('high');

              if (text.length > 0) {
                if (text.length < 8) {
                  objValidations.password.dataMessage.dataValidation[1]({
                    hidden: false,
                    lineNumbers: 1,
                    text: 'Must have at least 8 characters',
                  });
                } else if (!uppercaseRegex.test(text)) {
                  objValidations.password.dataMessage.dataValidation[1]({
                    hidden: false,
                    lineNumbers: 2,
                    text: 'Must contain at least one uppercase letter',
                  });
                } else if (!lowercaseRegex.test(text)) {
                  objValidations.password.dataMessage.dataValidation[1]({
                    hidden: false,
                    lineNumbers: 2,
                    text: 'Must contain at least one lowercase letter',
                  });
                } else if (!numberRegex.test(text)) {
                  objValidations.password.dataMessage.dataValidation[1]({
                    hidden: false,
                    lineNumbers: 2,
                    text: 'Must contain at least one number',
                  });
                } else if (!symbolRegex.test(text)) {
                  objValidations.password.dataMessage.dataValidation[1]({
                    hidden: false,
                    lineNumbers: 2,
                    text: 'Must contain at least one symbol',
                  });
                } else {
                  objValidations.password.dataMessage.dataValidation[1]({
                    hidden: true,
                    lineNumbers: 1,
                    text: '',
                  });
                }
              } else {
                objValidations.password.dataMessage.dataValidation[1]({
                  hidden: true,
                  lineNumbers: 1,
                  text: '',
                });
              }
            }
          }
        }}
        />
        {
          objValidations.password.stateValue[0].length > 0 ? 
            <View
            style={{
              position: 'relative',
              left: -10*consts.px,
            }}
            >
              <Text
                style={{
                  fontFamily: styles.fonts.mali.bold,
                  fontSize: 28 * consts.px,
                  color: theme[mode][passwordState + 'Safety'],
                  marginTop: 10 * consts.px,
                }}
              >
                { passwordState.length > 0 ? (passwordState + ' safety').replace(passwordState[0], passwordState[0].toUpperCase()) : null }
              </Text>
              <View
                style={{
                  height: 8 * consts.px,
                  width: passwordState === 'low' ? 110 * consts.px : passwordState === 'medium' ? 230 * consts.px : 350 * consts.px,
                  backgroundColor: theme[mode][passwordState + 'Safety'],
                  borderRadius: 10 * consts.px,
                  marginBottom: 20 * consts.px,
                }}
              ></View>
            </View>
          : null
        }
         
        <Input
          placeholder="Confirm password"
          secretWriting={isSecretWriting}
          style={objValidations.password.stateValue[0].length <= 0 ? compStyles.input : { marginBottom: 0 * consts.px, }}
          inputMode="text"
          dCodeIcon="M5 4.636c0-.876.242-1.53.643-1.962.396-.427 1.003-.696 1.858-.696.856 0 1.462.269 1.857.694.4.431.642 1.085.642 1.961V6H5V4.636ZM4 6V4.636c0-1.055.293-1.978.91-2.643.623-.67 1.517-1.015 2.591-1.015 1.075 0 1.969.344 2.59 1.014.617.664.909 1.587.909 2.641V6h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1ZM3 7h9v6H3V7Z"
          dataInput={{
            ...dataInput,
            stateValue: objValidations.confirmPassword.stateValue,
            dataMessage: {
              ...newDataMessage,
              lineNumbers: objValidations.confirmPassword.dataMessage.dataValidation[0].lineNumbers,
              text: objValidations.confirmPassword.dataMessage.dataValidation[0].text,
              hidden: objValidations.confirmPassword.dataMessage.dataValidation[0].hidden,
            },
            nInputSelected: nInputSelected,
            isKeyboardVisible: isKeyboardVisible,
            isRegisterInput: true,
            index: 3,
            textprops: {
              maxLength: 25,
              onFocus: () => {
                setIsInputFocus(true)
                setIsKeyboardVisible(true)
                setnInputSelected(3)
              },
              onBlur: () => {
                setIsInputFocus(false)
              },
              onChangeText: (text) => {
                objValidations.confirmPassword.stateValue[1](text);
              }
            }
          }}
          />
    </View>
  )
}

export default CreatePassword;