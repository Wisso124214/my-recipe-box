import { TouchableOpacity, Text } from "react-native";
import { configFront } from "../../config/config";

const ContrastingSmallButton = ({ data, style, text, buttonprops, styles }) => {
  
  const { theme, mode, consts } = data;
  
  return(
    <TouchableOpacity
      activeOpacity= {configFront.activeOpacity}
      style={{
        position: 'absolute',
        top: 525*consts.px,
        alignSelf: 'center',
        backgroundColor: theme[mode].icons,
        borderRadius: 30*consts.px,
        width: 380*consts.px,
        height: 80*consts.px,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}

      {...buttonprops}
    >
      <Text
        style={{
          fontFamily: styles.fonts.mali.bold,
          color: theme[mode].noColor,
          fontSize: 26*consts.px,
        }}
      >{text}</Text>
    </TouchableOpacity>
  )
}

export default ContrastingSmallButton;