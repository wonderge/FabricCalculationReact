import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from '../components/Button'
import Container from '../components/Container'
import NumTextbox from '../components/NumTextbox'
import appStyles from '../helpers/styles';
import { calculate, clear, fabricWidth, lengthcm, widthcm } from '../helpers/string'
import Spacer from '../components/Spacer'
import showAlert from '../helpers/Alerts'
import Input from '../components/Input'

export default function Tube() {
  const [lengthText, setLengthText] = useState('');
  const [widthText, setWidthText] = useState('');
  const [fabricWidthText, setFabricWidthText] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () : void => {
    let length = Number(lengthText);
    let width = Number(widthText);
    let fabricWidth = Number(fabricWidthText);

    if (length === 0 && width === 0 && fabricWidth === 0) {
      showAlert();
    } else {
      let triangleSideLength = Math.sqrt(2 * Math.pow(width, 2));
      let triangleArea = (triangleSideLength * triangleSideLength) / 2;
      let area = length * width + 2 * triangleArea;
      var shapeLength;

      if (fabricWidth === 0) {
        shapeLength = Math.ceil(Math.sqrt(area)) * 1.1 / 2.54;
      } else {
        shapeLength = Math.ceil(area / fabricWidth) * 1.1 / 2.54;
      }
      setResult(`${(shapeLength * 1.03 + 0.1).toFixed(1)}inch`)
    }
  }

  const clearValues = () : void => {
    setLengthText('');
    setWidthText('');
    setFabricWidthText('');
    setResult('');
  }

  return (
    <Container>
      <Input prompt={lengthcm} value={lengthText} onChangeText={text => setLengthText(text)} textWidth={88} />
      <Input prompt={widthcm} value={widthText} onChangeText={text => setWidthText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={fabricWidth} value={fabricWidthText} onChangeText={text => setFabricWidthText(text)} style={styles.spacing} textWidth={88} />
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
    marginTop: '20%'
  }
})
