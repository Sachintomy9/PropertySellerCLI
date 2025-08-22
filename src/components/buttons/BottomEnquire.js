// components/BottomEnquireButton.js
import React,{useState} from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import EnquireIcon from '../../assets/svg/svgicons/Others/EnquireIcon'; // Replace with your actual SVG path
import { fonts } from '../../../styles/fonts';
import EnquiryPrompt from '../popups/EnquiryPrompt';
import EnquirySubmitted from '../popups/EnquirySubmitted';
import EnquiryExists from '../popups/EnquiryExists';
const BottomEnquireButton = ({propertyId}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [enquiry,setEnquiry] = useState(false);
  const [isSubmitted, setIsSubmitted] =useState(false);

  return (
    <View style={styles.container}>
      {isSubmitted && (
        <EnquirySubmitted
          visible={isSubmitted}
          onClose={() => (setIsSubmitted(false))}
          message={"Enquiry"}
        />
      )}

      {enquiry && (
        <EnquiryExists
          visible={enquiry}
          onClose={() => (setEnquiry(false))}
          message={"Enquiry"}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <EnquireIcon style={{ fill: "#fff", width: 24, height: 24,}}/> 
        <Text style={styles.text}>Enquire Now</Text>
      </TouchableOpacity>
      <EnquiryPrompt
        projectId={propertyId}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        setIsSubmitted={setIsSubmitted}
        setEnquiry={setEnquiry}
      />
    </View>
  );
};

export default BottomEnquireButton;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    borderTopWidth: 0.5,
    borderColor: '#ddd',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#ff1645',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily:fonts.PoppinsMedium
  },
});
