import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
  onPress?: () => void,
  checked?: boolean,
  text?: string
}

export default function RadioButton({ onPress, checked, text } : Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.circle} onPress={onPress} >
        {checked ? (<View style={styles.checkedCircle} />) : (<View />)}
      </TouchableOpacity>
      <Text>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#acacac',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkedCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#131313'
  },
  row: {
    flexDirection: 'row'
  }
})
