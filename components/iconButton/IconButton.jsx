import { TouchableHighlight } from "react-native";
import SvgIconProvider from "../svg/svgIconProvider";
import { size } from "lodash";


const IconButton = ({ dataIconButton, onPress, dCodeIcon, src, strprops, styles, sizeButton, styleButton }) => {

  const { mode, theme } = dataIconButton;

  styles = styles === undefined ? dataIconButton.styles : styles;
  src = src === undefined ? 'styles' : src;
  strprops = strprops === undefined ? 'color, px, scale, top, left' : strprops;
  sizeButton = sizeButton === undefined ? 50 : sizeButton;

  return(
    <TouchableHighlight
      onPress={onPress}
      style={{ marginHorizontal: 10, width: sizeButton, height: sizeButton, backgroundColor: theme[mode].backgroundColor, borderRadius: 100, ...styleButton }}
      underlayColor={theme[mode].color+'50'}
    >
      <SvgIconProvider 
          styles={styles}
          src={src}
          strprops={strprops}
          d={dCodeIcon} />
    </TouchableHighlight>
  )
}

export default IconButton;