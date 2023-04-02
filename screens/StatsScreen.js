import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  VirtualizedList,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { COLORS, icons, SIZES, FONT } from "../constants";

import { CHARACTERS } from "../data/charactersData";
import CharacterDetails from "../components/CharacterDetails";
import CharacterStatsInput from "../components/CharacterStatsInput";
import { promjenaFavorita } from "../store/actions/characters";

const StatsScreen = ({ route, navigation }) => {
  const [activeCon, setActiveCon] = useState();

  const [charHP, setCharHP] = useState(0);
  const [charATK, setCharATK] = useState(0);
  const [charDEF, setCharDEF] = useState(0);
  const [charEM, setCharEM] = useState(0);
  const [charCR, setCharCR] = useState(0);
  const [charCD, setCharCD] = useState(0);
  const [charER, setCharER] = useState(0);
  const [charDB, setCharDB] = useState(0);
  const [charNormal, setCharNormal] = useState(0);
  const [charSkill, setCharSkill] = useState(0);
  const [charBurst, setCharBurst] = useState(0);

  const idCharacter = Number(route.params.id);
  const character = CHARACTERS.find((c) => c.id === idCharacter);

  const visionType = character.vision;
  const dmgBonusType = (visionType) => {
    if (visionType === "Anemo") {
      return "https://static.wikia.nocookie.net/gensin-impact/images/1/10/Element_Anemo.svg/revision/latest/scale-to-width-down/30?cb=20220119211128";
    } else if (visionType === "Cryo") {
      return "https://static.wikia.nocookie.net/gensin-impact/images/7/72/Element_Cryo.svg/revision/latest/scale-to-width-down/30?cb=20220119211508";
    } else if (visionType === "Dendro") {
      return "https://static.wikia.nocookie.net/gensin-impact/images/7/73/Element_Dendro.svg/revision/latest/scale-to-width-down/30?cb=20220119211226";
    } else if (visionType === "Electro") {
      return "https://static.wikia.nocookie.net/gensin-impact/images/f/ff/Element_Electro.svg/revision/latest/scale-to-width-down/30?cb=20220119211156";
    } else if (visionType === "Geo") {
      return "https://static.wikia.nocookie.net/gensin-impact/images/9/9b/Element_Geo.svg/revision/latest/scale-to-width-down/30?cb=20220119211105";
    } else if (visionType === "Hydro") {
      return "https://static.wikia.nocookie.net/gensin-impact/images/8/80/Element_Hydro.svg/revision/latest/scale-to-width-down/30?cb=20220119211435";
    } else if (visionType === "Pyro") {
      return "https://static.wikia.nocookie.net/gensin-impact/images/2/2c/Element_Pyro.svg/revision/latest/scale-to-width-down/30?cb=20220119211527";
    } else {
      return "https://static.wikia.nocookie.net/gensin-impact/images/8/85/Icon_Attribute_Physical.svg/revision/latest/scale-to-width-down/30?cb=20220121154712";
    }
  };

  const calculateDamage = (data) => {
    navigation.navigate("Damage", { id: data.id, charNormal, charSkill, charBurst, charHP, charATK, charDEF, charEM, charCR, charCD, charER, charDB });
  };

  const dispatch = useDispatch();

  const akcijaDodajFavorita = (item) => {
    dispatch(promjenaFavorita(item.id));
  };

  

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <CharacterDetails item={character} />
        <View style={styles.tabsContainer}>
          <FlatList
            data={character.cons}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab(activeCon, item)}
                onPress={() => {
                  setActiveCon(item[0]);
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
            
            <View style={{padding: 1}}>
              <Image
                source={{ uri: character.talents_image[0] }}
                resizeMode="contain"
                style={styles.talentImage}
              />
              <TextInput style={{ borderWidth: 1 }} 
              value={charNormal}
              onChangeText={(text) => setCharNormal(text)}
              placeholder="Normal"
              keyboardType="numeric"/>
            </View>
            <View style={{padding: 1}}>
              <Image
                source={{ uri: character.talents_image[1] }}
                resizeMode="contain"
                style={styles.talentImage}
              />
              <TextInput style={{ borderWidth: 1 }} 
              value={charSkill}
              onChangeText={(text) => setCharSkill(text)}
              placeholder="Skill"
              keyboardType="numeric"/>
            </View>
            <View style={{padding: 1}}>
              <Image
                source={{ uri: character.talents_image[2] }}
                resizeMode="contain"
                style={styles.talentImage}
              />
              <TextInput style={{ borderWidth: 1 }} 
              value={charBurst}
              onChangeText={(text) => setCharBurst(text)}
              placeholder="Burst"
              keyboardType="numeric"/>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
          <Text style={{ fontSize: SIZES.large, fontFamily: FONT.bold }}>
            Please input your stats here:
          </Text>
          <View style={styles.searchContainer}>
            <View style={styles.searchBtn}>
              <Image
                source={{
                  uri: "https://static.wikia.nocookie.net/gensin-impact/images/5/56/Icon_Attribute_Health.png/revision/latest/scale-to-width-down/40?cb=20210709015027",
                }}
                resizeMode="contain"
                style={styles.searchBtnImage}
              />
            </View>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                value={charHP}
                onChangeText={(text) => setCharHP(text)}
                placeholder="Insert HP"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchBtn}>
              <Image
                source={{
                  uri: "https://static.wikia.nocookie.net/gensin-impact/images/7/71/Icon_Attribute_Attack.png/revision/latest/scale-to-width-down/40?cb=20210709014926",
                }}
                resizeMode="contain"
                style={styles.searchBtnImage}
              />
            </View>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                value={charATK}
                onChangeText={(text) => setCharATK(text)}
                placeholder="Insert ATK"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchBtn}>
              <Image
                source={{
                  uri: "https://static.wikia.nocookie.net/gensin-impact/images/8/82/Icon_Attribute_Defense.png/revision/latest/scale-to-width-down/40?cb=20210709014949",
                }}
                resizeMode="contain"
                style={styles.searchBtnImage}
              />
            </View>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                value={charDEF}
                onChangeText={(text) => setCharDEF(text)}
                placeholder="Insert DEF"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchBtn}>
              <Image
                source={{
                  uri: "https://static.wikia.nocookie.net/gensin-impact/images/5/5a/Icon_Attribute_Elemental_Mastery.png/revision/latest/scale-to-width-down/40?cb=20210709015004",
                }}
                resizeMode="contain"
                style={styles.searchBtnImage}
              />
            </View>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                value={charEM}
                onChangeText={(text) => setCharEM(text)}
                placeholder="Insert EM"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchBtn}>
              <Image
                source={{
                  uri: "https://static.wikia.nocookie.net/gensin-impact/images/8/84/Icon_Attribute_Critical_Hit.png/revision/latest/scale-to-width-down/40?cb=20210709014938",
                }}
                resizeMode="contain"
                style={styles.searchBtnImage}
              />
            </View>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                value={charCR}
                onChangeText={(text) => setCharCR(text)}
                placeholder="Insert CR"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchBtn}>
              <Image
                source={{
                  uri: "https://static.wikia.nocookie.net/gensin-impact/images/8/84/Icon_Attribute_Critical_Hit.png/revision/latest/scale-to-width-down/40?cb=20210709014938",
                }}
                resizeMode="contain"
                style={styles.searchBtnImage}
              />
            </View>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                value={charCD}
                onChangeText={(text) => setCharCD(text)}
                placeholder="Insert CD"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchBtn}>
              <Image
                source={{
                  uri: "https://static.wikia.nocookie.net/gensin-impact/images/7/73/Icon_Attribute_Energy_Recharge.png/revision/latest/scale-to-width-down/40?cb=20210709015010",
                }}
                resizeMode="contain"
                style={styles.searchBtnImage}
              />
            </View>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                value={charER}
                onChangeText={(text) => setCharER(text)}
                placeholder="Insert ER"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchBtn}>
              <Image
                source={{ uri: dmgBonusType(visionType) }}
                resizeMode="contain"
                style={styles.searchBtnImage}
              />
            </View>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                value={charDB}
                onChangeText={(text) => setCharDB(text)}
                placeholder="Insert DMG Bonus"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View style={styles.calculateContainer}>
          <View>
            <TouchableOpacity onPress={() => akcijaDodajFavorita(character)}>
              <Image source={icons.heart} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.calculateBtn}
            onPress={() => calculateDamage(character)}
          >
            <Text style={styles.calculateText}>Calculate DMG!</Text>
          </TouchableOpacity>
        </View>
        <Text> {charATK} </Text>
        <Text> {charNormal}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
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
  favBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  favBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  favWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
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
    borderRadius: SIZES.large,
    borderColor: COLORS.primary,
    padding: 5,
    width: "50%",
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 40,
    padding: 1,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    border: 1,
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "80%",
    border: 3,
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.gray,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  //container
  containerCharacter: {
    marginTop: SIZES.xLarge,
  },
  closeCharacterModalButton: {
    marginTop: SIZES.xLarge,
    alignItems: "center",
  },
  //header
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
  //headerBtn
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  //cardsContainer
  cardsContainer: {
    marginTop: SIZES.medium,
  },
});

export default StatsScreen;
