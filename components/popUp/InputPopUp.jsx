import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Input from "../input/Input";
import { configFront } from "../../config/config";

const InputPopUp = ({ data, style }) => {

  const { theme, mode, consts, isInputPopUpVisible, setIsInputPopUpVisible, typeSelected,
          valueSelected, dataInput, styles, setEmail, setUsername, setOtherUsername,
          setTextMessagePopUp, setIsMessagePopUpVisible,
        } = data;

  const maxLengthType = {
    'username': 25,
    'email': 50,
  }

  const [value, setValue] = useState(valueSelected);

  const updateData = (type, value) => {
    //Antes de actualizar los datos, se debe validar que el valor ingresado sea correcto
    //De la misma manera que en register. Dar un mensaje de error o de confirmación al final

    const validation = true;

    if (validation) {
      setTextMessagePopUp(`The ${type.split('-')[0]} has been changed`);
      setIsMessagePopUpVisible(true);

    } else {
      setTextMessagePopUp(`ERROR. The ${type.split('-')[0]} is not valid`);
      setIsMessagePopUpVisible(true);
    }
    switch(type) {
      case 'email':
        if (validation) {
          setEmail(value);
        }
        break;
      case 'username':
        if (validation) {
          setUsername(value);
        }
        break;
      case 'username-other':
        if (validation) {
          setOtherUsername(value);
        }
        break;
    }
  }

  return(
    isInputPopUpVisible ?
    <View
      style={{
        ...styles.popUp.background,
        ...style,
      }}
    >
      <View
        style={ styles.popUp.container }
      >
        <Text style={{ ...styles.popUp.title, fontFamily: styles.fonts.mali.bold, }}
        >{ `Edit ${typeSelected.split('-')[0]}` }</Text>

        <Input
          centered
          placeholder={typeSelected.replace(typeSelected[0], typeSelected[0].toUpperCase()).split('-')[0]}
          dataInput={{
            ...dataInput,
            mode,
            theme,
            consts,
            styles,
            defaultValue: valueSelected,
            stateValue: [value, setValue],
            styleInput: styles.popUp.input,
            textprops: {
              maxLength: maxLengthType[typeSelected],
              ...styles.popUp.placeholderInput,
              fontFamily: styles.fonts.mali.medium,
              autoFocus: true,
              onChangeText: (text)=>{
                setValue(text);
              }
            },
          }} />
          
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              top: 245*consts.px,
            }}
          >
            <TouchableOpacity
              activeOpacity={configFront.activeOpacity}
              style={{
                ...styles.popUp.button,
                marginRight: 10*consts.px,
              }}
              onPress={()=>{
                setIsInputPopUpVisible(false);
              }}
            >
              <Text style={{
                ...styles.popUp.textButton,
                color: theme[mode].noColor,
                top: -8*consts.px,
                height: 50*consts.px,
                fontFamily: styles.fonts.mali.bold,
                }} >Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={configFront.activeOpacity}
              style={{
                ...styles.popUp.button,
                marginLeft: 10*consts.px,
                backgroundColor: theme[mode].noIcons,
              }}
              onPress={()=>{
                updateData(typeSelected, value);
                setIsInputPopUpVisible(false);
              }}
            >
              <Text style={{
                ...styles.popUp.textButton,
                fontFamily: styles.fonts.mali.bold,
                color: theme[mode].color,
                top: -8*consts.px,
                height: 50*consts.px,
                }} >Done</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
    : null
  )
}

export default InputPopUp;