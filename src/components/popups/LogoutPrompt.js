import React,{useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import CloseIcon from '../../assets/svg/svgicons/ProfileScreen/CloseIcon';
import UserIcon from '../../assets/svg/svgicons/PopUps/UserIcon';
import { useNavigation} from '@react-navigation/native';
import { fonts } from '../../../styles/fonts';
import { logout } from '../../services/AuthService';

const LogoutPrompt = ({ visible, onClose }) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
      setIsLoading(true); // show loader
        try {
            await logout(); // Call the logout function from AuthService
            navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
            });
            console.log('User logged out successfully');
            onClose();
        } catch (error) {
            Alert.alert('Error', 'Failed to log out. Please try again.');
        } finally {
          setIsLoading(false); // hide loader regardless of success or failure
        }
        };
            


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FF1645" />
          </View>
        )}
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close Icon */}
          <Pressable style={styles.closeIcon} onPress={onClose}>
            <CloseIcon/>
          </Pressable>

          {/* Content */}
          <Text style={styles.title}>Logout</Text>
          <Text style={styles.subtitle}>
            Do you really want to Logout?
          </Text>


          {/* Login/Signup Button */}
          <View style={{flex:1, flexDirection: "row",gap:10}}>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutPrompt;
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
    height:180,
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
    backgroundColor: '#ff1645',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: "48%",
    height: 50
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    alignSelf: "center",
    fontFamily: fonts.PoppinsMedium
  },
  loadingOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(255,255,255,0.7)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
},
});
