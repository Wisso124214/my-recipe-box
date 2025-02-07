import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import ButtonBack from "../buttonBack/ButtonBack";
import IconButton from "../iconButton/IconButton";
import Svg, { Path } from "react-native-svg";
import InfoUserAccount from "./InfoDeviceAccount";
import InputPopUp from "../popUp/InputPopUp";
import { useEffect, useState } from "react";
import Menu from "../menu/Menu";
import ListAccounts from "../listAccounts/ListAccounts";
import MessagePopUp from "../popUp/MessagePopUp";

const DeviceAccounts = ({ data }) => {
  
  const { theme, mode, consts, setStrPage, dataButtonBack, dataIconButton, dataInput, 
          styles, devMode, setShowDebugMenu, showDebugMenu,
        } = data;

  const [isMessagePopUpVisible, setIsMessagePopUpVisible] = useState(false);
  const [textMessagePopUp, setTextMessagePopUp] = useState('The username has been changed');

  const [isInputPopUpVisible, setIsInputPopUpVisible] = useState(false);
  const [typeSelected, setTypeSelected] = useState('');
  const [valueSelected, setValueSelected] = useState('');
  
  const [username, setUsername] = useState('UserURU');
  const [email, setEmail] = useState('UserURU@gmail.com');
  const [isMenuShow, setIsMenuShow] = useState(false);
  
  //Info User Account
  const dataIUA = {
    theme: theme,
    mode: mode,
    consts: consts,
    setIsInputPopUpVisible: setIsInputPopUpVisible,
    setTypeSelected: setTypeSelected,
    setValueSelected: setValueSelected,
  }

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
    setUsername,
    setEmail,
    setTextMessagePopUp,
    setIsMessagePopUpVisible,
  }

  return(
    <View
    //container
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        //top: -50*consts.px,
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
            onPress: ()=>{
              setStrPage('login')
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
              fontWeight: 'bold',
              fontSize: 45 * consts.px,
              color: theme[mode].icons,
              textAlign: "center",
              width: '100%',
              
            }} 
          >User Account</Text>
        </View>
        
        <View 
          style={{
            position: 'absolute',
            width: '35%',
            alignItems: 'center',
            right: 0,
            justifyContent: 'center',
          }} 
        >
          <IconButton 
            onPress={()=>{setIsMenuShow(!isMenuShow)}}
            dataIconButton={ dataIconButton }
            dCodeIcon="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
            sizeButton={60*consts.px}
            styles={{
              color: theme[mode].icons,
              px: 45*consts.px,
              top: 2,
              left: 2,
            }}
            styleButton={{ 
              marginHorizontal: 10,
            }}
          />
        </View>
      </View>

      <View
      //user account
        style={{
          position: 'absolute',
          width: 550*consts.px,	
          height: 400*consts.px,
          top: 260*consts.px,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: mode === 'light' ? theme[mode].noIcons+'ee' : theme[mode].noIcons,
          borderRadius: 30*consts.px,
        }}
      >
        <TouchableOpacity
          onPress={() => devMode[devMode.power].debugMenuEnabled ? setShowDebugMenu(!showDebugMenu) : null}
          style={{
            position: 'absolute',
            top: 40*consts.px,
          }}
          activeOpacity={1}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={15*12*consts.px}
            height={15*12*consts.px}
          >
            <Path
              scale={12*consts.px}
              fill={theme[mode].icons}
              fillRule="evenodd"
              d="M.877 7.5a6.623 6.623 0 1 1 13.246 0 6.623 6.623 0 0 1-13.246 0ZM7.5 1.827a5.673 5.673 0 0 0-4.193 9.494A4.971 4.971 0 0 1 7.5 9.025c1.762 0 3.31.916 4.193 2.296A5.673 5.673 0 0 0 7.5 1.827Zm3.482 10.152A4.023 4.023 0 0 0 7.5 9.975a4.023 4.023 0 0 0-3.482 2.004A5.648 5.648 0 0 0 7.5 13.173c1.312 0 2.52-.446 3.482-1.194ZM5.15 6.505a2.35 2.35 0 1 1 4.7 0 2.35 2.35 0 0 1-4.7 0Zm2.35-1.4a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"
              clipRule="evenodd"
            />
          </Svg>
        </TouchableOpacity>

        <View
          style={{
            position: 'absolute',
            top: 240*consts.px,
            width: '100%',
            flex: 1,
          }}
          >
          <InfoUserAccount 
            data={dataIUA}
            type="username"
            text={username}
            maxLength="20"
          />

          <InfoUserAccount 
            data={dataIUA}
            type="email"
            text={email}
            maxLength="25"
          />
        </View>

      </View>

      <Text
        style={{
          position: 'absolute',
          top: 740*consts.px,
          fontSize: 40*consts.px,
          color: theme[mode].icons,
          fontWeight: 'bold',
        }}
      >Open accounts</Text>

      <ListAccounts 
        data={{
          ...data,
          valueSelected,
          setValueSelected,
          setIsInputPopUpVisible,
          setTypeSelected,
        }}
        nameParent='DeviceAccounts'
        style={{
          position: 'absolute',
          top: 840*consts.px,
          height: (120*4-20)*consts.px,
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
      
      <Menu 
        data={{
          theme,
          mode,
          consts,
          setStrPage,
          isShow: isMenuShow,
        }}
      />

    </View>
  )
}

export default DeviceAccounts;