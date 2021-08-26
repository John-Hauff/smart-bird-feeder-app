import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { HomeScreen } from './src/views/home';
import { HowToScreen } from './src/views/howto';
import { SettingsScreen } from './src/views/settings';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const storeData = async (value) => {
  try {
      // const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', value)
  } 

  catch (e) {
      console.log('Couldnt store local data')
  }
}

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      console.log(value)
    }
  } 
  
  catch(e) {
    // error reading value
  }
}

const AppNavigator = createMaterialBottomTabNavigator(
  {
    HowTo: {
      screen: HowToScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="music" size={20} color={"white"} />
        )
      }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={20} color={"white"} />
        )
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="users" size={20} color={"white"} />
        )
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#ffffff',
    inactiveColor: 'rgba(0, 0, 0, 0.54);',
    barStyle: { backgroundColor: '#26abff' },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider>
        <AppContainer color={'yellow'}/>
      </PaperProvider>
    );
  }
}