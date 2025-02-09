import { Text, TouchableOpacity, View } from "react-native";
import { configFront } from "../../config/config";


const ContrastingButton = ({ text, theme, mode, consts, style, onPress, styles })=>{
  return (
    <View>
      <TouchableOpacity
        activeOpacity= {configFront.activeOpacity}
        style={{
          position: 'fixed',
          borderRadius: 50 * consts.px,
          width: 300 * consts.px,
          height: 100 * consts.px,
          backgroundColor: theme[mode].icons,
          justifyContent: 'center',
          alignItems: 'center',
          ...style,
        }} 
        onPress={ onPress }
        >
        <Text 
          style={{ 
            fontFamily: styles.fonts.mali.bold,
            color: theme[mode].noColor,  
            fontSize: 32*consts.px,
            textShadowColor: theme[mode].noColor,
            textShadowOffset: {width: 1, height: 0},
            textShadowRadius: 1,
            width: '100%',
            textAlign: 'center',
           }} >{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ContrastingButton;