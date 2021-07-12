import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';
import Input from '../components/Input';
import NumTextbox from '../components/NumTextbox';
import RadioButton from '../components/RadioButton';
import Spacer from '../components/Spacer';
import showAlert from '../helpers/Alerts';
import { amount, calculate, clear, fabricWidth, length, slant, straight, width } from '../helpers/string';

export default function Sash() {
  const [amountText, setAmountText] = useState('');
  const [lengthText, setLengthText] = useState('');
  const [widthText, setWidthText] = useState('');
  const [fabricWidthText, setFabricWidthText] = useState('');
  const [result, setResult] = useState('');
  const [straightType, setStraightType] = useState(false);
  const [slantType, setSlantType] = useState(false);

  const calculateResult = () : void => {
    let amount = Number(amountText);
    let length = Number(lengthText);
    let width = Number(widthText);
    let fabricWidth = Number(fabricWidthText);

    if (!straightType && !slantType || amount === 0 && length === 0 && width === 0 && fabricWidth === 0) {
      showAlert();
    } else {
      if (slantType) {
        length += width;
      }

      let ratio = Math.floor(fabricWidth / width);
      let yards = Math.ceil(amount / ratio) * length / 36;
      let meters = yards * 36 / 39;
      setResult(`${(yards * 1.03 + 0.1).toFixed(1)}y\n${(meters * 1.03 + 0.1).toFixed(1)}m`)
    }
  }

  const selectType = (type: string) : void => {
    setStraightType(false);
    setSlantType(false);

    switch (type) {
      case straight:
        setStraightType(true);
        break;
      case slant:
        setSlantType(true);
        break;
    }
  }

  const clearValues = () : void => {
    setAmountText('');
    setLengthText('');
    setWidthText('');
    setFabricWidthText('');
    setResult('');
  }

  return (
    <Container>
      <View style={styles.row}>
        <RadioButton text={straight} checked={straightType} onPress={() => selectType(straight)} />
        <Spacer width='2%' />
        <RadioButton text={slant} checked={slantType} onPress={() => selectType(slant)} />
      </View>
      <Input prompt={amount} value={amountText} onChangeText={text => setAmountText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={length} value={lengthText} onChangeText={text => setLengthText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={width} value={widthText} onChangeText={text => setWidthText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={fabricWidth} value={fabricWidthText} onChangeText={text => setFabricWidthText(text)} style={styles.spacing} textWidth={88} />
      <View style={[styles.spacing, styles.row]}>
        <Button text={calculate} onPress={calculateResult} />
        <Spacer width='10%' />
        <Button text={clear} onPress={clearValues} />
      </View>
      <Text style={[styles.textSize, styles.spacing]}>{result}</Text>
    </Container>
  )
}

const styles = StyleSheet.create({
  spacing: {
    marginTop: '15%'
  },
  textSize: {
    fontSize: 18
  },
  row: {
    flexDirection: 'row'
  }
})