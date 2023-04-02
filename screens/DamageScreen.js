import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { COLORS, icons, SIZES, FONT } from "../constants";

import { CHARACTERS } from "../data/charactersData";
import CategoryTab from "../components/CategoryTab";
import DamageDisplay from "../components/DamageDisplay";

const enemyTypes = ["Hilichurl", "PMA"];

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

  const getEnemyDef = (text) => {
    if (text === "Hilichurl") {
      return 0.5 * (1 - 0.1);
    } else if (text === "PMA") {
      return 0.5 * (1 - -3.0 / 2);
    }
  };

  const dmgNormalCrit = (modi, atk, cd) => {
    return Math.round(
      modi * atk * (1 + cd / 100) * getEnemyDef(activeEnemyType)
    );
  };

  const dmgSkillCrit = (modi, atk, cd, db) => {
    return Math.round(
      modi *
        atk *
        (1 + cd / 100) *
        (1 + db / 100) *
        getEnemyDef(activeEnemyType)
    );
  };

  const dmgBurstCrit = (modi, atk, cd, db) => {
    return Math.round(
      modi *
        atk *
        (1 + cd / 100) *
        (1 + db / 100) *
        getEnemyDef(activeEnemyType)
    );
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.white, alignItems: "center" }}
    >
      <Text style={styles.userName}>Select enemy below:</Text>
      <CategoryTab
        visionTypes={enemyTypes}
        vision={activeEnemyType}
        handleCategoryPress={setActiveEnemyType}
      />

      <View style={styles.damageImagesContainer}>
        <Text style={styles.userName}>Showing Crit Hit DMG only:</Text>
        <DamageDisplay
          talentImage={character.talents_image[0]}
          dmgCalc={dmgNormalCrit(normal, atk, cd)}
        />
        <DamageDisplay
          talentImage={character.talents_image[1]}
          dmgCalc={dmgSkillCrit(skill, atk, cd, db)}
        />
        <DamageDisplay
          talentImage={character.talents_image[2]}
          dmgCalc={dmgBurstCrit(burst, atk, cd, db)}
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
});

export default DamageScreen;
