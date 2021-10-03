import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  TouchableOpacity,
  Image,
  Dimensions,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { CardView } from "react-native-simple-card-view";

import {
  BirdMemoriesPageTitle,
  Line,
  BirdMemoriesContainer,
  BirdMemoryDescContainer,
  CarouselContainer,
  ImageIndexText,
  ImageIndexTextContainer,
  BirdMemoryDescription,
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

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const BirdMemories = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [indexSelected, setIndexSelected] = useState(0);

  const [images, setImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const carouselRef = useRef();
  const flatListRef = useRef();

  const { black, primary, brand } = Colors;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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

  // Mongoose Date type format: 2021-10-01T20:52:38.080Z
  // formattedDateTime format: <month_name> DD, YYYY · hh:mm:ss
  const formatDateTime = (creationTime) => {
    let months = {};
    months["01"] = "January";
    months["02"] = "February";
    months["03"] = "March";
    months["04"] = "April";
    months["05"] = "May";
    months["06"] = "June";
    months["07"] = "July";
    months["08"] = "August";
    months["09"] = "September";
    months["10"] = "October";
    months["11"] = "November";
    months["12"] = "December";

    // Extract the date from the createdAt object
    let year = creationTime.split("-")[0];
    let month = creationTime.split("-")[1];
    let day = creationTime.split("-")[2].split("T")[0];
    // console.log("year: " + year + " \nmonth: " + month + "\nday: " + day);

    let date = months[month] + " " + day + ", " + year;

    // Extract the time from the createdAt object
    let hour = creationTime.split("T")[1].split(":")[0];
    let minute = creationTime.split("T")[1].split(":")[1];
    let second = creationTime.split("T")[1].split(":")[2].split(".")[0];
    // console.log("hour: " + hour + " \nmin: " + minute + "\nsec: " + second);

    let time = hour + ":" + minute + ":" + second;

    return date + " · " + time;
  };

  useEffect(() => {
    componentDidMount(setImages, setIsFetching);
  }, []);

  return (
    <BirdMemoriesContainer>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <BirdMemoriesPageTitle birdMemories={true}>
          Bird Memories Gallery
        </BirdMemoriesPageTitle>

        {/* Carousel View */}
        <CarouselContainer>
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
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  resizeMode="contain"
                  source={require("../assets/placeholder.png")}
                />
              )
            }
          />
        </CarouselContainer>

        <View
          style={{
            justifyContent: "space-between",
            backgroundColor: { primary },
          }}
        >
          <Pagination
            inactiveDotColor="gray"
            dotColor={brand}
            activeDotIndex={indexSelected}
            dotsLength={images.length}
            animatedDuration={150}
            inactiveDotScale={0.75}
            carouselRef={carouselRef}
            tappableDots={true}
          />
        </View>

        {/* Display for total # of imgs & cur img index # */}
        <ImageIndexTextContainer>
          <ImageIndexText>
            {/* Display current image index out of total # images, or display nothing when loading imgs */}
            {images.length > 0 ? indexSelected + 1 + "/" + images.length : ""}
          </ImageIndexText>
        </ImageIndexTextContainer>

        <BirdMemoryDescContainer>
          <CardView>
            <BirdMemoryDescription>
              {/* TODO: style date & time tag */}
              {!isFetching && "Species: " + images[indexSelected].species}
            </BirdMemoryDescription>
            <BirdMemoryDescription>
              {/* TODO: style date & time tag */}
              {!isFetching &&
                formatDateTime(images[indexSelected].creationTime)}
            </BirdMemoryDescription>
          </CardView>
        </BirdMemoryDescContainer>

        {/* console.log(images[indexSelected].creationTime) &&
              images[indexSelected].creationTime.split("T")[0] +
                " · " +
                images[indexSelected].creationTime.split("T")[1].split(".")[0] */}

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
                    borderColor: index === indexSelected ? brand : "black",
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
                    borderColor: index === indexSelected ? brand : "black",
                  }}
                  source={require("../assets/placeholder.png")}
                />
              )}
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </BirdMemoriesContainer>
  );
  // return (
  //   <BirdMemoriesContainer>
  //     <CardViewWithImage
  //       width={300}
  //       content={
  //         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut distinctio!"
  //       }
  //       source={{ uri: "https://placeimg.com/640/480/tech" }}
  //       title={"Hello World!"}
  //       imageWidth={100}
  //       imageHeight={100}
  //       onPress={() => console.log("CardViewWithImage Clicked!")}
  //       roundedImage={true}
  //       roundedImageValue={50}
  //       imageMargin={{ top: 10 }}
  //     />
  //   </BirdMemoriesContainer>
  // );
};

export default BirdMemories;
