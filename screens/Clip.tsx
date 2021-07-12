import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';
import Input from '../components/Input';
import NumTextbox from '../components/NumTextbox';
import Spacer from '../components/Spacer';
import { amount, calculate, clear, fabricWidth, length, skirtAmount, skirtLength, width } from '../helpers/string';
import appStyles from '../helpers/styles';

export default function Clip() {
  const [amountText, setAmountText] = useState('');
  const [lengthText, setLengthText] = useState('');
  const [widthText, setWidthText] = useState('');
  const [fabricWidthText, setFabricWidthText] = useState('');
  const [skirtAmountText, setSkirtAmounText] = useState('');
  const [skirtLengthText, setSkirtLengthText] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () : void  => {
    let amount = Number(amountText);
    let length = Number(lengthText);
    let width = Number(widthText);
    let fabricWidth = Number(fabricWidthText);
    let skirtAmount = Number(skirtAmountText);
    let skirtLength = Number(skirtLengthText);

    let yards = (amount * skirtLength * skirtAmount) / Math.floor(fabricWidth / length) * width / 36;
    let meters = yards * 36 / 39;
    setResult(`${(yards * 1.03 + 0.1).toFixed(1)}y\n${(meters * 1.03 + 0.1).toFixed(1)}m`)
  }

  const clearValues = () : void => {
    setAmountText('');
    setLengthText('');
    setWidthText('');
    setFabricWidthText('');
    setSkirtAmounText('');
    setSkirtLengthText('');
    setResult('');
  }

  return (
    <Container>
      <Input prompt={amount} value={amountText} onChangeText={text => setAmountText(text)} textWidth={124} />
      <Input prompt={length} value={lengthText} onChangeText={text =>  setLengthText(text)} style={styles.spacing} textWidth={124} />
      <Input prompt={width} value={widthText} onChangeText={text => setWidthText(text)} style={styles.spacing} textWidth={124} />
      <Input prompt={fabricWidth} value={fabricWidthText} onChangeText={text => setFabricWidthText(text)} style={styles.spacing} textWidth={124} />
      <Input prompt={skirtAmount} value={skirtAmountText} onChangeText={text => setSkirtAmounText(text)} style={styles.spacing} textWidth={124} />
      <Input prompt={skirtLength} value={skirtLengthText} onChangeText={text => setSkirtLengthText(text)} style={styles.spacing} textWidth={124} />
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