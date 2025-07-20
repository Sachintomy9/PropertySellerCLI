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
import IntroNextIcon from '../../assets/svg/svgicons/Others/IntroNextIcon';

const EnquiryExists = ({ visible, onClose }) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close Icon */}
          <Pressable style={styles.closeIcon} onPress={onClose}>
            <CloseIcon/>
          </Pressable>

          {/* Content */}
          <Text style={styles.title}>Your Enquiry has already been Submitted</Text>
          <Text style={styles.subtitle}>
            Our team will contact you shortly.
          </Text>
          <View style={styles.CheckMark}>
            <CheckMark/>
          </View>

          <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Send a reminder</Text>
          {/* The icon is absolutely positioned within the button */}
        </TouchableOpacity>


          {/* Login/Signup Button */}
        </View>
      </View>
    </Modal>
  );
};

export default EnquiryExists;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)', // dim background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.PoppinsMedium
  },
  CheckMark: {
    alignSelf: "center",
  },
  button: {
    backgroundColor: '#ff1645',
    height:50,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // This centers the buttonText
    width: '80%', // Make button take full width within padding
    alignSelf: 'center',
    marginTop:30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18, // Increased font size
    fontWeight: '600',
    fontFamily: fonts?.PoppinsMedium,
  },
});
