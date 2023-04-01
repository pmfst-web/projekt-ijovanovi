import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { COLORS, icons, SIZES, FONT } from "../constants";

import { CHARACTERS } from "../data/charactersData";
import CharacterDetails from "../components/CharacterDetails";

const StatsScreen = ({ route, navigation }) => {
  const [activeCon, setActiveCon] = useState();

  const idCharacter = Number(route.params.id);
  const character = CHARACTERS.find((c) => c.id === idCharacter);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <CharacterDetails item={character} />
      <View style={styles.tabsContainer}>
        <FlatList
          data={character.cons}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeCon, item)}
              onPress={() => {
                setActiveCon(item[0]);
              }}
              keyExtractor={(item) => item}
              contentContainerStyle={{ columnGap: SIZES.small }}
            >
              <Image
                source={{ uri: item[1] }}
                resizeMode="contain"
                style={styles.conImage}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          numColumns={3}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  conImage: {
    width: 100,
    height: 100,
  },
  tabsContainer: {
    marginTop: SIZES.medium,
    alignItems: "center",
  },
  tab: (activeCon, item) => ({
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeCon === item[0] ? COLORS.secondary : COLORS.gray2,
    backgroundColor: activeCon === item[0] ? COLORS.gray : COLORS.white,
  }),
  //container
  containerCharacter: {
    marginTop: SIZES.xLarge,
  },
  closeCharacterModalButton: {
    marginTop: SIZES.xLarge,
    alignItems: "center",
  },
  //header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  //headerTitle
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  //headerBtn
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  //cardsContainer
  cardsContainer: {
    marginTop: SIZES.medium,
  },
});

export default StatsScreen;
