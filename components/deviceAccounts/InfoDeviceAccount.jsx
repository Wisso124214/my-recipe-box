import { Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import Tooltip from "../tooltip/Tooltip";
import { useState } from "react";

const InfoDeviceAccount = ({ data, text, type, maxLength, style, styles }) => {

  const { theme, mode, consts, setIsInputPopUpVisible, setTypeSelected, setValueSelected } = data;
  const [isShow, setIsShow] = useState(false);

  const dataTooltip = {
    theme: theme,
    mode: mode,
    consts: consts,
    isShow: isShow,
    setIsShow: setIsShow,
  }

  const handleEdit = () => {
    setIsInputPopUpVisible(true);
    setValueSelected(text);
    setTypeSelected(type);
  }

  return(
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginVertical: 2*consts.px,
        ...style,
      }}
    >
      <Tooltip data={dataTooltip} text={type} />
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={15*2.5*consts.px}  
        height={15*2.5*consts.px}
        style={{
          marginLeft: 40*consts.px,
          marginRight: 30*consts.px,
        }}
        onPress={()=>setIsShow(true)}
      >
        <Path
          scale={2.5*consts.px}
          fill={theme[mode].contrastingYellow}
          fillRule="evenodd"
          d="M7.5.877a6.623 6.623 0 1 0 0 13.246A6.623 6.623 0 0 0 7.5.877ZM1.827 7.5a5.673 5.673 0 1 1 11.346 0 5.673 5.673 0 0 1-11.346 0Zm6.423-3a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM6 6h1.5a.5.5 0 0 1 .5.5V10h1v1H6v-1h1V7H6V6Z"
          clipRule="evenodd"
        />
      </Svg>
      <Text
        style={{
          fontFamily: styles.fonts.mali.bold,
          color: theme[mode].color,
          fontSize: 30*consts.px,
          marginTop: -5*consts.px,
        }}
      >
        {text.length > maxLength ? text.slice(0, maxLength) + '...' : text}
      </Text>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={15*2.5*consts.px}  
        height={15*2.5*consts.px}
        style={{
          position: 'absolute',
          right: 40*consts.px,
        }}
        onPress={handleEdit}
      >
        <Path
          scale={2.5*consts.px}
          fill={theme[mode].contrastingYellow}
          fillRule="evenodd"
          d="M11.854 1.146a.5.5 0 0 0-.707 0L3.714 8.578a1 1 0 0 0-.212.314L2.04 12.303a.5.5 0 0 0 .657.657l3.411-1.463a1 1 0 0 0 .314-.211l7.432-7.432a.5.5 0 0 0 0-.708l-2-2Zm-7.432 8.14L11.5 2.206 12.793 3.5l-7.078 7.078-1.496.641-.438-.438.64-1.496Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
}

export default InfoDeviceAccount;