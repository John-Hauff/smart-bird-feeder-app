import React, { useState, useEffect, Component } from "react";

import { Image } from "react-native";

import { encode as btoa } from "base-64";

function arrayBufferToBase64(buffer) {
  let binary = "";
  let bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function componentDidMount(setImage, isFetching, setIsFetching) {
  let base64Flag = "data:image/jpeg;base64,";
  let imageStr = "";

  const url =
    "https://smart-bird-feeder-api.herokuapp.com/user/get-bird-memory";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      imageStr = arrayBufferToBase64(data.img.data.data);
      setImage({ img: base64Flag + imageStr });
      setIsFetching(false);
    });
}

const MyImage = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [image, setImage] = useState({ img: "" });

  useEffect(() => {
    componentDidMount(setImage, isFetching, setIsFetching);
  }, []);

  return (
    image && (
      // TODO: Make style in styles.js for bird memory Image component
      // (temp style is from Image component)
      <Image
        style={{
          marginTop: 100,
          width: 300,
          height: 300,
          borderWidth: 1,
          borderColor: "gray",
        }}
        source={
          isFetching ? require("../assets/placeholder.png") : { uri: image.img }
        }
      />
    )
  );
};

export default MyImage;
