import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';
import Input from '../components/Input';
import NumTextbox from '../components/NumTextbox';
import RadioButton from '../components/RadioButton';
import Spacer from '../components/Spacer';
import showAlert from '../helpers/Alerts';
import { bigTube, calculate, clear, fabricAmount, poplin, satin, smallTube, weight } from '../helpers/string';
import appStyles from '../helpers/styles';

export default function WeightAndAmount() {
  const [smallTubeType, setSmallTubeType] = useState(false);
  const [bigTubeType, setBigTubeType] = useState(false);
  const [satinType, setSatinType] = useState(false);
  const [poplinType, setPoplinType] = useState(false);
  const [weightText, setWeightText] = useState('');
  const [fabricAmountText, setFabricAmountText] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () : void => {
    let weight = Number(weightText) * 1000;
    let fabricAmount = Number(fabricAmountText);
    let tubeWeight = getTubeWeight();
    let fabricWeight = getFabricWeight();
    var result;

    if (fabricAmount === 0 && weight === 0) {
      showAlert();
    } else {
      if (fabricAmount === 0) {
        result = (weight - tubeWeight) / fabricWeight;
        setResult(`${result.toFixed(1)}y`)
      } else {
        result = fabricAmount * fabricWeight + tubeWeight;
        setResult(`${result.toFixed(1)}kg`)
      }
    }
  }

  const getTubeWeight = () : number => {
    if (smallTubeType) {
      return 220;
    } else {
      return 278;
    }
  }

  const getFabricWeight = () : number => {
    if (satinType) {
      return 210;
    } else {
      return 250;
    }
  }

  const clearValues = () : void => {
    setSmallTubeType(false);
    setBigTubeType(false);
    setSatinType(false);
    setPoplinType(false);
    setWeightText('');
    setResult('');
  }

  const selectTubeType = (type:string) : void => {
    setSmallTubeType(false);
    setBigTubeType(false);

    switch (type) {
      case smallTube:
        setSmallTubeType(true);
        break;
      case bigTube:
        setBigTubeType(true);
        break;
    }
  }

  const selectFabricType = (type:string) : void => {
    setSatinType(false);
    setPoplinType(false);

    switch (type) {
      case satin:
        setSatinType(true);
        break;
      case poplin:
        setPoplinType(true);
        break;
    }
  }

  return (
    <Container>
      <View style={appStyles.row}>
        <RadioButton text={smallTube} checked={smallTubeType} onPress={() => selectTubeType(smallTube)} />
        <Spacer width='2%' />
        <RadioButton text={bigTube} checked={bigTubeType} onPress={() => selectTubeType(bigTube)} />
      </View>
      <View style={[appStyles.row, styles.spacing]}>
        <RadioButton text={satin} checked={satinType} onPress={() => selectFabricType(satin)} />
        <Spacer width='2%' />
        <RadioButton text={poplin} checked={poplinType} onPress={() => selectFabricType(poplin)} />
      </View>
      <Input prompt={weight} value={weightText} onChangeText={text => setWeightText(text)} style={styles.spacing} textWidth='25%' />
      <Input prompt={fabricAmount} value={fabricAmountText} onChangeText={text => setFabricAmountText(text)} style={styles.spacing} textWidth='30%' />
      <View style={[appStyles.row, styles.spacing]}>
        <Button text={calculate} onPress={calculateResult} />
        <Spacer width='10%' />
        <Button text={clear} onPress={clearValues} />
      </View>
      <Text style={[appStyles.textSize, styles.spacing]}>{result}</Text>
    </Container>
  )
}

const styles = StyleSheet.create({
  spacing: {
    marginTop: '15%'
  }
})