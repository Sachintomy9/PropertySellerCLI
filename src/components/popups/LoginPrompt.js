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
import UserIcon from '../../assets/svg/svgicons/PopUps/UserIcon';
import { useNavigation} from '@react-navigation/native';
import { fonts } from '../../../styles/fonts';

const LoginPrompt = ({ visible, onClose }) => {
    const {loginUser} = useAuth();
    const navigation = useNavigation();

    const onLogin = async () => {
        try {
            await loginUser();
            navigation.navigate('Login');
            // Optional: Add any post-login logic here
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure (show error message, etc.)
        }
    };


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
          <Text style={styles.title}>You're Almost There!</Text>
          <Text style={styles.subtitle}>
            To continue, please log in or create an account. This helps us
            personalize your experience, save your activity, and keep things secure.
          </Text>

          {/* Icon */}
          <View style={{bottom:10}}>
            <UserIcon/>
          </View>

          {/* Login/Signup Button */}
          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>Login / Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LoginPrompt;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // dim background
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
});
