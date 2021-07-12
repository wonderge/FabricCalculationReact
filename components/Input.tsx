import React, { Fragment } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import appStyles from '../helpers/styles';
import NumTextbox from './NumTextbox';
import Spacer from './Spacer';

interface Props {
  style?: StyleProp<ViewStyle>,
  textWidth?: string
  prompt?: string,
  value?: string,
  onChangeText?: (text:string) => void,
  child? : boolean,
  length? : string
}

export default function Input({ style, textWidth, prompt, value, onChangeText, child, length } : Props) {
  const input = () : JSX.Element => {
    return (
      <View style={[appStyles.row, style]}>
        <Text style={[appStyles.textSize, styles(textWidth).width]}>{prompt}</Text>
        <Spacer width='3%' />
        <NumTextbox value={value} onChangeText={onChangeText} style={styles().size} />
      </View>
    )
  }

  const fragInput = () : JSX.Element => {
    return (
      <Fragment>
        <Text style={[appStyles.textSize, styles(textWidth).width]}>{prompt}</Text>
        <Spacer width='3%' />
        <NumTextbox value={value} onChangeText={onChangeText} style={[styles().size, { width: length }]} />
      </Fragment>
    )
  }

  return child ? fragInput() : input()
}

const styles = (textWidth?: string) => StyleSheet.create({
  size: {
    width: '35%'
  },
  width: {
    width: textWidth
  },
  flex: {
    flex: 1
  }
})
