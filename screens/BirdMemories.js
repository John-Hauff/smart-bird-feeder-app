// import React, { useContext } from "react";
// import { StatusBar } from "expo-status-bar";

// import {
//   PageTitle,
//   StyledFormArea,
//   StyledButton,
//   ButtonText,
//   Line,
//   BirdMemoriesContainer,
//   BirdMemoryContainer,
// } from "./../components/styles";

// import BirdMemory from "../components/BirdMemory";
// import axios from "axios";

// const BirdMemories = ({ navigation }) => {
//   // Handle moving to next bird memory in the image gallery
//   const handleNext = () => {
//     // axios.get;
//   };

//   return (
//     <>
//       {/* Changed style to "dark" to keep status bar visible */}
//       <StatusBar style="dark" />
//       <BirdMemoriesContainer>
//         <PageTitle birdMemories={true}>Bird Memories Gallery</PageTitle>
//         <StyledFormArea>
//           {/* Insert styled horizontal line component */}
//           <Line />
//           <BirdMemoryContainer>
//             <BirdMemory />
//           </BirdMemoryContainer>
//           {/* Insert the style component for a button */}
//           <StyledButton
//             // Load the next bird memory
//             onPress={() => navigation.navigate("Home")}
//           >
//             {/* Insert the styled button text */}
//             <ButtonText>Previous</ButtonText>
//           </StyledButton>
//           <StyledButton
//             // Load the next bird memory
//             onPress={() => navigation.navigate("Welcome")}
//           >
//             {/* Insert the styled button text */}
//             <ButtonText>Next</ButtonText>
//           </StyledButton>
//           <StyledButton
//             // Take the user back to Home screen upon selection of button
//             onPress={() => navigation.navigate("Home")}
//           >
//             {/* Insert the styled button text */}
//             <ButtonText>Go Home</ButtonText>
//           </StyledButton>
//         </StyledFormArea>
//       </BirdMemoriesContainer>
//     </>
//   );
// };

// export default BirdMemories;

// import React, { useState, useRef } from "react";
// import { TouchableOpacity, Image, Dimensions } from "react-native";
// import { StatusBar } from "expo-status-bar";

// import {
//   BirdMemoriesPageTitle,
//   Line,
//   BirdMemoriesContainer,
//   CarouselContainer,
//   ImageIndexText,
//   ImageIndexTextContainer,
//   MyFlatList,
// } from "./../components/styles";

// import BirdMemory from "../components/BirdMemory";
// import axios from "axios";
// import Carousel, { Pagination } from "react-native-snap-carousel";

// const { width } = Dimensions.get("window");
// const SPACING = 10;
// const THUMB_SIZE = 80;

// const IMAGES = {
//   image1: require("../assets/gallery-imgs/img1.jpg"),
//   image2: require("../assets/gallery-imgs/img2.jpg"),
//   image3: require("../assets/gallery-imgs/img3.jpg"),
//   image4: require("../assets/gallery-imgs/img4.jpg"),
//   image5: require("../assets/gallery-imgs/img5.jpg"),
//   image6: require("../assets/gallery-imgs/img6.jpg"),
//   image7: require("../assets/gallery-imgs/img7.jpg"),
//   image8: require("../assets/gallery-imgs/img8.jpg"),
// };

// const BirdMemories = () => {
//   const [images, setImages] = useState([
//     { id: "1", image: IMAGES.image1 },
//     { id: "2", image: IMAGES.image2 },
//     { id: "3", image: IMAGES.image3 },
//     { id: "4", image: IMAGES.image4 },
//     { id: "5", image: IMAGES.image5 },
//     { id: "6", image: IMAGES.image6 },
//     { id: "7", image: IMAGES.image7 },
//     { id: "8", image: IMAGES.image8 },
//   ]);

//   const [indexSelected, setIndexSelected] = useState(0);
//   const carouselRef = useRef();
//   const flatListRef = useRef();

//   const onTouchThumbnail = (touched) => {
//     if (touched === indexSelected) return;

//     carouselRef?.current?.snapToItem(touched);
//   };

//   const onSelect = (index) => {
//     setIndexSelected(index);

//     flatListRef?.current?.scrollToOffset({
//       offset: index * THUMB_SIZE,
//       animated: true,
//     });
//   };

//   return (
//     <BirdMemoriesContainer>
//       <BirdMemoriesPageTitle birdMemories={true}>
//         Bird Memories Gallery
//       </BirdMemoriesPageTitle>

