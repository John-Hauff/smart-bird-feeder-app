import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Image, Dimensions } from "react-native";
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
import axios from "axios";
import Carousel, { Pagination } from "react-native-snap-carousel";

const { width } = Dimensions.get("window");
const SPACING = 10;
const THUMB_SIZE = 80;

function arrayBufferToBase64(buffer) {
  let binary = "";
  let bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function componentDidMount(setImages, setIsFetching) {
  let base64Flag = "data:image/jpeg;base64,";

  const url =
    "https://smart-bird-feeder-api.herokuapp.com/user/get-bird-memory";
  // const url = "http://localhost:3000/user/get-bird-memory";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let counter = 1;
      let idStrs = new Array();
      let imageStrs = new Array();
      let birdMemImages = new Array();

      // Loop to convert each document's image from db to base64,
      // and build an array of objects to set the state for each image
      for (let i in data) {
        imageStrs.push(arrayBufferToBase64(data[i].img.data.data));
        idStrs.push("" + counter);

        // console.log(data["61575c7fe9b7cf3a574f8ac8"].img.species);
        birdMemImages.push({
          id: idStrs[counter - 1],
          image: { uri: base64Flag + imageStrs[counter - 1] },
          species: data[i].img.species ? data[i].img.species : "rat with wings",
          creationTime: data[i].createdAt ? data[i].createdAt : "5 O'clock",
        });

        counter++;
      }

      setImages(birdMemImages);

      setIsFetching(false);
    })
    .catch((err) => console.log(err)); // host server not found (bad network, likely)
}

const BirdMemories = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [indexSelected, setIndexSelected] = useState(0);

  const [images, setImages] = useState([]);

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
    componentDidMount(setImages, setIsFetching);
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
            images && !isFetching ? (
              <Image
                key={index}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
                source={item.image}
              />
            ) : (
              // This Image will not show, for some reason (same with thumbnail)
              <Image
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
                source={require("../assets/placeholder.png")}
              />
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
            {images && !isFetching ? (
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
              <Image
                style={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  marginRight: SPACING,
                  borderRadius: 16,
                  borderWidth: index === indexSelected ? 4 : 0.75,
                  borderColor: index === indexSelected ? "orange" : "black",
                }}
                source={require("../assets/placeholder.png")}
              />
            )}
          </TouchableOpacity>
        )}
      />

      {/* Display for total # of imgs & cur img index # */}
      <ImageIndexTextContainer>
        <ImageIndexText>
          {/* Display current image index out of total # images, or display nothing when loading imgs */}
          {images.length > 0 ? indexSelected + 1 + "/" + images.length : ""}
        </ImageIndexText>
      </ImageIndexTextContainer>

      <ImageIndexTextContainer>
        <ImageIndexText>
          {!isFetching && images[indexSelected].species}
        </ImageIndexText>
        <ImageIndexText>
          {/* TODO: style date & time tag */}
          {!isFetching && images[indexSelected].creationTime}
        </ImageIndexText>
      </ImageIndexTextContainer>
    </BirdMemoriesContainer>
  );
};

export default BirdMemories;
