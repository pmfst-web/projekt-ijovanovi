import React, {useState} from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import {useSelector, useDispatch} from 'react-redux';

import { COLORS, icons, SIZES, FONT } from "../constants";

import { CHARACTERS } from "../data/charactersData";
import CharacterDetails from '../components/CharacterDetails';


const StatsScreen = ( {route, navigation}) => {
  const idCharacter = Number(route.params.id);
  const character = CHARACTERS.find((c) => c.id === idCharacter);
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
      <CharacterDetails item={character} />
    </View>
  )
}

export default StatsScreen;