import { Text, View } from "react-native";
import ButtonBack from "../buttonBack/ButtonBack";
import ListAccounts from "../listAccounts/ListAccounts";
import { useState } from "react";
import MessagePopUp from "../popUp/MessagePopUp";
import InputPopUp from "../popUp/InputPopUp";

const UserAccounts = ({ data, style }) => {

  const { theme, mode, consts, setStrPage, dataButtonBack, dataInput, styles,  } = data;

  const [otherUsername, setOtherUsername] = useState('');
  const [typeSelected, setTypeSelected] = useState('');
  const [valueSelected, setValueSelected] = useState('');
  const [isInputPopUpVisible, setIsInputPopUpVisible] = useState(false);

  const [isMessagePopUpVisible, setIsMessagePopUpVisible] = useState(false);
  const [textMessagePopUp, setTextMessagePopUp] = useState('The username has been changed');

  const dataPopUp = {
    theme,
    mode,
    consts,
    isInputPopUpVisible,
    setIsInputPopUpVisible,
    typeSelected,
    valueSelected,
    setValueSelected,
    dataInput,
    styles,
    setTextMessagePopUp,
    setIsMessagePopUpVisible,
    setOtherUsername,
  }

  return(
    <View
      style={{
        ...style,
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
      }}
    >
      <View
      //header
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          position: 'absolute',
          width: '100%',
          top: 155 * consts.px,
          left: '2.5%',
        }}
      >
        <ButtonBack
          dataButtonBack={{ 
            ...dataButtonBack,
            isInputFocus: true,
            setStrPage,
            ifBreadCrumbEmpty: ()=>{
              setStrPage('deviceAccounts')
            }
          }}
          styleview={{
            position: 'absolute',
            width: '30%',
            top: 0,
            left: 0,
            alignItems: 'center',
          }} />

        <View
          style={{
            position: 'relative',
            justifyContent: 'flex-center',
            alignItems: 'flex-center',
            alignSelf: 'flex-center',
            alignContent: 'flex-center',
            width: '100%',
          }} 
          >
          <Text
            style={{
              fontFamily: styles.fonts.mali.bold,
              fontSize: 45 * consts.px,
              color: theme[mode].icons,
              textAlign: "center",
              width: '100%',
              top: -27*consts.px,
            }} 
          >My Accounts</Text>
        </View>
      </View>

      <ListAccounts
        onlyUsernames
        nameParent='UserAccounts'
        data={{ 
          ...data,
          valueSelected,
          setValueSelected,
          setIsInputPopUpVisible,
          setTypeSelected,
          otherUsername,
         }}

        style={{
          position: 'absolute',
          top: 300*consts.px,
          height: (120*8-20)*consts.px,
        }}
        styleAddButton={{
          position: 'absolute',
          top: ((120*8-20) + 80)*consts.px,
        }}
      />

      <InputPopUp data={{ ...dataPopUp }} />
      <MessagePopUp
        data={{ 
          styles,
          consts,
          theme,
          mode,
          setIsMessagePopUpVisible,
        }} 
        text={textMessagePopUp}
        isVisible={isMessagePopUpVisible}
      />
    </View>
  )
}

export default UserAccounts;