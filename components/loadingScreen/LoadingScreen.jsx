import { View, Text, TouchableOpacity } from 'react-native';
import Logo from '../logo/Logo';
import { configFront } from '../../config/config';

const LoadingScreen = ({ data }) => {

  const { mode, consts, styles, theme, showDebugMenu, setShowDebugMenu, devMode } = data;
  const logoSize = 300*consts.px;

  return (
    <View style={ styles.transparentContainer }>
      
      <TouchableOpacity
        activeOpacity={configFront.activeOpacity}
        onPress={() => devMode[devMode.power].debugMenuEnabled ? setShowDebugMenu(!showDebugMenu) : null}
      >
        <Logo mode={mode} logoSize={logoSize} />
      </TouchableOpacity>
      
      <Text 
        style={{
          fontFamily: styles.fonts.mali.bold,
          fontSize: 100*consts.px,
          color: theme[mode].color, 
          paddingTop: 20*consts.px, 
          textShadowColor: theme[mode].shadowTitle,
          textShadowOffset: {width: -3, height: 3},
          textShadowRadius: 8, 
          textAlign: 'center',
        }}
      >
        My Recipe Box
      </Text>
    </View>
  );
}

export default LoadingScreen;