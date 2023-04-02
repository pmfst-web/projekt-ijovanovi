import React, {useState} from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";

import { COLORS, icons, SIZES, FONT } from "../constants";

import { CHARACTERS } from "../data/charactersData";




const enemyTypes = [
  "Hilichurl",
  "Prototype Array",
  "Prototype Array Weakened"
];


const DamageScreen = ({ route, navigation }) => {

  const [activeEnemyType, setActiveEnemyType] = useState("Hilichurl");

  const idCharacter = Number(route.params.id);
  const character = CHARACTERS.find((c) => c.id === idCharacter);

  const n = Number(route.params.charNormal);
  const normal = character.normal[n - 1];
  const s = Number(route.params.charNormal);
  const skill = character.skill[s - 1];
  const burst = character.burst[Number(route.params.charNormal) - 1];

  const atk = route.params.charATK;
  const cd = route.params.charCD;
  const db = route.params.charDB;



  const dmgNormal = ( modi, atk, cr, cd, enemyDef ) => {
    return Math.round(modi*atk*(1 + cd/100)*enemyDef*(1 - 0.1));
  }

  const dmgSkill = ( modi, atk, cr, cd, db, enemyDef) => {
    return Math.round(modi*atk*(1 + cd/100)*(1 + db/100)*enemyDef*(1 - 0.1));
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white, alignItems: "center", }}>
      <Text style={styles.userName}>Select enemy below:</Text>
      <View style={styles.tabsContainer}>
        <FlatList
          data={enemyTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeEnemyType, item)}
              onPress={() => {
                setActiveEnemyType(item);
              }}
            >
              <Text style={styles.tabText(activeEnemyType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          vertical
        />
      </View>

      <Text style={styles.userName}>Showing CRIT DMG only:</Text>

      <View style={styles.damageImagesContainer}>
        <Image 
        source={{ uri: character.talents_image[0]}}
        style={styles.damageImages}
        />
        <Text>{normal}</Text>
        <Text> {dmgNormal(normal, atk, 0, cd, 0.5)} </Text>
      </View>

      <View style={styles.damageImagesContainer}>
        <Image 
        source={{ uri: character.talents_image[1]}}
        style={styles.damageImages}
        />
        <Text>{skill}</Text>
        <Text>{dmgSkill(skill, atk, 0, cd, db, 0.71)}</Text>
      </View>
      

      <View style={styles.damageImagesContainer}>
        <Image 
        source={{ uri: character.talents_image[2]}}
        style={styles.damageImages}
        />
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
    width: "50%",
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
    alignSelf: "center",
    fontFamily: FONT.medium,
    color: activeVisionType === item ? COLORS.secondary : COLORS.gray2,
  }),
  damageImagesContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  damageImages: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    
  },
});


export default DamageScreen;
