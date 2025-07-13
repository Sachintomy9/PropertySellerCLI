// screens/MortgageEditScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useMortgage } from '../context/MortgageContext';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../styles/fonts';
import CloseIcon from '../assets/svg/svgicons/ProfileScreen/CloseIcon';
import ScrollThumb from '../assets/svg/svgicons/Others/ScrollThumb';

const MortgageEditScreen = () => {
  const { mortgageData, applyCustomValues } = useMortgage();
  const navigation = useNavigation();

  const [price, setPrice] = useState(mortgageData.price || 1000000);
  const [loanTerm, setLoanTerm] = useState(mortgageData.loanTerm || 10);
  const [downPayment, setDownPayment] = useState(mortgageData.downPayment || 15);
  const [interestRate, setInterestRate] = useState(mortgageData.interestRate || 4);

  const resetToDefault = () => {
    setPrice(mortgageData.price || 1000000);
    setLoanTerm(mortgageData.loanTerm || 10);
    setDownPayment(mortgageData.downPayment || 15);
    setInterestRate(mortgageData.interestRate || 4);
  };

  const handleApply = () => {
    applyCustomValues({ price, loanTerm, downPayment, interestRate });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mortgage Calculator</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <CloseIcon width={20} height={20} />
        </TouchableOpacity>
      </View>

      {/* Total Price */}
      <Text style={styles.label}>Total Price</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          value={price.toLocaleString()}
          keyboardType="numeric"
          editable={false}
        />
        <Text style={styles.unit}>AED</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={500000}
        maximumValue={5000000}
        step={10000}
        minimumTrackTintColor="#ff1645"
        maximumTrackTintColor="#ccc"
        thumbTintColor='#ff1645'
        value={price}
        onValueChange={(val) => setPrice(Math.round(val))}
      />

      {/* Loan Term */}
      <Text style={styles.label}>Total Years</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          value={loanTerm.toString()}
          editable={false}
        />
        <Text style={styles.unit}>Years</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={30}
        step={1}
        minimumTrackTintColor="#ff1645"
        maximumTrackTintColor="#ccc"
        thumbTintColor='#ff1645'
        value={loanTerm}
        onValueChange={setLoanTerm}
      />

      {/* Down Payment */}
      <Text style={styles.label}>Down Payment</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          value={`${Math.round(price * (downPayment / 100)).toLocaleString()}`}
          editable={false}
        />
        <Text style={styles.unit}>{downPayment}%</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        minimumTrackTintColor="#ff1645"
        maximumTrackTintColor="#ccc"
        thumbTintColor='#ff1645'
        value={downPayment}
        onValueChange={setDownPayment}
      />

      {/* Interest Rate */}
      <Text style={styles.label}>Interest Rate</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          value={interestRate.toString()}
          editable={false}
        />
        <Text style={styles.unit}>%</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={15}
        step={0.1}
        minimumTrackTintColor="#ff1645"
        maximumTrackTintColor="#ccc"
        thumbTintColor='#ff1645'
        value={interestRate}
        onValueChange={setInterestRate}
      />

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={resetToDefault} style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText1}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleApply} style={[styles.button, styles.applyButton]}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MortgageEditScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 80,
  },
  header: {
    position: 'relative',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: -10,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: fonts.PoppinsSemiBold,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fonts.PoppinsMedium
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  unit: {
    marginLeft: 10,
    fontSize: 16,
    color: '#999',
  },
  slider: {
    width: '100%',
    height: 60, // Increased height
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  button: {
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: fonts.PoppinsRegular,
  },
  buttonText1: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: fonts.PoppinsRegular,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  applyButton: {
    backgroundColor: '#ff1645',
  },
});
