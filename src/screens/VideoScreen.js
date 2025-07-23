import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useSelector } from 'react-redux';
import MultipleButton from '../components/buttons/MultipleButton';
import HeaderTab from '../components/Headers/HeaderTab';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');
const videoHeight = (width / 16) * 9;

const getYouTubeVideoId = (url) => {
  const match = url?.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

const VideoScreen = () => {
  const playerRef = useRef(null);
  const property = useSelector((state) => state.property.property);
  const videoId = getYouTubeVideoId(property.youtubeVideoLink);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <HeaderTab activeTab="Video" />
          <View style={{ width, height: 220, backgroundColor: '#fff' ,marginTop: 200, }}>
            <YoutubePlayer
              height={220}
              width={width}
              videoId={videoId}
              play={false}
              webViewStyle={{
                height: 220,
                width: width,
                backgroundColor: 'transparent',
                opacity: 0.99,
                minHeight: 1,
              }}
              webViewProps={{
                allowsInlineMediaPlayback: false,
                allowsFullscreenVideo: true,
                androidLayerType: 'hardware',
              }}
              initialPlayerParams={{
                modestbranding: true,
                rel: false,
                controls: 1,
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
  videoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
});

export default VideoScreen;
