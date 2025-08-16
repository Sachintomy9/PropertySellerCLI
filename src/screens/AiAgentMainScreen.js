import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { fonts } from '../../styles/fonts';
import BackIcon from '../assets/svg/svgicons/Details/BackIcon';
import AiAgentIcon from '../assets/svg/svgicons/Others/AiAgentIcon';
import SendIcon from '../assets/svg/svgicons/Others/SendIcon';
import OptionIcon from '../assets/svg/svgicons/Others/OptionIcon'; 

const STORAGE_KEY = 'ai_agent_chats_v1'; // Versioned key for future migrations
const MAX_CHATS = 3; // Maximum number of chats to store

const AiAgentMainScreen = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]); // newest first: index 0 is latest chat
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const flatRef = useRef(null);

  // Load chats from storage
    const loadChats = async () => {
        try {
            const savedChats = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedChats) {
            // Messages are already grouped by conversation in storage
            setChats(JSON.parse(savedChats));
            }
        } catch (error) {
            console.error('Failed to load chats:', error);
        }
        };

    // Save chats to storage
    const saveChats = async (chatsToSave) => {
        try {
            // Group messages by conversation
            const conversations = {};
            chatsToSave.forEach(msg => {
            if (!conversations[msg.conversationId]) {
                conversations[msg.conversationId] = [];
            }
            conversations[msg.conversationId].push(msg);
            });

            // Sort conversations by most recent (based on first message timestamp)
            const sortedConversations = Object.values(conversations)
            .sort((a, b) => new Date(b[0].timestamp) - new Date(a[0].timestamp))
            .slice(0, MAX_CHATS); // Keep only 3 most recent conversations

            // Flatten back to array for storage
            const chatsToStore = sortedConversations.flat();
            
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(chatsToStore));
        } catch (error) {
            console.error('Failed to save chats:', error);
        }
        };

    const clearChats = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setChats([]);
            setShowDropdown(false);
        } catch (error) {
            console.error('Failed to clear chats:', error);
        }
        };

    useEffect(() => {
        loadChats();
    }, []);



  const sendMessage = async () => {
    if (!input.trim()) return;

    const conversationId = Date.now().toString();
    
    const userMsg = {
      id: conversationId + '_user', // Use same conversation ID for grouping
        conversationId,
      type: 'user',
      text: input.trim(),
      timestamp: new Date().toISOString()
    };
    const loadingMsg = {
        id: conversationId + '_loading',
            conversationId,
        type: 'bot',
        loading: true,  // This is what we'll check in renderMessage
        timestamp: new Date().toISOString()
    };
    const newChats = [loadingMsg, userMsg, ...chats];
    setChats(newChats);
    await saveChats(newChats);

    setInput('');
    setIsSending(true);

    try {

      const payload = {
        message: input.trim()
      };
      console.log("payload", payload);
      const res = await axios.post('https://v1-api.propertyseller.com/api/v1/ps-aiagent', payload);

      if (res.data?.success) {
        if (res.data?.data?.length > 0) {
            // Handle successful response with data
            const propertyMessages = res.data.data.map((project, index) => ({
            id: conversationId + '_bot_' + index,
                conversationId,
            type: 'bot',
            loading: false,
            data: {
                projectTitle: project.projectTitle,
                priceInAED: project.priceInAED,
                propertyTypes: project.propertyTypes?.join(', '),
                metaDescription: project.metaDescription,
                id: project._id,
            },
            timestamp: new Date().toISOString()
            }));

            console.log("propertyMessages", propertyMessages);
            const updatedChats = [...propertyMessages, ...newChats.filter(msg => msg.id !== loadingMsg.id)];
            setChats(updatedChats);
            await saveChats(updatedChats);

        } else {
            // Handle no results found
            console.log("No data found");
            const botMsg = {
            id: conversationId + '_bot',
                conversationId,
            type: 'bot',
            loading: false,
            data: {
                message: "We couldn't find any properties matching your request. Please refine your search and try again.",
                isError: true // Optional flag to style error messages differently
            },
            timestamp: new Date().toISOString()
            };
            console.log("botMsg", botMsg);
            const updatedChats = [botMsg, ...newChats.filter(msg => msg.id !== loadingMsg.id)];
            setChats(updatedChats);
            await saveChats(updatedChats);
        }
        }
    } catch (err) {
      console.error(err);
      const errorMsg = {
        id: Date.now().toString() + '_err',
        type: 'bot',
        loading: false,
        text: 'Oops! Something went wrong. Please try again.',
      };
        const updatedChats = [errorMsg, ...newChats.filter(msg => msg.id !== loadingMsg.id)];
        setChats(updatedChats);
        await saveChats(updatedChats);
    } finally {
      setIsSending(false);
    }
  };

  const renderMessage = ({ item }) => {
  if (item.type === 'user') {
    return (
      <View style={styles.userMsg}>
        <Text style={styles.userMsgText}>{item.text}</Text>
      </View>
    );
  }
  
  if (item.type === 'bot') {
    return (
      <View style={styles.botMsg}>
        {item.loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color="#ff1645" />
            <Text style={styles.loadingText}>Thinking...</Text>
          </View>
        ) : item.text ? (
          // Error or no results message
          <Text style={styles.botText}>{item.text}</Text>
        ) : (
          // Property details (single property case)
          <>
            <Text style={[styles.botText, styles.spacing]}>
              We’ve found a property that perfectly matches your preferences — take a look!
            </Text>
            <Text style={styles.botTitle}>{item.data.projectTitle}</Text>
            <Text style={styles.botText}>
              <Text style={styles.boldText}>Description: </Text> 
              {item.data.metaDescription}
            </Text>
            <Text style={styles.botText}>
              <Text style={styles.boldText}>Price: </Text> 
              {item.data.priceInAED}
            </Text>
            <Text style={styles.botText}>
              <Text style={styles.boldText}>Type: </Text> 
              {item.data.propertyTypes}
            </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('PropDetails', { 
                propertyId: item.data.id 
              })}
            >
              <Text style={styles.viewDetailsLink}>View Property Details :</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
  
  return null;
};
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backBtn}>{<BackIcon color='#ff1645'/>}</Text>
            </TouchableOpacity>

            <View style={styles.iconWrap}>
                <AiAgentIcon size={22} color='#ff1645' />
            </View>
            <Text style={styles.headerTitle}><Text style={{ color: '#ff1645' }}>Ai</Text> Agent</Text>

            <TouchableOpacity 
                style={styles.menuButton}
                onPress={() => setShowDropdown(!showDropdown)}
            >
                <OptionIcon color='#ff1645' />
            </TouchableOpacity>
            
            {/* Dropdown menu */}
            {showDropdown && (
                <View style={styles.dropdown}>
                <TouchableOpacity 
                    style={styles.dropdownItem}
                    onPress={clearChats}
                >
                    <Text style={styles.dropdownText}>Clear History</Text>
                </TouchableOpacity>
                </View>
            )}
        </View>

      <FlatList
        ref={flatRef}
        data={chats}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        inverted // latest message at bottom
        contentContainerStyle={{ padding: 16 }}
      />

      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          placeholder="Type your requirement"
          placeholderTextColor="#ffb6c1"
          value={input}
          onChangeText={setInput}
          returnKeyType="send"
          onSubmitEditing={() => sendMessage()}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={() => sendMessage()}>
          {isSending ? <ActivityIndicator color="#fff" /> : <Text >{<SendIcon />}</Text>}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default AiAgentMainScreen

const styles = StyleSheet.create({
    container: {
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between", // Changed from "flex-start"
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative', // Needed for dropdown positioning
  },
  menuButton: {
    padding: 8,
    marginLeft: 'auto', // Push to the right
  },
  dropdown: {
    position: 'absolute',
    right: 16,
    top: 70,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
    minWidth: 150,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: fonts?.PoppinsRegular || undefined,
    color: '#333',
  },
  backBtn: {
    fontSize: 18,
    color: '#ff1645',
    marginRight: 20,
  },
  iconWrap: {
    backgroundColor: '#FFDDE5',
    padding: 5,
    borderRadius: 16,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts?.PoppinsMedium || undefined,
    color: '#222',
  },
  inputWrap: {
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 40,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#222',
    fontFamily: fonts?.PoppinsRegular || undefined,
  },
  sendBtn: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    color: '#fff',
    fontSize: 16,
    transform: [{ rotate: '45deg' }],
  },
  userMsg: {
    backgroundColor: '#ff1645',
    alignSelf: 'flex-end',
    padding: 12,
    borderRadius: 16,
    borderTopRightRadius: 4,
    marginVertical: 6,
    maxWidth: '80%',
  },
  userMsgText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: fonts?.PoppinsRegular || undefined,
  },
  // Bot message card
  botMsg: {
    backgroundColor: '#f2f2f2',
    alignSelf: 'flex-start',
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    borderBottomLeftRadius: 4,
    maxWidth: '85%',
  },
  botTitle: {
    fontSize: 18,
    fontFamily: fonts?.PoppinsSemiBold || undefined,
    marginBottom: 4,
    color: '#222',
  },
  botText: {
    fontSize: 14,
    fontFamily: fonts?.PoppinsRegular || undefined,
    color: '#555',
    marginBottom: 2,
  },
  boldText: {
    fontFamily: fonts?.PoppinsMedium || undefined,
    fontSize: 15,
    color: "#222",
    marginBottom: 2,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  loadingText: {
    marginLeft: 8,
    color: '#ff1645',
    fontFamily: fonts?.PoppinsRegular || undefined,
    fontSize: 14,
  },
  viewDetailsLink: {
    color: '#ff1645',
    fontFamily: fonts?.PoppinsMedium || undefined,
    textDecorationLine: 'underline',
    marginTop: 8,
    fontSize: 14,
  },
  spacing: {
    marginBottom: 12,
  },
  clearButton: {
  alignSelf: 'center',
  padding: 10,
  marginTop: 10,
},
clearButtonText: {
  color: '#ff1645',
  fontFamily: fonts?.PoppinsMedium || undefined,
},

})