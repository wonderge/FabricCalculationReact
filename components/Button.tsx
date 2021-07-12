import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle, TextStyle, StyleProp } from 'react-native';

interface Props {
  text?: string,
  onPress?: () => void,
  style?: StyleProp<ViewStyle>,
  textStyle? : StyleProp<TextStyle>
}

export default function Button({ text, onPress, style, textStyle} : Props ) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, style]}>
        <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#e5e5e5',
    minWidth: '20%'
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase'
  }
})