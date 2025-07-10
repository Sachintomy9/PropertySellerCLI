import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HeartIcon from '../../assets/svg/svgicons/Others/HeartIcon';
import ShareIcon from '../../assets/svg/svgicons/Others/ShareIcon';
import EnquireIcon from '../../assets/svg/svgicons/Others/EnquireIcon';

const MultipleButton = ({ onSave, onShare, onEnquire }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onSave}>
        <HeartIcon />
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onShare}>
        <ShareIcon />
        <Text style={styles.text}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onEnquire}>
        <View style={styles.Icon}>
        <EnquireIcon style={{ width: 24, height: 24 }} />
        </View>
        <Text style={styles.text}>Enquire</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MultipleButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 20,
    padding:10,
    width: '32%',
    backgroundColor:'#FFE8EF',
    borderRadius:6,
  },
  text: {
    color: '#D91E5B',
    fontWeight: '600',
    right:10,
  },
  Icon:{

  },
});
