import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import { chaircover, clip, curtain, flower, napkin, sash, screen, skirt, tablecloth, tube, weightAmount } from '../helpers/string';

interface Props {
  navigation: StackNavigationProp
}

export default function Home({ navigation } : Props) {
  const navigateTo = (screen: string) : void => {
    navigation.navigate(screen);
  }

  return (
    <View style={styles.container}>
      <View style={styles.rows}>
        <Button text={napkin} onPress={() => navigateTo('Napkin')} />
        <Spacer width='20%' />
        <Button text={tablecloth} onPress={() => navigateTo('TableclothType')} />
      </View>
      <View style={[styles.rows, styles.spacing]}>
        <Button text={sash} onPress={() => navigateTo('Sash')} />
        <Spacer width='20%' />
        <Button text={clip} onPress={() => navigateTo('Clip')} />
      </View>
      <View style={[styles.rows, styles.spacing]}>
        <Button text={skirt} onPress={() => navigateTo('Skirt')} />
        <Spacer width='20%' />
        <Button text={chaircover} onPress={() => navigateTo('Chaircover')} />
      </View>
      <View style={[styles.rows, styles.spacing]}>
        <Button text={curtain} onPress={() => navigateTo('CurtainType')} />
        <Spacer width='20%' />
        <Button text={screen} onPress={() => navigateTo('Screen')} />
      </View>
      <View style={[styles.rows, styles.spacing]}>
        <Button text={flower} onPress={() => navigateTo('Flower')} />
        <Spacer width='20%' />
        <Button text={weightAmount} onPress={() => navigateTo('WeightAndAmount')} />
      </View>
      <View style={[styles.rows, styles.spacing]}>
        <Button text={tube} onPress={() => navigateTo('Tube')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rows: {
    flexDirection: 'row'
  },
  spacing: {
    marginTop: '15%'
  },
  textSize: {
    fontSize: 18
  }
});