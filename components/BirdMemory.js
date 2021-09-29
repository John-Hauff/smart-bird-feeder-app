import React, { useState, useEffect } from "react";

import { Image, ActivityIndicator, Dimensions } from "react-native";

import { encode as btoa } from "base-64";

import { Colors } from "../components/styles";

function arrayBufferToBase64(buffer) {
  let binary = "";
  let bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function componentDidMount(setImage, setIsFetching) {
  let base64Flag = "data:image/jpeg;base64,";
  let imageStr = "";

  const url =
    "https://smart-bird-feeder-api.herokuapp.com/user/get-bird-memory";
  // const url = "http://localhost:3000/user/get-bird-memory";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      imageStr = arrayBufferToBase64(data.img.data.data);
      setImage({ img: base64Flag + imageStr });
      setIsFetching(false);
    })
    .catch((err) => console.log(err)); // host server not found (or bad network, likely)
}

const BirdMemory = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [image, setImage] = useState({ img: "" });

  const { black } = Colors;
  const win = Dimensions.get("window");

  // Get ratio to scale image height
  const ratio = win.width / 1280; // 1280 is width of actual image

  useEffect(() => {
    componentDidMount(setImage, setIsFetching);
  }, []);

  return image && !isFetching ? (
    // TODO: Make style in styles.js for bird memory Image component
    // (temp style is from Image component)
    <Image
      style={{
        width: win.width,
        height: 720 * ratio,
        borderWidth: 1,
        borderColor: black,
      }}
      source={{ uri: image.img }}
    />
  ) : (
    <ActivityIndicator size="large" color={black} />
  );
};

export default BirdMemory;
