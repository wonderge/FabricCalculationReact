import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';
import Input from '../components/Input';
import NumTextbox from '../components/NumTextbox';
import RadioButton from '../components/RadioButton';
import Spacer from '../components/Spacer';
import showAlert from '../helpers/Alerts';
import { amount, boxPleat, calculate, clear, dense, fabricAmount, fabricWidth, feet, height, hemmed, inch, marrow, oneInch, threeInch, twoInch } from '../helpers/string';
import appStyles from '../helpers/styles';

export default function Skirt() {
  const [hemmedType, setHemmedType] = useState(false);
  const [marrowType, setMarrowType] = useState(false);
  const [denseType, setDenseType] = useState(false);
  const [boxPleatType, setBoxPleatType] = useState(false);
  const [oneInchType, setOneInchType] = useState(false);
  const [twoInchType, setTwoInchType] = useState(false);
  const [threeInchType, setThreeInchType] = useState(false);
  const [amountText, setAmountText] = useState('');
  const [feetText, setFeetText] = useState('');
  const [inchText, setInchText] = useState('');
  const [heightText, setHeightText] = useState('');
  const [fabricWidthText, setFabricWidthText] = useState('');
  const [fabricAmountText, setFabricAmountText] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () : void => {
    let amount = Number(amountText);
    let feet = Number(feetText);
    let inch = Number(inchText);
    let height = Number(heightText);
    let fabricWidth = Number(fabricWidthText);
    let fabricAmount = Number(fabricAmountText);

    if (amount === 0 && fabricAmount === 0 || !hemmed && !marrow || !denseType && !boxPleatType && !oneInchType && !twoInchType && !threeInchType) {
      showAlert();
    } else {
      var length = (feet * 12 + inch) * getMultiplier();
      let ratio = fabricWidth / height;
      var yards:number, meters:number;
      if (hemmed) {
        height += 1.5;
        length += 2;
      } else {
        height += 0.5;
      }

      if (fabricAmount === 0) {
        if (ratio >= 2) {
          yards = Math.ceil(height / fabricWidth * amount) * length / 36;
        } else {
          yards = Math.ceil(length / fabricWidth * amount) * height / 36;
        }
        meters = yards * 36 / 39;
        setResult(`${(yards * 1.03 + 0.1).toFixed(1)}y\n${(meters * 1.03 + 0.1).toFixed(1)}m`)
      } else {
        if (ratio >= 2) {
          amount = Math.floor(fabricAmount * 36 / length / (height / fabricWidth) / 1.03);
        } else {
          amount = Math.floor(fabricAmount * 36 / height / (length / fabricWidth) / 1.03);
        }
        setResult(`${amount}pcs`)
      }
    }
  }

  const getMultiplier = () : number => {
    if (denseType) {
      return 2.5;
    } else if (boxPleatType || oneInchType || twoInchType || threeInchType) {
      return 3;
    } else {
      return 1;
    }
  }

  const selectType = (type:string) => {
    setHemmedType(false);
    setMarrowType(false);

    switch (type) {
      case hemmed:
        setHemmedType(true);
        break;
      case marrow:
        setMarrowType(true);
        break;
    }
  }

  const selectHeadType = (type:string) => {
    setDenseType(false);
    setBoxPleatType(false);
    setOneInchType(false);
    setTwoInchType(false);
    setThreeInchType(false);

    switch (type) {
      case dense:
        setDenseType(true);
        break;
      case boxPleat:
        setBoxPleatType(true);
        break;
      case oneInch: 
        setOneInchType(true);
        break;
      case twoInch:
        setTwoInchType(true);
        break;
      case threeInch:
        setThreeInchType(true);
        break;
    }
  }

  const clearValues = () : void  => {
    setAmountText('');
    setFeetText('');
    setInchText('');
    setHeightText('');
    setFabricWidthText('');
    setFabricAmountText('');
    setResult('');
    setDenseType(false);
    setBoxPleatType(false);
    setOneInchType(false);
    setTwoInchType(false);
    setThreeInchType(false);
    setHemmedType(false);
    setMarrowType(false);
  }

  return (
    <Container>
      <View style={appStyles.row}>
        <RadioButton text={hemmed} checked={hemmedType} onPress={() => selectType(hemmed)} />
        <Spacer width='2%' />
        <RadioButton text={marrow} checked={marrowType} onPress={() => selectType(marrow)} />
      </View>
      <View style={[appStyles.row, styles.spacing]}>
        <RadioButton text={dense} checked={denseType} onPress={() => selectHeadType(dense)} />
        <Spacer width='2%' />
        <RadioButton text={boxPleat} checked={boxPleatType} onPress={() => selectHeadType(boxPleat)} />
        <Spacer width='2%' />
        <RadioButton text={oneInch} checked={oneInchType} onPress={() => selectHeadType(oneInch)} />
        <Spacer width='2%' />
        <RadioButton text={twoInch} checked={twoInchType} onPress={() => selectHeadType(twoInch)} />
        <Spacer width='2%' />
        <RadioButton text={threeInch} checked={threeInchType} onPress={() => selectHeadType(threeInch)} />
      </View>
      <Input prompt={amount} value={amountText} onChangeText={text => setAmountText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={feet} value={feetText} onChangeText={text => setFeetText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={inch} value={inchText} onChangeText={text => setInchText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={height} value={heightText} onChangeText={text => setHeightText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={fabricWidth} value={fabricWidthText} onChangeText={text => setFabricWidthText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={fabricAmount} value={fabricAmountText} onChangeText={text => setFabricAmountText(text)} style={styles.spacing} textWidth={88} />
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
