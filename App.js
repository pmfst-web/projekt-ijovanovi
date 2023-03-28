import { StatusBar } from "expo-status-bar";
import React, {useState, useCallback} from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

import {COLORS, icons, SIZES} from  './constants';
import { ScreenHeaderBtn, } from './components';

//ekrani
import CharacterScreen from "./screens/CharacterScreen";
import StatsScreen from "./screens/StatsScreen";
import DamageScreen from "./screens/DamageScreen";

//characters
import { CHARACTERS } from "./data/charactersData";

//navigations
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { createStore, combineReducers } from 'redux';
import characterReducer from './store/reducers/characters';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

// Spajanje svih reducera u jedan objekt
const glavniReducer = combineReducers({
  characters: characterReducer,
});
// Stvaramo centralni spremnik
const store = createStore(glavniReducer);


export default function App() {
  const [fontsLoaded] = useFonts({
    DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("./assets/fonts/DMSans-Regular.ttf"),
  });


  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null;
  }
  



  return (
    <Provider store={store}>
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.lightWhite,
        },
        headerShadowVisible: true,
        headerLeft: () => (
          <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
        ),
        headerTitle: "Genshin DMG Calculator"
      }}>
        <Stack.Screen 
        name="Characters"
            component={CharacterScreen}
            options={{
              title: 'Characters Screen',
            }}/>
          <Stack.Screen 
        name="Stats"
            component={StatsScreen}
            options={{
              title: 'Stats Screen',
            }}/>
        
        
      </Stack.Navigator>
    </NavigationContainer>
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
