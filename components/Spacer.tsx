import React from 'react'
import { StyleSheet ,View, Text, TextStyle } from 'react-native'

interface Props {
  width?: string,
  height?: string
}

export default function Spacer({ width, height } : Props) {
  return (
    <View>
      <Text style={styles(width, height).spacing} />
    </View>
  )
}

const styles = (width?:string, height?:string) => StyleSheet.create({
  spacing: {
    minWidth: width,
    minHeight: height
  }
})
