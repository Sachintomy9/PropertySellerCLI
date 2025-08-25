import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useSelector } from 'react-redux';
import MultipleButton from '../components/buttons/MultipleButton';
import HeaderTab from '../components/Headers/HeaderTab';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const videoHeight = (width / 16) * 9;
const responsiveWidth = (w) => (width * w) / 100;
const responsiveHeight = (h) => (height * h) / 100;
const { width } = Dimensions.get('window');

const getYouTubeVideoId = (url) => {
  const match = url?.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

const VideoScreen = () => {
  const playerRef = useRef(null);
  const property = useSelector((state) => state.property.property);
  const videoId = getYouTubeVideoId(property.youtubeVideoLink);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            paddingHorizontal: responsiveWidth(2)
          }}
        >
          <HeaderTab activeTab="Video" />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "85%",
          }}
        >

          <View
            style={{
              width: "100%",
              // justifyContent:"center",
              // alignItems:"center",
              // flex: 1,
              // height:"100%",
              backgroundColor: "#fff",
              overflow: "hidden", // 👈 important
            }}
          >
            <YoutubePlayer
              height={250}
              width={"100%"}
              videoId={videoId}
              play={false}
              webViewStyle={{
                height: 250,
                width: width,
                backgroundColor: "transparent",
                opacity: 0.99,
                minHeight: 1,
              }}
              webViewProps={{
                allowsInlineMediaPlayback: false,
                allowsFullscreenVideo: true,
                androidLayerType: "hardware",
              }}
              initialPlayerParams={{
                modestbranding: true,
                rel: false,
                controls: 1,
              }}
            />
          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: responsiveWidth(2),
    paddingTop: 0,
  },
  videoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
});

export default VideoScreen;
