import { useEffect, useRef, useState } from 'react';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import {
  Text, 
  View, 
  Animated,
  Appearance,
  ActivityIndicator,
  Image,
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

import { SERVER_URL } from './config/config';
import axios from 'axios';

export default function App() {
  const devMode = {
  power: 'on',
    on: {
      timeLoading: 0,
      screenLoading: false,
      debugMenuEnabled: true,
      showDebugMenu: false,
      strpage: 'register',
      page: 0,
      pagefp: 0,
      varpage: 'strpage',
      appState: 'initializing',
      autoFocusInputFP2: true,
      registerDebugging: true,
      isFetchingDB: false,
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
      isFetchingDB: true,
      usernameDefault: '',
      emailDefault: '',
      passwordDefault: '',
    },
  }

  const splashLight = require('./assets/splash-light.png');
  const splashDark = require('./assets/splash-dark.png');

  const [testingMode, setTestingMode] = useState(Appearance.getColorScheme());
  const [mode, setMode] = useState(Appearance.getColorScheme());
  const [modeSetted, setModeSetted] = useState(false);
  
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
  const [fontLoaded, fontLoadedError] = useFonts({
    'mali': require('./assets/fonts/mali/Mali-Regular.ttf'),
    'mali-bold': require('./assets/fonts/mali/Mali-Bold.ttf'),
    'mali-italic': require('./assets/fonts/mali/Mali-Italic.ttf'),
    'mali-bold-italic': require('./assets/fonts/mali/Mali-BoldItalic.ttf'),
    'mali-extra-light': require('./assets/fonts/mali/Mali-ExtraLight.ttf'),
    'mali-extra-light-italic': require('./assets/fonts/mali/Mali-ExtraLightItalic.ttf'),
    'mali-light': require('./assets/fonts/mali/Mali-Light.ttf'),
    'mali-light-italic': require('./assets/fonts/mali/Mali-LightItalic.ttf'),
    'mali-medium': require('./assets/fonts/mali/Mali-Medium.ttf'),
    'mali-medium-italic': require('./assets/fonts/mali/Mali-MediumItalic.ttf'),
    'mali-semi-bold': require('./assets/fonts/mali/Mali-SemiBold.ttf'),
    'mali-semi-bold-italic': require('./assets/fonts/mali/Mali-SemiBoldItalic.ttf'),
  });

  const [isHiddenMssg, setIsHiddenMssg] = useState(true);
  const [textMssg, setTestMssg] = useState('Login successful');
  const [colorMssg, setColorMssg] = useState(theme[mode].successColor);
  const [breadCrumb, setBreadCrumb] = useState([]);

  const lightBackgroundImage = require(`./assets/images-bg/cookery-light.png`);
  const darkBackgroundImage = require(`./assets/images-bg/cookery-dark.png`);
  const blurRadius = 1;

  const consts = {
    px: 392.7/709,
    expo: 392.7/(709*2),
    widthScreen: 709,
    heightScreen: 1552,
  };

  let styles = {
    fonts: {
      mali: {
        regular: 'mali',
        bold: 'mali-bold',
        italic: 'mali-italic',
        boldItalic: 'mali-bold-italic',
        extraLight: 'mali-extra-light',
        extraLightItalic: 'mali-extra-light-italic',
        light: 'mali-light',
        lightItalic: 'mali-light-italic',
        medium: 'mali-medium',
        mediumItalic: 'mali-medium-italic',
        semiBold: 'mali-semi-bold',
        semiBoldItalic: 'mali-semi-bold-italic',
      }
    },
    transparentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    container:
    {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: theme[mode].backgroundColor,
    },
    opacity:
    {
      flex: 1,
      backgroundColor: theme[mode].backgroundColor,     //backgroundColor: theme[mode].backgroundColor, backgroundColorInterpolation
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
        marginTop: 30*consts.px,
        marginBottom: 20*consts.px,
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
        fontSize: 28*consts.px,
        textAlign: 'center',
      },
    }
  };
  
  const dataInput = {
    mode,
    theme,
    styles,
    consts,
    isInputFocus,
    setIsInputFocus,
    setBreadCrumb,
    breadCrumb,
  }
  
  const dataMssg = {
    isHiddenMssg,
    setIsHiddenMssg,
    textMssg,
    setTestMssg,
    colorMssg,
    setColorMssg,
    setBreadCrumb,
    breadCrumb,
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
    setBreadCrumb,
    breadCrumb,
  }

  const dataPinInput = {
    theme,
    mode,
    consts,
    styles,
    dataInput,
    isPinInput: false,
    setBreadCrumb,
    breadCrumb,
  }

  const dataIconButton = {
    theme,
    mode,
    setMode,
    consts,
    styles,
    setBreadCrumb,
    breadCrumb,
  }

  const dataMessage = {
    theme,
    mode,
    consts,
    setBreadCrumb,
    breadCrumb,
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
    setBreadCrumb,
    breadCrumb,

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

    /*axios.get(`${SERVER_URL}/test-db`)
    .catch((err) => {
      ToastAndroid.showWithGravityAndOffset('Error DB access', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
    })*/
  }, []);

  useEffect(() => {
    let add = '';

    if (isInputFocus)
      add = 'keyboard';
    else
      add = strpage;
    
    setBreadCrumb([...breadCrumb, add]);
  }, [strpage, isInputFocus])

  useEffect(() => {

    (async () => {
      await getItem('mode').then((value) => {
        if (!modeSetted) {
          if (!value) {
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
    })();

    Animated.timing(bgColor, {
      toValue: mode === 'dark' ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Appearance.setColorScheme(mode);
    mode ? setTestingMode(Appearance.getColorScheme()) : null;
    
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


  //loading font...
  if (!fontLoaded && !fontLoadedError) {
    return (
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          source={mode === 'light' ? splashLight : splashDark }
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          blurRadius={blurRadius}
        />
      </View>
    )
  }

  return (
      <View 
        key={'backgroundApp'}
        style={ styles.container } 
      >
        <Image
          resizeMode="cover"
          source={mode === 'light' ? lightBackgroundImage : darkBackgroundImage }
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          blurRadius={blurRadius}
        />
        
        <Link href={'/components/'+strpage} style={ styles.transparentContainer } />

        { objdebug[strpage] }
        
        {
          loading && 
          <View style={ styles.popUp.background } >
            <View style={{
              ...styles.popUp.container,
              height: 275*consts.px,
              backgroundColor: theme[mode].noIcons,
            }} >
              <Text style={{
                ... styles.popUp.title,
                color: theme[mode].color,
                fontFamily: styles.fonts.mali.bold,
                marginBottom: 20*consts.px,
              }} >{textLoading}</Text>
              <ActivityIndicator size='large' color={ theme[mode].color } />
            </View>
          </View>
        }

        <DebugMenu
          data={{
            styles,
            setPage,
            page,
            arrdebug,
            dataIconButton,
            showDebugMenu,
            theme,
            mode,
            setLoading,
            consts,
          }}
        />
        
      </View>
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
    contrastingGreen: '#1CB09C',
    noContrastingGreen: '#0A423B',
    favorite: '#69C17C',
    difficulty: {
      easy: {
        background: '#124D00',
        border: '#30CC00',
      },
      medium: {
        background: '#4D2F00',
        border: '#CC7E00',
      },
      hard: {
        background: '#4D0000',
        border: '#FF0000',
      },
    },
  },
  light: {
    backgroundColor: '#FF7900',
    noBackgroundColor: '#803C00',
    color: '#000000',
    noColor: '#ffffff',
    shadowTitle: '#dddddd',
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
    contrastingGreen: '#0A423B',
    noContrastingGreen: '#1CB09C',
    favorite: '#347E44',
    difficulty: {
      easy: {
        background: '#B1FF99',
        border: '#3CFF00',
      },
      medium: {
        background: '#FFD084',
        border: '#FF9D00',
      },
      hard: {
        background: '#FF9999',
        border: '#FF0000',
      },
    },
  },
}
