import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { COLORS, icons, SIZES, FONT } from "../constants";

import { CHARACTERS } from "../data/charactersData";
import CharacterDetails from "../components/CharacterDetails";
import CharacterStatsInput from "../components/CharacterStatsInput";
import Talents from "../components/Talents";
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

  const favoriteCharacters = useSelector(
    (state) => state.characters.favoriteCharacters
  );
  const fav = favoriteCharacters.find((c) => c.id === idCharacter);

  const calculateDamage = (data) => {
    navigation.navigate("Damage", {
      id: data.id,
      charNormal,
      charSkill,
      charBurst,
      charHP,
      charATK,
      charDEF,
      charEM,
      charCR,
      charCD,
      charER,
      charDB,
    });
  };

  const dispatch = useDispatch();

  const akcijaDodajFavorita = (item) => {
    dispatch(promjenaFavorita(item.id));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <CharacterDetails item={character} />
        <Talents
          character={character}
          activeCon={activeCon}
          handleConPress={setActiveCon}
          charNormal={charNormal}
          setCharNormal={setCharNormal}
          charSkill={charSkill}
          setCharSkill={setCharSkill}
          charBurst={charBurst}
          setCharBurst={setCharBurst}
        />

        <CharacterStatsInput
          item={character}
          context={"Please input your stats here:"}
          charHP={charHP}
          setCharHP={setCharHP}
          charATK={charATK}
          setCharATK={setCharATK}
          charDEF={charDEF}
          setCharDEF={setCharDEF}
          charEM={charEM}
          setCharEM={setCharEM}
          charCR={charCR}
          setCharCR={setCharCR}
          charCD={charCD}
          setCharCD={setCharCD}
          charER={charER}
          setCharER={setCharER}
          charDB={charDB}
          setCharDB={setCharDB}
        />

        <View style={styles.calculateContainer}>
          <View>
            <TouchableOpacity onPress={() => akcijaDodajFavorita(character)}>
              <Image
                source={fav ? icons.heart : icons.heartOutline}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.calculateBtn}
            onPress={() => calculateDamage(character)}
          >
            <Text style={styles.calculateText}>Calculate DMG!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
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
});

export default StatsScreen;
