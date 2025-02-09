import React, { useEffect, useRef } from 'react';
import { View, SafeAreaView, TextInput } from 'react-native';
import SvgIconProvider from '../svg/svgIconProvider.jsx';
import Message from '../message/Message.jsx';

const Input = (props) => {
  const textInputRef = useRef(null);
  
  const { styles, theme, mode, onChangeText, consts, isInputFocus, setIsInputFocus, styleinput, 
          viewprops, textprops, pinSelected, index, isKeyboardVisible, isPinInput, isRegisterInput, 
          nInputSelected, isLoginInput, dataMessage, defaultValue
        } = props.dataInput;

  const [value, setValue] = props.dataInput.stateValue || React.useState(defaultValue)
  const [seePassword, setSeePassword] = React.useState(false);
  
  const left = props.centered !== undefined ? 0 : 40 * consts.expo;
  const finalValue = isLoginInput ? props.dataInput.stateValue[0][index] : value ? value : defaultValue ? defaultValue : '';

  const compStyles = {
    container: {
      left: left,
    },
    input: {
      color: theme[mode].color,
      borderColor: theme[mode].icons,
      fontSize: 32 * consts.px,
      borderWidth: 5 * consts.px,
      borderRadius: 50 * consts.px,
      paddingHorizontal: 50 * consts.px,
      width: 415 * consts.px,
      height: 80 * consts.px,
      ...styleinput,
    },
    icons: {
      color: theme[mode].icons,
      px: 60 * consts.px,
      top: 10 * consts.expo,
      left: -80 * consts.expo,
    },
    validationIcons: {
      color: dataMessage && dataMessage.hidden ? theme[mode].icons : theme[mode].errorColor,
      px: 60 * consts.px,
      top: 5 * consts.px,
      left: 180 * consts.px,
    },
    eyePasswordRegister: {
      color: theme[mode].icons,
      px: 50 * consts.px,
      top: 7.5 * consts.px,
      left: 135 * consts.px,
    },
    eyePasswordLogin: {
      color: theme[mode].icons,
      px: 50 * consts.px,
      top: 7.5 * consts.px,
      left: 165 * consts.px,
    }
  };

  useEffect(() => {
    if (seePassword) {
      setTimeout(() => {
        setSeePassword(false);
      }, 5000);
    }
  }, [seePassword])

  useEffect(() => {
    if (isInputFocus === false && textInputRef.current && !isKeyboardVisible) {
      textInputRef.current.blur();
    }

    if(isPinInput){
      if (isInputFocus === true && index === pinSelected && textInputRef.current && !textInputRef.current.isFocused() && isPinInput) {
        textInputRef.current.focus();
      }
    }else if (isRegisterInput) {
      if (isInputFocus === true && index === nInputSelected && textInputRef.current && isRegisterInput) {
        textInputRef.current.focus();
      }
    }
  }, [isInputFocus, nInputSelected, pinSelected, isPinInput, isRegisterInput])

  return (
    <View 
      {...viewprops} 
      style={ isRegisterInput && finalValue.length > 0 ? 
        { ...props.style, 
          left: (415 - 350)/-2 * consts.px,
        } 
        : props.style }
    >
      <SafeAreaView>
        <View style={compStyles.container}>
          {
            dataMessage && dataMessage.text !== undefined ? 
            <Message 
              dataMessage={{
                ...dataMessage,
                style: {
                  position: 'absolute',
                  bottom: 10*consts.px,
                  right: -65*consts.px,
                  zIndex: 2,
                },
                consts,
                theme,
                consts,
                mode,
                styles,
              }} />
              : null
          }
          <SvgIconProvider
            src='styles.icons'
            strprops='color, px, top, left'
            d={props.dCodeIcon}
            styles={compStyles}
          />
          <TextInput
            ref={textInputRef}
            secureTextEntry={props.secretWriting && !seePassword}
            style={ finalValue.length > 0 ? 
              isRegisterInput ?
                { ...compStyles.input, 
                  width: 350 * consts.px,
                  paddingRight: props.secretWriting ? 100 * consts.px : 50 * consts.px,
                }
                : isLoginInput ?
                { ...compStyles.input,
                  paddingRight: props.secretWriting ? 115 * consts.px : 50 * consts.px,
                } : compStyles.input
                : compStyles.input 
              }
            value={finalValue}
            placeholder={props.placeholder}
            cursorColor={theme[mode].color}
            selectionColor={theme[mode].noMode}
            inputMode={props.inputMode}
            keyboardAppearance={mode}
            placeholderTextColor={theme[mode].icons + 'cc'}
            autoCorrect={!props.secretWriting}
            autoComplete='off'

            onFocus={() => {
              setIsInputFocus(true)
            }}
            onChangeText={(text) => {
              !isLoginInput ? setValue(text) : null
            }}
            
            {...textprops}
          />
          {
            finalValue.length > 0 && props.secretWriting ? 
              seePassword ?
              <SvgIconProvider
                src={isRegisterInput ? 'styles.eyePasswordRegister': 'styles.eyePasswordLogin'}
                strprops='color, px, top, left'
                d="M14.765 6.076a.5.5 0 0 1 .159.689 9.519 9.519 0 0 1-1.554 1.898l1.201 1.201a.5.5 0 0 1-.707.707l-1.263-1.263a8.472 8.472 0 0 1-2.667 1.343l.449 1.677a.5.5 0 0 1-.966.258l-.458-1.709a8.666 8.666 0 0 1-2.918 0l-.458 1.71a.5.5 0 1 1-.966-.26l.45-1.676a8.473 8.473 0 0 1-2.668-1.343l-1.263 1.263a.5.5 0 0 1-.707-.707l1.2-1.201A9.521 9.521 0 0 1 .077 6.765a.5.5 0 1 1 .848-.53 8.425 8.425 0 0 0 1.77 2.034A7.462 7.462 0 0 0 7.5 9.999c2.808 0 5.156-1.493 6.576-3.764a.5.5 0 0 1 .689-.159Z"
                styles={compStyles}
                onPress={()=> setSeePassword(!seePassword)}
                style={isRegisterInput ? { top: -35 * consts.px, left: 65 * consts.px } : { top: -35 * consts.px, left: 82.5 * consts.px }}
              /> :
              <SvgIconProvider
                src={isRegisterInput ? 'styles.eyePasswordRegister': 'styles.eyePasswordLogin'}
                strprops='color, px, top, left'
                d="M7.5 11c-2.697 0-4.97-1.378-6.404-3.5C2.53 5.378 4.803 4 7.5 4s4.97 1.378 6.404 3.5C12.47 9.622 10.197 11 7.5 11Zm0-8C4.308 3 1.656 4.706.076 7.235a.5.5 0 0 0 0 .53C1.656 10.294 4.308 12 7.5 12s5.844-1.706 7.424-4.235a.5.5 0 0 0 0-.53C13.344 4.706 10.692 3 7.5 3Zm0 6.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                styles={compStyles}
                onPress={()=> setSeePassword(!seePassword)}
                style={isRegisterInput ? { top: -35 * consts.px, left: 65 * consts.px } : { top: -35 * consts.px, left: 82.5 * consts.px }}
              /> 
             : null
            }
          {
            finalValue.length > 0 && isRegisterInput ? 
              finalValue.length > 0 && !dataMessage.hidden ? 
              <SvgIconProvider
                src='styles.validationIcons'
                strprops='color, px, top, left'
                d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5l3.469-3.468Z"
                styles={compStyles}
                style={{ top: -35 * consts.px, left: 92.5 * consts.px }}
              /> :
              <SvgIconProvider
                src='styles.validationIcons'
                strprops='color, px, top, left'
                d="M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 0 1-.944.12l-2.75-2.5a.625.625 0 0 1 .841-.925l2.208 2.007 3.849-5.886a.625.625 0 0 1 .865-.181Z"
                styles={compStyles}
                style={{ top: -35 * consts.px, left: 92.5 * consts.px }}
              /> 
            : null
          }
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Input;