import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import Button from '../components/Button';
import Container from '../components/Container';
import { rectangleCloth, roundCloth } from '../helpers/string';

interface Props {
  navigation: StackNavigationProp
}

export default function TableclothType({ navigation } : Props) {
  const navigateTo = (screen : string) => {
    navigation.navigate(screen);
  }

  return (
    <Container>
      <Button text={roundCloth} onPress={() => navigateTo('Roundcloth')} />
      <Button text={rectangleCloth} onPress={() => navigateTo('Tablecloth')} style={styles.spacing} />
    </Container>
  )
}

const styles = StyleSheet.create({
  spacing: {
    marginTop: '80%'
  }
})
