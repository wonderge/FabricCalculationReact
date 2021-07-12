import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import NumTextbox from '../components/NumTextbox';
import Container from '../components/Container';
import Spacer from '../components/Spacer';
import RadioButton from '../components/RadioButton';
import showAlert from '../helpers/Alerts';
import appStyles from '../helpers/styles';
import { amount, calculate, clear, fabricAmount, fabricWidth, hemmed, length, marrow, width } from '../helpers/string';
import Input from '../components/Input';

export default function Napkin() {
  const [amountText, setAmountText] = useState('');
  const [lengthText, setLengthText] = useState('');
  const [widthText, setWidthText] = useState('');
  const [fabricWidthText, setFabricWidthText] = useState('');
  const [fabricAmountText, setFabricAmountText] = useState('');
  const [result, setResult] = useState('');
  const [hemmedType, setHemmedType] = useState(false);
  const [marrowType, setMarrowType] = useState(false);

  const calculateResult = () : void => {
    setResult('');
    let amount = Number(amountText);
    let length = Number(lengthText);
    let width = Number(widthText);
    let fabricWidth = Number(fabricWidthText);
    let fabricAmount = Number(fabricAmountText);
    let yards, meters;

    if (amount === 0 && fabricAmount === 0 || amount === 0 && length === 0 && width === 0 && fabricWidth === 0 
        || length === 0 && width === 0 && fabricWidth === 0 && fabricAmount === 0 || !hemmedType && !marrowType) {
      showAlert();
    } else {
      if (hemmedType) {
        width += 1.5;
        length += 1.5;
      }

      if (fabricWidth % length < fabricWidth % width) {
        [yards, meters, amount] = calculateAmounts(amount, length, width, fabricWidth, fabricAmount);
        setResult(getText(yards * 1.03 + 0.1, meters * 1.03 + 0.1, amount));
      } else {
        [yards, meters, amount] = calculateAmounts(amount, width, length, fabricWidth, fabricAmount);
        setResult(getText(yards * 1.03 + 0.1, meters * 1.03 + 0.1, amount));
      }
    }
  }

  const calculateAmounts = (amount: number, side1: number, side2: number, fabricWidth: number, fabricAmount: number) : [number, number, number] => {
    let yards = 0, meters = 0, resultAmount = 0;
    if (fabricAmount === 0) {
      yards = Math.ceil(amount / Math.floor(fabricWidth / side1)) * side2 / 36;
      meters = yards * 36 / 39;
    } else {
      resultAmount = Math.floor(fabricAmount * 36 / side2 * Math.floor(fabricWidth / side1) / 1.03)
    }
    return [yards, meters, resultAmount];
  }

  const getText = (yards : number, meters : number, amount : number) : string => {
    if (amount === 0) {
      return `${yards.toFixed(1)}y\n${meters.toFixed(1)}m`;
    } else {
      return `${amount.toFixed()}pcs`
    }
  }

  const clearValues = () => {
    setAmountText('');
    setLengthText('');
    setWidthText('');
    setFabricWidthText('');
    setFabricAmountText('');
    setResult('');
    setHemmedType(false);
    setMarrowType(false);
  }

  const selectOption = (option: string) : void => {
    setHemmedType(false);
    setMarrowType(false);

    switch (option) {
      case hemmed:
        setHemmedType(true);
        break;
      case marrow:
        setMarrowType(true);
        break;
    }
  }

  return (
    <Container>
      <View style={appStyles.row}>
        <RadioButton checked={hemmedType} text={hemmed} onPress={() => selectOption(hemmed)} />
        <Spacer width='2%' />
        <RadioButton checked={marrowType} text={marrow} onPress={() => selectOption(marrow)} />
      </View>
      <Input prompt={amount} value={amountText} onChangeText={text => setAmountText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={length} value={lengthText} onChangeText={text => setLengthText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={width} value={widthText} onChangeText={text => setWidthText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={fabricWidth} value={fabricWidthText} onChangeText={text => setFabricWidthText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={fabricAmount} value={fabricAmountText} onChangeText={text => setFabricAmountText(text)} style={styles.spacing} textWidth={88} />
      <View style={[appStyles.row, styles.spacing]}>
        <Button text={calculate} onPress={calculateResult} />
        <Spacer width='10%' />
        <Button text={clear} onPress={clearValues} />
      </View>
      <Text style={[styles.spacing, appStyles.textSize]}>{result}</Text>
    </Container>
  )
}

const styles = StyleSheet.create({
  spacing: {
    marginTop: '10%'
  }
});