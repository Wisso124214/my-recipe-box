import { useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import {
  View, 
  Animated,
  Appearance,
  Image,
} from 'react-native';

import LoadingScreen from './components/loadingScreen/LoadingScreen';
import Login from './components/login/Login';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import Register from './components/register/Register';
import DetailsRecipe from './components/recipies/DetailsRecipe.jsx';
import DeviceAccounts from './components/deviceAccounts/DeviceAccounts';
import UserAccounts from './components/userAccounts/UserAccounts';
import DebugMenu from './components/debugMenu/DebugMenu';
import { setItem, getItem } from './utils/asyncStorage.js';
import ListRecipies from './components/recipies/ListRecipies.jsx';
import { createArrayColors, editRecipe } from './components/recipies/dataRecipes.js';
import { fetchNRecipies } from './components/recipies/dataRecipes.js';
import { arrFetchDebug, objCategories } from './fetchDebug.js';

import { SERVER_URL } from './config/config';
import axios from 'axios';
import Loading from './components/loading/Loading.jsx';
import { SplashScreen } from 'expo-router';
import EditRecipe from './components/editRecipe/EditRecipe.jsx';

export default function App() {
  const devMode = {
  power: 'on',
    on: {
      timeLoading: 0,
      screenLoading: false,
      debugMenuEnabled: true,
      showDebugMenu: false,
      strpage: 'login',
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
  const [idMainSession, setIdMainSession] = useState(null);
  const [recipeSelected, setRecipeSelected] = useState(arrFetchDebug[0]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  
  const [colorsCategories, setColorsCategories] = useState({});
  const [arrayRecipies, setArrayRecipies] = useState([]);
  const [retriesColorsCategories, setRetriesColorsCategories] = useState([]);
  const [arrayColors, setArrayColors] = useState([]);

  const [fetchedData, setFetchedData] = useState(false);
  const reloadFetchData = true;
  
  const pushColorCategories = async (category) => {
  
    console.log('category: ', category);
    if (Object.keys(colorsCategories).includes(category) || category === '') {
      return;
    }
    let obj = {};

    await getArrayColor()
    .then((color) => {
      obj = color;

      if (Object.keys(obj).length === 0) {
        const copyRetriesColors = [...retriesColorsCategories];

        if (!copyRetriesColors.includes(category)) {
          setRetriesColorsCategories([category, ...copyRetriesColors]);
        }
      }
    });

    if (Object.keys(obj).length !== 0) {
      setColorsCategories({...colorsCategories, [category]: obj});
    }
  }

  const getArrayColor = async () => {
    let obj = {};
    
    if (arrayColors.length !== 0) {
      const copyArrayColors = [...arrayColors];

      obj.color = copyArrayColors[Math.floor(Math.random() * copyArrayColors.length)]
      setArrayColors(copyArrayColors.filter((color) => color !== obj.color));
    }
    console.log('obj: ', obj);

    return obj;
  }

  const initializeArrayColors = async () => {
    await createArrayColors()
    .then((colors) => {
      setArrayColors(colors);
    })
    .catch((error) => {
      console.log('ERROR ' + error);
    })
  }

  useEffect(() => {
    (async () => {
      if (arrayColors.length === 0) {
        await initializeArrayColors();
      }
    })()
  }, [arrayColors]);

  useEffect(() => {
    // console.log('colorsCategories: ', Object.keys(colorsCategories).length)
    // console.log('colorsCategories: ', JSON.stringify(colorsCategories, null, 2))
  }, [colorsCategories])

  useEffect(() => {
    (async () => {
      if (retriesColorsCategories.length > 0) {
        const copyRetriesColors = [...retriesColorsCategories];
        
        console.log('retrying: ', copyRetriesColors[0]);

        await pushColorCategories(copyRetriesColors[0])
        .then(() => {
          setRetriesColorsCategories(copyRetriesColors.splice(0, 1));
        })
        .catch((error) => {
          console.log('ERROR ' + error);
        })
      }
    })()
  }, [retriesColorsCategories]);

  useEffect(() => {
    // (async () => {
    //   setLoading(true);
    //   setArrayRecipies(arrFetchDebug);
    //   for (let r in arrFetchDebug) {
    //     for (let c in arrFetchDebug[r].categories) {
    //       await pushColorCategories(arrFetchDebug[r].categories[c]);
    //     }
    //   }
    //   setLoading(false);
    // })();
    setLoading(true);
    setArrayRecipies(arrFetchDebug);
    setColorsCategories(objCategories)
      // for (let r in arrFetchDebug) {
      //   for (let c in arrFetchDebug[r].categories) {
      //     // pushColorCategories(arrFetchDebug[r].categories[c]);
      //   }
      // }
      setLoading(false);

      
  }, []);
  
  

  // useEffect(() => {
  //   if (Object.keys(colorsCategories).length > 0) {
  //     setItem('colorsCategories', JSON.stringify(colorsCategories))
  //   }
  //   console.log('colorsCategories: ', colorsCategories)
  // }, [colorsCategories])

  useEffect(() => {
    // console.log('recipies ', arrFetchDebug.length)
    // editRecipe(arrFetchDebug[arrFetchDebug.length-1], pushColorCategories)

    //FETCH DATA
    /*
    (async () => {
      setLoading(true);

      await getItem('arrayRecipies')
      .then( async (value) => {
        if (value && !reloadFetchData && !fetchedData) {
          setArrayRecipies(JSON.toString(value));
        } else {
          setLoading(true);
          pushColorCategories('all');
          await fetchNRecipies(15, pushColorCategories)
          .then(async (recipies) => {
            setLoading(false);
            pushColorCategories('own');
            console.log('recipies: ', recipies.length);
            
            for (let r in recipies) {
              recipies[r] && recipies[r].strMeal && console.log(`recipies[${r}]: ${recipies[r].strMeal}`)
            }
            const newRecipies = recipies.filter(recipe => recipe !== null && recipe !== undefined)
            setArrayRecipies(newRecipies);

            await setItem('arrayRecipies', JSON.stringify(newRecipies))
            .then(async () => {
              await getItem('arrayRecipies')
              .then((value) => {
                console.log('arrayRecipies: ', value);
              }
            })
            .catch((error) => {
              console.log('ERROR' + error);
            })
            setFetchedData(true);
            console.log('fetched data');
          })
        }
      })
    })()*/
  }, [])

  const lightBackgroundImage = require(`./assets/images-bg/cookery-light.png`);
  const darkBackgroundImage = require(`./assets/images-bg/cookery-dark.png`);
  const blurRadius = 1;

  const consts = {
    px: 392.7/709,
    expo: 392.7/(709*2),
    widthScreen: 709,
    heightScreen: 1552,
  };

  const styles = {
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
    idMainSession,
    setIdMainSession,
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
    idMainSession,
    setIdMainSession,
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
    idMainSession,
    setIdMainSession,
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
    idMainSession,
    setIdMainSession,
  }

  const dataIconButton = {
    theme,
    mode,
    setMode,
    consts,
    styles,
    setBreadCrumb,
    breadCrumb,
    idMainSession,
    setIdMainSession,
  }

  const dataMessage = {
    theme,
    mode,
    consts,
    setBreadCrumb,
    breadCrumb,
    idMainSession,
    setIdMainSession,
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
    idMainSession,
    setIdMainSession,
    pushColorCategories,
    arrayRecipies,
    colorsCategories,
    setRecipeSelected,
    recipeSelected,
    editingRecipe,
    setEditingRecipe,


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
    detailsRecipe:  <DetailsRecipe data={dataPages} />,
    deviceAccounts: <DeviceAccounts data={dataPages} />,
    userAccounts: <UserAccounts data={dataPages} />,
    listRecipies: <ListRecipies data={dataPages} />,
    editRecipe: <EditRecipe data={dataPages} />, 
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
  }, []);

  useEffect(() => {
    if (idMainSession === null) {
      getItem('idMainSession')
      .then((value) => {
        if (value) {
          setIdMainSession(value);
          setStrPage('listRecipies');
        } else {
          setIdMainSession('');
        }
      });
    } else {
      setItem('idMainSession', idMainSession);
    }

    console.log('idMainSession: ', idMainSession);
  }, [idMainSession])

  useEffect(() => {
    let add = '';

    if (isInputFocus) {
      add = 'keyboard';
      setBreadCrumb([...breadCrumb, add]);
    } else if (breadCrumb[breadCrumb.length - 1] !== strpage && breadCrumb[breadCrumb.length - 2] !== strpage) {
      add = strpage;
      setBreadCrumb([...breadCrumb, add]);
    }
      
    
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
  }, []);

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
  } else {
    SplashScreen.hideAsync();
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

        { objdebug[strpage] }
        
        <Loading data={{...dataPages, textLoading}} />

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
        background: 'hsl(106, 100%, 15%)',
        border: 'hsl(106, 100%, 40%)',
      },
      medium: {
        background: 'hsl(37, 100%, 15%)',
        border: 'hsl(37, 100%, 40%)',
      },
      hard: {
        background: 'hsl(0, 100%, 15%)',
        border: 'hsl(0, 100%, 50%)',
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
        background: 'hsl(106, 100%, 80%)',
        border: 'hsl(106, 100%, 50%)',
      },
      medium: {
        background: 'hsl(37, 100%, 76%)',
        border: 'hsl(37, 100%, 50%)',
      },
      hard: {
        background: 'hsl(0, 100%, 80%)',
        border: 'hsl(0, 100%, 50%)',
      },
    },
  },
}