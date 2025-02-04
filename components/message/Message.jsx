import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Message = (props) => {
  
  const { theme, mode, consts, text, bgcolor, style, hidden, viewprops } = props.dataMessage;
  let { scale, lineNumbers } = props.dataMessage;

  scale = scale === undefined ? 1 : scale;

  const newText = text && text.length > 0 ? text.split(' ').filter((el) => el !== '').join(' ') : '';
  lineNumbers = lineNumbers === undefined ? Math.floor(newText.length / (27*scale)) + 1 : lineNumbers;
  const radius = lineNumbers * (-3/20) + 1.15;
  const textLength = newText.length*15*consts.px < 400*consts.px ? newText.length*15*consts.px : 400*consts.px
  
  return (
    <View {...viewprops} >
      {
        !hidden ? 
        <View
          style={{
            position: 'absolute',
            width: textLength*1.2,
            height: (10 + (52 * lineNumbers)) * consts.px,
            backgroundColor: bgcolor,
            borderRadius: 31 * consts.px * lineNumbers * radius,
            justifyContent: 'center',
            alignItems: 'center',
            ...style,
          }}
        >
          <View>
            <Text
              style={{
                color: theme[mode].noColor,
                textAlign: 'center',
                fontSize: 30 * consts.px,
                fontWeight: 'bold',
                width: textLength,
              }} >
                {newText}
            </Text>
          </View> 
        </View>
        : null
      }
    </View>
  );
};

export default Message;