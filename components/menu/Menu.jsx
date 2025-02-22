import { Text, Touchable, TouchableOpacity, View } from "react-native";
import SvgIconProvider from "../svg/svgIconProvider";
import { configFront } from "../../config/config";

const Menu = ({ items = [], data }) => {
  
  const { isShow, theme, consts, mode, setStrPage, styles } = data;
  const maxLengthTitle = 16;

  return(
    isShow ? 
      <View
        style={{
          width: 390*consts.px,
          height: (30*2 + 69*items.length)*consts.px,
          padding: 30*consts.px,
          backgroundColor: theme[mode].icons,
          borderRadius: 30*consts.px,
          position: 'absolute',
          top: 240*consts.px,
          right: 70*consts.px,
          zIndex: 2,
        }}
      >
        {
          Array.from(items).map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={configFront.activeOpacity}
              zIndex={10}
              onPress={()=>items[index].onPress ? items[index].onPress() : console.log(items[index].title)}
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  fontFamily: styles.fonts.mali.bold,
                  color: items[index].color,
                  fontSize: 30*consts.px,
                  marginLeft: 15*consts.px,
                  marginVertical: 2*consts.px,
                }}
              >
                {items[index].title.length > maxLengthTitle ? items[index].title.slice(0, maxLengthTitle) + '...' : items[index].title}
              </Text>
              
    
              <SvgIconProvider 
                style={{
                  position: 'absolute',
                  top: 7.5*consts.px,
                  right: 7.5*consts.px,
                }}
                styles={{
                  color: items[index].color,
                  px: items[index].sizeIcon,
                  ...items[index].stylesIcon,
                }}
                src="styles"
                d={items[index].d}
              />
            </TouchableOpacity> 
          ))
        }
      </View>
    : null
  )
}

export default Menu;