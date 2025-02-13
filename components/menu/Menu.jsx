import { Text, Touchable, TouchableOpacity, View } from "react-native";
import SvgIconProvider from "../svg/svgIconProvider";
import { configFront } from "../../config/config";

const Menu = ({ items, data }) => {
  
  const { isShow, theme, consts, mode, setStrPage, styles } = data;
  const maxLengthTitle = 16;

  const arr = [
    {
      title: 'My accounts',
      d: 'M1 2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H1Zm0 1h13v.925a.448.448 0 0 0-.241.07L7.5 7.967 1.241 3.995A.448.448 0 0 0 1 3.925V3Zm0 1.908V12h13V4.908L7.741 8.88a.45.45 0 0 1-.482 0L1 4.908Z',
      color: theme[mode].noColor,
      sizeIcon: 45*consts.px,
      onPress: ()=>setStrPage('userAccounts'),
    },
    {
      title: 'Exit account',
      d: 'M3 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h7.5a.5.5 0 0 0 0-1H3V2h7.5a.5.5 0 0 0 0-1H3Zm9.604 3.896a.5.5 0 0 0-.708.708L13.293 7H6.5a.5.5 0 0 0 0 1h6.793l-1.397 1.396a.5.5 0 0 0 .708.708l2.25-2.25a.5.5 0 0 0 0-.708l-2.25-2.25Z',
      color: theme[mode].noColor,
      sizeIcon: 45*consts.px,
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

  return(
    isShow ? 
      <View
        style={{
          width: 390*consts.px,
          height: (30*2 + 69*arr.length)*consts.px,
          padding: 30*consts.px,
          backgroundColor: theme[mode].icons,
          borderRadius: 30*consts.px,
          position: 'absolute',
          top: 240*consts.px,
          right: 70*consts.px,
        }}
      >
        {
          Array.from(arr).map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={configFront.activeOpacity}
              zIndex={10}
              onPress={()=>arr[index].onPress ? arr[index].onPress() : console.log(arr[index].title)}
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  fontFamily: styles.fonts.mali.bold,
                  color: arr[index].color,
                  fontSize: 30*consts.px,
                  marginLeft: 15*consts.px,
                  marginVertical: 2*consts.px,
                }}
              >
                {arr[index].title.length > maxLengthTitle ? arr[index].title.slice(0, maxLengthTitle) + '...' : arr[index].title}
              </Text>
              
    
              <SvgIconProvider 
                style={{
                  position: 'absolute',
                  top: 7.5*consts.px,
                  right: 7.5*consts.px,
                }}
                styles={{
                  color: arr[index].color,
                  px: arr[index].sizeIcon,
                  ...arr[index].stylesIcon,
                }}
                src="styles"
                d={arr[index].d}
              />
            </TouchableOpacity> 
          ))
        }
      </View>
    : null
  )
}

export default Menu;