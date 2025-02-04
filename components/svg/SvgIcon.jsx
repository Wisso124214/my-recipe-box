import * as React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const SvgIcon = (props) => (
  <View style={{ position: 'absolute', top: props.top, left: props.left, ...props.styleview }}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.px}
      height={props.px}
      fill={props.color}
      style={{ ...props.stylesvg }}
      {...props}
      >
      <Path
        style={{ scale: props.px/16, ...props.stylepath }}
        fill={props.color}
        fillRule="evenodd"
        d={props.d}
        clipRule="evenodd"
      />
    </Svg>
  </View>
);

export default SvgIcon;