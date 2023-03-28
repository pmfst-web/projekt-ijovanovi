import { CHARACTERS } from '../../data/charactersData';
import { PROMJENA_FAVORITA, DODAVANJE_LIKA } from '../actions/characters';

const pocetnoStanje = {
  characters: CHARACTERS,
  addedCharacters: [],
  favoriteCharacters: [],
};

const characterReducer = (state = pocetnoStanje, action) => {
  switch (action.type) {
    case PROMJENA_FAVORITA: {
      const odabran = state.favoriteCharacters.findIndex(
        (character) => character.id === action.idCharacter
      );
      if (odabran >= 0) {
        const noviFavoriti = [...state.favoriteCharacters]
        noviFavoriti.splice(odabran, 1)
        return {...state, favoriteCharacters: noviFavoriti}
      } else {
        const character = state.characters.find(character => character.id === action.idCharacter)
        return {...state, favoriteCharacters: state.favoriteCharacters.concat(character)}
      } 
    }
    case DODAVANJE_LIKA: {
      const odabran = state.addedCharacters.findIndex(
        (character) => character.id === action.idCharacter
      );
      if (odabran >= 0) {
        const noviLik = [...state.addedCharacters]
        noviLik.splice(odabran, 1)
        return {...state, addedCharacters: noviLik}
      } else {
        const character = state.characters.find(character => character.id === action.idCharacter)
        return {...state, addedCharacters: state.addedCharacters.concat(character)}
      } 
    }
    default:
      return state;
  }
};
export default characterReducer;