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
import {useSelector, useDispatch} from 'react-redux';

import { COLORS, icons, SIZES, FONT } from "../constants";
import SearchCharacter from "../components/SearchCharacter";

import { CHARACTERS } from "../data/charactersData";
import CharacterCard from "../components/CharacterCard";
import { dodavanjeLika } from "../store/actions/characters";

const visionTypes = [
  "All",
  "Favorites",
];

const CharacterScreen = ({ route, navigation }) => {
  const [activeVisionType, setActiveVisionType] = useState("All");
  const [addCharacterVisible, setAddCharacterVisible] = useState(false);



  const addedCharacters = useSelector((state) => state.characters.addedCharacters);
  const favoriteCharacters = useSelector((state) => state.characters.favoriteCharacters);

  const dispatch = useDispatch()

  const akcijaDodajLika = (item) =>{
    dispatch(dodavanjeLika(item.id));
    setAddCharacterVisible(!addCharacterVisible);
  }

  const unesiStats = (data) => {
    navigation.navigate('Stats', {id: data.id});
  }

  const filterData = (text) => {
    if (text === "All"){
      return addedCharacters
    }
    else {
      return favoriteCharacters
    }
  }

  
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeMessage}>Welcome Traveler!</Text>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={visionTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeVisionType, item)}
              onPress={() => {
                setActiveVisionType(item);
              }}
      
            >
              <Text style={styles.tabText(activeVisionType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          vertical
          numColumns={5}
        />
      </View>

      <View style={styles.containerCharacter}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Please select your character below.</Text>
        </View>
        <FlatList 
          data={filterData(activeVisionType)}
          renderItem = {({item}) =>
        (
          <CharacterCard 
          item={item}
          handleCardPress={unesiStats}
          />
         
        )}
        keyExtractor={ ( _, item) => item.id}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        numColumns={3}
          />
      </View>

      <View style={styles.addCharacterContainer}>
        <Modal
          animationType="slide"
          visible={addCharacterVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setAddCharacterVisible(!addCharacterVisible);
          }}
        >
          
          <View style={styles.containerCharacter}>
          <SearchCharacter />
          <FlatList 
          data={CHARACTERS}
          renderItem = {({item}) =>
        (
          <CharacterCard 
          item={item}
          handleCardPress={akcijaDodajLika}
          
          />
         
        )}
        keyExtractor={ (_, item) => item.id}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        numColumns={3}
          />

            <View style={styles.closeCharacterModalButton}>
              <TouchableOpacity
                style={styles.addCharacterButton}
                onPress={() => setAddCharacterVisible(!addCharacterVisible)}
              >
                <Text style={styles.addCharacterText}>Close</Text>
              </TouchableOpacity>
              </View>
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
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (activeVisionType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeVisionType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeVisionType, item) => ({
    fontFamily: FONT.medium,
    color: activeVisionType === item ? COLORS.secondary : COLORS.gray2,
  }),
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
    borderColor: COLORS.gray,
  },
  addCharacterText: {
    fontFamily: FONT.large,
    color: COLORS.gray,
  },
  //container
  containerCharacter: {
    marginTop: SIZES.xLarge,
  },
  closeCharacterModalButton: {
    marginTop: SIZES.xLarge,
    alignItems:"center"
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
export default CharacterScreen;
