import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from './styles';

export default function MyImagePicker() {
  const { brand } = Colors;

  const pickImageFromCamera = async () => {
    // Ask user for permission to use their phone's camera
    const cameraPermitted = await ImagePicker.requestCameraPermissionsAsync();

    if (cameraPermitted.status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        console.log('image was captured and the data is: ', result);
      }
    } else {
      Alert.alert('Permission must be granted to use the camera feature');
    }
  };

  return (
    <TouchableOpacity onPress={pickImageFromCamera}>
      <Ionicons name="camera" size={30} color={brand} />
    </TouchableOpacity>
  );
}
