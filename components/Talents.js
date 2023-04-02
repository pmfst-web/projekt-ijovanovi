import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../constants";

const Talents = ({
  character,
  activeCon,
  handleConPress,
  charNormal,
  setCharNormal,
  charSkill,
  setCharSkill,
  charBurst,
  setCharBurst,
}) => {
  return (
    <View style={styles.tabsContainer}>
      <FlatList
        data={character.cons}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tab(activeCon, item)}
            onPress={() => {
              handleConPress(item[0]);
            }}
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

      <View style={styles.tabsTalents}>
        <View style={{ padding: 1 }}>
          <Image
            source={{ uri: character.talents_image[0] }}
            resizeMode="contain"
            style={styles.talentImage}
          />
          <TextInput
            style={{ borderWidth: 1 }}
            textAlign="center"
            value={charNormal}
            onChangeText={(text) => setCharNormal(text)}
            placeholder="Normal"
            keyboardType="numeric"
          />
        </View>
        <View style={{ padding: 1 }}>
          <Image
            source={{ uri: character.talents_image[1] }}
            resizeMode="contain"
            style={styles.talentImage}
          />
          <TextInput
            style={{ borderWidth: 1 }}
            textAlign="center"
            value={charSkill}
            onChangeText={(text) => setCharSkill(text)}
            placeholder="Skill"
            keyboardType="numeric"
          />
        </View>
        <View style={{ padding: 1 }}>
          <Image
            source={{ uri: character.talents_image[2] }}
            resizeMode="contain"
            style={styles.talentImage}
          />
          <TextInput
            style={{ borderWidth: 1 }}
            textAlign="center"
            value={charBurst}
            onChangeText={(text) => setCharBurst(text)}
            placeholder="Burst"
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conImage: {
    width: 50,
    height: 50,
  },
  talentImage: {
    width: 65,
    height: 65,
    backgroundColor: COLORS.gray,
  },
  tabsTalents: {
    flexDirection: "row",
    border: 1,
    padding: 1,
    justifyContent: "center",
  },
  tabsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: SIZES.small,
  },
  tab: (activeCon, item) => ({
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeCon === item[0] ? COLORS.secondary : COLORS.gray2,
    backgroundColor: activeCon === item[0] ? COLORS.gray : COLORS.white,
  }),
});

export default Talents;
