import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types'
import Button from '../components/Button'
import Container from '../components/Container'
import { holeCurtain, regularCurtain } from '../helpers/string'

interface Props {
  navigation: StackNavigationProp
}

export default function CurtainType({ navigation } : Props) {
  const navigateTo = (screen: string) : void => {
    navigation.navigate(screen);
  }

  return (
    <Container>
      <Button text={regularCurtain} onPress={() => navigateTo('Curtain')} />
      <Button text={holeCurtain} onPress={() => navigateTo('HoleCurtain')} style={styles.spacing} />
    </Container>
  )
}

const styles = StyleSheet.create({
  spacing: {
    marginTop: '80%'
  }
})