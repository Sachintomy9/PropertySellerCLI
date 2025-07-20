import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { logout,isGuestUser } from '../services/AuthService';
import CloseIcon from '../../assets/svg/svgicons/ProfileScreen/CloseIcon';
import { useNavigation} from '@react-navigation/native';
import { fonts } from '../../../styles/fonts';
import CheckMark from '../../assets/svg/svgicons/PopUps/CheckMark';
import LogoutIcon from '../../assets/svg/svgicons/ProfileScreen/LogoutIcon';

const LogoutPrompt = ({ visible, onClose }) => {
    const navigation=useNavigation();
    
    const handleLogout = async () => {

        try {
            await logout(); // Call the logout function from AuthService
            navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
            });
            console.log('User logged out successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to log out. Please try again.');
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
          <Text style={styles.title}>Logout</Text>
          <Text style={styles.subtitle}>
            Do you really want to logout?
          </Text>
          <View style={styles.CheckMark}>
            <CheckMark/>
          </View>

        <View style={{flex:1, flexDirection:"row"}}>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
                {/* The icon is absolutely positioned within the button */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>Cancel</Text>
                {/* The icon is absolutely positioned within the button */}
            </TouchableOpacity>
        </View>

          {/* Login/Signup Button */}
        </View>
      </View>
    </Modal>
  );
};

export default LogoutPrompt;
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
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // This centers the buttonText
    width: '49%', // Make button take full width within padding
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
