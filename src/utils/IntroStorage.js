// utils/IntroStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setIntroSeen = async () => {
  await AsyncStorage.setItem('hasSeenIntro', 'true');
};

export const hasSeenIntro = async () => {
  const value = await AsyncStorage.getItem('hasSeenIntro');
  return value === 'true';
};
export const clearIntroStorage = async () => {
  await AsyncStorage.removeItem('hasSeenIntro');
};