import React from 'react';
import { StyleProp, StyleSheet, TextInput, TextStyle } from 'react-native';

interface Props {
  style?: StyleProp<TextStyle>,
  value?: string,
  hint?: string,
  onChangeText?: (text: string) => void
}

export default function NumTextbox({ style, value, hint, onChangeText } : Props) {
  const onChange = (text: string) : void => {
    let symbols : string = '0123456789.';
    let number : string = '';
    let decimalPoint : boolean = false;

    text.split('').forEach(letter => {
      if (symbols.indexOf(letter) > -1 && (letter !== "." || !decimalPoint)) {
        number += letter;
        if (letter === ".") {
          decimalPoint = true;
        }
      }
    })

    if (onChangeText && number.length < 10) {
      onChangeText(number)
    }
  }

  return ( 
    <TextInput style={[styles.input, style]} value={value} placeholder={hint} onChangeText={onChange} keyboardType='number-pad' />
  )
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    fontSize: 18
  }
})
