import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import CloseIcon from '../../assets/svg/svgicons/ProfileScreen/CloseIcon';
import { useNavigation} from '@react-navigation/native';
import { fonts } from '../../../styles/fonts';
import CheckMark from '../../assets/svg/svgicons/PopUps/CheckMark';

const EnquirySubmitted = ({ visible, onClose,message }) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}  // Add this for Android
    >
      {/* Semi-transparent backdrop */}
      <View style={styles.modalBackdrop}>
        {/* White content container */}
        <View style={styles.modalContainer}>
          <Pressable style={styles.closeIcon} onPress={onClose}>
            <CloseIcon/>
          </Pressable>
          <Text style={styles.title}>Your {message} Has Been Submitted</Text>
          <Text style={styles.subtitle}>
            Our team will contact you shortly.
          </Text>
          <View style={styles.CheckMark}>
            <CheckMark/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EnquirySubmitted;
const styles = StyleSheet.create({
modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',  // Slightly less than full width
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 14,
    right: 14,
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: fonts.PoppinsMedium
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fonts.PoppinsRegular
  },
  icon: {
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff1645',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.PoppinsMedium
  },
  CheckMark: {
    alignSelf: "center",
  },
});
