import React,{useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CalenderIcon from '../../assets/svg/svgicons/Others/CalenderIcon';
import LocationIcon from '../../assets/svg/svgicons/Details/LocationIcon';
import moment from 'moment';
import { fonts } from '../../../styles/fonts';
import BookSlotPrompt from '../popups/BookSlotPromt';
import EnquirySubmitted from '../popups/EnquirySubmitted';
import InvalidOtp from '../popups/InvalidOtp';

const OpenHouseCard = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ issubmitted, setIsSubmitted] = useState(false);


  const formattedDate = moment(item.date).format('DD-MM-YY');
  const formattedTime = `${moment(item.date).format('hh:mm A')} to ${item.time}`;

  return (
    <View style={styles.card}> 
    <InvalidOtp
      visible={success}
      onClose={() => setSuccess(false)}
      heading={"Booking Success"}
      subheading={"Your Slot has been Booked"}
    />
    <InvalidOtp
      visible={issubmitted}
      onClose={() => setIsSubmitted(false)}
      heading={"Already Booked"}
      subheading={"Your Slot has already been booked"}
      />

      <Image source={{ uri: item.image.secure_url }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>Featuring {item.developerDetails?.name}</Text>
            <View style={styles.row}>
                <CalenderIcon  /> 
            <Text style={styles.infoText}>{formattedDate} ({formattedTime})</Text>
            </View>
            <View style={styles.row}>
                <LocationIcon color='#888' size={24}/>
            <Text style={styles.infoText}>{item.location}</Text>
            </View>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Book Your Slot</Text>
        </TouchableOpacity>
        <BookSlotPrompt
        slotId={item._id}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        setSuccess={setSuccess}           
        setIsSubmitted={setIsSubmitted}   
        />

      </View>
    </View>
  );
};

export default OpenHouseCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    height: 160,
    width: '100%',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.PoppinsSemiBold,
    color: '#111',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#555',
    fontFamily: fonts.PoppinsRegular,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#FFDDE2',
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FF1645',
    fontWeight: '600',
    fontFamily: fonts.PoppinsRegular,
  },
});
