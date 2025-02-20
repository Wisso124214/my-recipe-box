import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const Loading = (data) => {

  const { theme, mode, consts, styles, textLoading, loading } = data;

  {loading && 
    <View style={ styles.popUp.background } >
      <View style={{
        ...styles.popUp.container,
        height: 275*consts.px,
        backgroundColor: theme[mode].noIcons,
      }} >
        <Text style={{
          ... styles.popUp.title,
          color: theme[mode].color,
          fontFamily: styles.fonts.mali.bold,
          marginBottom: 20*consts.px,
        }} >{textLoading}</Text>
        <ActivityIndicator size='large' color={ theme[mode].color } />
      </View>
    </View>
  }
}

export default Loading;