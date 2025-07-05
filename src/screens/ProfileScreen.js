import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import LogoutIcon from '../assets/svg/svgicons/ProfileScreen/LogoutIcon';
import EnqPropIcon from '../assets/svg/svgicons/ProfileScreen/EnqPropIcon';
import SavedPropIcon from '../assets/svg/svgicons/ProfileScreen/SavedPropIcon';
import PurHistoryIcon from '../assets/svg/svgicons/ProfileScreen/PurHistoryIcon';
import CloseIcon from '../assets/svg/svgicons/ProfileScreen/CloseIcon';

import { fonts } from '../../styles/fonts';
import { useNavigation } from '@react-navigation/native';
const ProfileScreen = () => {

    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.crossButton} onPress={() => navigation.goBack()}>
            <CloseIcon />
        </TouchableOpacity>
      <Text style={styles.heading}>Your Profile</Text>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>J</Text>
        </View>
        <Text style={styles.name}>Jhon Doe</Text>

        <TouchableOpacity style={styles.logoutRow}>
            <LogoutIcon/>
          <Text style={styles.logoutText}> Logout </Text>
        </TouchableOpacity>

      </View>



      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.secondaryButton}>
            <SavedPropIcon />
          <Text style={styles.buttonText}>Saved Properties</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <EnqPropIcon />
          <Text style={styles.buttonText}>Enquired Properties</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity style={styles.fullButton}>
        <PurHistoryIcon />
        <Text style={styles.buttonText}>Purchase History</Text>
      </TouchableOpacity>




      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value="+971 99999 99999"
          editable={false}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value="jhondoe@gmail.com"
          editable={false}
        />
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  heading: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 15,
    fontFamily: fonts.PoppinsSemiBold,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: '#E4E4E4',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 30,
    color: '#D91E5B',
    fontWeight: '600',
  },
  name: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '500',
    fontFamily: fonts.PoppinsSemiBold,
  },
  logout: {
    color: '#888',
    fontSize: 13,
    marginLeft: 6,
    marginTop: 1,
  },
  logoutRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 6,
},
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  secondaryButton: {
    width: '49%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#E4E4E4',
    borderRadius: 8,
  },
  fullButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4E4E4',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    marginLeft: 8,
    color: '#333',
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.PoppinsSemiBold,
  },
  label: {
    fontSize: 13,
    marginTop: 10,
    marginBottom: 4,
    fontFamily: fonts.PoppinsMedium,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    width: '49%',
    backgroundColor: '#FFDDE5',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#D91E5B',
    fontWeight: '600',
    fontSize: 13,
    fontFamily: fonts.PoppinsSemiBold,
  },
  crossButton: {
  position: 'absolute',
  marginTop: 70,
  left: 20,
  zIndex: 10,
  backgroundColor: '#fff',
  padding: 6,
  borderRadius: 20,
  elevation: 2,
},
});

export default ProfileScreen;