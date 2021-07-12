import React, { useState } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';
import Input from '../components/Input';
import NumTextbox from '../components/NumTextbox';
import RadioButton from '../components/RadioButton';
import Spacer from '../components/Spacer';
import showAlert from '../helpers/Alerts';
import { amount, calculate, clear, cut, fabricWidth, length, noCut, oneFiveMultiple, oneMultiple, threeFiveMultiple, threeMultiple, twoFiveMultiple, twoMultiple, width } from '../helpers/string';
import appStyles from '../helpers/styles';

export default function Screen() {
  const [noCutType, setNoCutType] = useState(false);
  const [cutType, setCutType] = useState(false);
  const [oneMultipleType, setOneMultipleType] = useState(false);
  const [oneFiveMultipleType, setOneFiveMultipleType] = useState(false);
  const [twoMultipleType, setTwoMultipleType] = useState(false);
  const [twoFiveMultipleType, setTwoFiveMultipleType] = useState(false);
  const [threeMultipleType, setThreeMultipleType] = useState(false);
  const [threeFiveMultipleType, setThreeFiveMultipleType] = useState(false);
  const [cuts, setCuts] = useState(0);
  const [multiple, setMultiple] = useState(0);
  const [amountText, setAmountText] = useState('');
  const [lengthText, setLengthText] = useState('');
  const [widthText, setWidthText] = useState('');
  const [fabricWidthText, setFabricWidthText] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () : void => {
    let amount = Number(amountText);
    let length = Number(lengthText);
    let width = Number(widthText);
    let fabricWidth = Number(fabricWidthText);

    if (cuts === 0 && multiple === 0 && amount === 0 && length === 0 && width === 0 && fabricWidth === 0 || !cutType && !noCutType
        || !oneMultipleType && !oneFiveMultipleType && !twoMultipleType && !twoFiveMultipleType && !threeMultipleType && !threeFiveMultipleType) {
      showAlert();
    } else {
      if (cuts == 0) {
        width = width * multiple + 5;
      } else if (cuts == 1) {
        width = width * multiple + 10;
      }

      let yards, meters;

      if (width > fabricWidth && length <= fabricWidth) {
        yards = width * amount / 36;
        meters = width * amount / 39;
      } else if (length > fabricWidth && width <= fabricWidth) {
        yards = length * amount / 36;
        meters = length * amount / 39;
      } else {
        var fabricWidthAmount = (width * multiple) / fabricWidth;
        fabricWidthAmount = roundFabricWidthAmount(amount, fabricWidthAmount) * amount;

        yards = fabricWidthAmount * length / 36;
        meters = fabricWidthAmount * length / 39;
      }
      setResult(`${(yards * 1.03 + 0.1).toFixed(1)}y\n${(meters * 1.03 + 0.1).toFixed(1)}m`);
    }
  }

  const roundFabricWidthAmount = (amount:number, fabricWidthAmount:number) : number  => {
    let flooredFabricWidthAmount = Math.floor(fabricWidthAmount);
    if (amount === 1) {
      if (fabricWidthAmount <= flooredFabricWidthAmount + 0.2)
      {
        return flooredFabricWidthAmount;
      } else if (fabricWidthAmount > flooredFabricWidthAmount + 0.2 && fabricWidthAmount <= flooredFabricWidthAmount + 0.5) {
        return flooredFabricWidthAmount + 0.5;
      } else {
        return Math.ceil(fabricWidthAmount);
      }
    } else {
      if (fabricWidthAmount <= flooredFabricWidthAmount + 0.5) {
        return flooredFabricWidthAmount + 0.5;
      } else {
        return Math.ceil(fabricWidthAmount);
      }
    }
  }

  const clearValues = () : void => {
    setOneMultipleType(false);
    setOneFiveMultipleType(false);
    setTwoMultipleType(false);
    setTwoFiveMultipleType(false);
    setThreeMultipleType(false);
    setThreeFiveMultipleType(false);
    setCuts(0);
    setMultiple(0);
    setAmountText('');
    setLengthText('');
    setWidthText('');
    setFabricWidthText('');
    setResult('');
  }

  const selectCutType = (cuts:number) : void => {
    setNoCutType(false);
    setCutType(false);

    switch (cuts) {
      case 0:
        setNoCutType(true);
        break;
      case 1:
        setCutType(true);
        break;
    }
  }

  const selectMultipleType = (multiple:number) : void => {
    setOneMultipleType(false);
    setOneFiveMultipleType(false);
    setTwoMultipleType(false);
    setTwoFiveMultipleType(false);
    setThreeMultipleType(false);
    setThreeFiveMultipleType(false);

    switch (multiple) {
      case 1:
        setOneMultipleType(true);
        break;
      case 1.5:
        setOneFiveMultipleType(true);
        break;
      case 2:
        setTwoMultipleType(true);
        break;
      case 2.5:
        setTwoFiveMultipleType(true);
        break;
      case 3:
        setThreeMultipleType(true);
        break;
      case 3.5:
        setThreeFiveMultipleType(true);
        break;
    }
  }

  return (
    <Container>
      <View style={appStyles.row}>
        <RadioButton text={noCut} checked={noCutType} onPress={() => selectCutType(0)} />
        <Spacer width='2%' />
        <RadioButton text={cut} checked={cutType} onPress={() => selectCutType(1)} />
      </View>
      <View style={[appStyles.row, styles.spacing]}>
        <RadioButton text={oneMultiple} checked={oneMultipleType} onPress={() => selectMultipleType(1)} />
        <Spacer width='2%' />
        <RadioButton text={oneFiveMultiple} checked={oneFiveMultipleType} onPress={() => selectMultipleType(1.5)} />
        <Spacer width='2%' />
        <RadioButton text={twoMultiple} checked={twoMultipleType} onPress={() => selectMultipleType(2)} />
        <Spacer width='2%' />
        <RadioButton text={twoFiveMultiple} checked={twoFiveMultipleType} onPress={() => selectMultipleType(2.5)} />
        <Spacer width='2%' />
        <RadioButton text={threeMultiple} checked={threeMultipleType} onPress={() => selectMultipleType(3)} />
        <Spacer width='2%' />
        <RadioButton text={threeFiveMultiple} checked={threeFiveMultipleType} onPress={() => selectMultipleType(3.5)} />
      </View>
      <Input prompt={amount} value={amountText} onChangeText={text => setAmountText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={length} value={lengthText} onChangeText={text => setLengthText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={width} value={widthText} onChangeText={text => setWidthText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={fabricWidth} value={fabricWidthText} onChangeText={text => setFabricWidthText(text)} style={styles.spacing} textWidth={88} />
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
    marginTop: '10%'
  }
})