//       {/* Carousel View */}
//       <CarouselContainer style={{ flex: 1 / 2, marginTop: 20 }}>
//         <Carousel
//           ref={carouselRef}
//           layout="stack"
//           data={images}
//           sliderWidth={width}
//           itemWidth={width}
//           // Fire callback when index of img item changes; onSelect updates cur index
//           onSnapToItem={(index) => onSelect(index)}
//           renderItem={({ item, index }) => (
//             <Image
//               key={index}
//               style={{ width: "100%", height: "100%" }}
//               resizeMode="contain"
//               source={item.image}
//             />
//           )}
//         />
//         <Pagination
//           inactiveDotColor="gray"
//           dotColor={"orange"}
//           activeDotIndex={indexSelected}
//           dotsLength={images.length}
//           animatedDuration={150}
//           inactiveDotScale={1}
//         />
//       </CarouselContainer>

//       {/* Use FlatList component to list thumbnails of memories */}
//       <MyFlatList
//         ref={flatListRef}
//         horizontal={true}
//         data={images}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: SPACING }}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item, index }) => (
//           <TouchableOpacity
//             activeOpacity={0.9}
//             onPress={() => onTouchThumbnail(index)}
//           >
//             <Image
//               style={{
//                 width: THUMB_SIZE,
//                 height: THUMB_SIZE,
//                 marginRight: SPACING,
//                 borderRadius: 16,
//                 borderWidth: index === indexSelected ? 4 : 0.75,
//                 borderColor: index === indexSelected ? "orange" : "black",
//               }}
//               source={item.image}
//             />
//           </TouchableOpacity>
//         )}
//       />

//       {/* Display for total # of imgs & cur img index # */}
//       <ImageIndexTextContainer>
//         <ImageIndexText>
//           {indexSelected + 1}/{images.length}
//         </ImageIndexText>
//       </ImageIndexTextContainer>
//     </BirdMemoriesContainer>
//   );
// };

// export default BirdMemories;

import React, { useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import {
  BirdMemoriesPageTitle,
  Line,
  BirdMemoriesContainer,
  CarouselContainer,
  ImageIndexText,
  ImageIndexTextContainer,
  MyFlatList,
  Colors,
} from "./../components/styles";

import { encode as btoa } from "base-64";
import BirdMemory from "../components/BirdMemory";
import axios from "axios";
import Carousel, { Pagination } from "react-native-snap-carousel";

const { width } = Dimensions.get("window");
const SPACING = 10;
const THUMB_SIZE = 80;

const IMAGES = {
  // image1: <BirdMemory />,
  image1: require("../assets/gallery-imgs/img1.jpg"),
  image2: require("../assets/gallery-imgs/img2.jpg"),
  image3: require("../assets/gallery-imgs/img3.jpg"),
  image4: require("../assets/gallery-imgs/img4.jpg"),
  image5: require("../assets/gallery-imgs/img5.jpg"),
  image6: require("../assets/gallery-imgs/img6.jpg"),
  image7: require("../assets/gallery-imgs/img7.jpg"),
  image8: require("../assets/gallery-imgs/img8.jpg"),
};

function arrayBufferToBase64(buffer) {
  let binary = "";
  let bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

// function componentDidMount(setImage, setIsFetching) {
//   let base64Flag = "data:image/jpeg;base64,";
//   let imageStr = "";

//   // const url =
//   //   "https://smart-bird-feeder-api.herokuapp.com/user/get-bird-memory";
//   const url = "http://localhost:3000/user/get-bird-memory";

//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data["6144fa5f6dcca1c92019cd8c"].createdAt);
//       imageStr = arrayBufferToBase64(
//         data["6144fa5f6dcca1c92019cd8c"].img.data.data
//       );
//       setImage({ img: base64Flag + imageStr });
//       setIsFetching(false);
//     })
//     .catch((err) => console.log(err)); // host server not found (bad network, likely)
// }

function componentDidMount(setImages, setIsFetching) {
  let base64Flag = "data:image/jpeg;base64,";
  let imageStr = "";

  const url =
    "https://smart-bird-feeder-api.herokuapp.com/user/get-bird-memory";
  // const url = "http://localhost:3000/user/get-bird-memory";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // TODO: Loop to convert each document's image from db to base64,
      // and inside the loop, also setImages state to add the new document's image
      // console.log(data["6144fa5f6dcca1c92019cd8c"].createdAt);

      let counter = 1;
      let idStrs = new Array();
      let imageStrs = new Array();
      let birdMemImages = new Array();

      for (let i in data) {
        imageStrs.push(arrayBufferToBase64(data[i].img.data.data));
        idStrs.push("" + counter);

        console.log(idStrs[counter - 1]); // debug

        birdMemImages.push({
          id: idStrs[counter - 1],
          image: { uri: base64Flag + imageStrs[counter - 1] },
        });

        counter++;
        // { id: idStrs[counter], image: { uri: base64Flag + imageStrs[counter - 1] } },
        // { id: "2", image: IMAGES.image2 },
        // { id: "3", image: IMAGES.image3 },
        // { id: "4", image: IMAGES.image4 },
        // { id: "5", image: IMAGES.image5 },
        // { id: "6", image: IMAGES.image6 },
        // { id: "7", image: IMAGES.image7 },
        // { id: "8", image: IMAGES.image8 },
      }
      setImages(birdMemImages);

      // setImages([
      //   { id: "1", image: { uri: base64Flag + imageStr } },
      //   { id: "2", image: IMAGES.image2 },
      //   { id: "3", image: IMAGES.image3 },
      //   { id: "4", image: IMAGES.image4 },
      //   { id: "5", image: IMAGES.image5 },
      //   { id: "6", image: IMAGES.image6 },
      //   { id: "7", image: IMAGES.image7 },
      //   { id: "8", image: IMAGES.image8 },
      // ]);
      setIsFetching(false);
    })
    .catch((err) => console.log(err)); // host server not found (bad network, likely)
}

