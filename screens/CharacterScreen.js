import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { COLORS, icons, SIZES, FONT } from "../constants";

import SearchCharacter from "../components/SearchCharacter";
import CharacterCard from "../components/CharacterCard";
import CategoryTab from "../components/CategoryTab";
import { CHARACTERS } from "../data/charactersData";

import { dodavanjeLika } from "../store/actions/characters";
import CharacterList from "../components/CharacterList";

const visionTypes = ["All", "Favorites"];

const CharacterScreen = ({ route, navigation }) => {
  const [activeVisionType, setActiveVisionType] = useState("All");
  const [addCharacterVisible, setAddCharacterVisible] = useState(false);

  const addedCharacters = useSelector(
    (state) => state.characters.addedCharacters
  );
  const favoriteCharacters = useSelector(
    (state) => state.characters.favoriteCharacters
  );

  const dispatch = useDispatch();

  const akcijaDodajLika = (item) => {
    dispatch(dodavanjeLika(item.id));
    setAddCharacterVisible(!addCharacterVisible);
  };

  const unesiStats = (data) => {
    navigation.navigate("Stats", { id: data.id });
  };

  const filterData = (text) => {
    if (text === "All") {
      return addedCharacters;
    } else {
      return favoriteCharacters;
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeMessage}>Welcome Traveler!</Text>
      </View>

      <CategoryTab
        visionTypes={visionTypes}
        vision={activeVisionType}
        handleCategoryPress={setActiveVisionType}
      />
      <CharacterList
        handleData={filterData(activeVisionType)}
        handleCharacterPress={unesiStats}
        context={"Please select your character below."}
      />

      <View style={styles.addCharacterContainer}>
        <Modal
          animationType="slide"
          visible={addCharacterVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setAddCharacterVisible(!addCharacterVisible);
          }}
        >
          <CharacterList
            handleData={CHARACTERS}
            handleCharacterPress={akcijaDodajLika}
            context={"Currently available characters:"}
          />

          <View style={styles.closeCharacterModalButton}>
            <TouchableOpacity
              style={styles.addCharacterButton}
              onPress={() => setAddCharacterVisible(!addCharacterVisible)}
            >
              <Text style={styles.addCharacterText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.addCharacterContainer}>
          <TouchableOpacity
            style={styles.addCharacterButton}
            onPress={() => setAddCharacterVisible(!addCharacterVisible)}
          >
            <Text style={styles.addCharacterText}>Add Character</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  addCharacterContainer: {
    marginTop: SIZES.xLarge,
    alignItems: "center",
  },
  addCharacterButton: {
    width: "60%",
    alignItems: "center",
    height: 30,
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  addCharacterText: {
    fontFamily: FONT.large,
    color: COLORS.primary,
  },
  closeCharacterModalButton: {
    marginTop: SIZES.xLarge,
    alignItems: "center",
  },
});
export default CharacterScreen;
