import React, { useRef, useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import { SafeAreaView } from "react-native-safe-area-context";
import { Video, AVPlaybackStatus } from "expo-av";

const Livestream = () => {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.videoContainer}>
        <Video
          ref={video}
          style={styles.video}
          source={
            // { uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }
            require("../assets/feed-spout-cap-mockup.mov")
            // { uri: "rtp://localhost:4000" }
          }
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    flex: 5,
  },

  video: {
    flex: 1,
    height: "50%",
    width: "100%",
  },

  buttons: {
    flex: 1,
    backgroundColor: "orange",
  },
});

export default Livestream;
