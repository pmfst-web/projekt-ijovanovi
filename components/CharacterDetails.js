import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { COLORS, FONT, SIZES, icons } from "../constants";

const CharacterDetails = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.characterBox}>
        <Image
          source={{
            uri: item.splash,
          }}
          resizeMode="contain"
          style={styles.characterImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  characterBox: {
    width: 300,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: SIZES.large,
  },
  characterImage: {
    width: "100%",
    height: "100%",
  },
});

export default CharacterDetails;
