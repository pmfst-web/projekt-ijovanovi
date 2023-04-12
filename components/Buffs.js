import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
} from "react-native";

import { CheckBox } from "react-native-elements";

import { COLORS, FONT, SHADOWS, SIZES } from "../constants";

const Buffs = () => {
    const [checked, setChecked] = useState(false);
  return (
    <View>
      <CheckBox
        title="This is a checkbox"
        checked={checked}
        onPress={() => setChecked(checked)}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  tabBuffs: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
});

export default Buffs;
