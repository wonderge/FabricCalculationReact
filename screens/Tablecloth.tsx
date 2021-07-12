import React, { useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import Button from '../components/Button';
import Container from '../components/Container'
import Input from '../components/Input';
import NumTextbox from '../components/NumTextbox';
import RadioButton from '../components/RadioButton'
import Spacer from '../components/Spacer';
import showAlert from '../helpers/Alerts';
import { amount, calculate, clear, fabricAmount, fabricWidth, hemmed, length, marrow, noJoints, oneJoint, twoJoints, width } from '../helpers/string';
import appStyles from '../helpers/styles';

export default function Tablecloth() {
  const [hemmedType, setHemmedType] = useState(false);
  const [marrowType, setMarrowType] = useState(false);
  const [noJointsType, setNoJointsType] = useState(false);
  const [oneJointType, setOneJointType] = useState(false);
  const [twoJointsType, setTwoJointsType] = useState(false);
  const [amountText, setAmountText] = useState('');
  const [lengthText, setLengthText] = useState('');
  const [widthText, setWidthText] = useState('');
  const [fabricWidthText, setFabricWidthText] = useState('');
  const [fabricAmountText, setFabricAmountText] = useState('');
  const [result, setResult] = useState('');

  const selectType = (option : string) : void => {
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

  const selectJoint = (option : string) : void => {
    setNoJointsType(false);
    setOneJointType(false);
    setTwoJointsType(false);

    switch (option) {
      case noJoints:
        setNoJointsType(true);
        break;
      case oneJoint:
        setOneJointType(true);
        break;
      case twoJoints:
        setTwoJointsType(true);
    }
  }

  const calculateResult = () : void => {
    let amount = Number(amountText);
    let length = Number(lengthText);
    let width = Number(widthText);
    let fabricWidth = Number(fabricWidthText);
    let fabricAmount = Number(fabricAmountText);

    if (amount === 0 && fabricAmount === 0 || !hemmedType && !marrowType || !noJointsType && !oneJointType && !twoJointsType) {
      showAlert();
    } else {
      let joints = getJoints();
      let ratio = getRatio(joints, width, fabricWidth);
      var yards: number, meters: number;

      if (hemmedType) {
        length += 1.5;
        width += 1.5;
      }

      if (fabricAmount === 0) {
        yards = Math.ceil(ratio * amount) * length / 36;
        meters = yards * 36 / 39;

        if (joints === 0 && width > fabricWidth) {
          [yards, meters] = [0, 0];
        }
        setResult(`${(yards * 1.03 + 0.1).toFixed(1)}y\n${(meters * 1.03 + 0.1).toFixed(1)}m`);
      } else {
        amount = Math.floor(fabricAmount / 1.03 * 36 / length / (ratio * amount) / 1.03)
        setResult(`${amount.toFixed(1)}pcs`)
      }
    }
  }

  const getRatio = (joints: number, width: number, fabricWidth: number) : number => {
    var leftover: number, pieces: number, ratio: number;
    if (joints === 0) {
      ratio = 1;
    } else if (joints === 2) {
      leftover = width - fabricWidth;
      pieces = Math.floor(fabricWidth / leftover);
      ratio = (fabricWidth + (fabricWidth / pieces)) / fabricWidth; 
    } else {
      leftover = (width - fabricWidth) / 2;
      pieces = Math.floor(fabricWidth / leftover);
      ratio = (fabricWidth + (fabricWidth / pieces) * 2) / fabricWidth;
    }
    return ratio
  }

  const getJoints = () : number => {
    if (noJointsType) {
      return 0;
    } else if (oneJointType) {
      return 1;
    } else {
      return 2;
    }
  }

  const clearValues = () : void => {
    setAmountText('');
    setFabricAmountText('');
    setFabricWidthText('');
    setLengthText('');
    setWidthText('');
    setResult('');
    setHemmedType(false);
    setMarrowType(false);
    setNoJointsType(false);
    setOneJointType(false);
    setTwoJointsType(false);
  }

  return (
    <Container>
      <View style={appStyles.row} >
        <RadioButton text={hemmed} checked={hemmedType} onPress={() => selectType(hemmed)} />
        <Spacer width='2%' />
        <RadioButton text={marrow} checked={marrowType} onPress={() => selectType(marrow)} />
      </View>
      <View style={[appStyles.row, styles.spacing]} >
        <RadioButton text={noJoints} checked={noJointsType} onPress={() => selectJoint(noJoints)} />
        <Spacer width='2%' />
        <RadioButton text={oneJoint} checked={oneJointType} onPress={() => selectJoint(oneJoint)} />
        <Spacer width='2%' />
        <RadioButton text={twoJoints} checked={twoJointsType} onPress={() => selectJoint(twoJoints)} />
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
      <Text style={[appStyles.textSize, styles.spacing]}>{result}</Text>
    </Container>
  )
}

const styles = StyleSheet.create({
  spacing: {
    marginTop: '8%'
  }
})