const BirdMemories = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [image, setImage] = useState({ img: "" });
  const [indexSelected, setIndexSelected] = useState(0);

  const [images, setImages] = useState([
    { id: "1", image: IMAGES.image1 },
    { id: "2", image: IMAGES.image2 },
    { id: "3", image: IMAGES.image3 },
    { id: "4", image: IMAGES.image4 },
    { id: "5", image: IMAGES.image5 },
    { id: "6", image: IMAGES.image6 },
    { id: "7", image: IMAGES.image7 },
    { id: "8", image: IMAGES.image8 },
  ]);

  const carouselRef = useRef();
  const flatListRef = useRef();

  const { black } = Colors;

  const onTouchThumbnail = (touched) => {
    if (touched === indexSelected) return;

    carouselRef?.current?.snapToItem(touched);
  };

  const onSelect = (index) => {
    setIndexSelected(index);

    flatListRef?.current?.scrollToOffset({
      offset: index * THUMB_SIZE,
      animated: true,
    });
  };

  useEffect(() => {
    // componentDidMount(setImage, setIsFetching);
    componentDidMount(setImages, setIsFetching);
    // console.log(image.img);
    // setImages([
    //   {
    //     id: "1",
    //     image: !isFetching ? { uri: image.img } : IMAGES.image1,
    //   },
    //   {
    //     id: "2",
    //     image: !isFetching ? { uri: image.img } : IMAGES.image2,
    //   },
    //   {
    //     id: "3",
    //     image: !isFetching ? { uri: image.img } : IMAGES.image3,
    //   },
    //   {
    //     id: "4",
    //     image: !isFetching ? { uri: image.img } : IMAGES.image4,
    //   },
    //   {
    //     id: "5",
    //     image: !isFetching ? { uri: image.img } : IMAGES.image5,
    //   },
    //   {
    //     id: "6",
    //     image: !isFetching ? { uri: image.img } : IMAGES.image6,
    //   },
    // ]);
  }, []);

  return (
    <BirdMemoriesContainer>
      <BirdMemoriesPageTitle birdMemories={true}>
        Bird Memories Gallery
      </BirdMemoriesPageTitle>

      {/* Carousel View */}
      <CarouselContainer style={{ flex: 1 / 2, marginTop: 20 }}>
        <Carousel
          ref={carouselRef}
          layout="default"
          data={images}
          sliderWidth={width}
          itemWidth={width}
          // Fire callback when index of img item changes; onSelect updates cur index
          onSnapToItem={(index) => onSelect(index)}
          renderItem={({ item, index }) =>
            // TODO: Swap out Image for custom StyledBirdMemory later
            image && !isFetching ? (
              <Image
                key={index}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
                source={item.image}
              />
            ) : (
              <ActivityIndicator size="large" color={black} />
            )
          }
        />
        <Pagination
          inactiveDotColor="gray"
          dotColor={"orange"}
          activeDotIndex={indexSelected}
          dotsLength={images.length}
          animatedDuration={150}
          inactiveDotScale={1}
        />
      </CarouselContainer>

      {/* Use FlatList component to list thumbnails of memories */}
      <MyFlatList
        ref={flatListRef}
        horizontal={true}
        data={images}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onTouchThumbnail(index)}
          >
            {/* TODO: Swap out Image for custom StyledBirdMemory later */}
            {image && !isFetching ? (
              <Image
                style={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  marginRight: SPACING,
                  borderRadius: 16,
                  borderWidth: index === indexSelected ? 4 : 0.75,
                  borderColor: index === indexSelected ? "orange" : "black",
                }}
                source={item.image}
              />
            ) : (
              <ActivityIndicator size="large" color={black} />
            )}
          </TouchableOpacity>
        )}
      />

      {/* Display for total # of imgs & cur img index # */}
      <ImageIndexTextContainer>
        <ImageIndexText>
          {indexSelected + 1}/{images.length}
        </ImageIndexText>
      </ImageIndexTextContainer>
    </BirdMemoriesContainer>
  );
};

export default BirdMemories;
