import React from 'react'
import { View, Text } from 'react-native'

import { CHARACTERS } from '../data/charactersData';

const DamageScreen = ({ route, navigation }) => {

  const idCharacter = Number(route.params.id);
  const character = CHARACTERS.find((c) => c.id === idCharacter);

  const stats = route.params?.charStats;

  return (
    <View>
      <Text>{character.hp}</Text>
    </View>
  )
}

export default DamageScreen;