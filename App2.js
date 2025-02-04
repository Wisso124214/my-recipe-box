import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { FadeIn, FadeOut } from 'react-native-reanimated';

import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Button, 
  TouchableHighlight, 
  TouchableOpacity, 
  Pressable,
  Animated,
} from 'react-native';

import logo from './assets/others/logo.png';
import LoadingScreen from './components/loadingScreen/LoadingScreen';

export default function App() {
  
  const [mode, setMode] = useState('dark');
  const [noMode, setNoMode] = useState('light');
  const [page, setPage] = useState(0);
  const opacityref = useRef(new Animated.Value(0)).current;
  const bgColor = useRef(new Animated.Value(0)).current;


  const sizeFactor = 8/10;
  const logoSize = 216*sizeFactor;

  
  let styles = {
    
    container:
    {
      flex: 1,
      backgroundColor: backgroundColorInterpolation,      //backgroundColor: theme[mode].backgroundColor,
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
      padding: 10,
      width: 'min-content',
      marginHorizontal: 5,
    }
  };
  
  
  const debug = [
    <LoadingScreen mode={mode} sizeFactor={sizeFactor} logoSize={logoSize} styles={styles} theme={theme} logo={logo} />,
    <View style={styles.container}>
      <Text style={{color: theme[mode].color}}>Hello World</Text>
    </View>,
  ]
  
  NavigationBar.setBackgroundColorAsync(theme[mode].backgroundColor);


  useEffect(() => {
    Animated.timing(opacityref, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Animated.timing(bgColor, {
      toValue: mode === 'dark' ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [mode]);

  const backgroundColorInterpolation = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.light.backgroundColor, theme.dark.backgroundColor],
  });

  return (

      <Animated.View 
        key={'uniqueKey'}
        entering={FadeIn.duration(400)}
        exiting={FadeOut.duration(400)}
        style={ styles.container } 
      >
        
        {debug[page]}
        
        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 20 }} >
          <TouchableOpacity 
            onPress={() => setPage(page > 0 ? page-1 : debug.length-1)}
            style={ styles.simpleButtons }
          >
            <Text> {"<"} </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            style={ styles.simpleButtons }
          > 
            <Text>Press me</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setPage(page < debug.length-1 ? page+1 : 0)}
            style={ styles.simpleButtons }
          >
            <Text> {">"} </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
        
        
    
  );
}

function printObject(obj) {
  console.log('-----------------------------------------');
  console.log('object: ' + JSON.stringify(obj, null, 2));
  console.log('-----------------------------------------');
}



const theme = {
  dark: {
    backgroundColor: '#0E5758',
    color: '#fff',
    statusBar: 'light',
    shadowTitle: '#000',
  },
  light: {
    backgroundColor: '#23DBDC',
    color: '#222',
    statusBar: 'dark',
    shadowTitle: '#777',
  },
}
