import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from '../components/Button'
import Container from '../components/Container'
import NumTextbox from '../components/NumTextbox'
import appStyles from '../helpers/styles';
import { amount, calculate, clear, curtainHeight, fabricWidth, imageSize } from '../helpers/string'
import Spacer from '../components/Spacer'
import showAlert from '../helpers/Alerts'
import Input from '../components/Input'

export default function HoleCurtain() {
  const [amountText, setAmountText] = useState('');
  const [curtainHeightText, setCurtainHeightText] = useState('');
  const [imageSizeText, setImageSizeText] = useState('');
  const [fabricWidthText, setFabricWidthText] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () : void => {
    let amount = Number(amountText);
    let curtainHeight = Number(curtainHeightText);
    let imageSize = Number(imageSizeText);
    let fabricWidth = Number(fabricWidthText);

    if (amount === 0 && curtainHeight === 0 && fabricWidth === 0) {
      showAlert();
    } else {
      if (imageSize != 0) {
        let heightRatio = Math.ceil(curtainHeight / imageSize);
        curtainHeight = imageSize * heightRatio;
      }

      var result:string;
      let height = curtainHeight + 14;
      let yards = height * amount / 36;
      let meters = yards * 36 / 39;
      result = `${(yards * 1.03 + 0.1).toFixed(1)}y\n${(meters * 1.03 + 0.1).toFixed(1)}m\n\n`;

      let length = fabricWidth * 2.54 - 12;
      var sizes:number[] = [];
      sizes.push(getCircleSize(5, length, 15, 17));
      sizes.push(getCircleSize(6, length, 18, 20));
      sizes.push(getCircleSize(7, length, 21, 22));

      var side = 5;
      sizes.forEach(size => {
        if (size != 0) {
          let newLength = length - 2 * side;
          let holeAmount = Math.floor(newLength / size) + 1;
          result += `头尾距里: ${side}cm\n间隔: ${size}cm\n塑扣数: ${holeAmount}pcs\n\n`;
        }
        side++;
      })
      setResult(result);
    }
  }

  const getCircleSize = (side:number, length:number, start:number, end:number) : number => {
    length -= 2 * side;
    for (var i = start; i <= end; i++) {
      let circleSize = length / i;
      if (Math.round(circleSize) % 2 != 0) {
        let size = Math.floor(length / side);
        if (size <= end) {
          return size;
        }
      }
    }
    return 0;
  }

  const clearValues = () : void => {
    setAmountText('');
    setCurtainHeightText('');
    setImageSizeText('');
    setFabricWidthText('');
    setResult('');
  }

  return (
    <Container>
      <Input prompt={amount} value={amountText} onChangeText={text => setAmountText(text)} textWidth={124} />
      <Input prompt={curtainHeight} value={curtainHeightText} onChangeText={text => setCurtainHeightText(text)} style={styles.spacing} textWidth={124} />
      <Input prompt={imageSize} value={imageSizeText} onChangeText={text => setImageSizeText(text)} style={styles.spacing} textWidth={124} />
      <Input prompt={fabricWidth} value={fabricWidthText} onChangeText={text => setFabricWidthText(text)} style={styles.spacing} textWidth={124} />
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
    marginTop: '20%'
  }
})