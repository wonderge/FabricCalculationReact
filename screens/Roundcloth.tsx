import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';
import Input from '../components/Input';
import NumTextbox from '../components/NumTextbox';
import Spacer from '../components/Spacer';
import showAlert from '../helpers/Alerts';
import { amount, calculate, clear, diameter, fabricAmount, fabricWidth } from '../helpers/string';
import appStyles from '../helpers/styles';

export default function Roundcloth() {
  const [amountText, setAmountText] = useState('');
  const [diameterText, setDiameterText] = useState('');
  const [fabricWidthText, setFabricWidthText] = useState('');
  const [fabricAmountText, setFabricAmountText] = useState('');
  const [sidelength, setSidelength] = useState([0, 0])
  const [result, setResult] = useState('');

  const calculateResult = () : void => {
    let amount = Number(amountText);
    let diameter = Number(diameterText);
    let fabricWidth = Number(fabricWidthText);
    let fabricAmount = Number(fabricAmountText);

    let radius = diameter / 2;
    let halfFabricWidth = fabricWidth / 2;
    setSidelength(calculateSidePieceLength(diameter, fabricWidth));

    if (amount === 0 && fabricAmount === 0 || amount === 0 && diameter === 0 && fabricWidth === 0 
        || diameter === 0 && fabricWidth === 0 && fabricAmount === 0) {
      showAlert();
    } else {
      let yards, meters;
      if (fabricAmount === 0) {
        if ((diameter / fabricWidth) < 1) {
          yards = diameter * amount / 36;
        } else if ((diameter / fabricWidth) < 2) {
          yards = ((diameter + sidelength[0]) * amount + sidelength[0] * Math.ceil((radius - fabricWidth) * 2 * amount / fabricWidth)) / 36;
        } else {
          yards = ((diameter + sidelength[0]) * amount + sidelength[1] * Math.ceil((radius - fabricWidth) * 2 * amount / fabricWidth)) / 36;
        }
        meters = yards * 36 / 39;
        setResult(`${(yards * 1.03 + 0.1).toFixed(1)}y\n${(meters * 1.03 + 0.1).toFixed(1)}m`)
      } else if (amount === 0) {
        if ((diameter / fabricWidth) < 1) {
          amount = fabricAmount * 36 / diameter;
        } else if ((diameter / fabricWidth) < 2) {
          amount = Math.floor(fabricAmount * 36 / (sidelength[0] * ((radius - fabricWidth) * 2 / fabricWidth) + (diameter + sidelength[0])) / 1.03);
        } else {
          amount = Math.floor(fabricAmount * 36 / (sidelength[1] * ((radius - fabricWidth) * 2 / fabricWidth) + (diameter + sidelength[0])) / 1.03);
        }
        setResult(`${amount.toFixed()}pcs`)
      }
    }
  }

  const calculateSidePieceLength = (diameter : number, fabricWidth: number) : number[] => {
    let radius = diameter / 2;
    let halfFabricWidth = fabricWidth / 2;
    var result = [0, 0];
    if ((diameter / fabricWidth) < 2 && (diameter / fabricWidth) > 1) {
      result[0] = Math.ceil(Math.sqrt(Math.pow(radius, 2) - Math.pow(halfFabricWidth, 2)) * 2);
    } else if ((diameter / fabricWidth) >= 2) {
      result[0] = Math.ceil(Math.sqrt(Math.pow(radius, 2) - Math.pow(halfFabricWidth, 2)) * 2);
      result[1] = Math.ceil(Math.sqrt(Math.pow(radius, 2) - Math.pow(fabricWidth, 2)) * 2);
    }
    return result;
  }

  const clearValues = () : void => {
    setAmountText('');
    setDiameterText('');
    setFabricWidthText('');
    setFabricAmountText('');
    setResult('');
  }

  const getSideLengthText = () : string => {
    var sideLengthText = '';
    if (sidelength[0] !== 0 && sidelength[1] !== 0) {
      sideLengthText += '侧片边长1: ' + sidelength[0] + 'inch\n侧片边长2: ' + sidelength[1] + 'inch';
    } else if (sidelength[1] !== 0) {
      sideLengthText += '侧片边长:  ' + sidelength[1] + 'inch';
    } else if (sidelength[0] !== 0) {
      sideLengthText += '侧片边长: ' + sidelength[0] + 'inch';
    }
    return sideLengthText;
  }

  return (
    <Container>
      <Input prompt={amount} value={amountText} onChangeText={text => setAmountText(text)} textWidth={88} />
      <Input prompt={diameter} value={diameterText} onChangeText={text => setDiameterText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={fabricWidth} value={fabricWidthText} onChangeText={text => setFabricWidthText(text)} style={styles.spacing} textWidth={88} />
      <Input prompt={fabricAmount} value={fabricAmountText} onChangeText={text => setFabricAmountText(text)} style={styles.spacing} textWidth={88} />
      <View style={[appStyles.row, styles.spacing]}>
        <Button text={calculate} onPress={calculateResult} />
        <Spacer width='10%' />
        <Button text={clear} onPress={clearValues} />
      </View>
      <View style={[appStyles.row, styles.spacing]}>
        <Text style={appStyles.textSize}>{result}</Text>
        <Spacer width={sidelength !== [0, 0] ? '10%' : ''} />
        <Text style={appStyles.textSize}>{getSideLengthText()}</Text>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  spacing: {
    marginTop: '20%'
  }
})
