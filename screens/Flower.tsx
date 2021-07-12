import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';
import Input from '../components/Input';
import NumTextbox from '../components/NumTextbox';
import Spacer from '../components/Spacer';
import { calculate, clear, eighty, fifteen, fifty, fourty, length, seventy, sixty, ten, thirty, twenty, width } from '../helpers/string';
import appStyles from '../helpers/styles';

export default function Flower() {
  const [amountText, setAmountText] = useState(new Array<string>(9))
  const [lengthText, setLengthText] = useState('');
  const [widthText, setWidthText] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () : void => {
    let amount:number[] = new Array<number>(9); 
    amount.forEach((value, index) => {
      amount[index] = Number(value);
    })
    let length = Number(lengthText);
    let width = Number(widthText);

    let paperArea = length * width;
    var area:number[] = new Array<number>(9);
    area[0] = 9 * 1152 + 8 * 896 + 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
    area[1] = 8 * 896 + 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
    area[2] = 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
    area[3] = 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
    area[4] = 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
    area[5] = 6 * 196 + 5 * 144 + 6 * 121 + 3 * 72 + 5 * 56;
    area[6] = 5 * 144 + 6 * 121 + 3 * 72 + 5 * 56;
    area[7] = 6 * 56 + 5 * 42 + 3 * 30 + 3 * 25;
    area[8] = 6 * 42 + 5 * 30 + 5 * 25 + 16;

    let required:number = 0;
    area.forEach((value, index) => {
      required += value / paperArea * amount[index];
    })
    setResult(`${(required * 1.03 + 0.1).toFixed(1)}pcs`);
  }

  const clearValues = () : void => {
    setAmountText(new Array<string>(9));
    setLengthText('');
    setWidthText('');
    setResult('');
  } 

  const updatePetalSize = (index:number, petalSize:string) : void => {
    const newPetalSizes = amountText.map((value, i) => {
      if (i === index) {
        return petalSize;
      } else {
        return value;
      }
    })
    setAmountText(newPetalSizes);
  }

  return (
    <Container>
      <View style={appStyles.row}>
        <Input prompt={eighty} value={amountText[0]} onChangeText={text => updatePetalSize(0, text)} child={true} length='10%' />
        <Spacer width='3%' />
        <Input prompt={seventy} value={amountText[1]} onChangeText={text => updatePetalSize(1, text)} child={true} length='10%' />
      </View>
      <View style={[appStyles.row, styles.spacing]}>
        <Input prompt={sixty} value={amountText[2]} onChangeText={text => updatePetalSize(2, text)} child={true} length='10%' />
        <Spacer width='3%' />
        <Input prompt={fifty} value={amountText[3]} onChangeText={text => updatePetalSize(3, text)} child={true} length='10%' />
      </View>
      <View style={[appStyles.row, styles.spacing]}>
        <Input prompt={fourty} value={amountText[4]} onChangeText={text => updatePetalSize(4, text)} child={true} length='10%' />
        <Spacer width='3%' />
        <Input prompt={thirty} value={amountText[5]} onChangeText={text => updatePetalSize(5, text)} child={true} length='10%' />
      </View>
      <View style={[appStyles.row, styles.spacing]}>
        <Input prompt={twenty} value={amountText[6]} onChangeText={text => updatePetalSize(6, text)} child={true} length='10%' />
        <Spacer width='3%' />
        <Input prompt={fifteen} value={amountText[7]} onChangeText={text => updatePetalSize(7, text)} child={true} length='10%' />
      </View>
      <View style={[appStyles.row, styles.spacing]}>
        <Input prompt={ten} value={amountText[8]} onChangeText={text => updatePetalSize(8, text)} child={true} length='10%' />
      </View>
      <Input prompt={length} value={lengthText} onChangeText={text => setLengthText(text)} style={styles.spacing} textWidth={69} />
      <Input prompt={width} value={widthText} onChangeText={text => setWidthText(text)} style={styles.spacing} textWidth={69} />
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
    marginTop: '8%'
  },
  textboxLength: {
    minWidth: '31%'
  }
})