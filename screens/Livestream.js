import React from "react";
import { Dimensions, View } from "react-native";
import { NodeCameraView } from "react-native-nodemediaclient";

const { width, height } = Dimensions.get("window");

const config = {
  cameraConfig: {
    cameraId: 1,
    cameraFrontMirror: false,
  },
  videoConfig: {
    preset: 4,
    bitrate: 2000000,
    profile: 2,
    fps: 30,
    videoFrontMirror: true,
  },
  audioConfig: {
    bitrate: 128000,
    profile: 1,
    samplerate: 44100,
  },
};

const LivestreamScreen = () => {
  const cameraViewRef = React.useRef(null);
  const streamKey = "787693ed-0ef3-f9a5-4268-accaf0b97e2c";
  const url = `rtmps://global-live.mux.com:443/app/${streamKey}`;

  return (
    <View style={{ flex: 1 }}>
      <NodeCameraView
        style={{ width, height }}
        ref={cameraViewRef}
        outputUrl={url}
        camera={config.cameraConfig}
        audio={config.audioConfig}
        video={config.videoConfig}
        autopreview={true}
      />
    </View>
  );
};

export default LivestreamScreen;
