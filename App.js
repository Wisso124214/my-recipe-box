//updating

import { useEffect, useRef, useState } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import {
  Text, 
  View, 
  Animated,
  Appearance,
  ActivityIndicator,
} from 'react-native';

import LoadingScreen from './components/loadingScreen/LoadingScreen';
import Login from './components/login/Login';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import Register from './components/register/Register';
import DetailsRecipy from './components/detailsRecipy/DetailsRecipy';
import DeviceAccounts from './components/deviceAccounts/DeviceAccounts';
import UserAccounts from './components/userAccounts/UserAccounts';
import DebugMenu from './components/debugMenu/DebugMenu';
import { setItem, getItem } from './utils/AsyncStorage.js';
import ListRecipies from './components/listRecipies/ListRecipies.jsx';

export default function App() {
  const devMode = {
  power: 'on',
    on: {
      timeLoading: 0,
      screenLoading: false,
      debugMenuEnabled: true,
      showDebugMenu: true,
      strpage: 'listRecipies',
      page: 0,
      pagefp: 0,
      varpage: 'strpage',
      appState: 'initializing',
      autoFocusInputFP2: true,
      registerDebugging: true,
      usernameDefault: 'UserURU',
      emailDefault: 'luisdavidbustosnunez@gmail.com',
      passwordDefault: 'Password123$',
    },
    off: {
      timeLoading: 0,
      screenLoading: false,
      debugMenuEnabled: false,
      showDebugMenu: false,
      strpage: 'login',
      page: 0,
      pagefp: 0,
      varpage: 'strpage',
      appState: 'initializing',
      autoFocusInputFP2: true,
      registerDebugging: false,
      usernameDefault: '',
      emailDefault: '',
      passwordDefault: '',
    },
  }

  const [mode, setMode] = useState(Appearance.getColorScheme());
  const [modeSetted, setModeSetted] = useState(false);
  const [idMainSession, setIdMainSession] = useState('');
  
  const [page, setPage] = useState(devMode[devMode.power].page);
  const [strpage, setStrPage] = useState(devMode[devMode.power].strpage);
  const opacityref = useRef(new Animated.Value(0)).current;
  const bgColor = useRef(new Animated.Value(0)).current;
  const [showDebugMenu, setShowDebugMenu] = useState(devMode[devMode.power].showDebugMenu);
  const [appState, setAppState] = useState(devMode[devMode.power].appState);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [varpage, setVarPage] = useState(devMode[devMode.power].varpage);
  const [bgColorNavBar, setBgColorNavBar] = useState(theme[mode].backgroundColor);
  const [defaultValueUsernameLogin, setDefaultValueUsernameLogin] = useState('');
  const [loading, setLoading] = useState(false);
  const [textLoading, setTextLoading] = useState('Loading...');

  const [isHiddenMssg, setIsHiddenMssg] = useState(true);
  const [textMssg, setTestMssg] = useState('Login successful');
  const [colorMssg, setColorMssg] = useState(theme[mode].successColor);

  const consts = {
    px: 392.7/709,
    expo: 392.7/(709*2),
    widthScreen: 709,
    heightScreen: 1552,
  };
  
  let styles = {
    
    container:
    {
      flex: 1,
      backgroundColor: theme[mode].backgroundColor,      //backgroundColor: theme[mode].backgroundColor, backgroundColorInterpolation
      alignItems: 'center',
      justifyContent: 'center',
    },
    opacity:
    {
      flex: 1,
      backgroundColor: theme[mode].backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: opacityref,
    },
    simpleButtons:{
      borderRadius: 10, 
      backgroundColor: '#ddd',
      width: 'min-content',
      marginHorizontal: 5,
    },
    icons: {
      small: {
        color: theme[mode].icons,
        px: 38,
        top: 3,
        left: 3,
      }
    },
    popUp: {
      background: {
        position: 'absolute',
        width: '100%',
        height: 1552*consts.px,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme[mode].icons+Math.abs((theme[mode].opacityPopUp*256).toFixed(0)).toString(16),
        zIndex: 2,
      },
      container: {
        backgroundColor: theme[mode].icons,
        borderRadius: 30*consts.px,
        alignItems: 'center',
        width: 450*consts.px,
        height: 350*consts.px,
      },
      title : {
        color: theme[mode].noColor,
        fontSize: 35*consts.px,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 40*consts.px,
        marginBottom: 30*consts.px,
      },
      input: {
        borderColor: theme[mode].noColor,
        width: 350*consts.px,
        color: theme[mode].noColor,
      },
      placeholderInput: {
        cursorColor: theme[mode].noColor,
        selectionColor: mode,
        placeholderTextColor: theme[mode].noIcons+'cc',
      },
      button: {
        borderRadius: 30*consts.px,
        padding: 20*consts.px,
        width: 180*consts.px,
        height: 70*consts.px,
        alignItems: 'center',
        justifyContent: 'center',
      },
      textButton: {
        fontSize: 30*consts.px,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme[mode].noIcons,
      }
    }
  };
  
  const dataInput = {
    mode,
    theme,
    styles,
    consts,
    isInputFocus,
    setIsInputFocus,
  }
  
  const dataMssg = {
    isHiddenMssg,
    setIsHiddenMssg,
    textMssg,
    setTestMssg,
    colorMssg,
    setColorMssg,
  }

  const dataButtonBack = {
    theme,
    mode,
    consts,
    isInputFocus,
    setIsInputFocus,
    onPress: () => {
      setIsInputFocus(false)
    },
  }

  const dataPinInput = {
    theme,
    mode,
    consts,
    styles,
    dataInput,
    isPinInput: false,
  }

  const dataIconButton = {
    theme,
    mode,
    setMode,
    consts,
    styles,
  }

  const dataMessage = {
    theme,
    mode,
    consts,
  }

  const dataPages = {
    theme,
    mode,
    consts,
    isInputFocus,
    setIsInputFocus,
    devMode,
    styles,
    showDebugMenu,
    setShowDebugMenu,
    strpage,
    setStrPage,
    bgColorNavBar,
    setBgColorNavBar,
    defaultValueUsernameLogin,
    setDefaultValueUsernameLogin,
    loading,
    setLoading,
    setTextLoading,
    idMainSession,
    setIdMainSession,

    dataInput,
    dataMssg,
    dataButtonBack,
    dataPinInput,
    dataIconButton,
    dataMessage,
  }

  const objdebug = {
    loading : <LoadingScreen data={dataPages} />,
    login:  <Login data={dataPages} />,
    forgotPassword:  <ForgotPassword data={dataPages} />,
    register:  <Register data={dataPages} />,
    detailsRecipy:  <DetailsRecipy data={dataPages} />,
    deviceAccounts: <DeviceAccounts data={dataPages} />,
    userAccounts: <UserAccounts data={dataPages} />,
    listRecipies: <ListRecipies data={dataPages} />,
  }
  const arrdebug = Object.keys(objdebug);
  
  try {
    NavigationBar.setBackgroundColorAsync(bgColorNavBar);
  } catch (err) {
    console.log(err)
  }

  useEffect(() => {

    Animated.timing(opacityref, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    async () => {
      console.log('asd', await getItem('asd'));
    }
  }, []);
  
  useEffect(() => {
    async () => {
      if (idMainSession !== '')
        await setItem('idMainSession', idMainSession);
    }
  }, [idMainSession])


  useEffect(() => {

    async () => {
      await getItem('mode').then((value) => {
        if (!modeSetted) {
          if (value === null) {
            setItem('mode', Appearance.getColorScheme()).then(() => {
              setModeSetted(true);
            });
            setMode(Appearance.getColorScheme());
          } else {
            setMode(value);
            setModeSetted(true);
          }
        } else {
          setItem('mode', mode);
        }
      });
    }

    Animated.timing(bgColor, {
      toValue: mode === 'dark' ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setBgColorNavBar(theme[mode].backgroundColor);
  }, [mode]);

  const backgroundColorInterpolation = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.light.backgroundColor, theme.dark.backgroundColor],
  });

  useEffect(() => {
    if(appState === 'initializing' && strpage === 'loading' && devMode[devMode.power].screenLoading){
      setTimeout(() => {
        setStrPage('login');
        setAppState('running');
      }, devMode[devMode.power].timeLoading);
    } else {
      if (devMode.power === 'on')
        setAppState('running');
    }
  }, [devMode]);

  useEffect(() => {
    switch(strpage){
      case 'login':
        setIsHiddenMssg(true);
        setIsInputFocus(false);
        setDefaultValueUsernameLogin('');
        break;
      case 'forgotPassword':
        setIsHiddenMssg(true);
        break;
      case 'register':
        setIsHiddenMssg(true);
        break;
    }
    if(varpage === 'page' || varpage === 'selected'){
      setStrPage(arrdebug[page]);
      
      if (varpage === 'page') 
        setVarPage('selected');
    }
  }, [page]);

  useEffect(()=>{
    if(varpage === 'strpage' || varpage === 'selected'){
      setPage(arrdebug.findIndex((page)=>strpage === page))

      if (varpage === 'strpage') 
        setVarPage('selected');
    }
  }, [strpage])

  return (
      <Animated.View 
        key={'uniqueKey'}
        style={ styles.opacity } 
      >
        { objdebug[strpage] }
        
        {
          loading && 
          <View style={ styles.popUp.background } >
            <View style={{
              ...styles.popUp.container,
              height: 250*consts.px,
              backgroundColor: theme[mode].noIcons,
            }} >
              <Text style={{
                ... styles.popUp.title,
                color: theme[mode].color,
                top: 10*consts.px,
              }} >{textLoading}</Text>
              <ActivityIndicator size='large' color={ theme[mode].color } />
            </View>
          </View>
        }

        <DebugMenu
          data={{
            styles: styles,
            setPage: setPage,
            page: page,
            arrdebug: arrdebug,
            dataIconButton: dataIconButton,
            showDebugMenu: showDebugMenu,
            theme: theme,
            mode: mode,
            setLoading: setLoading,
          }}
        />
        
      </Animated.View>
  );
}

export const theme = {
  dark: {
    backgroundColor: '#803C00',
    noBackgroundColor: '#FF7900',
    color: '#ffffff',
    noColor: '#000000',
    shadowTitle: '#000000',
    icons: "#eeeeee",
    noIcons: "#292929",
    noMode: 'light',
    errorColor: '#C20A0A',
    noErrorColor: '#A11212',
    successColor: '#30CC00',
    highSafety: '#30CC00',
    mediumSafety: '#C8AE04',
    lowSafety: '#FF0000',
    contrastingYellow: '#E1B61E',
    opacityPopUp: 0.33,
    delete: '#E61919',
  },
  light: {
    backgroundColor: '#FF7900',
    noBackgroundColor: '#803C00',
    color: '#000000',
    noColor: '#ffffff',
    shadowTitle: '#777777',
    icons: "#292929",
    noIcons: "#eeeeee",
    noMode: 'dark',
    errorColor: '#A11212',
    noErrorColor: '#C20A0A',
    successColor: '#124D00',
    highSafety: '#124D00',
    mediumSafety: '#7D6D02',
    lowSafety: '#760D0D',
    contrastingYellow: '#5A490C',
    opacityPopUp: 0.5,
    delete: '#FF0000',
  },
}
