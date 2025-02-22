import { View, Text, TouchableOpacity } from "react-native";
import ButtonBack from "../buttonBack/ButtonBack";
import IconButton from "../iconButton/IconButton";
import Svg, { Path } from "react-native-svg";
import InputPopUp from "../popUp/InputPopUp";
import { useEffect, useState } from "react";
import Menu from "../menu/Menu";
import ListAccounts from "../listAccounts/ListAccounts";
import MessagePopUp from "../popUp/MessagePopUp";
import InfoDeviceAccount from "./InfoDeviceAccount";
import { closeSession } from '../../utils/logicSession'

const DeviceAccounts = ({ data }) => {
  
  const { theme, mode, consts, setStrPage, dataButtonBack, dataIconButton, dataInput, 
          styles, devMode, setShowDebugMenu, showDebugMenu, setIdMainSession, idMainSession,
        } = data;

  const [isMessagePopUpVisible, setIsMessagePopUpVisible] = useState(false);
  const [textMessagePopUp, setTextMessagePopUp] = useState('The username has been changed');

  const [isInputPopUpVisible, setIsInputPopUpVisible] = useState(false);
  const [typeSelected, setTypeSelected] = useState('');
  const [valueSelected, setValueSelected] = useState('');
  
  const [username, setUsername] = useState('UserURU');
  const [email, setEmail] = useState('UserURU@gmail.com');
  const [isShowMenu, setIsShowMenu] = useState(false);
  

  const itemsMenu = [
    {
      title: 'My accounts',
      d: 'M1 2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H1Zm0 1h13v.925a.448.448 0 0 0-.241.07L7.5 7.967 1.241 3.995A.448.448 0 0 0 1 3.925V3Zm0 1.908V12h13V4.908L7.741 8.88a.45.45 0 0 1-.482 0L1 4.908Z',
      color: theme[mode].noColor,
      sizeIcon: 45*consts.px,
      onPress: ()=>setStrPage('userAccounts'),
    },
    {
      title: 'Log out',
      d: 'M3 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h7.5a.5.5 0 0 0 0-1H3V2h7.5a.5.5 0 0 0 0-1H3Zm9.604 3.896a.5.5 0 0 0-.708.708L13.293 7H6.5a.5.5 0 0 0 0 1h6.793l-1.397 1.396a.5.5 0 0 0 .708.708l2.25-2.25a.5.5 0 0 0 0-.708l-2.25-2.25Z',
      color: theme[mode].noColor,
      sizeIcon: 45*consts.px,
      onPress: ()=>closeSession(setStrPage, setIdMainSession, idMainSession),
    },
    {
      title: 'Delete account',
      d: 'M5.5 1a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4ZM3 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H11v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4h-.5a.5.5 0 0 1-.5-.5ZM5 4h5v8H5V4Z',
      color: theme[mode].delete,
      sizeIcon: 50*consts.px,
      stylesIcon: {
        left: -26*consts.px,
      }
    },
  ]

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
            setStrPage,
            ifBreadCrumbEmpty: () => {
              console.log('ifBreadCrumbEmpty')
              setStrPage('login')
            },
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
            onPress={()=>{setIsShowMenu(!isShowMenu)}}
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
              top: -20*consts.px,
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
          activeOpacity={1}
          onPress={() => devMode[devMode.power].debugMenuEnabled ? setShowDebugMenu(!showDebugMenu) : null}
          style={{
            position: 'absolute',
            top: 40*consts.px,
          }}
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
          <InfoDeviceAccount 
            data={dataIUA}
            type="username"
            text={username}
            maxLength="20"
            styles={styles}
          />

          <InfoDeviceAccount 
            data={dataIUA}
            type="email"
            text={email}
            maxLength="25"
            styles={styles}
          />
        </View>

      </View>

      <Text
        style={{
          fontFamily: styles.fonts.mali.bold,
          position: 'absolute',
          top: 720*consts.px,
          fontSize: 40*consts.px,
          color: theme[mode].icons,
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
          styles,
          isShow: isShowMenu,
        }}
        items={itemsMenu}
      />

    </View>
  )
}

export default DeviceAccounts;