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

const DamageDisplay = ({ talentImage, dmgCalc }) => {
  return (
    <View style={styles.damageImagesContainer}>
      <Image source={{ uri: talentImage }} style={styles.damageImages} />
      <Text style={styles.dmgText}> {dmgCalc} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  damageImagesContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  damageImages: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    borderWidth: 1,
  },
  dmgText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.primary,
  },
});

export default DamageDisplay;
