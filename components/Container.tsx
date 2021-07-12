import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, useWindowDimensions, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  children?: JSX.Element[] | JSX.Element
}

export default function Container({ children } : Props) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={(Platform.OS === 'ios')}>
        <View style={[styles.container, { minHeight: useWindowDimensions().height }]}>
          {children}
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});