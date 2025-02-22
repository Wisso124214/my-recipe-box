import { TouchableOpacity } from "react-native";
import SvgIconProvider from "../svg/svgIconProvider";
import { configFront } from "../../config/config";

const IconButton = ({ dataIconButton, onPress, dCodeIcon, src, strprops, styles, sizeButton, styleButton }) => {

  const { mode, theme } = dataIconButton;

  styles = styles === undefined ? dataIconButton.styles : styles;
  src = src === undefined ? 'styles' : src;
  strprops = strprops === undefined ? 'color, px, scale, top, left' : strprops;
  sizeButton = sizeButton === undefined ? 50 : sizeButton;

  return(
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={configFront.activeOpacity}
      style={{ marginHorizontal: 10, width: sizeButton, height: sizeButton, backgroundColor: 'transparent', borderRadius: 100, ...styleButton }}
    >
      <SvgIconProvider 
        styles={styles}
        src={src}
        strprops={strprops}
        d={dCodeIcon} 
      />
    </TouchableOpacity>
  )
}

export default IconButton;