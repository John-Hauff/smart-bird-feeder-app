import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  TouchableOpacity,
  Image,
  Dimensions,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatList,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import {
  BirdMemoriesPageTitle,
  Line,
  BirdMemoriesContainer,
  ImageIndexText,
  BirdMemoryDescText,
  Colors,
  BirdMemorySpeciesText,
} from './../components/styles';

import { encode as btoa } from 'base-64';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import MyImagePicker from '../components/MyImagePicker';

const { width } = Dimensions.get('window');
const SPACING = 10;
const THUMB_SIZE = 80;
const WIN_WIDTH = Dimensions.get('window').width;
const SLIDER_WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

function arrayBufferToBase64(buffer) {
  let binary = '';
  let bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function componentDidMount(setImages, setIsFetching) {
  let base64Flag = 'data:image/jpeg;base64,';

  const url =
    'https://smart-bird-feeder-api.herokuapp.com/user/get-bird-memory';
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
        idStrs.push('' + counter);

        // console.log(data["61575c7fe9b7cf3a574f8ac8"].img.species);
        birdMemImages.push({
          id: idStrs[counter - 1],
          base64Image: { uri: base64Flag + imageStrs[counter - 1] },
          species: data[i].img.species ? data[i].img.species : 'rat with wings',
          creationTime: data[i].createdAt
            ? data[i].createdAt
            : "It's 5 O'clock somewhere",
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

// Mongoose Date type format: 2021-10-01T20:52:38.080Z
// formattedDateTime format: <month_name> DD, YYYY · hh:mm:ss
const formatDateTime = (creationTime) => {
  let months = {};
  months['01'] = 'January';
  months['02'] = 'February';
  months['03'] = 'March';
  months['04'] = 'April';
  months['05'] = 'May';
  months['06'] = 'June';
  months['07'] = 'July';
  months['08'] = 'August';
  months['09'] = 'September';
  months['10'] = 'October';
  months['11'] = 'November';
  months['12'] = 'December';

  // Extract the date from the createdAt object
  let year = creationTime.split('-')[0];
  let month = creationTime.split('-')[1];
  let day = creationTime.split('-')[2].split('T')[0];
  // console.log("year: " + year + " \nmonth: " + month + "\nday: " + day);

  let date = months[month] + ' ' + day + ', ' + year;

  // Extract the time from the createdAt object
  let hour = creationTime.split('T')[1].split(':')[0];
  // Fix timezone issue
  hour = '' + (parseInt(hour) - 5);
  let minute = creationTime.split('T')[1].split(':')[1];
  let second = creationTime.split('T')[1].split(':')[2].split('.')[0];
  // console.log("hour: " + hour + " \nmin: " + minute + "\nsec: " + second);

  let time = hour + ':' + minute + ':' + second;

  return date + ' · ' + time;
};

const BirdMemories = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [indexSelected, setIndexSelected] = useState(0);

  const [images, setImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [capturedAtDescSortIsSelected, setCapturedAtDescSortIsSelected] =
    useState(true);
  const [capturedAtAscSortIsSelected, setCapturedAtAscSortIsSelected] =
    useState(false);
  const [speciesSortIsSelected, setSpeciesSortIsSelected] = useState(false);

  const carouselRef = useRef();
  const flatListRef = useRef();

  const { black, brand, darkLight } = Colors;

  /*
    onRefresh will fetch the bird memory documents from the API again so the screen may update
    Note: refreshing is a controlled prop, so it must be set to true in the onRefresh function,
    otherwise the refresh indicator will stop immediately.
   */
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    componentDidMount(setImages, setIsFetching);
    setSpeciesSortIsSelected(false);
    setCapturedAtAscSortIsSelected(false);
    setCapturedAtDescSortIsSelected(true);
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

  useEffect(() => {
    componentDidMount(setImages, setIsFetching);
  }, []);

  if (!isFetching) {
    return Platform.OS === 'ios' ? (
      // platform is ios, so return page according to ios styles
      <>
        <StatusBar style="dark" />
        <View style={styles.container}>
          {/* <BirdMemoriesPageTitle birdMemories={true}>
        </BirdMemoriesPageTitle> */}
          <View style={{ marginTop: 30 }}>
            <Text style={styles.title}>Bird Memories Gallery</Text>
          </View>

          <View style={styles.sortListView}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
              }}
            >
              {'sort by: '}
            </Text>

            {/* Button for sorting memories in descending order of creation time */}
            <TouchableOpacity
              onPress={() => {
                setSpeciesSortIsSelected(false);
                setCapturedAtAscSortIsSelected(false);
                setCapturedAtDescSortIsSelected(true);

                setImages(
                  images.sort((a, b) => {
                    let res = b.creationTime.localeCompare(a.creationTime);
                    return res;
                  })
                );
              }}
              style={{
                backgroundColor: capturedAtDescSortIsSelected
                  ? 'yellow'
                  : '#FFFFFF',
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: 'black',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  padding: 2,
                }}
              >
                {'🕖 (new -> old)'}
              </Text>
            </TouchableOpacity>

            {/* Button for sorting memories in ascending order of creation time */}
            <TouchableOpacity
              onPress={() => {
                setSpeciesSortIsSelected(false);
                setCapturedAtAscSortIsSelected(true);
                setCapturedAtDescSortIsSelected(false);

                setImages(
                  images.sort((a, b) => {
                    let res = a.creationTime.localeCompare(b.creationTime);
                    return res;
                  })
                );
              }}
              style={{
                backgroundColor: capturedAtAscSortIsSelected
                  ? 'yellow'
                  : '#FFFFFF',
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: 'black',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  padding: 2,
                }}
              >
                {'🕖 (old -> new)'}
              </Text>
            </TouchableOpacity>

            {/* Button for sorting memories in order of species (a to z) */}
            <TouchableOpacity
              onPress={() => {
                setSpeciesSortIsSelected(true);
                setCapturedAtAscSortIsSelected(false);
                setCapturedAtDescSortIsSelected(false);

                setImages(
                  images.sort((a, b) => {
                    let res = a.species.localeCompare(b.species);
                    return res;
                  })
                );
              }}
              style={{
                backgroundColor: speciesSortIsSelected ? 'yellow' : '#FFFFFF',
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: 'black',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  padding: 2,
                }}
              >
                {'🐦 (a -> z)'}
              </Text>
            </TouchableOpacity>
          </View>

          <Line />

          <ScrollView
            contentContainerStyle={{
              width: '100%',
              height: '100%',
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {/* Carousel View */}
            <View style={styles.carousel}>
              <Carousel
                ref={carouselRef}
                layout="default"
                data={images}
                sliderWidth={width}
                itemWidth={width}
                // Fire callback when index of img item changes; onSelect updates cur index
                onSnapToItem={(index) => onSelect(index)}
                renderItem={({ item, index }) => (
                  <View key={index} style={styles.carouselCard}>
                    {/* {console.log('item = ', item.creationTime)} */}
                    <Image
                      key={index}
                      source={item.base64Image}
                      style={styles.birdMemoryImage}
                      resizeMode="contain"
                    />
                    <BirdMemorySpeciesText>
                      {item.species}
                    </BirdMemorySpeciesText>
                    <BirdMemoryDescText>
                      {formatDateTime(item.creationTime)}
                    </BirdMemoryDescText>
                  </View>
                )}
              />
            </View>

            <View style={styles.pagination}>
              <Pagination
                dotColor={brand}
                inactiveDotColor={darkLight}
                activeDotIndex={indexSelected}
                dotsLength={images.length}
                animatedDuration={150}
                inactiveDotScale={0.75}
                carouselRef={carouselRef}
                tappableDots={true}
                activeOpacity={1}
              />
            </View>

            <View style={styles.trashIcon}>
              <TouchableOpacity
                onPress={() => {
                  const curBirdMem = images[indexSelected];
                  console.log(curBirdMem.creationTime);
                  if (isFetching === true) {
                    return null;
                  } else {
                    console.log('trash pressed w/ img loaded');
                    const url =
                      'https://smart-bird-feeder-api.herokuapp.com/user/delete-bird-memory';
                    axios
                      .post(url, {
                        createdAt: curBirdMem.creationTime,
                      })
                      .then((res) => {
                        console.log('response from the server is: ', res);
                        // Refresh the screen to get updates image list
                        onRefresh();
                      })
                      .catch((err) => console.log(err));
                  }
                }}
              >
                <Ionicons name="trash" size={30} color={brand} />
              </TouchableOpacity>
              <MyImagePicker />
            </View>

            <View style={styles.imgIndexText}>
              {/* Display for total # of imgs & cur img index # */}
              <ImageIndexText>
                {/* Display current image index out of total # images, or display nothing when loading imgs */}
                {images.length > 0
                  ? indexSelected + 1 + '/' + images.length
                  : ''}
              </ImageIndexText>
            </View>

            {/* Use FlatList component to list thumbnails of memories */}
            <FlatList
              style={styles.flatlist}
              ref={flatListRef}
              horizontal={true}
              data={images}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: SPACING }}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    onTouchThumbnail(index);
                  }}
                >
                  {/* TODO: Swap out Image for custom StyledBirdMemory later */}
                  <Image
                    style={{
                      width: THUMB_SIZE,
                      height: THUMB_SIZE,
                      marginRight: SPACING,
                      borderRadius: 16,
                      borderWidth: index === indexSelected ? 4 : 0.75,
                      borderColor: index === indexSelected ? brand : 'black',
                    }}
                    source={item.base64Image}
                  />
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </View>
      </>
    ) : (
      // platform is android, so return page according to android styles
      <>
        <StatusBar style="dark" />
        <View
          style={{
            padding: 10,
            backgroundColor: '#FFFFFF',
            height: '100%',
            width: '100%',
          }}
        >
          {/* <BirdMemoriesPageTitle birdMemories={true}>
        </BirdMemoriesPageTitle> */}
          <View style={{ marginTop: 30 }}>
            <Text style={styles.title}>Bird Memories Gallery</Text>
          </View>

          <View style={styles.sortListView}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
              }}
            >
              {'sort by: '}
            </Text>

            {/* Button for sorting memories in descending order of creation time */}
            <TouchableOpacity
              onPress={() => {
                setSpeciesSortIsSelected(false);
                setCapturedAtAscSortIsSelected(false);
                setCapturedAtDescSortIsSelected(true);

                setImages(
                  images.sort((a, b) => {
                    let res = b.creationTime.localeCompare(a.creationTime);
                    return res;
                  })
                );
              }}
              style={{
                backgroundColor: capturedAtDescSortIsSelected
                  ? 'yellow'
                  : '#FFFFFF',
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: 'black',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  padding: 2,
                }}
              >
                {'🕖 (new -> old)'}
              </Text>
            </TouchableOpacity>

            {/* Button for sorting memories in ascending order of creation time */}
            <TouchableOpacity
              onPress={() => {
                setSpeciesSortIsSelected(false);
                setCapturedAtAscSortIsSelected(true);
                setCapturedAtDescSortIsSelected(false);

                setImages(
                  images.sort((a, b) => {
                    let res = a.creationTime.localeCompare(b.creationTime);
                    return res;
                  })
                );
              }}
              style={{
                backgroundColor: capturedAtAscSortIsSelected
                  ? 'yellow'
                  : '#FFFFFF',
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: 'black',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  padding: 2,
                }}
              >
                {'🕖 (old -> new)'}
              </Text>
            </TouchableOpacity>

            {/* Button for sorting memories in order of species (a to z) */}
            <TouchableOpacity
              onPress={() => {
                setSpeciesSortIsSelected(true);
                setCapturedAtAscSortIsSelected(false);
                setCapturedAtDescSortIsSelected(false);

                setImages(
                  images.sort((a, b) => {
                    let res = a.species.localeCompare(b.species);
                    return res;
                  })
                );
              }}
              style={{
                backgroundColor: speciesSortIsSelected ? 'yellow' : '#FFFFFF',
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: 'black',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  padding: 2,
                }}
              >
                {'🐦 (a -> z)'}
              </Text>
            </TouchableOpacity>
          </View>

          <Line />

          <ScrollView
            contentContainerStyle={{
              width: '100%',
              height: '100%',
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {/* Carousel View */}
            <View style={styles.carousel}>
              <Carousel
                ref={carouselRef}
                layout="default"
                data={images}
                sliderWidth={width}
                itemWidth={width}
                // Fire callback when index of img item changes; onSelect updates cur index
                onSnapToItem={(index) => onSelect(index)}
                renderItem={({ item, index }) => (
                  <View key={index} style={styles.carouselCard}>
                    <Image
                      key={index}
                      source={item.base64Image}
                      style={styles.birdMemoryImage}
                      resizeMode="contain"
                    />
                    <BirdMemorySpeciesText>
                      {item.species}
                    </BirdMemorySpeciesText>
                    <BirdMemoryDescText>
                      {formatDateTime(item.creationTime)}
                    </BirdMemoryDescText>
                  </View>
                )}
              />
            </View>

            <View style={styles.pagination}>
              <Pagination
                dotColor={brand}
                inactiveDotColor={darkLight}
                activeDotIndex={indexSelected}
                dotsLength={images.length}
                animatedDuration={150}
                inactiveDotScale={0.75}
                carouselRef={carouselRef}
                tappableDots={true}
                activeOpacity={1}
              />
            </View>

            <View style={styles.imgIndexText}>
              {/* Display for total # of imgs & cur img index # */}
              <ImageIndexText>
                {/* Display current image index out of total # images, or display nothing when loading imgs */}
                {images.length > 0
                  ? indexSelected + 1 + '/' + images.length
                  : ''}
              </ImageIndexText>
            </View>

            {/* Use FlatList component to list thumbnails of memories */}
            <FlatList
              style={{
                position: 'absolute',
                bottom: 90,
                flex: 1,
              }}
              ref={flatListRef}
              horizontal={true}
              data={images}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: SPACING }}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    onTouchThumbnail(index);
                  }}
                >
                  {/* TODO: Swap out Image for custom StyledBirdMemory later */}
                  <Image
                    style={{
                      width: THUMB_SIZE,
                      height: THUMB_SIZE,
                      marginRight: SPACING,
                      borderRadius: 16,
                      borderWidth: index === indexSelected ? 4 : 0.75,
                      borderColor: index === indexSelected ? brand : 'black',
                    }}
                    source={item.base64Image}
                  />
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </View>
      </>
    );
  } else {
    // Alternate screen render for ActivityIndicator
    // to show while images are being fetched and processed
    return (
      <>
        <StatusBar style="dark" />
        <BirdMemoriesContainer>
          <BirdMemoriesPageTitle birdMemories={true}>
            Bird Memories Gallery
          </BirdMemoriesPageTitle>

          <Line />

          <ScrollView
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <ActivityIndicator size="large" color={black} />
          </ScrollView>
        </BirdMemoriesContainer>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6D28D9',
    textAlign: 'center',
  },

  sortListView: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  carousel: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    paddingTop: 25,
    alignItems: 'center',
    paddingLeft: WIN_WIDTH - ITEM_WIDTH,
  },

  carouselCard: {
    backgroundColor: '#FFFFFF',
    width: ITEM_WIDTH,
    paddingBottom: 20,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  birdMemoryImage: {
    width: ITEM_WIDTH,
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  pagination: {
    flex: 0.9,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },

  trashIcon: {
    flex: 0.5,
    alignSelf: 'flex-end',
    paddingRight: 32,
  },

  imgIndexText: {
    flex: 2.2,
    paddingHorizontal: 32,
    marginBottom: 20,
    alignSelf: 'flex-end',
  },

  flatlist: {
    position: 'absolute',
    bottom: 90,
    flex: 1,
    paddingBottom: 30,
  },
});

export default BirdMemories;
