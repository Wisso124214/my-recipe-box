import React, { forwardRef, useEffect, useRef } from 'react';
import Input from '../input/Input';

const PinInput = ({ dataPinInput }) => {

  const [value, setValue] = React.useState('');
  const { mode, theme, consts, styles, dataInput, pinSelected, setPinSelected, index, isKeyboardVisible, 
    setIsKeyboardVisible, ncomponents, isPinInput, devMode, breadCrumb, setBreadCrumb,
  } = dataPinInput;
  const { setIsInputFocus } = dataInput;

  useEffect(() => {
    if (isKeyboardVisible && breadCrumb[breadCrumb.length - 1] !== 'keyboard') {
      setBreadCrumb([...breadCrumb, 'keyboard']);
    }
  }, [isKeyboardVisible])

  useEffect(()=>{
    setIsInputFocus(true)
  }, [pinSelected])

  return(
    <Input 
      centered
      placeholder="X"
      inputMode="numeric"
      style={{ marginBottom: 150*consts.px }}
      dataInput={{ 
        ...dataInput,
        mode,
        theme,
        consts,
        styles,
        isPinInput: isPinInput,
        ncomponents: ncomponents,
        pinSelected: pinSelected,
        isKeyboardVisible: isKeyboardVisible,
        setIsKeyboardVisible: setIsKeyboardVisible,
        index: index,
        styleinput: {
          width: 100*consts.px,
          height: 100*consts.px,
          paddingRight: 20*consts.px,
          paddingLeft: 38*consts.px,
          fontSize: 50*consts.px,
          borderWidth: 6*consts.px,
          marginHorizontal: 10*consts.px,
        },
        stateValue: [value, setValue],
        textprops: {
          autoFocus: index === 0 && devMode[devMode.power].autoFocusInputFP2 ? true : false,
          maxLength: 1,

          onFocus: ()=>{
            setIsInputFocus(true)
            setIsKeyboardVisible(true)
          },
          onChangeText: (text)=>{
            setValue(text)
            if (text.length > 0 && index < ncomponents) {
              setIsInputFocus(false)
              setPinSelected(index+1)
              
              if (index === ncomponents-1) {
                setIsKeyboardVisible(false)
              }
            }
          },
        }
      }}
    />
  )
};

export default PinInput;