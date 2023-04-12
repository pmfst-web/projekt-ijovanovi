import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { COLORS, icons, SIZES, FONT } from "./constants";
import ScreenHeaderBtn from "./components/common/header/ScreenHeaderBtn";

//ekrani
import CharacterScreen from "./screens/CharacterScreen";
import StatsScreen from "./screens/StatsScreen";
import DamageScreen from "./screens/DamageScreen";

//characters
import { CHARACTERS } from "./data/charactersData";

//navigations
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createStore, combineReducers } from "redux";
import { useSelector, useDispatch } from "react-redux";
import characterReducer from "./store/reducers/characters";
import { Provider } from "react-redux";

import { promjenaFavorita } from "./store/actions/characters";
import damageReducer from "./store/reducers/talent";


const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

// Spajanje svih reducera u jedan objekt
const glavniReducer = combineReducers({
  characters: characterReducer,
  damage: damageReducer,
});
// Stvaramo centralni spremnik
const store = createStore(glavniReducer);

export default function App({ route, navigation }) {
  const [fontsLoaded] = useFonts({
    DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("./assets/fonts/DMSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

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
              headerShadowVisible: false,

              headerTitle: "Genshin DMG Calculator",
            }}
          >
            <Stack.Screen name="Characters" component={CharacterScreen} />
            <Stack.Screen
              name="Stats"
              component={StatsScreen}
              options={({ route, navigation }) => {
                const idCharacter = Number(route.params.id);
                const character = CHARACTERS.find((c) => c.id === idCharacter);

                return {
                  headerTitle: () => (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.headerTitle}>
                        {character?.character}
                      </Text>
                      <Image
                        source={{ uri: character?.vision_image }}
                        resizeMode="contain"
                        style={{ width: 20, height: 20 }}
                      />
                    </View>
                  ),
                };
              }}
            />
            <Stack.Screen
              name="Damage"
              component={DamageScreen}
              options={({ route, navigation }) => {
                const idCharacter = Number(route.params.id);
                const character = CHARACTERS.find((c) => c.id === idCharacter);

                return {
                  headerTitle: () => (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.headerTitle}>
                        {character?.character}
                      </Text>
                      <Image
                        source={{ uri: character?.vision_image }}
                        resizeMode="contain"
                        style={{ width: 20, height: 20 }}
                      />
                    </View>
                  ),
                };
              }}
            />
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
  headerTitle: {
    fontFamily: FONT.bold,
    fontSize: 22,
  },
});
