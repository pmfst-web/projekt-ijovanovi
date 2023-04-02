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

const CharacterCard = ({ item, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleCardPress(item)}
    >
      <Image
        source={{ uri: item.image }}
        resizeMode="contain"
        style={styles.profileImage}
      />
      <View style={styles.nameVision}>
        <Image
          source={{ uri: item.vision_image }}
          resizeMode="contain"
          style={styles.visionContainer}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    padding: SIZES.medium,
    margin: SIZES.small,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    ...SHADOWS.medium,
    shadowColor: COLORS.secondary,
  },
  visionContainer: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium,
  },
  nameVision: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
});

export default CharacterCard;
