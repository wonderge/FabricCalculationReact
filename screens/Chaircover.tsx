import React, { useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import Button from '../components/Button'
import Container from '../components/Container'
import Input from '../components/Input'
import NumTextbox from '../components/NumTextbox'
import Spacer from '../components/Spacer'
import showAlert from '../helpers/Alerts'
import { a, amount, b, c, calculate, clear, d, e, f, fabricWidth, g, h } from '../helpers/string'
import appStyles from '../helpers/styles'

var image = require('../assets/chaircover.png')

export default function Chaircover() {
  const [aText, setAText] = useState('');
  const [bText, setBText] = useState('');
  const [cText, setCText] = useState('');
  const [dText, setDText] = useState('');
  const [eText, setEText] = useState('');
  const [fText, setFText] = useState('');
  const [gText, setGText] = useState('');
  const [hText, setHText] = useState('');
  const [amountText, setAmountText] = useState('');
  const [fabricWidthText, setFabricWidthText] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () : void => {
    let a  = Number(aText);
    let b  = Number(bText);
    let c  = Number(cText);
    let d  = Number(dText);
    let e  = Number(eText);
    let f  = Number(fText);
    let g  = Number(gText);
    let h  = Number(hText);
    let amount  = Number(amountText);
    let fabricWidth  = Number(fabricWidthText);

    if (a === 0 && b === 0 && c === 0 && d === 0 && e === 0 && f === 0 && g === 0 && h === 0 && amount === 0 && fabricWidth === 0) {
      showAlert();
    } else {
      h = a > h ? a : h;
      d = a > d ? a : d;

      var lengths:number[] = [];
      var ratios:number[] = [];
      var ratio:number;

      lengths.push(b + c);
      ratio = Math.floor(fabricWidth / h) + Math.floor((fabricWidth - Math.floor(fabricWidth / h) * h) / d)
      ratios.push(ratio);

      lengths.push(b + e);
      ratio = Math.floor(fabricWidth / d) + Math.floor((fabricWidth - Math.floor(fabricWidth / d) * d) / h)
      ratios.push(ratio);

      if ((f + 2 * g) > 60) {
        lengths.push(f + 2 * g);
        ratios.push(Math.floor(fabricWidth / c));
      } else {
        lengths.push(c);
        ratios.push(Math.floor(fabricWidth / (f + 2 * g)));
      }

      var total = 0;
      lengths.forEach((length, index) => {
        total += (length / ratios[index]) * amount;
      })

      let yards = total / 39;
      let meters = total / 36;
      setResult(`${(yards * 1.03 + 0.1).toFixed(1)}y\n${(meters * 1.03 + 0.1).toFixed(1)}m`);
    }
  }

  const clearValues = () : void => {
    setAText('');
    setBText('');
    setCText('');
    setDText('');
    setEText('');
    setFText('');
    setGText('');
    setHText('');
    setAmountText('');
    setFabricWidthText('');
    setResult('');
  }

  return (
    <Container>
      <Image source={image} style={styles.imageSize} />
      <View style={[appStyles.row, styles.spacing]}>
        <Input prompt={a} value={aText} onChangeText={text => setAText(text)} textWidth={65} child={true} length='10%' />
        <Spacer width='3%' />
        <Input prompt={b} value={bText} onChangeText={text => setBText(text)} textWidth={65} child={true} length='10%' />
      </View>
      <View style={[appStyles.row, styles.spacing]}>
        <Input prompt={c} value={cText} onChangeText={text => setCText(text)} textWidth={65} child={true} length='10%' />
        <Spacer width='3%' />
        <Input prompt={d} value={dText} onChangeText={text => setDText(text)} textWidth={65} child={true} length='10%' />
      </View>
      <View style={[appStyles.row, styles.spacing]}>
        <Input prompt={e} value={eText} onChangeText={text => setEText(text)} textWidth={65} child={true} length='10%' />
        <Spacer width='3%' />
        <Input prompt={f} value={fText} onChangeText={text => setFText(text)} textWidth={65} child={true} length='10%' />
      </View>
      <View style={[appStyles.row, styles.spacing]}>
        <Input prompt={g} value={gText} onChangeText={text => setGText(text)} textWidth={65} child={true} length='10%' />
        <Spacer width='3%' />
        <Input prompt={h} value={hText} onChangeText={text => setHText(text)} textWidth={65} child={true} length='10%' />
      </View>
      <View style={[appStyles.row, styles.spacing]}>
        <Input prompt={amount} value={amountText} onChangeText={text => setAmountText(text)} textWidth={88} child={true} length='10%' />
        <Spacer width='3%' />
        <Input prompt={fabricWidth} value={fabricWidthText} onChangeText={text => setFabricWidthText(text)} textWidth={88} child={true} length='10%' />
      </View>
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
  imageSize: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  textboxLength: {
    width: '31%'
  },
  spacing: {
    marginTop: '8%'
  }
})
