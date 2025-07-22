import React, { useRef, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useSelector } from 'react-redux';
import MultipleButton from '../components/buttons/MultipleButton';
import HeaderTab from '../components/Headers/HeaderTab';
import { SafeAreaView } from 'react-native-safe-area-context';

const getYouTubeVideoId = (url) => {
    const match = url?.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
    };

const VideoScreen = () => {
  const playerRef = useRef(null);
  const property = useSelector((state) => state.property.property);

    const videoId = getYouTubeVideoId(property.youtubeVideoLink);

  return (
    <View style={{flex:1}}>
    <SafeAreaView style={styles.container}>
        <HeaderTab activeTab="Video" />
        <View style={{marginTop:200}}>
            <YoutubePlayer
            ref={playerRef}
            height={220}
            width={Dimensions.get('window').width * 0.95}
            videoId={videoId} // only the video ID, not full URL
            play={false}
            webViewProps={{
                allowsFullscreenVideo: true,
            }}
            />
      </View>
    </SafeAreaView>
    <MultipleButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default VideoScreen;
