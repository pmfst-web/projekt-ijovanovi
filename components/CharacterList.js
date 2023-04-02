import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../constants";
import CharacterCard from "./CharacterCard";

const CharacterList = ({ handleData, handleCharacterPress, context }) => {
  return (
    <View style={styles.containerCharacter}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{context}</Text>
      </View>
      <FlatList
        data={handleData}
        renderItem={({ item }) => (
          <CharacterCard item={item} handleCardPress={handleCharacterPress} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  containerCharacter: {
    marginTop: SIZES.xLarge,
  },
});

export default CharacterList;
