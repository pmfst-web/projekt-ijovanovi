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

const CategoryTab = ({ visionTypes, vision, handleCategoryPress }) => {
  return (
    <View style={styles.tabsContainer}>
      <FlatList
        data={visionTypes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tab(vision, item)}
            onPress={() => {
              handleCategoryPress(item);
            }}
          >
            <Text style={styles.tabText(vision, item)}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    justifyContent: "center",
    alignItems: "center",
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
});

export default CategoryTab;
