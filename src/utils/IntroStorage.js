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


// Helper function to get the user-specific key
function getKey(userId) {
  return `hasSeenAiAgentIntro_v1_${userId}`;
}

// returns boolean
export async function hasSeenAiAgentIntro(userId) {
  if (!userId) return false; // handle case where userId is not available
  
  try {
    const v = await AsyncStorage.getItem(getKey(userId));
    return v === 'true';
  } catch (e) {
    console.warn('aiIntroStorage read error', e);
    return false;
  }
}

// mark as seen
export async function setSeenAiAgentIntro(userId) {
  if (!userId) return; // handle case where userId is not available
  
  try {
    await AsyncStorage.setItem(getKey(userId), 'true');
  } catch (e) {
    console.warn('aiIntroStorage write error', e);
  }
}