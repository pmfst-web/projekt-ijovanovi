import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
  ScrollView,
} from "react-native";

import { COLORS, icons, SIZES, FONT } from "../constants";

import { CHARACTERS } from "../data/charactersData";
import CategoryTab from "../components/CategoryTab";
import DamageDisplay from "../components/DamageDisplay";
import Buffs from "../components/Buffs";
import { CheckBox } from "react-native-elements";

import { spremanjeDMG } from "../store/actions/characters";
import { useSelector, useDispatch } from "react-redux";

const enemyTypes = ["Hilichurl", "PMA"];

const DamageScreen = ({ route, navigation }) => {
  const [activeEnemyType, setActiveEnemyType] = useState("Hilichurl");
  const [bennett, setBennett] = useState(false);
  const [emblem, setEmblem] = useState(false);
  const [saved, setSaved] = useState(false);

  const idCharacter = Number(route.params.id);
  const character = CHARACTERS.find((c) => c.id === idCharacter);

  const n = Number(route.params.charNormal);
  const normal = character.normal[n - 1];
  const s = Number(route.params.charSkill);
  const skill = character.skill[s - 1];
  const b = Number(route.params.charBurst);
  const burst = character.burst[b - 1];

  const atk = route.params.charATK;
  const [attack, setAttack] = useState(atk);
  const hp = route.params.charHP;
  const cd = route.params.charCD;
  const [critd, setCritD] = useState(cd);
  const db = route.params.charDB;
  const [damageb, setDamageBonus] = useState(db);
  const er = route.params.charER;
  const [energy, setEnergy] = useState(er);

  useEffect(() => {
    if (bennett === true) {
      setAttack(parseFloat(atk) + 1030);
    } else {
      setAttack(atk);
    }
    if (emblem === true) {
      setDamageBonus(0.25 * parseFloat(er) + parseFloat(db));
    } else {
      setDamageBonus(db);
    }
  }, [bennett, emblem]);

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

  const dispatch = useDispatch();
  const spremljenDMG = useSelector((state) => state.damage);

  const spremiDMG = (num) => {
    dispatch(spremanjeDMG(num));
  };

  const compareDMG = () => {
    if (spremljenDMG === 0 || isNaN(spremljenDMG)) {
      Alert.alert(
        "DMG Comparison",
        "Can't compare if you don't save your damage first! Or you maybe didn't enter stats properly. Check again.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "DMG Comparison",
        "Burst damage difference is " +
          (dmgBurstCrit(burst, attack, critd, damageb) - spremljenDMG),
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };
  const savedDMG = () => {
    spremiDMG(dmgBurstCrit(burst, attack, critd, damageb));
    Alert.alert(
      "DMG Saved",
      "Damage saved for " + character.character,
      [{ text: "OK" }],
      { cancelable: false }
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
            dmgCalc={dmgNormalCrit(normal, attack, critd)}
          />
          <DamageDisplay
            talentImage={character.talents_image[1]}
            dmgCalc={dmgSkillCrit(skill, attack, critd, damageb)}
          />
          <DamageDisplay
            talentImage={character.talents_image[2]}
            dmgCalc={dmgBurstCrit(burst, attack, critd, damageb)}
          />
        </View>

        <Text style={styles.userName}>Want to add buffs?</Text>
        <View style={styles.tabBuffs}>
          <CheckBox
            title="Bennett"
            checked={bennett}
            onPress={() => setBennett(!bennett)}
            containerStyle={styles.checkboxContainer}
            checkedColor={COLORS.gray}
          />
          <CheckBox
            title="Emblem"
            checked={emblem}
            onPress={() => setEmblem(!emblem)}
            containerStyle={styles.checkboxContainer}
            checkedColor={COLORS.gray}
          />
        </View>

        <View style={styles.calculateContainer}>
          <TouchableOpacity style={styles.calculateBtn} onPress={savedDMG}>
            <Text style={styles.calculateText}>Save DMG!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.compareBtn(spremljenDMG)}
            onPress={compareDMG}
          >
            <Text style={styles.compareText(spremljenDMG)}>Compare DMG!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  calculateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 10,
  },
  calculateText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.primary,
    alignSelf: "center",
  },
  calculateBtn: {
    aligntItems: "center",
    borderWidth: 1,
    borderRadius: SIZES.small,
    borderColor: COLORS.primary,
    padding: 5,
    width: "45%",
  },
  compareText: (spremljenDMG) => ({
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color:
      spremljenDMG === 0 || isNaN(spremljenDMG)
        ? COLORS.gray2
        : COLORS.secondary,
    alignSelf: "center",
  }),
  compareBtn: (spremljenDMG) => ({
    aligntItems: "center",
    borderWidth: 1,
    borderRadius: SIZES.small,
    borderColor:
      spremljenDMG === 0 || isNaN(spremljenDMG)
        ? COLORS.gray2
        : COLORS.secondary,
    padding: 5,
    width: "45%",
  }),
  checkboxContainer: {
    borderWidth: 1,
    borderRadius: SIZES.small,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightWhite,
  },

  tabBuffs: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default DamageScreen;
