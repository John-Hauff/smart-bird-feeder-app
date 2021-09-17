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
      // let base64Flag = "data:image/jpeg;base64,";
      imageStr = arrayBufferToBase64(data.img.data.data);
      // console.log("imageStr = ", imageStr);
      setImage({ img: base64Flag + imageStr });
      setIsFetching(false);
    });

  // return { img: base64Flag + imageStr };
}

const MyImage = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [image, setImage] = useState({ img: "" });

  useEffect(() => {
    componentDidMount(setImage, isFetching, setIsFetching);
  }, []);

  return (
    image && (
      <Image
        style={{
          width: 300,
          height: 300,
          // resizeMode: "cover",
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

// ~~~~~~~~~~~ OLD CODE ~~~~~~~~~~~
// constructor(props) {
//   super(props);
//   this.state = {
//     img: "",
//   };
// }
// arrayBufferToBase64(buffer) {
//   let binary = "";
//   let bytes = [].slice.call(new Uint8Array(buffer));
//   bytes.forEach((b) => (binary += String.fromCharCode(b)));
//   return window.btoa(binary);
// }
// componentDidMount() {
//   const url =
//     "https://smart-bird-feeder-api.herokuapp.com/user/get-bird-memory";
//   axios
//     .get(url)
//     .then((res) => res.json())
//     .then((data) => {
//       let base64Flag = "data:image/jpeg;base64,";
//       let imageStr = this.arrayBufferToBase64(data.img.data.data);
//       console.log("imageStr = ", imageStr);
//       this.setState({
//         img: base64Flag + imageStr,
//       });
//     });
// }
